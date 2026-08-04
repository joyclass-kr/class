const crypto = require("crypto");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { OAuth2Client } = require("google-auth-library");
const { Pool } = require("pg");
const { createReadingBank } = require("./reading-bank");

const SESSION_COOKIE = "class_session";
const GUEST_ACCESS_COOKIE = "class_guest_access";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const JOIN_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const DEFAULT_STUDENT_PASSWORD = "123456";
const STUDENT_PASSWORD_PATTERN = /^\d{6}$/;
const DEFAULT_TEACHER_PASSWORD = "123456";
const AUTH_FAILURE_LIMIT = 30;
const AUTH_FAILURE_WINDOW_MS = 15 * 60 * 1000;
const AUTH_FAILURE_MAX_ENTRIES = 5000;
const AVATAR_DIRECTORY = path.join(__dirname, "..", "classtools", "assets", "avatars");
const AVATAR_KEYS = Object.freeze(
  fs.readdirSync(AVATAR_DIRECTORY)
    .filter((name) => name.toLowerCase().endsWith(".webp"))
    .sort((left, right) => left.localeCompare(right, "en"))
);
const AVATAR_KEY_SET = new Set(AVATAR_KEYS);
const LEGACY_AVATAR_KEY_ALIASES = Object.freeze({
  "animal-hippopotamus-02.webp": "animal-hippopotamus.webp",
  "animal-crocodile-02.webp": "animal-crocodile.webp",
  "food-sushi-roll.webp": "food-gimbap.webp"
});

function normalizeAvatarKey(avatarKey) {
  const webpKey = String(avatarKey || "").trim().replace(/\.png$/i, ".webp");
  return LEGACY_AVATAR_KEY_ALIASES[webpKey] || webpKey;
}

function avatarUrl(avatarKey) {
  const normalizedKey = normalizeAvatarKey(avatarKey);
  return normalizedKey && AVATAR_KEY_SET.has(normalizedKey)
    ? `/assets/avatars/${encodeURIComponent(normalizedKey)}`
    : "";
}

function avatarCapacity(studentCount) {
  return Math.max(1, Math.ceil(Number(studentCount || 0) / AVATAR_KEYS.length));
}

function koreanCalendarParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return { year: Number(values.year), month: Number(values.month), day: Number(values.day) };
}

function avatarChangeWindow(now = new Date()) {
  const { year, month } = koreanCalendarParts(now);
  if (month >= 3 && month <= 7) {
    return { year, period: "first", label: "1\ud559\uae30(3\uc6d4 1\uc77c~7\uc6d4 31\uc77c)" };
  }
  if (month >= 8 && month <= 12) {
    return { year, period: "second", label: "2\ud559\uae30(8\uc6d4 1\uc77c~12\uc6d4 31\uc77c)" };
  }
  return { year, period: null, label: "\ubcc0\uacbd \uae30\uac04 \uc544\ub2d8(1~2\uc6d4)" };
}

function pickRandomAvailableAvatar(usageCounts, capacity) {
  const available = AVATAR_KEYS.filter((key) => Number(usageCounts.get(key) || 0) < capacity);
  if (available.length === 0) {
    throw new HttpError(409, "AVATAR_CAPACITY_EXHAUSTED", "This grade has no available avatars.");
  }
  return available[crypto.randomInt(available.length)];
}

class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function createAuthenticationFailureLimiter(options = {}) {
  const limit = Number(options.limit) || AUTH_FAILURE_LIMIT;
  const windowMs = Number(options.windowMs) || AUTH_FAILURE_WINDOW_MS;
  const maxEntries = Number(options.maxEntries) || AUTH_FAILURE_MAX_ENTRIES;
  const now = typeof options.now === "function" ? options.now : Date.now;
  const failures = new Map();

  function digest(value) {
    return crypto.createHash("sha256").update(String(value || "unknown")).digest("hex");
  }

  function clientAddress(req) {
    return String(req?.ip || req?.socket?.remoteAddress || "unknown").trim().slice(0, 128) || "unknown";
  }

  function keys(req, scope, identity) {
    const result = [`${scope}:ip:${digest(clientAddress(req))}`];
    if (identity) result.push(`${scope}:identity:${digest(identity)}`);
    return result;
  }

  function prune(timestamp) {
    for (const [key, entry] of failures) {
      if (timestamp - entry.startedAt >= windowMs) failures.delete(key);
    }
    while (failures.size > maxEntries) {
      const oldestKey = failures.keys().next().value;
      if (!oldestKey) break;
      failures.delete(oldestKey);
    }
  }

  function enforce(req, scope, identity = "") {
    const timestamp = now();
    prune(timestamp);
    let retryAfterSeconds = 0;
    for (const key of keys(req, scope, identity)) {
      const entry = failures.get(key);
      if (!entry || entry.count < limit) continue;
      retryAfterSeconds = Math.max(
        retryAfterSeconds,
        Math.max(1, Math.ceil((entry.startedAt + windowMs - timestamp) / 1000))
      );
    }
    if (retryAfterSeconds > 0) {
      const error = new HttpError(
        429,
        "TOO_MANY_AUTH_FAILURES",
        "로그인에 여러 번 실패했습니다. 15분 후 다시 시도해 주세요."
      );
      error.retryAfterSeconds = retryAfterSeconds;
      throw error;
    }
  }

  function recordFailure(req, scope, identity = "") {
    const timestamp = now();
    prune(timestamp);
    for (const key of keys(req, scope, identity)) {
      const entry = failures.get(key);
      if (!entry) failures.set(key, { count: 1, startedAt: timestamp });
      else entry.count += 1;
    }
    prune(timestamp);
  }

  function recordSuccess(req, scope, identity = "") {
    if (!identity) return;
    failures.delete(`${scope}:identity:${digest(identity)}`);
  }

  return { enforce, recordFailure, recordSuccess };
}

function asyncRoute(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizePersonName(value) {
  return String(value || "").normalize("NFC").replace(/[^가-힣]/g, "");
}

function parseTeacherEmails(value) {
  return new Set(
    String(value || "")
      .split(",")
      .map(normalizeEmail)
      .filter(Boolean)
  );
}

function readCookie(req, name) {
  const source = String(req.headers.cookie || "");
  for (const part of source.split(";")) {
    const separator = part.indexOf("=");
    if (separator < 0) continue;
    const key = part.slice(0, separator).trim();
    if (key !== name) continue;
    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch (_) {
      return "";
    }
  }
  return "";
}

function hashSessionToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function hashStudentPassword(password) {
  const normalized = String(password || "").trim();
  if (!STUDENT_PASSWORD_PATTERN.test(normalized)) {
    throw new Error("Student passwords must contain exactly 6 digits.");
  }
  const salt = crypto.randomBytes(16);
  const derivedKey = crypto.scryptSync(normalized, salt, 32);
  return `scrypt$${salt.toString("hex")}$${derivedKey.toString("hex")}`;
}

function verifyStudentPassword(password, encodedHash) {
  const [algorithm, saltHex, keyHex] = String(encodedHash || "").split("$");
  if (algorithm !== "scrypt" || !saltHex || !keyHex || !STUDENT_PASSWORD_PATTERN.test(String(password || ""))) {
    return false;
  }
  try {
    const expected = Buffer.from(keyHex, "hex");
    const actual = crypto.scryptSync(String(password), Buffer.from(saltHex, "hex"), expected.length);
    return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
  } catch (_) {
    return false;
  }
}

function makeJoinCode() {
  const bytes = crypto.randomBytes(6);
  let code = "";
  for (const byte of bytes) code += JOIN_CODE_ALPHABET[byte % JOIN_CODE_ALPHABET.length];
  return code;
}

function publicUser(row) {
  return {
    email: row.email,
    name: row.display_name,
    pictureUrl: row.picture_url || null,
    domain: row.google_domain,
    role: row.role || null
  };
}

function createClassroomPlatform(options = {}) {
  const databaseUrl = String(options.databaseUrl || "").trim();
  const googleClientId = String(options.googleClientId || "").trim();
  const teacherEmails = parseTeacherEmails(options.teacherEmails);
  const adminEmails = parseTeacherEmails(options.adminEmails);
  const isProduction = options.nodeEnv === "production";
  const pool = databaseUrl
    ? new Pool({
        connectionString: databaseUrl,
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000
      })
    : null;
  const googleClient = googleClientId ? new OAuth2Client(googleClientId) : null;
  const museumPresenceSecret = crypto.randomBytes(32);
  const guestAccessSecret = crypto.randomBytes(32);
  const router = express.Router();
  const authFailureLimiter = createAuthenticationFailureLimiter();
  let databaseReady = false;
  let initializationError = null;

  if (pool) {
    pool.on("error", (error) => {
      databaseReady = false;
      initializationError = error;
      console.error("Classroom database pool error:", error);
    });
  }

  function configuration() {
    const missing = [];
    if (!databaseUrl) missing.push("DATABASE_URL");
    if (!googleClientId) missing.push("GOOGLE_CLIENT_ID");
    if (databaseUrl && !databaseReady) missing.push("DATABASE_NOT_READY");
    return {
      enabled: missing.length === 0,
      clientId: googleClientId || null,
      missing,
      adminConfigured: adminEmails.size > 0,
      databaseError: initializationError ? "DATABASE_NOT_READY" : null
    };
  }

  function requireConfigured() {
    const current = configuration();
    if (!current.enabled) {
      throw new HttpError(503, "LOGIN_NOT_CONFIGURED", "Google sign-in is not configured yet.");
    }
  }

  function setSessionCookie(res, token) {
    const attributes = [
      `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      `Max-Age=${SESSION_MAX_AGE_SECONDS}`
    ];
    if (isProduction) attributes.push("Secure");
    res.append("Set-Cookie", attributes.join("; "));
  }

  function clearSessionCookie(res) {
    const attributes = [
      `${SESSION_COOKIE}=`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      "Max-Age=0"
    ];
    if (isProduction) attributes.push("Secure");
    res.append("Set-Cookie", attributes.join("; "));
  }

  function setGuestAccessCookie(res, name) {
    const body = Buffer.from(JSON.stringify({ name, exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 })).toString("base64url");
    const signature = crypto.createHmac("sha256", guestAccessSecret).update(body).digest("base64url");
    const attributes = [
      `${GUEST_ACCESS_COOKIE}=${encodeURIComponent(`${body}.${signature}`)}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      `Max-Age=${SESSION_MAX_AGE_SECONDS}`
    ];
    if (isProduction) attributes.push("Secure");
    res.append("Set-Cookie", attributes.join("; "));
  }

  function guestAccess(req) {
    const [body, signature] = readCookie(req, GUEST_ACCESS_COOKIE).split(".");
    if (!body || !signature) return null;
    const expected = crypto.createHmac("sha256", guestAccessSecret).update(body).digest("base64url");
    if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    try {
      const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
      const name = normalizePersonName(payload.name);
      return payload.exp > Date.now() && name.length >= 2 && name.length <= 6 ? { name } : null;
    } catch (_) {
      return null;
    }
  }

  async function initialize() {
    if (!pool) return;

    const statements = [
      `CREATE TABLE IF NOT EXISTS classroom_users (
        id BIGSERIAL PRIMARY KEY,
        google_sub TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        display_name TEXT NOT NULL,
        picture_url TEXT,
        google_domain TEXT NOT NULL,
        role TEXT CHECK (role IN ('admin', 'teacher', 'student')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE UNIQUE INDEX IF NOT EXISTS classroom_users_email_idx
        ON classroom_users (LOWER(email))`,
      `ALTER TABLE classroom_users
        DROP CONSTRAINT IF EXISTS classroom_users_role_check`,
      `ALTER TABLE classroom_users
        ADD CONSTRAINT classroom_users_role_check
        CHECK (role IN ('admin', 'teacher', 'student'))`,
      `CREATE TABLE IF NOT EXISTS classroom_sessions (
        token_hash TEXT PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES classroom_users(id) ON DELETE CASCADE,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE INDEX IF NOT EXISTS classroom_sessions_user_idx
        ON classroom_sessions (user_id)`,
      `CREATE TABLE IF NOT EXISTS classroom_schools (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        google_domain TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (name, google_domain)
      )`,
      `ALTER TABLE classroom_schools
        ADD COLUMN IF NOT EXISTS office_code TEXT`,
      `ALTER TABLE classroom_schools
        ADD COLUMN IF NOT EXISTS school_code TEXT`,
      `ALTER TABLE classroom_schools
        ADD COLUMN IF NOT EXISTS location_name TEXT`,
      `ALTER TABLE classroom_schools
        ADD COLUMN IF NOT EXISTS enabled BOOLEAN NOT NULL DEFAULT TRUE`,
      `ALTER TABLE classroom_schools
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`,
      `CREATE UNIQUE INDEX IF NOT EXISTS classroom_schools_code_idx
        ON classroom_schools (UPPER(school_code))
        WHERE school_code IS NOT NULL`,
      `CREATE TABLE IF NOT EXISTS classroom_teachers (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id),
        teacher_name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        google_email TEXT,
        user_id BIGINT UNIQUE REFERENCES classroom_users(id) ON DELETE SET NULL,
        active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, teacher_name)
      )`,
      `ALTER TABLE classroom_teachers
        ADD COLUMN IF NOT EXISTS academic_year INTEGER`,
      `ALTER TABLE classroom_teachers
        ADD COLUMN IF NOT EXISTS grade INTEGER`,
      `ALTER TABLE classroom_teachers
        ADD COLUMN IF NOT EXISTS class_number INTEGER`,
      `CREATE UNIQUE INDEX IF NOT EXISTS classroom_teachers_class_assignment_idx
        ON classroom_teachers (school_id, academic_year, grade, class_number)
        WHERE academic_year IS NOT NULL AND grade IS NOT NULL AND class_number IS NOT NULL`,
      `ALTER TABLE classroom_teachers
        ADD COLUMN IF NOT EXISTS teacher_type TEXT NOT NULL DEFAULT 'homeroom'`,
      `ALTER TABLE classroom_teachers
        ADD COLUMN IF NOT EXISTS subject_name TEXT`,
      `ALTER TABLE classroom_teachers
        ADD COLUMN IF NOT EXISTS room_name TEXT`,
      `CREATE UNIQUE INDEX IF NOT EXISTS classroom_teachers_email_idx
        ON classroom_teachers (LOWER(google_email))
        WHERE google_email IS NOT NULL`,
      `CREATE TABLE IF NOT EXISTS classroom_classes (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id),
        teacher_user_id BIGINT NOT NULL UNIQUE REFERENCES classroom_users(id),
        academic_year INTEGER NOT NULL,
        grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 12),
        class_number INTEGER NOT NULL CHECK (class_number BETWEEN 1 AND 30),
        teacher_name TEXT NOT NULL,
        join_code TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE UNIQUE INDEX IF NOT EXISTS classroom_classes_identity_idx
        ON classroom_classes (school_id, academic_year, grade, class_number)`,
      `UPDATE classroom_teachers t
       SET academic_year = c.academic_year,
           grade = c.grade,
           class_number = c.class_number,
           updated_at = NOW()
       FROM classroom_classes c
       WHERE t.user_id = c.teacher_user_id
         AND (t.academic_year IS NULL OR t.grade IS NULL OR t.class_number IS NULL)`,
      `CREATE TABLE IF NOT EXISTS classroom_students (
        id BIGSERIAL PRIMARY KEY,
        class_id BIGINT NOT NULL REFERENCES classroom_classes(id) ON DELETE CASCADE,
        student_number TEXT NOT NULL,
        roster_name TEXT NOT NULL,
        user_id BIGINT UNIQUE REFERENCES classroom_users(id) ON DELETE SET NULL,
        claimed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (class_id, student_number)
      )`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS password_hash TEXT`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS gender TEXT NOT NULL DEFAULT '남'`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS birth_date TEXT`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS birthday_mmdd TEXT`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS birthday_visible BOOLEAN NOT NULL DEFAULT FALSE`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS avatar_key TEXT`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS avatar_first_changed_year INTEGER`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS avatar_second_changed_year INTEGER`,
      `UPDATE classroom_students
       SET avatar_key = regexp_replace(avatar_key, '\\.png$', '.webp', 'i')
       WHERE avatar_key ~* '\\.png$'`,
      `UPDATE classroom_students
       SET avatar_key = CASE avatar_key
         WHEN 'animal-hippopotamus-02.webp' THEN 'animal-hippopotamus.webp'
         WHEN 'animal-crocodile-02.webp' THEN 'animal-crocodile.webp'
         WHEN 'food-sushi-roll.webp' THEN 'food-gimbap.webp'
         ELSE avatar_key
       END
       WHERE avatar_key IN ('animal-hippopotamus-02.webp', 'animal-crocodile-02.webp', 'food-sushi-roll.webp')`,
      `CREATE INDEX IF NOT EXISTS classroom_students_avatar_idx
        ON classroom_students (avatar_key)`,
      `UPDATE classroom_students
       SET birthday_mmdd = RIGHT(birth_date, 4)
       WHERE birthday_mmdd IS NULL AND birth_date ~ '^\\d{6}$'`,
      `UPDATE classroom_students SET birth_date = NULL WHERE birth_date IS NOT NULL`,
      `CREATE INDEX IF NOT EXISTS classroom_students_class_idx
        ON classroom_students (class_id)`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS student_email TEXT`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS guardian1_email TEXT`,
      `ALTER TABLE classroom_students
        ADD COLUMN IF NOT EXISTS guardian2_email TEXT`,
      `CREATE TABLE IF NOT EXISTS game_finisher_records (
        record_date DATE NOT NULL,
        game_id TEXT NOT NULL,
        player_name TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        rank INTEGER NOT NULL CHECK (rank BETWEEN 0 AND 10000),
        finished_time CHAR(5) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (record_date, game_id, player_name)
      )`,
      `CREATE INDEX IF NOT EXISTS game_finisher_records_lookup_idx
        ON game_finisher_records (record_date, game_id, finished_time, player_name)`,
      `ALTER TABLE classroom_classes
        DROP CONSTRAINT IF EXISTS classroom_classes_grade_check`,
      `ALTER TABLE classroom_classes
        ADD CONSTRAINT classroom_classes_grade_check
        CHECK (grade BETWEEN 1 AND 12)`,
      `CREATE TABLE IF NOT EXISTS classroom_settings (
        setting_key TEXT PRIMARY KEY,
        setting_value TEXT NOT NULL,
        updated_by BIGINT REFERENCES classroom_users(id) ON DELETE SET NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `INSERT INTO classroom_settings (setting_key, setting_value)
        VALUES ('site_access_mode', 'open')
        ON CONFLICT (setting_key) DO NOTHING`,
      `CREATE TABLE IF NOT EXISTS classroom_content_locks (
        class_id BIGINT NOT NULL REFERENCES classroom_classes(id) ON DELETE CASCADE,
        content_path TEXT NOT NULL,
        updated_by BIGINT REFERENCES classroom_users(id) ON DELETE SET NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (class_id, content_path)
      )`,
      `CREATE TABLE IF NOT EXISTS classroom_schedules (
        id BIGSERIAL PRIMARY KEY,
        class_id BIGINT NOT NULL REFERENCES classroom_classes(id) ON DELETE CASCADE,
        event_date DATE NOT NULL,
        title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 60),
        created_by BIGINT REFERENCES classroom_users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `ALTER TABLE classroom_schedules
        ADD COLUMN IF NOT EXISTS details TEXT NOT NULL DEFAULT ''`,
      `CREATE INDEX IF NOT EXISTS classroom_schedules_class_date_idx
        ON classroom_schedules (class_id, event_date, id)`,
      `CREATE UNIQUE INDEX IF NOT EXISTS classroom_schedules_unique_event_idx
        ON classroom_schedules (class_id, event_date, title)`,
      `CREATE TABLE IF NOT EXISTS privacy_requests (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES classroom_users(id) ON DELETE CASCADE,
        category TEXT NOT NULL CHECK (category IN ('view', 'correct', 'delete', 'stop', 'birthday', 'guardian', 'technical', 'other')),
        details TEXT NOT NULL CHECK (char_length(details) BETWEEN 10 AND 1000),
        status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'reviewing', 'completed', 'rejected')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        resolved_at TIMESTAMPTZ
      )`,
      `CREATE INDEX IF NOT EXISTS privacy_requests_user_created_idx
        ON privacy_requests (user_id, created_at DESC)`,
      `ALTER TABLE privacy_requests
        DROP CONSTRAINT IF EXISTS privacy_requests_category_check`,
      `ALTER TABLE privacy_requests
        ADD CONSTRAINT privacy_requests_category_check
        CHECK (category IN ('view', 'correct', 'delete', 'stop', 'birthday', 'guardian', 'technical', 'other'))`,
      `CREATE TABLE IF NOT EXISTS classroom_student_access_resets (
        id BIGSERIAL PRIMARY KEY,
        student_id BIGINT NOT NULL,
        class_id BIGINT NOT NULL,
        student_number TEXT NOT NULL,
        roster_name TEXT NOT NULL,
        previous_user_id BIGINT,
        reset_by BIGINT REFERENCES classroom_users(id) ON DELETE SET NULL,
        reset_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE INDEX IF NOT EXISTS classroom_student_access_resets_time_idx
        ON classroom_student_access_resets (reset_at DESC)`,
      `CREATE TABLE IF NOT EXISTS classroom_notices (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT,
        sender_teacher_name TEXT NOT NULL,
        title TEXT NOT NULL,
        content_type TEXT NOT NULL CHECK (content_type IN ('pdf', 'text')),
        content_body TEXT NOT NULL,
        target_type TEXT NOT NULL CHECK (target_type IN ('all', 'grade', 'class', 'students')),
        target_grade INTEGER,
        target_class_number INTEGER,
        target_student_numbers TEXT,
        requires_signature BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS classroom_absence_notices (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT,
        grade INTEGER NOT NULL,
        class_number INTEGER NOT NULL,
        student_number TEXT NOT NULL,
        student_name TEXT NOT NULL,
        notice_type TEXT NOT NULL,
        expected_date DATE NOT NULL,
        reason TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS classroom_absence_notes (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT,
        grade INTEGER NOT NULL,
        class_number INTEGER NOT NULL,
        student_number TEXT NOT NULL,
        student_name TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_days INTEGER NOT NULL,
        reason_type TEXT NOT NULL,
        reason_detail TEXT NOT NULL,
        evidence_url TEXT,
        parent_name TEXT NOT NULL,
        parent_signature TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        teacher_check TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS classroom_experiential_apps (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT,
        grade INTEGER NOT NULL,
        class_number INTEGER NOT NULL,
        student_number TEXT NOT NULL,
        student_name TEXT NOT NULL,
        gender TEXT,
        parent_phone TEXT NOT NULL,
        learning_type TEXT NOT NULL DEFAULT 'general',
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_days INTEGER NOT NULL,
        location TEXT NOT NULL,
        plan_detail TEXT NOT NULL,
        parent_name TEXT NOT NULL,
        parent_signature TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS classroom_experiential_reports (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT,
        grade INTEGER NOT NULL,
        class_number INTEGER NOT NULL,
        student_number TEXT NOT NULL,
        student_name TEXT NOT NULL,
        gender TEXT,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_days INTEGER NOT NULL,
        location TEXT NOT NULL,
        report_detail TEXT NOT NULL,
        photo_url TEXT,
        parent_name TEXT NOT NULL,
        parent_signature TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `WITH first_login_upgrade AS (
        INSERT INTO classroom_settings (setting_key, setting_value)
        VALUES ('school_login_v2_enabled', 'true')
        ON CONFLICT (setting_key) DO NOTHING
        RETURNING setting_key
      )
      UPDATE classroom_settings
      SET setting_value = 'restricted', updated_at = NOW()
      WHERE setting_key = 'site_access_mode'
        AND EXISTS (SELECT 1 FROM first_login_upgrade)`
    ];

    try {
      for (const statement of statements) await pool.query(statement);
      await pool.query("DELETE FROM classroom_sessions WHERE expires_at <= NOW()");
      await pool.query("DELETE FROM privacy_requests WHERE created_at < NOW() - INTERVAL '1 year'");
      await readingBank.initialize();
      databaseReady = true;
      initializationError = null;
      console.log("Classroom database is ready.");
    } catch (error) {
      databaseReady = false;
      initializationError = error;
      console.error("Failed to initialize classroom database:", error);
    }
  }

  async function sessionUser(req) {
    if (!databaseReady) return null;
    const token = readCookie(req, SESSION_COOKIE);
    if (!token) return null;

    const result = await pool.query(
      `SELECT u.*
       FROM classroom_sessions s
       JOIN classroom_users u ON u.id = s.user_id
       WHERE s.token_hash = $1 AND s.expires_at > NOW()`,
      [hashSessionToken(token)]
    );
    return result.rows[0] || null;
  }

  function requireDatabaseReady() {
    if (!pool || !databaseReady) {
      const error = new Error("Classroom database is not ready.");
      error.code = "DATABASE_NOT_READY";
      throw error;
    }
  }

  async function listFinisherRecords(date, gameId) {
    requireDatabaseReady();
    const result = await pool.query(
      `SELECT player_name AS name, difficulty, rank, finished_time AS time
       FROM game_finisher_records
       WHERE record_date = $1::date AND game_id = $2
       ORDER BY finished_time ASC, player_name ASC`,
      [date, gameId]
    );
    return result.rows.map((row) => ({ ...row, rank: Number(row.rank) }));
  }

  async function saveFinisherRecord({ date, gameId, name, difficulty, rank, time }) {
    requireDatabaseReady();
    await pool.query(
      `INSERT INTO game_finisher_records
         (record_date, game_id, player_name, difficulty, rank, finished_time)
       VALUES ($1::date, $2, $3, $4, $5, $6)
       ON CONFLICT (record_date, game_id, player_name) DO UPDATE
       SET difficulty = EXCLUDED.difficulty,
           rank = EXCLUDED.rank,
           finished_time = EXCLUDED.finished_time,
           updated_at = NOW()
       WHERE EXCLUDED.rank > game_finisher_records.rank`,
      [date, gameId, name, difficulty, rank, time]
    );
    await pool.query(
      `DELETE FROM game_finisher_records
       WHERE record_date < $1::date - 13`,
      [date]
    );
    return listFinisherRecords(date, gameId);
  }

  async function requireUser(req) {
    const user = await sessionUser(req);
    if (!user) {
      if (await getSiteAccessMode() === "restricted") {
        requireConfigured();
      }
      throw new HttpError(401, "AUTH_REQUIRED", "Please sign in with Google.");
    }
    return user;
  }

  function requireDatabase() {
    if (!databaseReady) {
      throw new HttpError(503, "DATABASE_NOT_READY", "The classroom database is not ready.");
    }
  }

  async function requireTeacher(req) {
    const user = await requireUser(req);
    if (user.role !== "teacher") {
      throw new HttpError(403, "TEACHER_REQUIRED", "This page is for teachers only.");
    }
    const registration = await pool.query(
      `SELECT 1
       FROM classroom_teachers t
       JOIN classroom_schools sc ON sc.id = t.school_id
       WHERE t.user_id = $1 AND t.active = TRUE AND sc.enabled = TRUE`,
      [user.id]
    );
    if (!registration.rows[0]) {
      throw new HttpError(403, "TEACHER_REGISTRATION_REQUIRED", "Ask the administrator to register this teacher account.");
    }
    return user;
  }

  async function requireAdmin(req) {
    const user = await requireUser(req);
    if (user.role !== "admin") {
      throw new HttpError(403, "ADMIN_REQUIRED", "This page is for the site administrator only.");
    }
    return user;
  }

  const readingBank = createReadingBank({
    pool,
    requireUser,
    requireAdmin,
    requireDatabase,
    HttpError,
    asyncRoute
  });

  async function getSiteAccessMode() {
    if (!pool && !isProduction) return "open";
    requireDatabase();
    const result = await pool.query(
      "SELECT setting_value FROM classroom_settings WHERE setting_key = 'site_access_mode'"
    );
    return result.rows[0]?.setting_value === "restricted" ? "restricted" : "open";
  }

  async function studentMembership(userId) {
    const result = await pool.query(
      `SELECT s.student_number, s.roster_name,
              c.academic_year, c.grade, c.class_number,
              sc.name AS school_name
       FROM classroom_students s
       JOIN classroom_classes c ON c.id = s.class_id
       JOIN classroom_schools sc ON sc.id = c.school_id
       WHERE s.user_id = $1
       ORDER BY c.updated_at DESC
       LIMIT 1`,
      [userId]
    );
    const row = result.rows[0];
    if (!row) return null;
    return {
      studentNumber: row.student_number,
      name: row.roster_name,
      schoolName: row.school_name,
      academicYear: row.academic_year,
      grade: row.grade,
      classNumber: row.class_number
    };
  }

  async function userClassId(user) {
    if (!user) return null;
    if (user.role === "student") {
      const result = await pool.query(
        "SELECT class_id FROM classroom_students WHERE user_id = $1 LIMIT 1",
        [user.id]
      );
      return result.rows[0]?.class_id || null;
    }
    if (user.role === "teacher") {
      const result = await pool.query(
        `SELECT c.id
         FROM classroom_classes c
         JOIN classroom_teachers t ON t.school_id = c.school_id AND t.academic_year = c.academic_year AND t.grade = c.grade AND t.class_number = c.class_number
         WHERE (t.user_id = $1 OR c.teacher_user_id = $1) AND t.teacher_type = 'homeroom'
         ORDER BY c.updated_at DESC LIMIT 1`,
        [user.id]
      );
      return result.rows[0]?.id || null;
    }
    return null;
  }

  async function readableScheduleClassId(user, requestedClassId) {
    if (user.role === "student") return userClassId(user);
    if (user.role !== "teacher") return null;
    const requested = Number(requestedClassId);
    const result = await pool.query(
      `SELECT c.id
       FROM classroom_classes c
       JOIN classroom_teachers t ON t.school_id = c.school_id
       WHERE t.user_id = $1 AND t.active = TRUE
         AND ($2::BIGINT IS NULL OR c.id = $2)
       ORDER BY CASE WHEN c.teacher_user_id = $1 THEN 0 ELSE 1 END, c.updated_at DESC
       LIMIT 1`,
      [user.id, Number.isInteger(requested) && requested > 0 ? requested : null]
    );
    return result.rows[0]?.id || null;
  }

  async function writableScheduleClassId(teacher, requestedClassId) {
    const requested = Number(requestedClassId);
    const result = await pool.query(
      `SELECT id FROM classroom_classes
       WHERE teacher_user_id = $1
         AND ($2::BIGINT IS NULL OR id = $2)
       ORDER BY updated_at DESC LIMIT 1`,
      [teacher.id, Number.isInteger(requested) && requested > 0 ? requested : null]
    );
    return result.rows[0]?.id || null;
  }

  function birthdayScheduleRows(students, today = new Date()) {
    const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 31));
    const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 370));
    const rows = [];
    for (const student of students) {
      const mmdd = String(student.birthday_mmdd || "");
      if (!/^\d{4}$/.test(mmdd)) continue;
      const month = Number(mmdd.slice(0, 2));
      const day = Number(mmdd.slice(2));
      for (const year of [today.getUTCFullYear() - 1, today.getUTCFullYear(), today.getUTCFullYear() + 1]) {
        const date = new Date(Date.UTC(year, month - 1, day));
        if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day || date < start || date >= end) continue;
        rows.push({
          id: `birthday-${student.id}-${year}`,
          date: date.toISOString().slice(0, 10),
          title: `${student.roster_name} 생일 🎂`,
          type: "birthday"
        });
      }
    }
    return rows;
  }

  function normalizeContentPath(value) {
    const clean = String(value || "").split(/[?#]/, 1)[0].trim();
    if (!clean.startsWith("/") || clean.includes("..") || clean.length > 300) return "";
    return clean.length > 1 ? clean.replace(/\/+$/, "") : clean;
  }

  async function hasSiteAccess(req) {
    const mode = await getSiteAccessMode();
    // Open mode is intended for development and demonstrations.  A display
    // name is still useful for game hand-off, but it must not gate routes
    // served by separate learning apps (for example /arithmetic and
    // /hanguksa), because those requests can otherwise lose the guest cookie.
    if (mode === "open") return true;
    const user = await sessionUser(req);
    if (!user) return false;
    return user.role === "admin" || user.role === "teacher" || Boolean(await studentMembership(user.id));
  }

  const requireSiteAccess = asyncRoute(async (req, res, next) => {
    if (await hasSiteAccess(req)) {
      const mode = await getSiteAccessMode();
      const user = mode === "restricted" ? await sessionUser(req) : null;
      if (user?.role === "student" && (req.get("sec-fetch-dest") === "document" || req.accepts("html"))) {
        const classId = await userClassId(user);
        const requestPath = normalizeContentPath(req.path);
        if (classId && requestPath) {
          const locked = await pool.query(
            `SELECT 1 FROM classroom_content_locks
             WHERE class_id = $1
               AND ($2 = content_path OR $2 LIKE content_path || '/%')
             LIMIT 1`,
            [classId, requestPath]
          );
          if (locked.rows[0]) return res.redirect(302, "/?content=locked");
        }
      }
      return next();
    }
    if (req.method === "GET") return res.redirect(302, "/?access=required");
    throw new HttpError(403, "SITE_ACCESS_REQUIRED", "Complete site sign-in before opening this page.");
  });

  function signMuseumPresence(payload) {
    const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = crypto.createHmac("sha256", museumPresenceSecret).update(body).digest("base64url");
    return `${body}.${signature}`;
  }

  function verifyMuseumPresenceTicket(ticket) {
    const [body, signature] = String(ticket || "").split(".");
    if (!body || !signature) return null;
    const expected = crypto.createHmac("sha256", museumPresenceSecret).update(body).digest("base64url");
    if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    try {
      const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
      return payload.exp > Date.now() && payload.kind === "museum-presence" ? payload : null;
    } catch (_) { return null; }
  }

  router.get("/auth/config", (req, res) => {
    res.json(configuration());
  });

  router.get("/auth/me", asyncRoute(async (req, res) => {
    const current = configuration();
    const user = await sessionUser(req);
    if (!user) {
      if (!current.enabled) {
        return res.json({ signedIn: false, configured: false, missing: current.missing });
      }
      return res.json({ signedIn: false, configured: true });
    }
    const membership = user.role === "student" ? await studentMembership(user.id) : null;
    return res.json({
      signedIn: true,
      configured: current.enabled,
      user: publicUser(user),
      membership
    });
  }));

  router.get("/privacy/requests", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    const result = await pool.query(
      `SELECT id, category, details, status, created_at, updated_at, resolved_at
       FROM privacy_requests
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 20`,
      [user.id]
    );
    res.json({ requests: result.rows });
  }));

  router.get("/student/profile", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    if (user.role !== "student") {
      throw new HttpError(403, "STUDENT_REQUIRED", "This page is for student accounts only.");
    }
    const result = await pool.query(
      `SELECT s.id AS student_id, s.roster_name, s.student_number, s.birthday_mmdd, s.birthday_visible,
              s.avatar_key, s.avatar_first_changed_year, s.avatar_second_changed_year,
              c.school_id, c.academic_year, c.grade, c.class_number, sc.name AS school_name
       FROM classroom_students s
       JOIN classroom_classes c ON c.id = s.class_id
       JOIN classroom_schools sc ON sc.id = c.school_id
       WHERE s.user_id = $1
       ORDER BY c.updated_at DESC
       LIMIT 1`,
      [user.id]
    );
    const row = result.rows[0];
    if (!row) throw new HttpError(404, "STUDENT_MEMBERSHIP_REQUIRED", "Join your class before changing this setting.");
    const avatarUsageResult = await pool.query(
      `SELECT s.avatar_key, COUNT(*)::INTEGER AS usage_count,
              SUM(COUNT(*)) OVER()::INTEGER AS student_count
       FROM classroom_students s
       JOIN classroom_classes c ON c.id = s.class_id
       WHERE c.school_id = $1 AND c.academic_year = $2 AND c.grade = $3
       GROUP BY s.avatar_key`,
      [row.school_id, row.academic_year, row.grade]
    );
    const cohortStudentCount = Number(avatarUsageResult.rows[0]?.student_count || 0);
    const maximumAvatarUses = avatarCapacity(cohortStudentCount);
    const avatarUsageCounts = new Map(
      avatarUsageResult.rows
        .filter((item) => item.avatar_key)
        .map((item) => [item.avatar_key, Number(item.usage_count || 0)])
    );
    const changeWindow = avatarChangeWindow();
    const usedChange = changeWindow.period === "first"
      ? Number(row.avatar_first_changed_year) === changeWindow.year
      : changeWindow.period === "second" && Number(row.avatar_second_changed_year) === changeWindow.year;
    const avatarOptions = AVATAR_KEYS.map((key) => ({
      key,
      url: avatarUrl(key),
      available: key === row.avatar_key || Number(avatarUsageCounts.get(key) || 0) < maximumAvatarUses
    }));

    res.json({
      profile: {
        name: row.roster_name,
        studentNumber: row.student_number,
        schoolName: row.school_name,
        academicYear: row.academic_year,
        grade: row.grade,
        classNumber: row.class_number,
        birthdayMmdd: row.birthday_mmdd || "",
        birthdayVisible: row.birthday_visible === true,
        avatar: {
          key: normalizeAvatarKey(row.avatar_key),
          url: avatarUrl(row.avatar_key),
          canChange: Boolean(row.avatar_key && changeWindow.period && !usedChange),
          changePeriod: changeWindow.period,
          changePeriodLabel: changeWindow.label,
          changeUsed: usedChange,
          maximumUsesPerAvatar: maximumAvatarUses,
          options: avatarOptions
        }
      }
    });
  }));

  router.patch("/student/profile", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    if (user.role !== "student") {
      throw new HttpError(403, "STUDENT_REQUIRED", "This page is for student accounts only.");
    }
    const birthdayMmdd = String(req.body?.birthdayMmdd || "").replace(/\D/g, "").slice(0, 4);
    const birthdayVisible = req.body?.birthdayVisible === true;
    if (birthdayMmdd) {
      const month = Number(birthdayMmdd.slice(0, 2));
      const day = Number(birthdayMmdd.slice(2));
      const validDate = birthdayMmdd.length === 4 && month >= 1 && month <= 12 && day >= 1 && day <= new Date(2000, month, 0).getDate();
      if (!validDate) throw new HttpError(400, "INVALID_BIRTHDAY", "Enter your birthday as four digits, MMDD.");
    }
    if (birthdayVisible && !birthdayMmdd) {
      throw new HttpError(400, "BIRTHDAY_REQUIRED", "Enter your birthday before turning on birthday sharing.");
    }
    const result = await pool.query(
      `UPDATE classroom_students
       SET birthday_mmdd = $2, birthday_visible = $3, birth_date = NULL, updated_at = NOW()
       WHERE user_id = $1
       RETURNING roster_name, student_number, birthday_mmdd, birthday_visible`,
      [user.id, birthdayMmdd || null, Boolean(birthdayMmdd && birthdayVisible)]
    );
    const row = result.rows[0];
    if (!row) throw new HttpError(404, "STUDENT_MEMBERSHIP_REQUIRED", "Join your class before changing this setting.");
    res.json({
      profile: {
        name: row.roster_name,
        studentNumber: row.student_number,
        birthdayMmdd: row.birthday_mmdd || "",
        birthdayVisible: row.birthday_visible === true
      }
    });
  }));
  router.patch("/student/avatar", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    if (user.role !== "student") {
      throw new HttpError(403, "STUDENT_REQUIRED", "This page is for student accounts only.");
    }
    const requestedAvatarKey = normalizeAvatarKey(req.body?.avatarKey);
    if (!AVATAR_KEY_SET.has(requestedAvatarKey)) {
      throw new HttpError(400, "INVALID_AVATAR", "Choose an avatar from the available list.");
    }
    const changeWindow = avatarChangeWindow();
    if (!changeWindow.period) {
      throw new HttpError(403, "AVATAR_CHANGE_CLOSED", "\uc544\ubc14\ud0c0\ub294 3\uc6d4 1\uc77c~7\uc6d4 31\uc77c\uacfc 8\uc6d4 1\uc77c~12\uc6d4 31\uc77c\uc5d0 \uac01\uac01 \ud55c \ubc88 \ubc14\uafc0 \uc218 \uc788\uc2b5\ub2c8\ub2e4.");
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const studentResult = await client.query(
        `SELECT s.id, s.avatar_key, s.avatar_first_changed_year, s.avatar_second_changed_year,
                c.school_id, c.academic_year, c.grade
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         WHERE s.user_id = $1
         ORDER BY c.updated_at DESC
         LIMIT 1
         FOR UPDATE OF s`,
        [user.id]
      );
      const student = studentResult.rows[0];
      if (!student) throw new HttpError(404, "STUDENT_MEMBERSHIP_REQUIRED", "Join your class before changing the avatar.");
      if (!student.avatar_key) throw new HttpError(409, "AVATAR_NOT_ASSIGNED", "Ask your teacher to save the roster first.");

      await client.query(
        "SELECT pg_advisory_xact_lock(hashtextextended($1, 0))",
        [`avatar:${student.school_id}:${student.academic_year}:${student.grade}`]
      );
      const currentAvatarKey = normalizeAvatarKey(student.avatar_key);
      if (currentAvatarKey === requestedAvatarKey) {
        await client.query("COMMIT");
        return res.json({ changed: false, avatar: { key: currentAvatarKey, url: avatarUrl(currentAvatarKey) } });
      }
      const changeAlreadyUsed = changeWindow.period === "first"
        ? Number(student.avatar_first_changed_year) === changeWindow.year
        : Number(student.avatar_second_changed_year) === changeWindow.year;
      if (changeAlreadyUsed) {
        throw new HttpError(409, "AVATAR_CHANGE_ALREADY_USED", `${changeWindow.label} \ubcc0\uacbd \uae30\ud68c\ub97c \uc774\ubbf8 \uc0ac\uc6a9\ud588\uc2b5\ub2c8\ub2e4.`);
      }

      const capacityResult = await client.query(
        `SELECT COUNT(*)::INTEGER AS student_count,
                COUNT(*) FILTER (WHERE s.avatar_key = $4 AND s.id <> $5)::INTEGER AS selected_count
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         WHERE c.school_id = $1 AND c.academic_year = $2 AND c.grade = $3`,
        [student.school_id, student.academic_year, student.grade, requestedAvatarKey, student.id]
      );
      const usage = capacityResult.rows[0];
      const maximumAvatarUses = avatarCapacity(Number(usage.student_count || 0));
      if (Number(usage.selected_count || 0) >= maximumAvatarUses) {
        throw new HttpError(409, "AVATAR_UNAVAILABLE", "\uac19\uc740 \ud559\ub144\uc758 \ub2e4\ub978 \ud559\uc0dd\uc774 \uc774\ubbf8 \uc0ac\uc6a9 \uc911\uc778 \uc544\ubc14\ud0c0\uc785\ub2c8\ub2e4.");
      }

      if (changeWindow.period === "first") {
        await client.query(
          `UPDATE classroom_students
           SET avatar_key = $2, avatar_first_changed_year = $3, updated_at = NOW()
           WHERE id = $1`,
          [student.id, requestedAvatarKey, changeWindow.year]
        );
      } else {
        await client.query(
          `UPDATE classroom_students
           SET avatar_key = $2, avatar_second_changed_year = $3, updated_at = NOW()
           WHERE id = $1`,
          [student.id, requestedAvatarKey, changeWindow.year]
        );
      }
      await client.query("COMMIT");
      return res.json({
        changed: true,
        avatar: { key: requestedAvatarKey, url: avatarUrl(requestedAvatarKey) },
        changePeriodLabel: changeWindow.label
      });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }));


  router.patch("/student/password", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    if (user.role !== "student") {
      throw new HttpError(403, "STUDENT_REQUIRED", "This page is for student accounts only.");
    }
    const failureIdentity = String(user.id);
    authFailureLimiter.enforce(req, "student-password", failureIdentity);
    const currentPassword = String(req.body?.currentPassword || "").trim();
    const newPassword = String(req.body?.newPassword || "").trim();
    if (!STUDENT_PASSWORD_PATTERN.test(currentPassword) || !STUDENT_PASSWORD_PATTERN.test(newPassword)) {
      throw new HttpError(400, "INVALID_STUDENT_PASSWORD", "Passwords must contain exactly 6 digits.");
    }
    if (currentPassword === newPassword) {
      throw new HttpError(400, "PASSWORD_UNCHANGED", "Choose a different new password.");
    }
    const result = await pool.query(
      `SELECT id, password_hash
       FROM classroom_students
       WHERE user_id = $1
       LIMIT 1`,
      [user.id]
    );
    const student = result.rows[0];
    if (!student) throw new HttpError(404, "STUDENT_MEMBERSHIP_REQUIRED", "Join your class before changing the password.");
    if (!student.password_hash || !verifyStudentPassword(currentPassword, student.password_hash)) {
      authFailureLimiter.recordFailure(req, "student-password", failureIdentity);
      throw new HttpError(403, "CURRENT_PASSWORD_INCORRECT", "The current password is incorrect.");
    }
    await pool.query(
      `UPDATE classroom_students
       SET password_hash = $2, updated_at = NOW()
       WHERE id = $1`,
      [student.id, hashStudentPassword(newPassword)]
    );
    authFailureLimiter.recordSuccess(req, "student-password", failureIdentity);
    res.json({ ok: true });
  }));

  router.post("/privacy/requests", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    const category = String(req.body?.category || "").trim();
    const details = String(req.body?.details || "").trim();
    const allowed = new Set(["view", "correct", "delete", "stop", "birthday", "guardian", "technical", "other"]);
    if (!allowed.has(category)) {
      throw new HttpError(400, "PRIVACY_CATEGORY_REQUIRED", "Choose a request type.");
    }
    if (details.length < 10 || details.length > 1000) {
      throw new HttpError(400, "PRIVACY_DETAILS_REQUIRED", "Write between 10 and 1,000 characters.");
    }
    const result = await pool.query(
      `INSERT INTO privacy_requests (user_id, category, details)
       VALUES ($1, $2, $3)
       RETURNING id, category, details, status, created_at, updated_at, resolved_at`,
      [user.id, category, details]
    );
    res.status(201).json({ request: result.rows[0] });
  }));

  router.get("/teacher/privacy-requests", asyncRoute(async (req, res) => {
    await requireTeacher(req);
    const result = await pool.query(
      `SELECT r.id, r.category, r.details, r.status, r.created_at, r.updated_at, r.resolved_at,
              u.display_name, u.email, u.role
       FROM privacy_requests r
       JOIN classroom_users u ON u.id = r.user_id
       JOIN classroom_students s ON s.user_id = u.id
       JOIN classroom_classes c ON c.id = s.class_id
       WHERE c.teacher_user_id = $1
       ORDER BY CASE r.status WHEN 'received' THEN 0 WHEN 'reviewing' THEN 1 ELSE 2 END, r.created_at ASC
       LIMIT 200`,
       [req.user.id]
    );
    res.json({ requests: result.rows });
  }));

  router.patch("/teacher/privacy-requests/:requestId", asyncRoute(async (req, res) => {
    await requireTeacher(req);
    const requestId = Number(req.params.requestId);
    const status = String(req.body?.status || "").trim();
    if (!Number.isSafeInteger(requestId) || requestId < 1) {
      throw new HttpError(400, "VALID_REQUEST_ID_REQUIRED", "The request ID is invalid.");
    }
    if (!["received", "reviewing", "completed", "rejected"].includes(status)) {
      throw new HttpError(400, "VALID_REQUEST_STATUS_REQUIRED", "The request status is invalid.");
    }
    const result = await pool.query(
      `UPDATE privacy_requests
       SET status = $2, updated_at = NOW(),
           resolved_at = CASE WHEN $2 IN ('completed', 'rejected') THEN NOW() ELSE NULL END
       WHERE id = $1 AND user_id IN (
           SELECT u.id
           FROM classroom_users u
           JOIN classroom_students s ON s.user_id = u.id
           JOIN classroom_classes c ON c.id = s.class_id
           WHERE c.teacher_user_id = $3
       )
       RETURNING id, status, updated_at, resolved_at`,
      [requestId, status, req.user.id]
    );
    if (!result.rows[0]) throw new HttpError(404, "PRIVACY_REQUEST_NOT_FOUND", "The request was not found or not in your class.");
    res.json({ request: result.rows[0] });
  }));

  router.get("/teacher/student-accounts", asyncRoute(async (req, res) => {
    await requireTeacher(req);
    const result = await pool.query(
      `SELECT s.id, s.student_number, s.roster_name, s.user_id IS NOT NULL AS linked,
              u.email, c.academic_year, c.grade, c.class_number,
              sc.name AS school_name
       FROM classroom_students s
       JOIN classroom_classes c ON c.id = s.class_id
       JOIN classroom_schools sc ON sc.id = c.school_id
       LEFT JOIN classroom_users u ON u.id = s.user_id
       WHERE c.teacher_user_id = $1
       ORDER BY CASE WHEN s.student_number ~ '^[0-9]+$' THEN s.student_number::INTEGER END,
                s.student_number
       LIMIT 500`,
       [req.user.id]
    );
    res.json({ students: result.rows.map((row) => ({
      id: String(row.id),
      number: row.student_number,
      name: row.roster_name,
      linked: row.linked === true,
      email: row.email || null,
      schoolName: row.school_name,
      academicYear: row.academic_year,
      grade: row.grade,
      classNumber: row.class_number
    })) });
  }));

  router.post("/teacher/students/:studentId/reset-access", asyncRoute(async (req, res) => {
    await requireTeacher(req);
    const studentId = Number(req.params.studentId);
    if (!Number.isSafeInteger(studentId) || studentId < 1) {
      throw new HttpError(400, "VALID_STUDENT_ID_REQUIRED", "The student ID is invalid.");
    }
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const studentResult = await client.query(
        `SELECT s.id, s.class_id, s.student_number, s.roster_name, s.user_id
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         WHERE s.id = $1 AND c.teacher_user_id = $2
         FOR UPDATE`,
        [studentId, req.user.id]
      );
      const student = studentResult.rows[0];
      if (!student) throw new HttpError(404, "STUDENT_NOT_FOUND", "The student was not found.");
      if (student.user_id) {
        await client.query("DELETE FROM classroom_sessions WHERE user_id = $1", [student.user_id]);
        await client.query(
          `UPDATE classroom_users
           SET role = NULL, updated_at = NOW()
           WHERE id = $1 AND role = 'student'`,
          [student.user_id]
        );
      }
      await client.query(
        `UPDATE classroom_students
         SET user_id = NULL, claimed_at = NULL,
             birthday_mmdd = NULL, birthday_visible = FALSE,
             birth_date = NULL, password_hash = $2, updated_at = NOW()
         WHERE id = $1`,
        [student.id, hashStudentPassword(DEFAULT_STUDENT_PASSWORD)]
      );
      await client.query(
        `INSERT INTO classroom_student_access_resets
           (student_id, class_id, student_number, roster_name, previous_user_id, reset_by)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [student.id, student.class_id, student.student_number, student.roster_name, student.user_id, req.user.id]
      );
      await client.query("COMMIT");
      res.json({ ok: true, studentId: String(student.id), initialPassword: DEFAULT_STUDENT_PASSWORD });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }));

  router.post("/auth/guest", asyncRoute(async (req, res) => {
    const name = normalizePersonName(req.body?.name);
    const passcode = String(req.body?.passcode || "").trim();
    if (passcode !== "2004") {
      throw new HttpError(400, "INVALID_PASSCODE", "비밀번호 4자리를 올바르게 입력하세요.");
    }
    if (name.length < 2 || name.length > 6) {
      throw new HttpError(400, "VALID_NAME_REQUIRED", "Enter a Korean name with 2 to 6 characters.");
    }
    setGuestAccessCookie(res, name);
    res.json({ ok: true, name });
  }));

  router.get("/museum/presence-ticket", asyncRoute(async (req, res) => {
    const accessMode = await getSiteAccessMode();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    if (accessMode === "open") {
      const name = normalizePersonName(req.query?.name);
      const clientId = String(req.query?.clientId || "").trim();
      if (name.length < 2 || name.length > 6) {
        throw new HttpError(400, "VALID_NAME_REQUIRED", "Enter a Korean name with 2 to 6 characters.");
      }
      if (!/^[a-zA-Z0-9-]{12,80}$/.test(clientId)) {
        throw new HttpError(400, "VALID_CLIENT_REQUIRED", "The museum visitor ID is not valid.");
      }
      const userId = `guest-${crypto.createHash("sha256").update(clientId).digest("hex").slice(0, 16)}`;
      const ticket = signMuseumPresence({
        kind: "museum-presence", exp: expiresAt, userId, name, classKey: "open"
      });
      return res.json({ ticket, expiresAt, scope: "open" });
    }

    const user = await requireUser(req);
    if (user.role !== "student") throw new HttpError(403, "STUDENT_REQUIRED", "Museum presence is for student accounts only.");
    const membership = await studentMembership(user.id);
    if (!membership) throw new HttpError(403, "CLASS_MEMBERSHIP_REQUIRED", "Join your class before entering the museum.");
    const ticket = signMuseumPresence({
      kind: "museum-presence", exp: expiresAt, userId: String(user.id), name: membership.name,
      classKey: `${membership.schoolName}|${membership.academicYear}|${membership.grade}|${membership.classNumber}`
    });
    res.json({ ticket, expiresAt, scope: "class" });
  }));

  router.get("/site/access", asyncRoute(async (req, res) => {
    const mode = await getSiteAccessMode();
    res.json({ mode });
  }));

  router.get("/home-content-access", asyncRoute(async (req, res) => {
    const mode = await getSiteAccessMode();
    const user = await sessionUser(req);
    if (!user || user.role === "admin") {
      return res.json({ mode, lockedPaths: [], canManage: false });
    }
    const classId = await userClassId(user);
    if (!classId) return res.json({ mode, lockedPaths: [], canManage: false });
    const locks = await pool.query(
      "SELECT content_path FROM classroom_content_locks WHERE class_id = $1 ORDER BY content_path",
      [classId]
    );
    res.json({
      mode,
      lockedPaths: locks.rows.map((row) => row.content_path),
      canManage: user.role === "teacher"
    });
  }));

  router.put("/teacher/home-content-access", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const classId = await userClassId(teacher);
    if (!classId) {
      throw new HttpError(403, "HOMEROOM_TEACHER_REQUIRED", "담임교사만 자기 반의 공개 설정을 변경할 수 있습니다.");
    }
    const contentPath = normalizeContentPath(req.body?.path);
    const locked = req.body?.locked === true;
    if (!contentPath || contentPath === "/") {
      throw new HttpError(400, "INVALID_CONTENT_PATH", "올바른 홈 버튼을 선택해 주세요.");
    }
    if (locked) {
      await pool.query(
        `INSERT INTO classroom_content_locks (class_id, content_path, updated_by, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (class_id, content_path) DO UPDATE SET updated_by = EXCLUDED.updated_by, updated_at = NOW()`,
        [classId, contentPath, teacher.id]
      );
    } else {
      await pool.query(
        "DELETE FROM classroom_content_locks WHERE class_id = $1 AND content_path = $2",
        [classId, contentPath]
      );
    }
    res.json({ ok: true, path: contentPath, locked });
  }));

  router.get("/schools", asyncRoute(async (req, res) => {
    requireDatabase();
    const result = await pool.query(
      `SELECT id, name
       FROM classroom_schools
       WHERE enabled = TRUE
       ORDER BY name, id`
    );
    res.json({ schools: result.rows.map((school) => ({ id: String(school.id), name: school.name })) });
  }));

  router.post("/auth/google", asyncRoute(async (req, res) => {
    requireConfigured();
    authFailureLimiter.enforce(req, "google-sign-in");
    const credential = String(req.body?.credential || "");
    if (!credential || credential.length > 10000) {
      authFailureLimiter.recordFailure(req, "google-sign-in");
      throw new HttpError(400, "INVALID_GOOGLE_CREDENTIAL", "Google did not return a valid sign-in credential.");
    }

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: googleClientId });
      payload = ticket.getPayload();
    } catch (_) {
      authFailureLimiter.recordFailure(req, "google-sign-in");
      throw new HttpError(401, "INVALID_GOOGLE_CREDENTIAL", "Google sign-in could not be verified.");
    }

    if (!payload?.sub || !payload.email || payload.email_verified !== true) {
      throw new HttpError(401, "UNVERIFIED_GOOGLE_ACCOUNT", "Use a verified Google account.");
    }
    const email = normalizeEmail(payload.email);
    const isAdmin = adminEmails.has(email);
    let isTeacher = teacherEmails.has(email);

    if (!isTeacher) {
      const dbTeacherCheck = await pool.query(
        "SELECT id FROM classroom_teachers WHERE LOWER(google_email) = $1",
        [email]
      );
      if (dbTeacherCheck.rowCount > 0) {
        isTeacher = true;
      }
    }

    if (!payload.hd && !isAdmin) {
      throw new HttpError(403, "SCHOOL_ACCOUNT_REQUIRED", "Use the Google Workspace account issued by your school.");
    }
    const userResult = await pool.query(
      `INSERT INTO classroom_users
        (google_sub, email, display_name, picture_url, google_domain, role)
       VALUES ($1, $2, $3, $4, $5,
         CASE WHEN $6 THEN 'admin' WHEN $7 THEN 'teacher' ELSE NULL END)
       ON CONFLICT (google_sub) DO UPDATE SET
         email = EXCLUDED.email,
         display_name = EXCLUDED.display_name,
         picture_url = EXCLUDED.picture_url,
         google_domain = EXCLUDED.google_domain,
         role = CASE
           WHEN $6 THEN 'admin'
           WHEN classroom_users.role = 'admin' THEN 'admin'
           WHEN $7 THEN 'teacher'
           ELSE classroom_users.role
         END,
         updated_at = NOW()
       RETURNING *`,
      [
        payload.sub,
        email,
        String(payload.name || email).trim().slice(0, 100),
        payload.picture ? String(payload.picture).slice(0, 500) : null,
        String(payload.hd || email.split("@")[1] || "personal").trim().toLowerCase(),
        isAdmin,
        isTeacher
      ]
    );
    const user = userResult.rows[0];

    if (isTeacher) {
      await pool.query(
        "UPDATE classroom_teachers SET user_id = $1, updated_at = NOW() WHERE LOWER(google_email) = $2",
        [user.id, email]
      );
    }

    const sessionToken = crypto.randomBytes(32).toString("base64url");
    await pool.query(
      `INSERT INTO classroom_sessions (token_hash, user_id, expires_at)
       VALUES ($1, $2, NOW() + ($3 * INTERVAL '1 second'))`,
      [hashSessionToken(sessionToken), user.id, SESSION_MAX_AGE_SECONDS]
    );
    setSessionCookie(res, sessionToken);
    const membership = user.role === "student" ? await studentMembership(user.id) : null;
    return res.json({ ok: true, user: publicUser(user), membership });
  }));

  router.post("/auth/logout", asyncRoute(async (req, res) => {
    const token = readCookie(req, SESSION_COOKIE);
    if (pool && databaseReady && token) {
      await pool.query("DELETE FROM classroom_sessions WHERE token_hash = $1", [hashSessionToken(token)]);
    }
    clearSessionCookie(res);
    res.json({ ok: true });
  }));

  router.get("/admin/site-access", asyncRoute(async (req, res) => {
    const admin = await requireAdmin(req);
    const mode = await getSiteAccessMode();
    res.json({ mode, user: publicUser(admin) });
  }));

  router.put("/admin/site-access", asyncRoute(async (req, res) => {
    const admin = await requireAdmin(req);
    const mode = String(req.body?.mode || "").trim().toLowerCase();
    if (!["open", "restricted"].includes(mode)) {
      throw new HttpError(400, "INVALID_ACCESS_MODE", "Choose open or restricted access.");
    }
    await pool.query(
      `INSERT INTO classroom_settings (setting_key, setting_value, updated_by, updated_at)
       VALUES ('site_access_mode', $1, $2, NOW())
       ON CONFLICT (setting_key) DO UPDATE SET
         setting_value = EXCLUDED.setting_value,
         updated_by = EXCLUDED.updated_by,
         updated_at = NOW()`,
      [mode, admin.id]
    );
    res.json({ ok: true, mode });
  }));

  router.get("/school/search", asyncRoute(async (req, res) => {
    const query = String(req.query?.query || "").trim();
    if (!query) return res.json({ schools: [] });
    const keyParam = process.env.NEIS_API_KEY ? `&KEY=${process.env.NEIS_API_KEY}` : "";
    const neisUrl = `https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=20${keyParam}&SCHUL_NM=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(neisUrl);
      const data = await response.json();
      const rows = data?.schoolInfo?.[1]?.row || [];
      const schools = rows.map((r) => ({
        name: r.SCHUL_NM,
        officeCode: r.ATPT_OFCDC_SC_CODE,
        schoolCode: r.SD_SCHUL_CODE,
        locationName: r.LCTN_SC_NM || r.ATPT_OFCDC_SC_NM || "",
        address: r.ORG_RDNMA || ""
      }));
      res.json({ schools });
    } catch (err) {
      res.json({ schools: [] });
    }
  }));

  router.get("/school/meal", asyncRoute(async (req, res) => {
    const { officeCode, schoolCode, date } = req.query;
    if (!officeCode || !schoolCode) {
      throw new HttpError(400, "MISSING_PARAMS", "officeCode and schoolCode are required.");
    }
    const targetDate = String(date || "").replace(/\D/g, "") || new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const keyParam = process.env.NEIS_API_KEY ? `&KEY=${process.env.NEIS_API_KEY}` : "";
    const neisUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json${keyParam}&ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${targetDate}`;
    try {
      const response = await fetch(neisUrl);
      const data = await response.json();
      const rows = data?.mealServiceDietInfo?.[1]?.row || [];
      const meals = rows.map((r) => {
        const rawDish = r.DDISH_NM || "";
        // Clean allergy tags like (1.2.5.6) or 1.2.5.6.
        const cleanedDish = rawDish
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/\([0-9\.]+\)/g, "")
          .replace(/[0-9]+\./g, "")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        return {
          mealType: r.MMEAL_SC_NM || "점심",
          date: r.MLSV_YMD,
          dishes: cleanedDish,
          calories: r.CAL_INFO || "",
          nutrition: r.NTR_INFO || ""
        };
      });
      res.json({ date: targetDate, meals });
    } catch (err) {
      res.json({ date: targetDate, meals: [] });
    }
  }));

  router.get("/admin/schools", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const schoolsResult = await pool.query(
      `SELECT id, name, google_domain, office_code, school_code, location_name, enabled
       FROM classroom_schools
       ORDER BY name, id`
    );
    const teachersResult = await pool.query(
      `SELECT t.id, t.school_id, t.teacher_name, t.google_email, t.active, t.teacher_type,
              t.user_id IS NOT NULL AS linked,
              t.academic_year AS assigned_academic_year,
              t.grade AS assigned_grade,
              t.class_number AS assigned_class_number,
              c.id AS saved_class_id,
              COUNT(s.id)::INTEGER AS student_count
       FROM classroom_teachers t
       LEFT JOIN classroom_classes c ON c.teacher_user_id = t.user_id
       LEFT JOIN classroom_students s ON s.class_id = c.id
       GROUP BY t.id, c.id
       ORDER BY t.teacher_name, t.id`
    );
    const teachersBySchool = new Map();
    for (const teacher of teachersResult.rows) {
      const schoolId = String(teacher.school_id);
      if (!teachersBySchool.has(schoolId)) teachersBySchool.set(schoolId, []);
      teachersBySchool.get(schoolId).push({
        id: String(teacher.id),
        name: teacher.teacher_name,
        email: teacher.google_email || "",
        type: teacher.teacher_type || "homeroom",
        active: teacher.active,
        linked: teacher.linked,
        classroom: teacher.assigned_academic_year ? {
          academicYear: teacher.assigned_academic_year,
          grade: teacher.assigned_grade,
          classNumber: teacher.assigned_class_number,
          studentCount: teacher.student_count,
          rosterSaved: Boolean(teacher.saved_class_id)
        } : null
      });
    }
    res.json({
      schools: schoolsResult.rows.map((school) => ({
        id: String(school.id),
        name: school.name,
        domain: school.google_domain || "",
        officeCode: school.office_code || "",
        schoolCode: school.school_code || "",
        locationName: school.location_name || "",
        enabled: school.enabled,
        teachers: teachersBySchool.get(String(school.id)) || []
      }))
    });
  }));

  router.post("/admin/schools", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const name = String(req.body?.name || "").trim();
    const officeCode = String(req.body?.officeCode || "").trim();
    const schoolCode = String(req.body?.schoolCode || "").trim();
    const locationName = String(req.body?.locationName || "").trim();

    if (!name || name.length > 80) {
      throw new HttpError(400, "INVALID_SCHOOL", "Enter a school name.");
    }
    const existing = await pool.query(
      `UPDATE classroom_schools
       SET enabled = TRUE,
           office_code = COALESCE(NULLIF($2, ''), office_code),
           school_code = COALESCE(NULLIF($3, ''), school_code),
           location_name = COALESCE(NULLIF($4, ''), location_name),
           updated_at = NOW()
       WHERE id = (SELECT id FROM classroom_schools WHERE name = $1 ORDER BY id LIMIT 1)
       RETURNING id, name, office_code, school_code, location_name, enabled`,
      [name, officeCode, schoolCode, locationName]
    );
    const result = existing.rows[0] ? existing : await pool.query(
      `INSERT INTO classroom_schools (name, google_domain, office_code, school_code, location_name, enabled)
       VALUES ($1, '', $2, $3, $4, TRUE)
       RETURNING id, name, office_code, school_code, location_name, enabled`,
      [name, officeCode, schoolCode, locationName]
    );
    const row = result.rows[0];
    res.json({
      ok: true,
      school: {
        id: String(row.id),
        name: row.name,
        officeCode: row.office_code || "",
        schoolCode: row.school_code || "",
        locationName: row.location_name || "",
        enabled: row.enabled
      }
    });
  }));

  router.patch("/admin/schools/:schoolId", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const schoolId = Number(req.params.schoolId);
    const name = String(req.body?.name || "").trim();
    const enabled = req.body?.enabled;
    const officeCode = String(req.body?.officeCode || "").trim();
    const schoolCode = String(req.body?.schoolCode || "").trim();
    const locationName = String(req.body?.locationName || "").trim();

    if (!Number.isInteger(schoolId) || schoolId < 1 || !name || name.length > 80 || typeof enabled !== "boolean") {
      throw new HttpError(400, "INVALID_SCHOOL", "Check the school name and access setting.");
    }
    const result = await pool.query(
      `UPDATE classroom_schools
       SET name = $1,
           enabled = $2,
           office_code = $3,
           school_code = $4,
           location_name = $5,
           updated_at = NOW()
       WHERE id = $6
       RETURNING id`,
      [name, enabled, officeCode, schoolCode, locationName, schoolId]
    );
    if (!result.rows[0]) throw new HttpError(404, "SCHOOL_NOT_FOUND", "School not found.");
    res.json({ ok: true });
  }));

  router.put("/admin/schools/:schoolId/teachers/roster", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const schoolId = Number(req.params.schoolId);
    const teachers = Array.isArray(req.body?.teachers) ? req.body.teachers : [];

    if (!Number.isInteger(schoolId) || schoolId < 1) {
      throw new HttpError(400, "INVALID_SCHOOL", "Check the school ID.");
    }
    if (teachers.length > 200) {
      throw new HttpError(400, "ROSTER_TOO_LARGE", "The roster must not exceed 200 teachers.");
    }

    const currentYear = new Date().getFullYear();
    const cleanTeachers = teachers.map((teacher) => {
      const type = String(teacher?.type || "homeroom").trim();
      return {
        type,
        academicYear: type === "homeroom" ? Number(teacher?.academicYear) : null,
        grade: type === "homeroom" ? Number(teacher?.grade) : null,
        classNumber: type === "homeroom" ? Number(teacher?.classNumber) : null,
        name: String(teacher?.name || "").normalize("NFC").trim(),
        email: normalizeEmail(teacher?.email)
      };
    }).filter(t => t.name || t.email);

    for (const t of cleanTeachers) {
      if (t.type !== "homeroom" && t.type !== "subject") {
        throw new HttpError(400, "INVALID_TEACHER_TYPE", "Teacher type must be homeroom or subject.");
      }
      if (t.type === "homeroom") {
        if (![currentYear - 1, currentYear, currentYear + 1].includes(t.academicYear)) {
          throw new HttpError(400, "INVALID_ACADEMIC_YEAR", "Check the school year.");
        }
        if (!Number.isInteger(t.grade) || t.grade < 1 || t.grade > 12) {
          throw new HttpError(400, "INVALID_GRADE", "Grade must be between 1 and 12.");
        }
        if (!Number.isInteger(t.classNumber) || t.classNumber < 1 || t.classNumber > 30) {
          throw new HttpError(400, "INVALID_CLASS_NUMBER", "Class number must be between 1 and 30.");
        }
      }
      if (!t.name || t.name.length > 30) {
        throw new HttpError(400, "INVALID_TEACHER_NAME", "Check teacher names.");
      }
      if (!t.email || !t.email.includes("@")) {
        throw new HttpError(400, "INVALID_TEACHER_EMAIL", `Check teacher email for ${t.name}.`);
      }
    }

    const emails = cleanTeachers.map(t => t.email);
    if (new Set(emails).size !== emails.length) {
      throw new HttpError(400, "DUPLICATE_EMAIL", "Teacher emails must be unique within the roster.");
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const schoolCheck = await client.query("SELECT 1 FROM classroom_schools WHERE id = $1", [schoolId]);
      if (schoolCheck.rowCount === 0) {
        throw new HttpError(404, "SCHOOL_NOT_FOUND", "School not found.");
      }

      for (const t of cleanTeachers) {
        await client.query(
          `INSERT INTO classroom_teachers
             (school_id, teacher_name, password_hash, academic_year, grade, class_number, teacher_type, google_email)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (lower(google_email)) WHERE google_email IS NOT NULL
           DO UPDATE SET
             school_id = EXCLUDED.school_id,
             teacher_name = EXCLUDED.teacher_name,
             academic_year = EXCLUDED.academic_year,
             grade = EXCLUDED.grade,
             class_number = EXCLUDED.class_number,
             teacher_type = EXCLUDED.teacher_type,
             updated_at = NOW()`,
          [
            schoolId, t.name, hashStudentPassword("123456"),
            t.academicYear, t.grade, t.classNumber, t.type, t.email
          ]
        );
      }

      if (emails.length > 0) {
        await client.query(
          `DELETE FROM classroom_teachers 
           WHERE school_id = $1 AND (google_email IS NULL OR NOT (LOWER(google_email) = ANY($2::TEXT[])))`,
          [schoolId, emails]
        );
      } else {
        await client.query("DELETE FROM classroom_teachers WHERE school_id = $1", [schoolId]);
      }
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
    res.json({ ok: true });
  }));

  router.post("/admin/schools/:schoolId/teachers", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const schoolId = Number(req.params.schoolId);
    const teacherName = String(req.body?.name || "").normalize("NFC").trim();
    const password = String(req.body?.password || DEFAULT_TEACHER_PASSWORD).trim();
    const teacherType = String(req.body?.teacherType || "homeroom").trim();
    const subjectName = String(req.body?.subjectName || "").trim();
    const roomName = String(req.body?.roomName || "").trim();

    const academicYear = Number(req.body?.academicYear);
    const grade = Number(req.body?.grade);
    const classNumber = Number(req.body?.classNumber);
    const currentYear = new Date().getFullYear();

    if (!Number.isInteger(schoolId) || schoolId < 1 || !teacherName || teacherName.length > 30) {
      throw new HttpError(400, "INVALID_TEACHER", "Check the teacher name.");
    }
    if (teacherType === "homeroom") {
      if (
        ![currentYear - 1, currentYear, currentYear + 1].includes(academicYear) ||
        !Number.isInteger(grade) || grade < 1 || grade > 12 ||
        !Number.isInteger(classNumber) || classNumber < 1 || classNumber > 30
      ) {
        throw new HttpError(400, "INVALID_TEACHER", "Check the school year, grade, and class.");
      }
    }
    if (!STUDENT_PASSWORD_PATTERN.test(password)) {
      throw new HttpError(400, "INVALID_TEACHER_PASSWORD", "Teacher passwords must contain exactly 6 digits.");
    }
    let result;
    try {
      result = await pool.query(
      `INSERT INTO classroom_teachers
        (school_id, teacher_name, password_hash, academic_year, grade, class_number, teacher_type, subject_name, room_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        schoolId, teacherName, hashStudentPassword(password),
        teacherType === "homeroom" ? academicYear : null,
        teacherType === "homeroom" ? grade : null,
        teacherType === "homeroom" ? classNumber : null,
        teacherType, subjectName, roomName
      ]
      );
    } catch (error) {
      if (error.code === "23505") {
        if (error.constraint === "classroom_teachers_school_id_teacher_name_key") {
          throw new HttpError(409, "TEACHER_ALREADY_EXISTS", "That teacher is already registered. Edit the existing row instead.");
        }
        throw new HttpError(409, "CLASS_ALREADY_ASSIGNED", "That school year, grade, and class already have a homeroom teacher.");
      }
      throw error;
    }
    res.json({ ok: true, teacherId: String(result.rows[0].id) });
  }));

  router.patch("/admin/teachers/:teacherId", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const teacherId = Number(req.params.teacherId);
    const teacherName = String(req.body?.name || "").normalize("NFC").trim();
    const password = String(req.body?.password || "").trim();
    const active = req.body?.active;
    const academicYear = Number(req.body?.academicYear);
    const grade = Number(req.body?.grade);
    const classNumber = Number(req.body?.classNumber);
    const currentYear = new Date().getFullYear();
    if (
      !Number.isInteger(teacherId) || teacherId < 1 ||
      !teacherName || teacherName.length > 30 || typeof active !== "boolean" ||
      ![currentYear - 1, currentYear, currentYear + 1].includes(academicYear) ||
      !Number.isInteger(grade) || grade < 1 || grade > 12 ||
      !Number.isInteger(classNumber) || classNumber < 1 || classNumber > 30
    ) {
      throw new HttpError(400, "INVALID_TEACHER", "Check the teacher information.");
    }
    if (password && !STUDENT_PASSWORD_PATTERN.test(password)) {
      throw new HttpError(400, "INVALID_TEACHER_PASSWORD", "Teacher passwords must contain exactly 6 digits.");
    }
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        `UPDATE classroom_teachers
         SET teacher_name = $1,
             password_hash = CASE WHEN $2 = '' THEN password_hash ELSE $3 END,
             active = $4,
             academic_year = $5,
             grade = $6,
             class_number = $7,
             updated_at = NOW()
         WHERE id = $8
         RETURNING id, user_id`,
        [teacherName, password, password ? hashStudentPassword(password) : null, active,
          academicYear, grade, classNumber, teacherId]
      );
      const updated = result.rows[0];
      if (!updated) throw new HttpError(404, "TEACHER_NOT_FOUND", "Teacher not found.");
      if (updated.user_id) {
        await client.query(
          `UPDATE classroom_classes
           SET academic_year = $1, grade = $2, class_number = $3,
               teacher_name = $4, updated_at = NOW()
           WHERE teacher_user_id = $5`,
          [academicYear, grade, classNumber, teacherName, updated.user_id]
        );
      }
      await client.query("COMMIT");
      res.json({ ok: true });
    } catch (error) {
      await client.query("ROLLBACK");
      if (error.code === "23505") {
        throw new HttpError(409, "CLASS_ALREADY_ASSIGNED", "That school year, grade, and class already have a homeroom teacher.");
      }
      throw error;
    } finally {
      client.release();
    }
  }));

  router.delete("/admin/teachers/:teacherId", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const teacherId = Number(req.params.teacherId);
    if (!Number.isInteger(teacherId) || teacherId < 1) {
      throw new HttpError(400, "INVALID_TEACHER", "Teacher not found.");
    }
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        "SELECT user_id FROM classroom_teachers WHERE id = $1 FOR UPDATE",
        [teacherId]
      );
      const teacher = result.rows[0];
      if (!teacher) throw new HttpError(404, "TEACHER_NOT_FOUND", "Teacher not found.");
      if (teacher.user_id) {
        await client.query("DELETE FROM classroom_classes WHERE teacher_user_id = $1", [teacher.user_id]);
        await client.query(
          "UPDATE classroom_users SET role = NULL, updated_at = NOW() WHERE id = $1 AND role = 'teacher'",
          [teacher.user_id]
        );
      }
      await client.query("DELETE FROM classroom_teachers WHERE id = $1", [teacherId]);
      await client.query("COMMIT");
      res.json({ ok: true });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }));

  router.post("/admin/teachers/:teacherId/unlink", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const teacherId = Number(req.params.teacherId);
    if (!Number.isInteger(teacherId) || teacherId < 1) {
      throw new HttpError(400, "INVALID_TEACHER", "Teacher not found.");
    }
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query("SELECT user_id FROM classroom_teachers WHERE id = $1 FOR UPDATE", [teacherId]);
      const teacher = result.rows[0];
      if (!teacher) throw new HttpError(404, "TEACHER_NOT_FOUND", "Teacher not found.");
      if (teacher.user_id) {
        await client.query("UPDATE classroom_users SET role = NULL, updated_at = NOW() WHERE id = $1 AND role = 'teacher'", [teacher.user_id]);
        await client.query("UPDATE classroom_teachers SET user_id = NULL, google_email = NULL, updated_at = NOW() WHERE id = $1", [teacherId]);
      }
      await client.query("COMMIT");
      res.json({ ok: true });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }));

  router.delete("/admin/schools/:schoolId", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const schoolId = Number(req.params.schoolId);
    if (!Number.isInteger(schoolId) || schoolId < 1) {
      throw new HttpError(400, "INVALID_SCHOOL", "School not found.");
    }
    const usage = await pool.query(
      `SELECT
         (SELECT COUNT(*) FROM classroom_teachers WHERE school_id = $1)::INTEGER AS teacher_count,
         (SELECT COUNT(*) FROM classroom_classes WHERE school_id = $1)::INTEGER AS class_count`,
      [schoolId]
    );
    if (usage.rows[0].teacher_count > 0 || usage.rows[0].class_count > 0) {
      throw new HttpError(409, "SCHOOL_IN_USE", "Delete this school's teachers and classes first.");
    }
    const result = await pool.query("DELETE FROM classroom_schools WHERE id = $1 RETURNING id", [schoolId]);
    if (!result.rows[0]) throw new HttpError(404, "SCHOOL_NOT_FOUND", "School not found.");
    res.json({ ok: true });
  }));

  router.get("/teacher/profile", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    if (user.role === "admin" || user.role === "student") {
      throw new HttpError(403, "TEACHER_REQUIRED", "This page is for teachers only.");
    }
    const result = await pool.query(
      `SELECT t.id, t.teacher_name, t.active, t.academic_year, t.grade, t.class_number,
              sc.enabled AS school_enabled,
              sc.id AS school_id, sc.name AS school_name
       FROM classroom_teachers t
       JOIN classroom_schools sc ON sc.id = t.school_id
       WHERE t.user_id = $1`,
      [user.id]
    );
    const profile = result.rows[0];
    res.json({
      registered: Boolean(profile?.active && profile?.school_enabled),
      profile: profile ? {
        id: String(profile.id),
        name: profile.teacher_name,
        schoolId: String(profile.school_id),
        schoolName: profile.school_name,
        academicYear: profile.academic_year,
        grade: profile.grade,
        classNumber: profile.class_number,
        active: profile.active
      } : null
    });
  }));

  router.get("/class/schedules", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    const classId = await readableScheduleClassId(user, req.query.classId);
    if (!classId) throw new HttpError(403, "CLASS_ACCESS_REQUIRED", "No classroom schedule is available for this account.");
    const result = await pool.query(
      `SELECT id, event_date::TEXT AS event_date, title, details
       FROM classroom_schedules
       WHERE class_id = $1
         AND event_date >= CURRENT_DATE - 31
         AND event_date < CURRENT_DATE + 370
       ORDER BY event_date, id`,
      [classId]
    );
    const birthdaysResult = await pool.query(
      `SELECT id, roster_name, birthday_mmdd
       FROM classroom_students
       WHERE class_id = $1 AND birthday_visible = TRUE AND birthday_mmdd IS NOT NULL`,
      [classId]
    );
    const savedSchedules = result.rows.map((row) => ({
      id: String(row.id), date: row.event_date, title: row.title, details: row.details || "", type: "schedule"
    }));
    const schedules = [...savedSchedules, ...birthdayScheduleRows(birthdaysResult.rows)]
      .sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
    res.json({
      classId,
      canEdit: user.role === "teacher" && String(await writableScheduleClassId(user, classId)) === String(classId),
      schedules
    });
  }));

  router.post("/teacher/schedules", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const classId = await writableScheduleClassId(teacher, req.body?.classId);
    if (!classId) throw new HttpError(403, "CLASS_WRITE_REQUIRED", "Only the homeroom teacher can add this class schedule.");
    const date = String(req.body?.date || "").trim();
    const title = String(req.body?.title || "").normalize("NFC").trim();
    const details = String(req.body?.details || "").normalize("NFC").trim();
    const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00Z`) : null;
    if (
      !parsedDate || Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date
    ) {
      throw new HttpError(400, "INVALID_SCHEDULE_DATE", "Choose a valid schedule date.");
    }
    if (!title || title.length > 60) {
      throw new HttpError(400, "INVALID_SCHEDULE_TITLE", "Schedule titles must contain 1 to 60 characters.");
    }
    if (details.length > 160) {
      throw new HttpError(400, "INVALID_SCHEDULE_DETAILS", "Schedule details must contain 160 characters or fewer.");
    }
    const result = await pool.query(
      `INSERT INTO classroom_schedules (class_id, event_date, title, details, created_by)
       VALUES ($1, $2::DATE, $3, $4, $5)
       ON CONFLICT (class_id, event_date, title) DO UPDATE
       SET details = EXCLUDED.details, updated_at = NOW()
       RETURNING id, event_date::TEXT AS event_date, title, details`,
      [classId, date, title, details, teacher.id]
    );
    const row = result.rows[0];
    res.status(201).json({ schedule: { id: String(row.id), date: row.event_date, title: row.title, details: row.details || "" } });
  }));

  router.patch("/teacher/schedules/:scheduleId", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const scheduleId = Number(req.params.scheduleId);
    const date = String(req.body?.date || "").trim();
    const title = String(req.body?.title || "").normalize("NFC").trim();
    const details = String(req.body?.details || "").normalize("NFC").trim();
    const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00Z`) : null;
    if (!Number.isInteger(scheduleId) || scheduleId < 1) {
      throw new HttpError(400, "INVALID_SCHEDULE", "Schedule not found.");
    }
    if (!parsedDate || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
      throw new HttpError(400, "INVALID_SCHEDULE_DATE", "Choose a valid schedule date.");
    }
    if (!title || title.length > 60) {
      throw new HttpError(400, "INVALID_SCHEDULE_TITLE", "Schedule titles must contain 1 to 60 characters.");
    }
    if (details.length > 160) {
      throw new HttpError(400, "INVALID_SCHEDULE_DETAILS", "Schedule details must contain 160 characters or fewer.");
    }
    const result = await pool.query(
      `UPDATE classroom_schedules s
       SET event_date = $2::DATE, title = $3, details = $4, updated_at = NOW()
       FROM classroom_classes c
       WHERE s.id = $1 AND c.id = s.class_id AND c.teacher_user_id = $5
       RETURNING s.id, s.event_date::TEXT AS event_date, s.title, s.details`,
      [scheduleId, date, title, details, teacher.id]
    );
    if (!result.rows[0]) throw new HttpError(404, "SCHEDULE_NOT_FOUND", "Schedule not found.");
    const row = result.rows[0];
    res.json({ schedule: { id: String(row.id), date: row.event_date, title: row.title, details: row.details || "", type: "schedule" } });
  }));

  router.delete("/teacher/schedules/:scheduleId", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const scheduleId = Number(req.params.scheduleId);
    if (!Number.isInteger(scheduleId) || scheduleId < 1) {
      throw new HttpError(400, "INVALID_SCHEDULE", "Schedule not found.");
    }
    const result = await pool.query(
      `DELETE FROM classroom_schedules s
       USING classroom_classes c
       WHERE s.id = $1 AND c.id = s.class_id AND c.teacher_user_id = $2
       RETURNING s.id`,
      [scheduleId, teacher.id]
    );
    if (!result.rows[0]) throw new HttpError(404, "SCHEDULE_NOT_FOUND", "Schedule not found.");
    res.json({ ok: true });
  }));

  router.post("/teacher/claim", asyncRoute(async (req, res) => {
    const accessMode = await getSiteAccessMode();
    let user = await sessionUser(req);
    if (accessMode === "restricted" && !user) {
      throw new HttpError(401, "AUTH_REQUIRED", "Please sign in with Google.");
    }
    if (user && (user.role === "admin" || user.role === "student")) {
      throw new HttpError(403, "TEACHER_REQUIRED", "This account cannot claim a teacher profile.");
    }
    const schoolId = Number(req.body?.schoolId);
    const reqGrade = Number(req.body?.grade) || 0;
    const reqClassNumber = Number(req.body?.classNumber) || 0;
    const teacherName = String(req.body?.name || "").normalize("NFC").trim();
    const password = String(req.body?.password || "").trim();
    const failureIdentity = `${schoolId}:${normalizePersonName(teacherName)}`;
    authFailureLimiter.enforce(req, "teacher-claim", failureIdentity);
    if (!Number.isInteger(schoolId) || schoolId < 1 || !teacherName || !STUDENT_PASSWORD_PATTERN.test(password)) {
      authFailureLimiter.recordFailure(req, "teacher-claim", failureIdentity);
      throw new HttpError(400, "INVALID_TEACHER_DETAILS", "Check the school, teacher name, and 6-digit password.");
    }
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        `SELECT t.*, sc.enabled, sc.google_domain
         FROM classroom_teachers t
         JOIN classroom_schools sc ON sc.id = t.school_id
         WHERE t.school_id = $1 AND t.teacher_name = $2
         FOR UPDATE`,
        [schoolId, teacherName]
      );
      const teacher = result.rows[0];
      if (
        !teacher || !teacher.active || !teacher.enabled ||
        !verifyStudentPassword(password, teacher.password_hash)
      ) {
        authFailureLimiter.recordFailure(req, "teacher-claim", failureIdentity);
        throw new HttpError(403, "INVALID_TEACHER_DETAILS", "Check the school, teacher name, and 6-digit password.");
      }
      authFailureLimiter.recordSuccess(req, "teacher-claim", failureIdentity);

      const academicYear = teacher.academic_year || 2026;
      const grade = teacher.grade || reqGrade || 6;
      const classNumber = teacher.class_number || reqClassNumber || 1;

      if (!user) {
        if (teacher.user_id) {
          const uRes = await client.query("SELECT * FROM classroom_users WHERE id = $1", [teacher.user_id]);
          user = uRes.rows[0];
        }
        if (!user) {
          const userRes = await client.query(
            `INSERT INTO classroom_users (google_sub, email, display_name, google_domain, role)
             VALUES ($1, $2, $3, $4, 'teacher')
             RETURNING *`,
            [
              `open-teacher-${teacher.id}-${Date.now()}`,
              `teacher-${teacher.id}@${teacher.google_domain || 'class.local'}`,
              teacher.teacher_name,
              teacher.google_domain || 'class.local'
            ]
          );
          user = userRes.rows[0];
        }
      }

      if (teacher.user_id && String(teacher.user_id) !== String(user.id)) {
        if (accessMode === "restricted") {
          throw new HttpError(409, "TEACHER_ALREADY_LINKED", "This teacher profile is already linked to another Google account.");
        }
      }
      if (accessMode === "restricted" && teacher.google_domain && teacher.google_domain !== user.google_domain) {
        throw new HttpError(403, "SCHOOL_ACCOUNT_MISMATCH", "Use the Google account issued by this school.");
      }

      if (user.google_domain && user.google_domain !== 'class.local') {
        await client.query(
          `UPDATE classroom_schools
           SET google_domain = CASE WHEN google_domain = '' THEN $1 ELSE google_domain END
           WHERE id = $2`,
          [user.google_domain, schoolId]
        );
      }
      await client.query(
        `UPDATE classroom_teachers
         SET user_id = $1, google_email = $2, academic_year = $3, grade = $4, class_number = $5, updated_at = NOW()
         WHERE id = $6`,
        [user.id, user.email, academicYear, grade, classNumber, teacher.id]
      );
      await client.query(
        `DELETE FROM classroom_classes WHERE teacher_user_id = $1`,
        [user.id]
      );
      let classCandidate;
      for (let attempt = 0; attempt < 8; attempt += 1) {
        classCandidate = makeJoinCode();
        const collision = await client.query(
          "SELECT 1 FROM classroom_classes WHERE join_code = $1",
          [classCandidate]
        );
        if (collision.rowCount === 0) break;
      }
      await client.query(
        `INSERT INTO classroom_classes (school_id, teacher_user_id, academic_year, grade, class_number, teacher_name, join_code)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (school_id, academic_year, grade, class_number)
         DO UPDATE SET teacher_user_id = EXCLUDED.teacher_user_id, teacher_name = EXCLUDED.teacher_name, updated_at = NOW()`,
        [schoolId, user.id, academicYear, grade, classNumber, teacher.teacher_name, classCandidate]
      );
      await client.query("UPDATE classroom_users SET role = 'teacher', updated_at = NOW() WHERE id = $1", [user.id]);
      await client.query("COMMIT");
      setSessionCookie(res, user.id);
      res.json({ ok: true });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }));

  router.get("/teacher/available-classes", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const teacherResult = await pool.query(
      `SELECT school_id, teacher_type, subject_name, room_name FROM classroom_teachers WHERE user_id = $1`,
      [teacher.id]
    );
    const teacherInfo = teacherResult.rows[0];
    if (!teacherInfo) return res.json({ classes: [] });

    const classesResult = await pool.query(
      `SELECT c.id, c.academic_year, c.grade, c.class_number, c.teacher_name,
              COUNT(s.id) AS student_count
       FROM classroom_classes c
       LEFT JOIN classroom_students s ON s.class_id = c.id
       WHERE c.school_id = $1
       GROUP BY c.id
       ORDER BY c.grade ASC, c.class_number ASC`,
      [teacherInfo.school_id]
    );
    return res.json({
      teacherType: teacherInfo.teacher_type || 'homeroom',
      subjectName: teacherInfo.subject_name || '',
      roomName: teacherInfo.room_name || '',
      classes: classesResult.rows.map((row) => ({
        id: row.id,
        academicYear: row.academic_year,
        grade: row.grade,
        classNumber: row.class_number,
        teacherName: row.teacher_name,
        studentCount: Number(row.student_count || 0)
      }))
    });
  }));

  router.get("/teacher/class", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);

    const teacherInfoResult = await pool.query(
      `SELECT school_id, teacher_type, subject_name, room_name FROM classroom_teachers WHERE user_id = $1`,
      [teacher.id]
    );
    const teacherInfo = teacherInfoResult.rows[0];
    const isSubjectTeacher = teacherInfo?.teacher_type === 'subject';

    let classroom = null;
    const requestedClassId = req.query.classId;

    if (requestedClassId) {
      const classResult = await pool.query(
        `SELECT c.*, sc.name AS school_name, sc.school_code
         FROM classroom_classes c
         JOIN classroom_schools sc ON sc.id = c.school_id
         WHERE c.id = $1 AND c.school_id = $2`,
        [requestedClassId, teacherInfo?.school_id]
      );
      classroom = classResult.rows[0];
    }

    if (!classroom) {
      const classResult = await pool.query(
        `SELECT c.*, sc.name AS school_name, sc.school_code
         FROM classroom_classes c
         JOIN classroom_schools sc ON sc.id = c.school_id
         WHERE c.teacher_user_id = $1
         ORDER BY c.updated_at DESC
         LIMIT 1`,
        [teacher.id]
      );
      classroom = classResult.rows[0];
    }

    if (!classroom && isSubjectTeacher) {
      // Fallback for subject teacher: grab first class in school
      const firstClassResult = await pool.query(
        `SELECT c.*, sc.name AS school_name, sc.school_code
         FROM classroom_classes c
         JOIN classroom_schools sc ON sc.id = c.school_id
         WHERE c.school_id = $1
         ORDER BY c.grade ASC, c.class_number ASC
         LIMIT 1`,
        [teacherInfo.school_id]
      );
      classroom = firstClassResult.rows[0];
    }

    if (!classroom) return res.json({ classroom: null, isReadOnly: isSubjectTeacher });

    const studentsResult = await pool.query(
      `SELECT student_number, roster_name, COALESCE(gender, '남') AS gender,
              birthday_mmdd, birthday_visible,
              avatar_key,
              student_email, guardian1_email, guardian2_email,
              user_id IS NOT NULL AS linked,
              password_hash IS NOT NULL AS password_configured
       FROM classroom_students
       WHERE class_id = $1
       ORDER BY CASE WHEN student_number ~ '^[0-9]+$' THEN student_number::INTEGER END,
                student_number`,
      [classroom.id]
    );

    return res.json({
      classroom: {
        id: classroom.id,
        schoolName: classroom.school_name,
        schoolCode: classroom.school_code,
        academicYear: classroom.academic_year,
        grade: classroom.grade,
        classNumber: classroom.class_number,
        teacherName: classroom.teacher_name,
        teacherType: teacherInfo?.teacher_type || 'homeroom',
        subjectName: teacherInfo?.subject_name || '',
        roomName: teacherInfo?.room_name || '',
        isReadOnly: isSubjectTeacher,
        students: studentsResult.rows.map((student) => ({
          number: student.student_number,
          name: student.roster_name,
          gender: student.gender === '여' ? '여' : '남',
          birthdayMmdd: student.birthday_visible === true ? (student.birthday_mmdd || "") : "",
          birthdayVisible: student.birthday_visible === true,
          avatarKey: normalizeAvatarKey(student.avatar_key),
          avatarUrl: avatarUrl(student.avatar_key),
          studentEmail: student.student_email || "",
          guardian1Email: student.guardian1_email || "",
          guardian2Email: student.guardian2_email || "",
          linked: student.linked,
          passwordConfigured: student.password_configured
        }))
      }
    });
  }));

  router.put("/teacher/class", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);

    const teacherCheck = await pool.query(
      `SELECT teacher_type FROM classroom_teachers WHERE user_id = $1`,
      [teacher.id]
    );
    if (teacherCheck.rows[0]?.teacher_type === 'subject') {
      throw new HttpError(403, "SUBJECT_TEACHER_READONLY", "전담 교사는 학생 명단을 직접 수정할 수 없습니다. 담임 교사가 등록한 명단이 자동 동기화됩니다.");
    }
    const assignmentResult = await pool.query(
      `SELECT t.school_id, t.teacher_name, t.academic_year, t.grade, t.class_number,
              sc.name AS school_name, sc.school_code
       FROM classroom_teachers t
       JOIN classroom_schools sc ON sc.id = t.school_id
       WHERE t.user_id = $1 AND t.active = TRUE AND sc.enabled = TRUE`,
      [teacher.id]
    );
    const assignment = assignmentResult.rows[0];
    if (!assignment) {
      throw new HttpError(403, "TEACHER_REGISTRATION_REQUIRED", "Ask the administrator to register this teacher account.");
    }
    const schoolName = assignment.school_name;
    const schoolCode = assignment.school_code || `SCH${assignment.school_id}`;
    const academicYear = Number(assignment.academic_year);
    const grade = Number(assignment.grade);
    const classNumber = Number(assignment.class_number);
    const teacherName = assignment.teacher_name;
    const students = Array.isArray(req.body?.students) ? req.body.students : [];
    const currentYear = new Date().getFullYear();

    if (![currentYear - 1, currentYear, currentYear + 1].includes(academicYear)) {
      throw new HttpError(400, "INVALID_ACADEMIC_YEAR", "Choose one of the three available school years.");
    }
    if (!Number.isInteger(grade) || grade < 1 || grade > 12) {
      throw new HttpError(400, "INVALID_GRADE", "Grade must be between 1 and 12.");
    }
    if (!Number.isInteger(classNumber) || classNumber < 1 || classNumber > 30) {
      throw new HttpError(400, "INVALID_CLASS_NUMBER", "Class number must be between 1 and 30.");
    }
    if (students.length < 1 || students.length > 60) {
      throw new HttpError(400, "INVALID_ROSTER_SIZE", "The roster must contain 1 to 60 students.");
    }

    const cleanStudents = students.map((student) => {
      const gender = String(student?.gender || "").normalize("NFC").trim();
      return {
        number: String(student?.number || "").trim(),
        name: String(student?.name || "").normalize("NFC").trim(),
        gender
      };
    });
    if (cleanStudents.some((student) => !/^\d{1,3}$/.test(student.number))) {
      throw new HttpError(400, "INVALID_STUDENT_NUMBER", "Student numbers must contain digits only.");
    }
    if (cleanStudents.some((student) => !/^[가-힣]{2,6}$/.test(student.name))) {
      throw new HttpError(400, "INVALID_STUDENT_NAME", "Student names must be 2 to 6 Korean characters.");
    }
    if (cleanStudents.some((student) => !["남", "여"].includes(student.gender))) {
      throw new HttpError(400, "INVALID_STUDENT_GENDER", "Student gender must be either 남 or 여.");
    }
    if (new Set(cleanStudents.map((student) => student.number)).size !== cleanStudents.length) {
      throw new HttpError(400, "DUPLICATE_STUDENT_NUMBER", "Student numbers must be unique.");
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const schoolId = assignment.school_id;
      await client.query(
        `UPDATE classroom_schools
         SET school_code = COALESCE(school_code, $1), updated_at = NOW()
         WHERE id = $2`,
        [schoolCode, schoolId]
      );
      const assignedClassResult = await client.query(
        `SELECT 1
         FROM classroom_classes
         WHERE school_id = $1 AND academic_year = $2 AND grade = $3 AND class_number = $4
           AND teacher_user_id <> $5
         FOR UPDATE`,
        [schoolId, academicYear, grade, classNumber, teacher.id]
      );
      if (assignedClassResult.rowCount > 0) {
        throw new HttpError(409, "CLASS_ALREADY_ASSIGNED", "That school year, grade, and class already have a homeroom teacher.");
      }
      const existingResult = await client.query(
        "SELECT id, join_code FROM classroom_classes WHERE teacher_user_id = $1 FOR UPDATE",
        [teacher.id]
      );

      let classroom;
      if (existingResult.rows[0]) {
        const result = await client.query(
          `UPDATE classroom_classes SET
             school_id = $1,
             academic_year = $2,
             grade = $3,
             class_number = $4,
             teacher_name = $5,
             updated_at = NOW()
           WHERE id = $6
           RETURNING id, join_code`,
          [schoolId, academicYear, grade, classNumber, teacherName, existingResult.rows[0].id]
        );
        classroom = result.rows[0];
      } else {
        let candidate;
        for (let attempt = 0; attempt < 8; attempt += 1) {
          candidate = makeJoinCode();
          const collision = await client.query(
            "SELECT 1 FROM classroom_classes WHERE join_code = $1",
            [candidate]
          );
          if (collision.rowCount === 0) break;
        }
        const result = await client.query(
          `INSERT INTO classroom_classes
            (school_id, teacher_user_id, academic_year, grade, class_number, teacher_name, join_code)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING id, join_code`,
          [schoolId, teacher.id, academicYear, grade, classNumber, teacherName, candidate]
        );
        classroom = result.rows[0];
      }
      await client.query(
        "SELECT pg_advisory_xact_lock(hashtextextended($1, 0))",
        [`avatar:${schoolId}:${academicYear}:${grade}`]
      );


      const numbers = cleanStudents.map((student) => student.number);
      const removedStudentsResult = await client.query(
        `SELECT id, user_id
         FROM classroom_students
         WHERE class_id = $1 AND NOT (student_number = ANY($2::TEXT[]))
         FOR UPDATE`,
        [classroom.id, numbers]
      );
      const removedUserIds = removedStudentsResult.rows
        .map((student) => student.user_id)
        .filter(Boolean);
      if (removedUserIds.length > 0) {
        await client.query(
          "DELETE FROM classroom_sessions WHERE user_id = ANY($1::BIGINT[])",
          [removedUserIds]
        );
        await client.query(
          `UPDATE classroom_users
           SET role = NULL, updated_at = NOW()
           WHERE id = ANY($1::BIGINT[]) AND role = 'student'`,
          [removedUserIds]
        );
      }
      await client.query(
        `DELETE FROM classroom_students
         WHERE class_id = $1 AND NOT (student_number = ANY($2::TEXT[]))`,
        [classroom.id, numbers]
      );
      const existingPasswordsResult = await client.query(
        `SELECT student_number, password_hash, user_id, birthday_mmdd, birthday_visible, avatar_key
         FROM classroom_students
         WHERE class_id = $1 AND student_number = ANY($2::TEXT[])`,
        [classroom.id, numbers]
      );
      const existingPasswords = new Map(
        existingPasswordsResult.rows.map((student) => [student.student_number, {
          passwordHash: student.password_hash,
          claimed: Boolean(student.user_id),
          birthdayMmdd: student.birthday_mmdd,
          birthdayVisible: student.birthday_visible === true,
          avatarKey: student.avatar_key || ""
        }])
      );
      const cohortAvatarResult = await client.query(
        `SELECT s.avatar_key, COUNT(*)::INTEGER AS usage_count,
                SUM(COUNT(*)) OVER()::INTEGER AS student_count
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         WHERE c.school_id = $1 AND c.academic_year = $2 AND c.grade = $3
         GROUP BY s.avatar_key`,
        [schoolId, academicYear, grade]
      );
      const cohortStudentCount = Number(cohortAvatarResult.rows[0]?.student_count || 0);
      const newStudentCount = cleanStudents.length - existingPasswordsResult.rowCount;
      const maximumAvatarUses = avatarCapacity(cohortStudentCount + newStudentCount);
      const avatarUsageCounts = new Map(
        cohortAvatarResult.rows
          .filter((row) => row.avatar_key)
          .map((row) => [row.avatar_key, Number(row.usage_count || 0)])
      );

      for (const student of cleanStudents) {
        const existingPassword = existingPasswords.get(student.number);
        const passwordHash = existingPassword?.passwordHash || hashStudentPassword(DEFAULT_STUDENT_PASSWORD);
        const avatarKey = existingPassword?.avatarKey || pickRandomAvailableAvatar(avatarUsageCounts, maximumAvatarUses);
        if (!existingPassword?.avatarKey) {
          avatarUsageCounts.set(avatarKey, Number(avatarUsageCounts.get(avatarKey) || 0) + 1);
        }

        await client.query(
          `INSERT INTO classroom_students
            (class_id, student_number, roster_name, gender, birthday_mmdd, birthday_visible, birth_date, avatar_key, password_hash, student_email, guardian1_email, guardian2_email)
           VALUES ($1, $2, $3, $4, $5, $6, NULL, $7, $8, $9, $10, $11)
           ON CONFLICT (class_id, student_number) DO UPDATE SET
             roster_name = EXCLUDED.roster_name,
             gender = EXCLUDED.gender,
             birthday_mmdd = EXCLUDED.birthday_mmdd,
             birthday_visible = EXCLUDED.birthday_visible,
             birth_date = NULL,
             avatar_key = COALESCE(classroom_students.avatar_key, EXCLUDED.avatar_key),
             password_hash = EXCLUDED.password_hash,
             student_email = EXCLUDED.student_email,
             guardian1_email = EXCLUDED.guardian1_email,
             guardian2_email = EXCLUDED.guardian2_email,
             updated_at = NOW()`,
          [classroom.id, student.number, student.name, student.gender,
           existingPassword?.birthdayMmdd || null, existingPassword?.birthdayVisible || false, avatarKey, passwordHash,
           student.studentEmail || null, student.guardian1Email || null, student.guardian2Email || null]
        );
      }
      await client.query("COMMIT");
      return res.json({ ok: true, schoolCode, studentCount: cleanStudents.length });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }));

  router.delete("/teacher/class/students/:studentNumber", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const studentNumber = String(req.params.studentNumber || "").trim();
    if (!/^\d{1,3}$/.test(studentNumber)) {
      throw new HttpError(400, "INVALID_STUDENT_NUMBER", "Student numbers must contain digits only.");
    }
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        `SELECT s.id, s.user_id
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         WHERE c.teacher_user_id = $1 AND s.student_number = $2
         FOR UPDATE OF s`,
        [teacher.id, studentNumber]
      );
      const student = result.rows[0];
      if (!student) throw new HttpError(404, "STUDENT_NOT_FOUND", "The student was not found in this class.");
      if (student.user_id) {
        await client.query("DELETE FROM classroom_sessions WHERE user_id = $1", [student.user_id]);
        await client.query(
          `UPDATE classroom_users
           SET role = NULL, updated_at = NOW()
           WHERE id = $1 AND role = 'student'`,
          [student.user_id]
        );
      }
      await client.query("DELETE FROM classroom_students WHERE id = $1", [student.id]);
      await client.query("COMMIT");
      res.json({ ok: true, studentNumber });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }));

  router.post("/teacher/class/students/:studentNumber/reset-:type", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const studentNumber = String(req.params.studentNumber || "").trim();
    const type = req.params.type;
    if (!['student', 'guardian1', 'guardian2'].includes(type)) {
      throw new HttpError(400, "INVALID_TYPE", "Invalid account type.");
    }
    
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        `SELECT s.id, s.user_id, s.student_email, s.guardian1_email, s.guardian2_email
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         WHERE c.teacher_user_id = $1 AND s.student_number = $2
         FOR UPDATE OF s`,
        [teacher.id, studentNumber]
      );
      const student = result.rows[0];
      if (!student) throw new HttpError(404, "STUDENT_NOT_FOUND", "The student was not found in this class.");
      
      if (type === 'student') {
        if (student.user_id) {
          await client.query("DELETE FROM classroom_sessions WHERE user_id = $1", [student.user_id]);
          await client.query(
            `UPDATE classroom_users
             SET role = NULL, updated_at = NOW()
             WHERE id = $1 AND role = 'student'`,
            [student.user_id]
          );
        }
        await client.query(
          `UPDATE classroom_students 
           SET user_id = NULL, password_hash = $1
           WHERE id = $2`, 
          [hashStudentPassword(DEFAULT_STUDENT_PASSWORD), student.id]
        );
      } else {
        // For guardians, we might need to reset their user linking later, 
        // for now just clear the email to 'reset' their state if that's what's needed,
        // or just return ok since they are not fully linked yet.
      }
      
      await client.query("COMMIT");
      res.json({ ok: true, studentNumber });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }));

  router.post("/student/join", asyncRoute(async (req, res) => {
    const accessMode = await getSiteAccessMode();
    let user = await sessionUser(req);

    if (accessMode === "restricted") {
      if (!user) {
        throw new HttpError(401, "AUTH_REQUIRED", "Please sign in with your school Google Workspace account.");
      }
      if (user.role === "teacher") {
        throw new HttpError(403, "STUDENT_REQUIRED", "Teacher accounts cannot join a student roster.");
      }
    } else if (user && user.role === "teacher") {
      throw new HttpError(403, "STUDENT_REQUIRED", "Teacher accounts cannot join a student roster.");
    }

    const schoolId = Number(req.body?.schoolId);
    const grade = Number(req.body?.grade);
    const classNumber = Number(req.body?.classNumber);
    const studentNumber = String(req.body?.studentNumber || "").trim();
    const studentName = String(req.body?.name || "").normalize("NFC").trim();
    const password = String(req.body?.password || "").trim();
    const currentYear = new Date().getFullYear();
    const failureIdentity = `${schoolId}:${grade}:${classNumber}:${studentNumber}`;
    authFailureLimiter.enforce(req, "student-join", failureIdentity);
    if (
      !Number.isInteger(schoolId) || schoolId < 1 ||
      !Number.isInteger(grade) || grade < 1 || grade > 12 ||
      !Number.isInteger(classNumber) || classNumber < 1 || classNumber > 30 ||
      !/^\d{1,3}$/.test(studentNumber) ||
      !/^[가-힣]{2,6}$/.test(studentName) ||
      !STUDENT_PASSWORD_PATTERN.test(password)
    ) {
      authFailureLimiter.recordFailure(req, "student-join", failureIdentity);
      throw new HttpError(400, "INVALID_JOIN_DETAILS", "Check the school, grade, class, number, name, and password.");
    }

    const slotResult = await pool.query(
      `SELECT s.id, s.roster_name, s.user_id, s.password_hash, c.id AS class_id,
              sc.name AS school_name, sc.google_domain,
              c.academic_year, c.grade, c.class_number
       FROM classroom_students s
       JOIN classroom_classes c ON c.id = s.class_id
       JOIN classroom_schools sc ON sc.id = c.school_id
       WHERE sc.id = $1 AND sc.enabled = TRUE
         AND c.academic_year = $2
         AND c.grade = $3
         AND c.class_number = $4
         AND s.student_number = $5`,
      [schoolId, currentYear, grade, classNumber, studentNumber]
    );
    const slot = slotResult.rows[0];
    if (!slot) {
      authFailureLimiter.recordFailure(req, "student-join", failureIdentity);
      throw new HttpError(403, "INVALID_STUDENT_DETAILS", "Check the school, grade, class, number, name, and password.");
    }
    if (!slot.password_hash || !verifyStudentPassword(password, slot.password_hash)) {
      authFailureLimiter.recordFailure(req, "student-join", failureIdentity);
      throw new HttpError(403, "INVALID_STUDENT_DETAILS", "Check the school, grade, class, number, name, and password.");
    }

    if (accessMode === "restricted" && user) {
      if (slot.google_domain !== user.google_domain) {
        authFailureLimiter.recordFailure(req, "student-join", failureIdentity);
        throw new HttpError(403, "INVALID_STUDENT_DETAILS", "Check the school, grade, class, number, name, and password.");
      }
    }

    if (normalizePersonName(slot.roster_name) !== normalizePersonName(studentName)) {
      authFailureLimiter.recordFailure(req, "student-join", failureIdentity);
      throw new HttpError(403, "INVALID_STUDENT_DETAILS", "Check the school, grade, class, number, name, and password.");
    }
    authFailureLimiter.recordSuccess(req, "student-join", failureIdentity);

    if (!user) {
      if (slot.user_id) {
        const uRes = await pool.query("SELECT * FROM classroom_users WHERE id = $1", [slot.user_id]);
        user = uRes.rows[0];
      }
      if (!user) {
        const userRes = await pool.query(
          `INSERT INTO classroom_users (google_sub, email, display_name, google_domain, role)
           VALUES ($1, $2, $3, $4, 'student')
           RETURNING *`,
          [
            `open-student-${slot.id}-${Date.now()}`,
            `student-${slot.id}@${slot.google_domain || 'class.local'}`,
            slot.roster_name,
            slot.google_domain || 'class.local'
          ]
        );
        user = userRes.rows[0];
      }
    }

    if (slot.user_id && String(slot.user_id) !== String(user.id)) {
      if (accessMode === "restricted") {
        throw new HttpError(409, "STUDENT_ALREADY_LINKED", "This student number is already linked to another account.");
      }
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        "UPDATE classroom_students SET user_id = NULL, claimed_at = NULL, updated_at = NOW() WHERE user_id = $1",
        [user.id]
      );
      await client.query(
        "UPDATE classroom_students SET user_id = $1, claimed_at = NOW(), updated_at = NOW() WHERE id = $2",
        [user.id, slot.id]
      );
      await client.query(
        "UPDATE classroom_users SET role = 'student', updated_at = NOW() WHERE id = $1",
        [user.id]
      );
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    const sessionToken = crypto.randomBytes(32).toString("base64url");
    await pool.query(
      `INSERT INTO classroom_sessions (token_hash, user_id, expires_at)
       VALUES ($1, $2, NOW() + ($3 * INTERVAL '1 second'))`,
      [hashSessionToken(sessionToken), user.id, SESSION_MAX_AGE_SECONDS]
    );
    setSessionCookie(res, sessionToken);

    return res.json({
      ok: true,
      membership: {
        studentNumber,
        name: slot.roster_name,
        schoolName: slot.school_name,
        academicYear: slot.academic_year,
        grade: slot.grade,
        classNumber: slot.class_number
      }
    });
  }));

  router.use("/reading", readingBank.router);

  router.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    if (error instanceof HttpError) {
      if (error.retryAfterSeconds) res.setHeader("Retry-After", String(error.retryAfterSeconds));
      return res.status(error.status).json({
        error: error.code,
        message: error.message,
        ...(error.details ? { details: error.details } : {})
      });
    }
    console.error("Classroom API error:", error);
    return res.status(500).json({ error: "INTERNAL_ERROR", message: "The server could not complete the request." });
  });

  return {
    router,
    initialize,
    configuration,
    requireSiteAccess,
    verifyMuseumPresenceTicket,
    listFinisherRecords,
    saveFinisherRecord
  };
}

module.exports = {
  createClassroomPlatform,
  AVATAR_KEYS,
  avatarCapacity,
  avatarChangeWindow,
  normalizeAvatarKey,
  createAuthenticationFailureLimiter,
  hashStudentPassword,
  normalizePersonName,
  parseTeacherEmails,
  verifyStudentPassword
};
