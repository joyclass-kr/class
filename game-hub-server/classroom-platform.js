const crypto = require("crypto");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { OAuth2Client } = require("google-auth-library");
const { Pool } = require("pg");
const { createReadingBank } = require("./reading-bank");
const { createMetacognition } = require("./metacognition");

const SESSION_COOKIE = "class_session";
const GUEST_ACCESS_COOKIE = "class_guest_access";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const JOIN_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
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
  const travelSchoolCoordinateCache = new Map();
  const travelRouteCache = new Map();
  let travelGeocodeQueue = Promise.resolve();
  let travelLastGeocodeAt = 0;

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
      `ALTER TABLE classroom_teachers
        ALTER COLUMN password_hash DROP NOT NULL`,
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
      `CREATE TABLE IF NOT EXISTS multiplayer_room_snapshots (
        room_key TEXT PRIMARY KEY,
        game_id TEXT NOT NULL,
        room_code TEXT NOT NULL,
        snapshot JSONB NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE INDEX IF NOT EXISTS multiplayer_room_snapshots_expiry_idx
        ON multiplayer_room_snapshots (expires_at)`,
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
      // classroom_content_locks used to store the OPT-OUT set (menu items a
      // teacher hid). The menu default flipped to opt-in, so on first boot
      // after the flip we rename the table and drop its rows -- old "hidden"
      // rows would otherwise be misread as the new "visible" set.
      `DO $$
       BEGIN
         IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'classroom_content_locks') THEN
           ALTER TABLE classroom_content_locks RENAME TO classroom_content_enabled;
           DELETE FROM classroom_content_enabled;
         END IF;
       END $$`,
      `CREATE TABLE IF NOT EXISTS classroom_content_enabled (
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
      `CREATE TABLE IF NOT EXISTS classroom_classboard_posts (
        id BIGSERIAL PRIMARY KEY,
        class_id BIGINT NOT NULL REFERENCES classroom_classes(id) ON DELETE CASCADE,
        author_user_id BIGINT NOT NULL REFERENCES classroom_users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS classroom_classboard_comments (
        id BIGSERIAL PRIMARY KEY,
        post_id BIGINT NOT NULL REFERENCES classroom_classboard_posts(id) ON DELETE CASCADE,
        author_user_id BIGINT NOT NULL REFERENCES classroom_users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
        AND EXISTS (SELECT 1 FROM first_login_upgrade)`,

      /* ──────────────────────────────────────────────
         전교생 통합 명단 (school_students)
         classroom_students 와 별개로 school_id 에 직접 귀속.
         기존 class_id 기반 classroom_students 는 하위 호환용으로 유지.
      ────────────────────────────────────────────── */
      `CREATE TABLE IF NOT EXISTS school_students (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        academic_year INTEGER NOT NULL,
        grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 12),
        class_number INTEGER NOT NULL CHECK (class_number BETWEEN 1 AND 30),
        student_number TEXT NOT NULL,
        roster_name TEXT NOT NULL,
        gender TEXT NOT NULL DEFAULT '남' CHECK (gender IN ('남', '여')),
        student_email TEXT,
        guardian1_email TEXT,
        guardian2_email TEXT,
        user_id BIGINT UNIQUE REFERENCES classroom_users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, academic_year, grade, class_number, student_number)
      )`,
      `ALTER TABLE school_students
        ADD COLUMN IF NOT EXISTS custom_fields JSONB NOT NULL DEFAULT '{}'::jsonb`,
      `ALTER TABLE school_students
        ADD COLUMN IF NOT EXISTS avatar_key TEXT`,
      `ALTER TABLE school_students
        ADD COLUMN IF NOT EXISTS avatar_first_changed_year INTEGER`,
      `ALTER TABLE school_students
        ADD COLUMN IF NOT EXISTS avatar_second_changed_year INTEGER`,
      `ALTER TABLE school_students
        ADD COLUMN IF NOT EXISTS birthday_mmdd TEXT`,
      `ALTER TABLE school_students
        ADD COLUMN IF NOT EXISTS birthday_visible BOOLEAN NOT NULL DEFAULT FALSE`,
      `CREATE INDEX IF NOT EXISTS school_students_school_year_idx
        ON school_students (school_id, academic_year, grade, class_number)`,
      `CREATE INDEX IF NOT EXISTS school_students_email_idx
        ON school_students (LOWER(student_email))
        WHERE student_email IS NOT NULL`,
      `CREATE INDEX IF NOT EXISTS school_students_guardian1_idx
        ON school_students (LOWER(guardian1_email))
        WHERE guardian1_email IS NOT NULL`,
      `CREATE INDEX IF NOT EXISTS school_students_guardian2_idx
        ON school_students (LOWER(guardian2_email))
        WHERE guardian2_email IS NOT NULL`,

      /* ──────────────────────────────────────────────
         학교 동아리 목록 (school_clubs)
      ────────────────────────────────────────────── */
      `CREATE TABLE IF NOT EXISTS school_clubs (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        academic_year INTEGER NOT NULL,
        club_name TEXT NOT NULL CHECK (char_length(club_name) BETWEEN 1 AND 60),
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, academic_year, club_name)
      )`,
      `CREATE TABLE IF NOT EXISTS school_student_clubs (
        student_id BIGINT NOT NULL REFERENCES school_students(id) ON DELETE CASCADE,
        club_id BIGINT NOT NULL REFERENCES school_clubs(id) ON DELETE CASCADE,
        PRIMARY KEY (student_id, club_id)
      )`,

      /* ──────────────────────────────────────────────
         학교 방과후 프로그램 목록 (school_afterschool)
      ────────────────────────────────────────────── */
      `CREATE TABLE IF NOT EXISTS school_afterschool (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        academic_year INTEGER NOT NULL,
        program_name TEXT NOT NULL CHECK (char_length(program_name) BETWEEN 1 AND 60),
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, academic_year, program_name)
      )`,
      `CREATE TABLE IF NOT EXISTS school_student_afterschool (
        student_id BIGINT NOT NULL REFERENCES school_students(id) ON DELETE CASCADE,
        program_id BIGINT NOT NULL REFERENCES school_afterschool(id) ON DELETE CASCADE,
        PRIMARY KEY (student_id, program_id)
      )`,

      /* ──────────────────────────────────────────────
         셔틀 슬롯 목록 (school_shuttle_slots)
         예: { slot_name: '월·등교', sort_order: 0 }
      ────────────────────────────────────────────── */
      `CREATE TABLE IF NOT EXISTS school_shuttle_slots (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        slot_name TEXT NOT NULL CHECK (char_length(slot_name) BETWEEN 1 AND 30),
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, slot_name)
      )`,
      `CREATE TABLE IF NOT EXISTS school_student_shuttle (
        student_id BIGINT NOT NULL REFERENCES school_students(id) ON DELETE CASCADE,
        slot_id BIGINT NOT NULL REFERENCES school_shuttle_slots(id) ON DELETE CASCADE,
        shuttle_number TEXT NOT NULL CHECK (char_length(shuttle_number) BETWEEN 1 AND 10),
        PRIMARY KEY (student_id, slot_id)
      )`,

      /* ──────────────────────────────────────────────
         교사가 직접 개설하는 학급/그룹 (teacher_groups)
         담임반, 동아리, 전담과목반, 방과후반 등 자유롭게 개설.
      ────────────────────────────────────────────── */
      `CREATE TABLE IF NOT EXISTS teacher_groups (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        teacher_user_id BIGINT NOT NULL REFERENCES classroom_users(id) ON DELETE CASCADE,
        academic_year INTEGER NOT NULL,
        group_name TEXT NOT NULL CHECK (char_length(group_name) BETWEEN 1 AND 60),
        group_type TEXT NOT NULL DEFAULT 'homeroom',
        grade INTEGER CHECK (grade BETWEEN 1 AND 12),
        class_number INTEGER CHECK (class_number BETWEEN 1 AND 30),
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `ALTER TABLE teacher_groups
        DROP CONSTRAINT IF EXISTS teacher_groups_group_type_check`,
      `ALTER TABLE teacher_groups
        ADD CONSTRAINT teacher_groups_group_type_check
        CHECK (group_type IN ('homeroom', 'subject', 'club', 'afterschool', 'shuttle', 'other'))`,
      `CREATE INDEX IF NOT EXISTS teacher_groups_teacher_idx
        ON teacher_groups (teacher_user_id, academic_year)`,
      `CREATE TABLE IF NOT EXISTS teacher_group_students (
        group_id BIGINT NOT NULL REFERENCES teacher_groups(id) ON DELETE CASCADE,
        student_id BIGINT NOT NULL REFERENCES school_students(id) ON DELETE CASCADE,
        sort_order INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (group_id, student_id)
      )`,
      `CREATE TABLE IF NOT EXISTS school_annual_schedules (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        academic_year INTEGER NOT NULL,
        event_date DATE NOT NULL,
        title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 60),
        category TEXT NOT NULL DEFAULT 'EVENT',
        target_scope TEXT NOT NULL DEFAULT 'ALL' CHECK (target_scope IN ('ALL', 'GRADE', 'CLASS')),
        target_grades INTEGER[] NOT NULL DEFAULT '{}',
        event_type TEXT NOT NULL DEFAULT 'FULL' CHECK (event_type IN ('FULL', 'HALF', 'NONE')),
        details TEXT NOT NULL DEFAULT '',
        created_by BIGINT REFERENCES classroom_users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `ALTER TABLE school_annual_schedules DROP CONSTRAINT IF EXISTS school_annual_schedules_category_check`,
      `ALTER TABLE school_annual_schedules ADD CONSTRAINT school_annual_schedules_category_check CHECK (category IN ('EVENT', 'HOLIDAY', 'DISCRETIONARY', 'EXAM', 'TRIP', 'OTHER'))`,
      `ALTER TABLE school_annual_schedules ADD COLUMN IF NOT EXISTS event_periods INTEGER NOT NULL DEFAULT 6`,
      `ALTER TABLE school_annual_schedules ADD COLUMN IF NOT EXISTS grade_periods JSONB NOT NULL DEFAULT '{}'::jsonb`,
      `CREATE INDEX IF NOT EXISTS school_annual_schedules_lookup_idx
        ON school_annual_schedules (school_id, academic_year, event_date)`,
      // 등교여부(190일 산정)에 영향 없는 일반 행사 — 관리자뿐 아니라 모든 교사가 등록할 수 있다.
      `CREATE TABLE IF NOT EXISTS school_general_events (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        event_date DATE NOT NULL,
        end_date DATE,
        title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 100),
        location TEXT NOT NULL DEFAULT '',
        event_time TEXT NOT NULL DEFAULT '',
        period TEXT NOT NULL DEFAULT '',
        target_scope TEXT NOT NULL DEFAULT 'ALL' CHECK (target_scope IN ('ALL', 'GRADE')),
        target_grades INTEGER[] NOT NULL DEFAULT '{}',
        organizer_name TEXT NOT NULL,
        created_by BIGINT REFERENCES classroom_users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CHECK (end_date IS NULL OR end_date >= event_date)
      )`,
      `CREATE INDEX IF NOT EXISTS school_general_events_lookup_idx
        ON school_general_events (school_id, event_date, end_date)`,
      `CREATE TABLE IF NOT EXISTS school_vacation_settings (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        academic_year INTEGER NOT NULL,
        is_integrated BOOLEAN NOT NULL DEFAULT TRUE,
        summer_start DATE,
        summer_end DATE,
        winter_start DATE,
        winter_end DATE,
        spring_start DATE,
        spring_end DATE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, academic_year)
      )`,
      `ALTER TABLE school_vacation_settings ADD COLUMN IF NOT EXISTS entrance_ceremony_date DATE`,
      `ALTER TABLE school_vacation_settings ADD COLUMN IF NOT EXISTS graduation_ceremony_date DATE`,
      `CREATE TABLE IF NOT EXISTS school_public_holidays_cache (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        year INTEGER NOT NULL,
        holiday_date DATE NOT NULL,
        name TEXT NOT NULL,
        source TEXT NOT NULL DEFAULT 'API' CHECK (source IN ('API', 'MANUAL')),
        excluded BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, year, holiday_date)
      )`,
      `CREATE INDEX IF NOT EXISTS school_public_holidays_cache_lookup_idx
        ON school_public_holidays_cache (school_id, year)`,
      `CREATE TABLE IF NOT EXISTS school_curriculum_hours (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        academic_year INTEGER NOT NULL,
        grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 12),
        subject_name TEXT NOT NULL,
        weekly_hours NUMERIC(4,1) NOT NULL DEFAULT 0,
        annual_required_hours INTEGER NOT NULL DEFAULT 0,
        category TEXT NOT NULL DEFAULT 'SUBJECT',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, academic_year, grade, subject_name)
      )`,
      `ALTER TABLE school_curriculum_hours
        ALTER COLUMN weekly_hours TYPE NUMERIC(4,1) USING weekly_hours::NUMERIC(4,1)`,
      `ALTER TABLE school_curriculum_hours
        DROP CONSTRAINT IF EXISTS school_curriculum_hours_category_check`,
      `ALTER TABLE school_curriculum_hours
        ADD CONSTRAINT school_curriculum_hours_category_check
        CHECK (category IN ('SUBJECT', 'CHANGTAE'))`,
      `CREATE TABLE IF NOT EXISTS school_bell_schedule (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        academic_year INTEGER NOT NULL,
        grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 12),
        arrival_start TIME,
        arrival_end TIME,
        period_times JSONB NOT NULL DEFAULT '{}'::jsonb,
        lunch_after_period INTEGER NOT NULL DEFAULT 4 CHECK (lunch_after_period BETWEEN 0 AND 8),
        lunch_start TIME,
        lunch_end TIME,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, academic_year, grade)
      )`,
      `CREATE TABLE IF NOT EXISTS school_weekly_period_allocation (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        academic_year INTEGER NOT NULL,
        grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 12),
        day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 5),
        period_count INTEGER NOT NULL DEFAULT 0 CHECK (period_count BETWEEN 0 AND 8),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, academic_year, grade, day_of_week)
      )`,
      `CREATE TABLE IF NOT EXISTS school_master_timetable (
        id BIGSERIAL PRIMARY KEY,
        school_id BIGINT NOT NULL REFERENCES classroom_schools(id) ON DELETE CASCADE,
        academic_year INTEGER NOT NULL,
        grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 12),
        class_number INTEGER NOT NULL DEFAULT 0,
        day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 5),
        period INTEGER NOT NULL CHECK (period BETWEEN 1 AND 8),
        subject_name TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (school_id, academic_year, grade, class_number, day_of_week, period)
      )`,
      `ALTER TABLE school_master_timetable
        ADD COLUMN IF NOT EXISTS teacher_user_id BIGINT REFERENCES classroom_users(id) ON DELETE SET NULL`,
      `ALTER TABLE school_master_timetable
        ADD COLUMN IF NOT EXISTS room_name TEXT`,
      // 전담교사별/특별실별 시간표는 이 표를 다른 시점(교사 기준/방 기준)으로 보고 쓰는
      // 화면일 뿐 별도 저장소가 아니다 -- 같은 교사·같은 방이 같은 시간에 두 반에
      // 겹쳐 배정되는 걸 DB 제약으로 원천 차단한다.
      `CREATE UNIQUE INDEX IF NOT EXISTS school_master_timetable_teacher_slot_idx
        ON school_master_timetable (school_id, academic_year, teacher_user_id, day_of_week, period)
        WHERE teacher_user_id IS NOT NULL`,
      `CREATE UNIQUE INDEX IF NOT EXISTS school_master_timetable_room_slot_idx
        ON school_master_timetable (school_id, academic_year, room_name, day_of_week, period)
        WHERE room_name IS NOT NULL`,
      `CREATE TABLE IF NOT EXISTS classroom_teacher_dashboard_settings (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL UNIQUE REFERENCES classroom_users(id) ON DELETE CASCADE,
        timetable JSONB NOT NULL DEFAULT '{}'::jsonb,
        slogan_text TEXT DEFAULT '',
        slogan_align TEXT DEFAULT 'center',
        slogan_font_size INTEGER DEFAULT 42,
        card_order JSONB DEFAULT '[]'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`
    ];

    try {
      for (const statement of statements) await pool.query(statement);
      await pool.query("DELETE FROM classroom_sessions WHERE expires_at <= NOW()");
      await pool.query("DELETE FROM privacy_requests WHERE created_at < NOW() - INTERVAL '1 year'");
      await pool.query("DELETE FROM multiplayer_room_snapshots WHERE expires_at <= NOW()");
      await readingBank.initialize();
      await metacognition.initialize();
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

  async function saveMultiplayerRoomSnapshot({ roomKey, gameId, roomCode, snapshot, ttlSeconds = 10800 }) {
    if (!pool || !databaseReady) return false;
    const safeTtlSeconds = Math.max(300, Math.min(21600, Number(ttlSeconds) || 10800));
    await pool.query(
      `INSERT INTO multiplayer_room_snapshots
         (room_key, game_id, room_code, snapshot, expires_at)
       VALUES ($1, $2, $3, $4::jsonb, NOW() + ($5 * INTERVAL '1 second'))
       ON CONFLICT (room_key) DO UPDATE
       SET game_id = EXCLUDED.game_id,
           room_code = EXCLUDED.room_code,
           snapshot = EXCLUDED.snapshot,
           expires_at = EXCLUDED.expires_at,
           updated_at = NOW()`,
      [roomKey, gameId, roomCode, JSON.stringify(snapshot), safeTtlSeconds]
    );
    return true;
  }

  async function loadMultiplayerRoomSnapshot(roomKey) {
    if (!pool || !databaseReady) return null;
    const result = await pool.query(
      `SELECT game_id, room_code, snapshot
       FROM multiplayer_room_snapshots
       WHERE room_key = $1 AND expires_at > NOW()`,
      [roomKey]
    );
    return result.rows[0] || null;
  }

  async function deleteMultiplayerRoomSnapshot(roomKey) {
    if (!pool || !databaseReady) return false;
    await pool.query("DELETE FROM multiplayer_room_snapshots WHERE room_key = $1", [roomKey]);
    return true;
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
    // Not gated on user.role: role is a single priority slot (admin beats
    // teacher), so a site admin who is also a registered active teacher
    // would otherwise be locked out of every teacher-only action. The
    // registration query below is the real, role-independent source of truth.
    const user = await requireUser(req);
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

  async function requireSchoolAdmin(req) {
    const user = await requireTeacher(req);
    const result = await pool.query(
      `SELECT t.school_id, t.teacher_type, sc.name as school_name
       FROM classroom_teachers t
       JOIN classroom_schools sc ON sc.id = t.school_id
       WHERE t.user_id = $1 AND t.active = TRUE AND sc.enabled = TRUE`,
      [user.id]
    );
    const profile = result.rows[0];
    if (!profile || !["관리자", "교장", "교감"].includes(profile.teacher_type)) {
      throw new HttpError(403, "SCHOOL_ADMIN_REQUIRED", "This page is for school administrators only.");
    }
    return { user, profile };
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

  const metacognition = createMetacognition({
    pool,
    requireUser,
    requireTeacher,
    requireDatabase,
    HttpError,
    asyncRoute
  });

  // Every request under /learning, /admin, /classtools, etc. passes through
  // requireSiteAccess, which used to call getSiteAccessMode() fresh each
  // time -- a DB round trip per static asset (HTML, JS, CSS, images) on
  // every page load. Site-wide access mode changes rarely (an admin flips
  // it manually), so a short TTL cache removes that DB hit almost entirely
  // without meaningfully delaying propagation. invalidateSiteAccessModeCache
  // is also called right after the admin toggles it, for immediate effect.
  const SITE_ACCESS_MODE_TTL_MS = 5000;
  let siteAccessModeCache = null;

  function invalidateSiteAccessModeCache() {
    siteAccessModeCache = null;
  }

  async function getSiteAccessMode() {
    if (!pool && !isProduction) return "open";
    if (siteAccessModeCache && siteAccessModeCache.expiresAt > Date.now()) {
      return siteAccessModeCache.mode;
    }
    requireDatabase();
    const result = await pool.query(
      "SELECT setting_value FROM classroom_settings WHERE setting_key = 'site_access_mode'"
    );
    const mode = result.rows[0]?.setting_value === "restricted" ? "restricted" : "open";
    siteAccessModeCache = { mode, expiresAt: Date.now() + SITE_ACCESS_MODE_TTL_MS };
    return mode;
  }

  async function studentMembership(userId) {
    try {
      const result = await pool.query(
        `SELECT s.student_number::TEXT AS student_number, s.roster_name,
                s.academic_year, s.grade, s.class_number,
                sc.name AS school_name
         FROM school_students s
         JOIN classroom_schools sc ON sc.id = s.school_id
         WHERE s.user_id = $1 OR (s.student_email IS NOT NULL AND LOWER(s.student_email) = (SELECT LOWER(email) FROM classroom_users WHERE id = $1))
         UNION ALL
         SELECT s.student_number::TEXT AS student_number, s.roster_name,
                c.academic_year, c.grade, c.class_number,
                sc.name AS school_name
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         JOIN classroom_schools sc ON sc.id = c.school_id
         WHERE s.user_id = $1
         LIMIT 1`,
        [userId]
      );
      const row = result.rows[0];
      if (!row) return null;
      return {
        studentNumber: row.student_number,
        studentName: row.roster_name,
        name: row.roster_name,
        schoolName: row.school_name,
        academicYear: row.academic_year,
        grade: row.grade,
        classNumber: row.class_number
      };
    } catch (err) {
      console.error("studentMembership error:", err.message);
      return null;
    }
  }

  async function getGuardianChildren(user) {
    if (!user || !user.email) return [];
    try {
      const gRes = await pool.query(
        `SELECT s.id AS student_id, s.student_number::TEXT AS student_number, s.roster_name AS student_name,
                s.academic_year, s.grade, s.class_number,
                sc.id AS school_id, sc.name AS school_name
         FROM school_students s
         JOIN classroom_schools sc ON sc.id = s.school_id
         WHERE LOWER(s.guardian1_email) = LOWER($1) OR LOWER(s.guardian2_email) = LOWER($1)
         UNION ALL
         SELECT s.id AS student_id, s.student_number::TEXT AS student_number, s.roster_name AS student_name,
                c.academic_year, c.grade, c.class_number,
                sc.id AS school_id, sc.name AS school_name
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         JOIN classroom_schools sc ON sc.id = c.school_id
         WHERE LOWER(s.guardian1_email) = LOWER($1) OR LOWER(s.guardian2_email) = LOWER($1)
         ORDER BY grade DESC, class_number ASC, student_number ASC`,
        [user.email]
      );
      return gRes.rows.map(r => ({
        studentId: String(r.student_id),
        schoolId: String(r.school_id),
        schoolName: r.school_name,
        grade: r.grade,
        classNumber: r.class_number,
        studentNumber: r.student_number,
        studentName: r.student_name
      }));
    } catch (err) {
      console.error("guardianChildren error:", err.message);
      return [];
    }
  }

  async function userClassId(user) {
    // Branches on actual classroom_teachers/classroom_students registration
    // rather than user.role: role is a single priority slot (admin beats
    // teacher), so a site admin who is also a registered homeroom teacher
    // would otherwise never resolve to their class here.
    if (!user) return null;
    const tp = await pool.query(
      `SELECT school_id, academic_year, grade, class_number, teacher_name
       FROM classroom_teachers
       WHERE (user_id = $1 OR (google_email IS NOT NULL AND LOWER(google_email) = (SELECT LOWER(email) FROM classroom_users WHERE id = $1)))
         AND (grade IS NOT NULL AND class_number IS NOT NULL)
       LIMIT 1`,
      [user.id]
    );
    const t = tp.rows[0];
    if (t) {
      const year = t.academic_year || new Date().getFullYear();
      const clsRes = await pool.query(
        `INSERT INTO classroom_classes (school_id, academic_year, grade, class_number, teacher_user_id, teacher_name, join_code)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (school_id, academic_year, grade, class_number) DO UPDATE SET teacher_user_id = EXCLUDED.teacher_user_id, teacher_name = EXCLUDED.teacher_name, updated_at = NOW()
         RETURNING id`,
        [t.school_id, year, t.grade, t.class_number, user.id, t.teacher_name || `${t.grade}학년 ${t.class_number}반`, makeJoinCode()]
      );
      return clsRes.rows[0]?.id || null;
    }

    const res = await pool.query(
      `SELECT c.id
       FROM school_students s
       JOIN classroom_classes c ON c.school_id = s.school_id AND c.grade = s.grade AND c.class_number = s.class_number
       WHERE s.user_id = $1 OR (s.student_email IS NOT NULL AND LOWER(s.student_email) = (SELECT LOWER(email) FROM classroom_users WHERE id = $1))
       UNION ALL
       SELECT class_id FROM classroom_students WHERE user_id = $1
       LIMIT 1`,
      [user.id]
    );
    return res.rows[0]?.id || null;
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

  const requireSiteAccess = asyncRoute(async (req, res, next) => {
    // mode and user are each resolved once per request and reused below --
    // this used to call getSiteAccessMode() and sessionUser() twice per
    // request (once to check access, again to render the student
    // content-lock check), doubling the DB round trips on every static
    // asset request under the gated paths.
    const mode = await getSiteAccessMode();
    // Open mode is intended for development and demonstrations. A display
    // name is still useful for game hand-off, but it must not gate routes
    // served by separate learning apps (for example /arithmetic and
    // /hanguksa), because those requests can otherwise lose the guest cookie.
    const user = mode === "restricted" ? await sessionUser(req) : null;
    const allowed = mode === "open"
      ? true
      : user
        ? (user.role === "admin" || user.role === "teacher" || Boolean(await studentMembership(user.id)))
        : Boolean(guestAccess(req));

    if (allowed) {
      if (user?.role === "student" && (req.get("sec-fetch-dest") === "document" || req.accepts("html"))) {
        const classId = await userClassId(user);
        // req.path is relative to whatever prefix in the app.use([...], requireSiteAccess)
        // list matched (e.g. "/arithmetic" itself resolves to req.path === "/"), so it can
        // never equal the full paths stored by the "공개 설정" UI. req.originalUrl keeps the
        // real, unstripped path regardless of which mount prefix matched.
        const requestPath = normalizeContentPath(req.originalUrl);
        // Personal account settings (birthday/avatar), not a curated learning
        // menu item -- must stay reachable regardless of what the homeroom
        // teacher has enabled for the class. The clean-URL middleware further
        // down server.js 308-redirects "/classtools/profile.html" to
        // "/classtools/profile" *after* this middleware runs, so the browser's
        // follow-up request arrives here with the extension already stripped.
        // Both forms must be recognized or that redirect defeats this bypass.
        const isAlwaysAllowed = requestPath === "/classtools/profile.html" || requestPath === "/classtools/profile";
        if (classId && requestPath && !isAlwaysAllowed) {
          const enabled = await pool.query(
            `SELECT 1 FROM classroom_content_enabled
             WHERE class_id = $1
               AND ($2 = content_path OR $2 LIKE content_path || '/%')
             LIMIT 1`,
            [classId, requestPath]
          );
          if (!enabled.rows[0]) return res.redirect(302, "/?content=locked");
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

  function verifyMuseumPresenceTicket(ticket, kind) {
    const [body, signature] = String(ticket || "").split(".");
    if (!body || !signature) return null;
    const expected = crypto.createHmac("sha256", museumPresenceSecret).update(body).digest("base64url");
    if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    try {
      const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
      if (!(payload.exp > Date.now())) return null;
      return payload.kind === (kind || "museum-presence") ? payload : null;
    } catch (_) { return null; }
  }

  router.get("/auth/config", (req, res) => {
    res.json(configuration());
  });

  router.get("/auth/me", asyncRoute(async (req, res) => {
    const current = configuration();
    const user = await sessionUser(req);
    if (!user) {
      const guest = guestAccess(req);
      if (guest) {
        return res.json({
          signedIn: true,
          configured: current.enabled,
          user: {
            id: `guest-${guest.name}`,
            email: "",
            name: guest.name,
            displayName: guest.name,
            role: "guest"
          },
          guestName: guest.name,
          guest: true
        });
      }
      if (!current.enabled) {
        return res.json({ signedIn: false, configured: false, missing: current.missing });
      }
      return res.json({ signedIn: false, configured: true });
    }
    // A Google account's stored role is a single priority slot (admin beats
    // teacher beats everything else), but one person can genuinely hold
    // several of these positions at once (e.g. the site admin is also a
    // school's homeroom teacher). Membership/teacher checks below run
    // unconditionally so the profile picker can offer every role the account
    // actually holds, not just the highest-priority one.
    const membership = await studentMembership(user.id);
    if (membership && user.role === "user") {
      user.role = "student";
    }
    const guardianChildren = await getGuardianChildren(user);
    const teacherRow = await pool.query("SELECT 1 FROM classroom_teachers WHERE user_id = $1 LIMIT 1", [user.id]);
    const isTeacher = teacherRow.rowCount > 0;

    return res.json({
      signedIn: true,
      configured: current.enabled,
      user: publicUser(user),
      membership,
      guardianChildren,
      isTeacher
    });
  }));

  async function travelSchoolForUser(user) {
    const result = await pool.query(
      `SELECT school_id, school_name, office_code, school_code, location_name
       FROM (
         SELECT sc.id AS school_id, sc.name AS school_name, sc.office_code, sc.school_code, sc.location_name, 1 AS priority
         FROM school_students s
         JOIN classroom_schools sc ON sc.id = s.school_id
         WHERE s.user_id = $1 OR (s.student_email IS NOT NULL AND LOWER(s.student_email) = LOWER($2))
         UNION ALL
         SELECT sc.id, sc.name, sc.office_code, sc.school_code, sc.location_name, 1
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         JOIN classroom_schools sc ON sc.id = c.school_id
         WHERE s.user_id = $1 OR (s.student_email IS NOT NULL AND LOWER(s.student_email) = LOWER($2))
         UNION ALL
         SELECT sc.id, sc.name, sc.office_code, sc.school_code, sc.location_name, 2
         FROM classroom_teachers t
         JOIN classroom_schools sc ON sc.id = t.school_id
         WHERE t.user_id = $1 OR (t.google_email IS NOT NULL AND LOWER(t.google_email) = LOWER($2))
         UNION ALL
         SELECT sc.id, sc.name, sc.office_code, sc.school_code, sc.location_name, 3
         FROM school_students s
         JOIN classroom_schools sc ON sc.id = s.school_id
         WHERE LOWER(s.guardian1_email) = LOWER($2) OR LOWER(s.guardian2_email) = LOWER($2)
         UNION ALL
         SELECT sc.id, sc.name, sc.office_code, sc.school_code, sc.location_name, 3
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         JOIN classroom_schools sc ON sc.id = c.school_id
         WHERE LOWER(s.guardian1_email) = LOWER($2) OR LOWER(s.guardian2_email) = LOWER($2)
       ) candidates
       ORDER BY priority, school_id
       LIMIT 1`,
      [user.id, user.email || ""]
    );
    return result.rows[0] || null;
  }

  async function travelSchoolAddress(school) {
    if (!school) return "";
    if (school.office_code && school.school_code) {
      const keyParam = process.env.NEIS_API_KEY ? `&KEY=${process.env.NEIS_API_KEY}` : "";
      const neisUrl = `https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=1${keyParam}&ATPT_OFCDC_SC_CODE=${encodeURIComponent(school.office_code)}&SD_SCHUL_CODE=${encodeURIComponent(school.school_code)}`;
      try {
        const response = await fetch(neisUrl, { signal: AbortSignal.timeout(8000) });
        if (response.ok) {
          const data = await response.json();
          const row = data?.schoolInfo?.[1]?.row?.[0];
          if (row?.ORG_RDNMA) return row.ORG_RDNMA;
        }
      } catch (error) {
        console.warn("Travel map NEIS address lookup failed:", error.message);
      }
    }
    return [school.location_name, school.school_name].filter(Boolean).join(" ");
  }

  function queueTravelGeocode(task) {
    const run = travelGeocodeQueue.then(async () => {
      const waitMs = Math.max(0, 1050 - (Date.now() - travelLastGeocodeAt));
      if (waitMs) await new Promise((resolve) => setTimeout(resolve, waitMs));
      travelLastGeocodeAt = Date.now();
      return task();
    });
    travelGeocodeQueue = run.catch(() => undefined);
    return run;
  }

  async function travelSchoolCoordinates(school) {
    const cacheKey = String(school.school_id);
    const cached = travelSchoolCoordinateCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) return cached.value;

    const address = await travelSchoolAddress(school);
    const query = address || `${school.school_name} 대한민국`;
    const value = await queueTravelGeocode(async () => {
      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("countrycodes", "kr");
      url.searchParams.set("limit", "1");
      url.searchParams.set("q", query);
      const response = await fetch(url, {
        headers: { "User-Agent": "classroom-game-hub/1.0 (Korea school travel map)" },
        signal: AbortSignal.timeout(10000)
      });
      if (!response.ok) throw new HttpError(502, "SCHOOL_GEOCODE_FAILED", "학교 위치를 찾지 못했습니다.");
      const rows = await response.json();
      const first = rows?.[0];
      const latitude = Number(first?.lat);
      const longitude = Number(first?.lon);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        throw new HttpError(404, "SCHOOL_LOCATION_NOT_FOUND", "등록 학교의 정확한 위치를 찾지 못했습니다.");
      }
      return { latitude, longitude, address, displayName: first.display_name || address };
    });

    travelSchoolCoordinateCache.set(cacheKey, { value, expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) });
    return value;
  }

  router.get("/travel/route", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    const destinationLatitude = Number(req.query.destinationLat);
    const destinationLongitude = Number(req.query.destinationLng);
    if (!Number.isFinite(destinationLatitude) || !Number.isFinite(destinationLongitude)
      || destinationLatitude < 32 || destinationLatitude > 39.5
      || destinationLongitude < 124 || destinationLongitude > 132) {
      throw new HttpError(400, "INVALID_DESTINATION", "올바른 국내 관광지 좌표가 필요합니다.");
    }

    const school = await travelSchoolForUser(user);
    if (!school) throw new HttpError(404, "SCHOOL_NOT_REGISTERED", "등록된 학교가 없습니다.");
    const origin = await travelSchoolCoordinates(school);
    const routeCacheKey = String(school.school_id) + ':' + destinationLatitude.toFixed(5) + ',' + destinationLongitude.toFixed(5);
    const cachedRoute = travelRouteCache.get(routeCacheKey);
    if (cachedRoute?.expiresAt > Date.now()) {
      res.json(cachedRoute.value);
      return;
    }
    if (cachedRoute) travelRouteCache.delete(routeCacheKey);

    const routeUrl = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destinationLongitude},${destinationLatitude}?overview=simplified&geometries=geojson&steps=false&alternatives=false`;
    let routeData;
    try {
      const routeResponse = await fetch(routeUrl, { signal: AbortSignal.timeout(15000) });
      if (!routeResponse.ok) throw new Error(`HTTP ${routeResponse.status}`);
      routeData = await routeResponse.json();
    } catch (error) {
      console.warn("Travel map route lookup failed:", error.message);
      throw new HttpError(502, "ROUTE_LOOKUP_FAILED", "현재 경로를 계산하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    }
    const route = routeData?.routes?.[0];
    if (!route || !Number.isFinite(route.distance) || !Number.isFinite(route.duration)) {
      throw new HttpError(404, "ROUTE_NOT_FOUND", "이 관광지까지의 자동차 경로를 찾지 못했습니다.");
    }

    const responseBody = {
      school: {
        id: String(school.school_id),
        name: school.school_name,
        address: origin.address,
        latitude: origin.latitude,
        longitude: origin.longitude
      },
      route: {
        mode: "driving",
        distanceKm: Math.round((route.distance / 1000) * 10) / 10,
        durationMinutes: Math.max(1, Math.round(route.duration / 60)),
        coordinates: Array.isArray(route.geometry?.coordinates) ? route.geometry.coordinates : []
      },
      notice: "자동차 기준 참고 경로이며 실시간 교통 상황은 반영되지 않습니다."
    };

    if (travelRouteCache.size >= 2000) {
      const oldestKey = travelRouteCache.keys().next().value;
      if (oldestKey) travelRouteCache.delete(oldestKey);
    }
    travelRouteCache.set(routeCacheKey, {
      value: responseBody,
      expiresAt: Date.now() + (3 * 60 * 60 * 1000)
    });
    res.json(responseBody);
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
              s.school_id, s.academic_year, s.grade, s.class_number, sc.name AS school_name,
              'school_students' AS source_table
       FROM school_students s
       JOIN classroom_schools sc ON sc.id = s.school_id
       WHERE s.user_id = $1
       UNION ALL
       SELECT s.id AS student_id, s.roster_name, s.student_number, s.birthday_mmdd, s.birthday_visible,
              s.avatar_key, s.avatar_first_changed_year, s.avatar_second_changed_year,
              c.school_id, c.academic_year, c.grade, c.class_number, sc.name AS school_name,
              'classroom_students' AS source_table
       FROM classroom_students s
       JOIN classroom_classes c ON c.id = s.class_id
       JOIN classroom_schools sc ON sc.id = c.school_id
       WHERE s.user_id = $1
       LIMIT 1`,
      [user.id]
    );
    const row = result.rows[0];
    if (!row) throw new HttpError(404, "STUDENT_MEMBERSHIP_REQUIRED", "Join your class before changing this setting.");

    // Older rows (created before avatar auto-assignment existed, or a roster
    // row that was never re-saved since) can reach here with no avatar_key.
    // Assign one now instead of leaving the student permanently stuck on
    // "not yet assigned" until an admin happens to re-save the roster.
    if (!row.avatar_key) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        await client.query(
          "SELECT pg_advisory_xact_lock(hashtextextended($1, 0))",
          [`avatar:${row.school_id}:${row.academic_year}:${row.grade}`]
        );
        const recheck = await client.query(
          `SELECT avatar_key FROM ${row.source_table} WHERE id = $1 FOR UPDATE`,
          [row.student_id]
        );
        if (recheck.rows[0]?.avatar_key) {
          row.avatar_key = recheck.rows[0].avatar_key;
        } else {
          const usageResult = await client.query(
            `SELECT avatar_key, COUNT(*)::INTEGER AS usage_count,
                    SUM(COUNT(*)) OVER()::INTEGER AS student_count
             FROM (
               SELECT avatar_key FROM school_students
                WHERE school_id = $1 AND academic_year = $2 AND grade = $3
               UNION ALL
               SELECT s.avatar_key FROM classroom_students s
                JOIN classroom_classes c ON c.id = s.class_id
                WHERE c.school_id = $1 AND c.academic_year = $2 AND c.grade = $3
             ) combined
             GROUP BY avatar_key`,
            [row.school_id, row.academic_year, row.grade]
          );
          const usageCounts = new Map(
            usageResult.rows.filter((item) => item.avatar_key).map((item) => [item.avatar_key, Number(item.usage_count || 0)])
          );
          const capacity = avatarCapacity(Number(usageResult.rows[0]?.student_count || 0));
          const newAvatarKey = pickRandomAvailableAvatar(usageCounts, capacity);
          await client.query(
            `UPDATE ${row.source_table} SET avatar_key = $2, updated_at = NOW() WHERE id = $1`,
            [row.student_id, newAvatarKey]
          );
          row.avatar_key = newAvatarKey;
        }
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    }

    const avatarUsageResult = await pool.query(
      `SELECT avatar_key, COUNT(*)::INTEGER AS usage_count,
              SUM(COUNT(*)) OVER()::INTEGER AS student_count
       FROM (
         SELECT avatar_key FROM school_students
          WHERE school_id = $1 AND academic_year = $2 AND grade = $3
         UNION ALL
         SELECT s.avatar_key FROM classroom_students s
          JOIN classroom_classes c ON c.id = s.class_id
          WHERE c.school_id = $1 AND c.academic_year = $2 AND c.grade = $3
       ) combined
       GROUP BY avatar_key`,
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
    let result = await pool.query(
      `UPDATE school_students
       SET birthday_mmdd = $2, birthday_visible = $3, updated_at = NOW()
       WHERE user_id = $1
       RETURNING roster_name, student_number, birthday_mmdd, birthday_visible`,
      [user.id, birthdayMmdd || null, Boolean(birthdayMmdd && birthdayVisible)]
    );
    if (!result.rows[0]) {
      result = await pool.query(
        `UPDATE classroom_students
         SET birthday_mmdd = $2, birthday_visible = $3, birth_date = NULL, updated_at = NOW()
         WHERE user_id = $1
         RETURNING roster_name, student_number, birthday_mmdd, birthday_visible`,
        [user.id, birthdayMmdd || null, Boolean(birthdayMmdd && birthdayVisible)]
      );
    }
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
      let source = "school_students";
      let studentResult = await client.query(
        `SELECT s.id, s.avatar_key, s.avatar_first_changed_year, s.avatar_second_changed_year,
                s.school_id, s.academic_year, s.grade
         FROM school_students s
         WHERE s.user_id = $1
         LIMIT 1
         FOR UPDATE OF s`,
        [user.id]
      );
      if (!studentResult.rows[0]) {
        source = "classroom_students";
        studentResult = await client.query(
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
      }
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

      // Usage/capacity spans both roster tables, since the grade's cohort may have
      // students in either. The current student is excluded from whichever table
      // they actually live in; the other exclude id is impossible (-1) so it never matches.
      const schoolExcludeId = source === "school_students" ? student.id : -1;
      const classroomExcludeId = source === "classroom_students" ? student.id : -1;
      const capacityResult = await client.query(
        `SELECT
           (
             (SELECT COUNT(*) FROM school_students WHERE school_id = $1 AND academic_year = $2 AND grade = $3) +
             (SELECT COUNT(*) FROM classroom_students s JOIN classroom_classes c ON c.id = s.class_id
               WHERE c.school_id = $1 AND c.academic_year = $2 AND c.grade = $3)
           )::INTEGER AS student_count,
           (
             (SELECT COUNT(*) FROM school_students WHERE school_id = $1 AND academic_year = $2 AND grade = $3 AND avatar_key = $4 AND id <> $5) +
             (SELECT COUNT(*) FROM classroom_students s JOIN classroom_classes c ON c.id = s.class_id
               WHERE c.school_id = $1 AND c.academic_year = $2 AND c.grade = $3 AND s.avatar_key = $4 AND s.id <> $6)
           )::INTEGER AS selected_count`,
        [student.school_id, student.academic_year, student.grade, requestedAvatarKey, schoolExcludeId, classroomExcludeId]
      );
      const usage = capacityResult.rows[0];
      const maximumAvatarUses = avatarCapacity(Number(usage.student_count || 0));
      if (Number(usage.selected_count || 0) >= maximumAvatarUses) {
        throw new HttpError(409, "AVATAR_UNAVAILABLE", "\uac19\uc740 \ud559\ub144\uc758 \ub2e4\ub978 \ud559\uc0dd\uc774 \uc774\ubbf8 \uc0ac\uc6a9 \uc911\uc778 \uc544\ubc14\ud0c0\uc785\ub2c8\ub2e4.");
      }

      const changedYearColumn = changeWindow.period === "first" ? "avatar_first_changed_year" : "avatar_second_changed_year";
      const table = source === "school_students" ? "school_students" : "classroom_students";
      await client.query(
        `UPDATE ${table}
         SET avatar_key = $2, ${changedYearColumn} = $3, updated_at = NOW()
         WHERE id = $1`,
        [student.id, requestedAvatarKey, changeWindow.year]
      );
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
             birth_date = NULL, updated_at = NOW()
         WHERE id = $1`,
        [student.id]
      );
      await client.query(
        `INSERT INTO classroom_student_access_resets
           (student_id, class_id, student_number, roster_name, previous_user_id, reset_by)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [student.id, student.class_id, student.student_number, student.roster_name, student.user_id, req.user.id]
      );
      await client.query("COMMIT");
      res.json({ ok: true, studentId: String(student.id) });
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


  // 학습 난이도를 정할 학년군. 방을 만든 사람의 계정 학년을 따르므로 서명해서 내보낸다.
  // 학년을 모르는 사람(관리자·게스트·담임 배정이 없는 교사)은 가장 높은 군으로 둔다.
  function gradeBand(grade) {
    const value = Number(grade);
    if (!Number.isInteger(value) || value < 1 || value > 12) return "middle";
    if (value <= 4) return "primary34";
    if (value <= 6) return "primary56";
    return "middle";
  }

  router.get("/learner/band", asyncRoute(async (req, res) => {
    const expiresAt = Date.now() + 30 * 60 * 1000;
    let grade = null;
    const user = await sessionUser(req);
    if (user) {
      // 담임 교사면 맡은 학급의 학년, 학생이면 본인 학년.
      const taught = await pool.query(
        `SELECT grade FROM classroom_teachers
         WHERE (user_id = $1 OR (google_email IS NOT NULL AND LOWER(google_email) = (SELECT LOWER(email) FROM classroom_users WHERE id = $1)))
           AND grade IS NOT NULL
         LIMIT 1`,
        [user.id]
      );
      grade = taught.rows[0]?.grade ?? null;
      if (grade === null) {
        const membership = await studentMembership(user.id);
        grade = membership?.grade ?? null;
      }
    }
    const band = gradeBand(grade);
    const ticket = signMuseumPresence({ kind: "learner-band", exp: expiresAt, band });
    res.json({ ticket, band, expiresAt });
  }));

  function verifyLearnerBand(ticket) {
    const payload = verifyMuseumPresenceTicket(ticket, "learner-band");
    return payload ? payload.band : null;
  }

  router.get("/site/access", asyncRoute(async (req, res) => {
    const mode = await getSiteAccessMode();
    res.json({ mode });
  }));

  router.get("/home-content-access", asyncRoute(async (req, res) => {
    const mode = await getSiteAccessMode();
    const user = await sessionUser(req);
    if (!user) {
      return res.json({ mode, enabledPaths: [], canManage: false });
    }
    const classId = await userClassId(user);
    if (!classId) {
      return res.json({ mode, enabledPaths: [], canManage: false });
    }
    const enabled = await pool.query(
      "SELECT content_path FROM classroom_content_enabled WHERE class_id = $1 ORDER BY content_path",
      [classId]
    );
    res.json({
      mode,
      enabledPaths: enabled.rows.map((row) => row.content_path),
      canManage: user.role === "teacher"
    });
  }));

  router.put("/teacher/home-content-access", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const classId = await userClassId(teacher);
    if (!classId) {
      throw new HttpError(403, "HOMEROOM_TEACHER_REQUIRED", "담임교사만 자기 반의 학급 메뉴/게임 잠금을 설정할 수 있습니다. 교사 명단에서 담당 학년과 반을 지정해 주세요.");
    }
    const contentPath = normalizeContentPath(req.body?.path);
    const enabled = req.body?.enabled === true;
    if (!contentPath || contentPath === "/") {
      throw new HttpError(400, "INVALID_CONTENT_PATH", "올바른 홈 버튼을 선택해 주세요.");
    }
    if (enabled) {
      await pool.query(
        `INSERT INTO classroom_content_enabled (class_id, content_path, updated_by, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (class_id, content_path) DO UPDATE SET updated_by = EXCLUDED.updated_by, updated_at = NOW()`,
        [classId, contentPath, teacher.id]
      );
    } else {
      await pool.query(
        "DELETE FROM classroom_content_enabled WHERE class_id = $1 AND content_path = $2",
        [classId, contentPath]
      );
    }
    res.json({ ok: true, path: contentPath, enabled });
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

    let isGuardian = false;
    let isStudent = false;
    
    // Check Guardian (school_students OR classroom_students)
    const dbGuardianCheck = await pool.query(
      `SELECT id FROM classroom_students WHERE LOWER(guardian1_email) = $1 OR LOWER(guardian2_email) = $1
       UNION
       SELECT id FROM school_students WHERE LOWER(guardian1_email) = $1 OR LOWER(guardian2_email) = $1`,
      [email]
    );
    if (dbGuardianCheck.rowCount > 0) {
      isGuardian = true;
    }

    // Check Student (school_students OR classroom_students)
    let studentIds = [];
    const dbStudentCheck = await pool.query(
      `SELECT id FROM classroom_students WHERE LOWER(student_email) = $1
       UNION
       SELECT id FROM school_students WHERE LOWER(student_email) = $1`,
      [email]
    );
    if (dbStudentCheck.rowCount > 0) {
      isStudent = true;
      studentIds = dbStudentCheck.rows.map(row => row.id);
    }

    // Strict access control: If not registered at all, reject.
    if (!isAdmin && !isTeacher && !isStudent && !isGuardian) {
      throw new HttpError(403, "UNREGISTERED_ACCOUNT", "등록되지 않은 구글 계정입니다. 학교에 문의하세요.");
    }

    const roleToAssign = isAdmin ? 'admin' : (isTeacher ? 'teacher' : (isStudent ? 'student' : (isGuardian ? 'guardian' : null)));

    const userResult = await pool.query(
      `INSERT INTO classroom_users
        (google_sub, email, display_name, picture_url, google_domain, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (google_sub) DO UPDATE SET
         email = EXCLUDED.email,
         display_name = EXCLUDED.display_name,
         picture_url = EXCLUDED.picture_url,
         google_domain = EXCLUDED.google_domain,
         role = CASE
           WHEN $6 = 'admin' THEN 'admin'
           WHEN classroom_users.role = 'admin' THEN 'admin'
           WHEN $6 = 'teacher' THEN 'teacher'
           WHEN classroom_users.role = 'teacher' THEN 'teacher'
           ELSE $6
         END,
         updated_at = NOW()
       RETURNING *`,
      [
        payload.sub,
        email,
        String(payload.name || email).trim().slice(0, 100),
        payload.picture ? String(payload.picture).slice(0, 500) : null,
        String(payload.hd || email.split("@")[1] || "personal").trim().toLowerCase(),
        roleToAssign
      ]
    );
    const user = userResult.rows[0];

    if (isTeacher) {
      await pool.query(
        "UPDATE classroom_teachers SET user_id = $1, updated_at = NOW() WHERE LOWER(google_email) = $2",
        [user.id, email]
      );
    }
    
    if (isStudent) {
      await pool.query(
        "UPDATE school_students SET user_id = $1, updated_at = NOW() WHERE LOWER(student_email) = $2",
        [user.id, email]
      );
      await pool.query(
        "UPDATE classroom_students SET user_id = $1, updated_at = NOW() WHERE LOWER(student_email) = $2",
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
    const membership = (user.role === "student" || user.role === "user" || isStudent) ? await studentMembership(user.id) : null;
    const guardianChildren = await getGuardianChildren(user);
    return res.json({ ok: true, user: publicUser(user), membership, guardianChildren, isTeacher });
  }));

  router.post("/auth/logout", asyncRoute(async (req, res) => {
    const token = readCookie(req, SESSION_COOKIE);
    if (pool && databaseReady && token) {
      await pool.query("DELETE FROM classroom_sessions WHERE token_hash = $1", [hashSessionToken(token)]);
    }
    clearSessionCookie(res);
    clearGuestAccessCookie(res);
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
    invalidateSiteAccessModeCache();
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
      `SELECT s.id, s.name, s.google_domain, s.office_code, s.school_code, s.location_name, s.enabled,
              (SELECT google_email FROM classroom_teachers WHERE school_id = s.id AND (teacher_type IN ('관리자', '교장', '교감') OR teacher_name IN ('학교관리자', '학교 관리자', '관리자')) LIMIT 1) AS master_email
       FROM classroom_schools s
       ORDER BY s.name, s.id`
    );
    const teachersResult = await pool.query(
      `SELECT t.id, t.school_id, t.teacher_name, t.google_email, t.active, t.teacher_type,
              t.user_id IS NOT NULL AS linked
       FROM classroom_teachers t
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
        linked: teacher.linked
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
        masterEmail: school.master_email || "",
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

  // Sets only the school's single "관리자" (master admin) teacher row.
  router.put("/admin/schools/:schoolId/master-email", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const schoolId = Number(req.params.schoolId);
    if (!Number.isInteger(schoolId) || schoolId < 1) {
      throw new HttpError(400, "INVALID_SCHOOL", "Check the school ID.");
    }
    const email = normalizeEmail(req.body?.email);
    if (!email || !email.includes("@")) {
      throw new HttpError(400, "INVALID_TEACHER_EMAIL", "올바른 구글 이메일 주소를 입력하세요.");
    }

    const schoolCheck = await pool.query("SELECT 1 FROM classroom_schools WHERE id = $1", [schoolId]);
    if (schoolCheck.rowCount === 0) {
      throw new HttpError(404, "SCHOOL_NOT_FOUND", "School not found.");
    }

    const existing = await pool.query(
      `SELECT id FROM classroom_teachers
       WHERE school_id = $1
         AND (teacher_type IN ('관리자', '교장', '교감') OR teacher_name IN ('학교관리자', '학교 관리자', '관리자'))
       LIMIT 1`,
      [schoolId]
    );

    const conflict = await pool.query(
      `SELECT id FROM classroom_teachers WHERE LOWER(google_email) = LOWER($1) AND id != $2`,
      [email, existing.rows[0]?.id || -1]
    );
    if (conflict.rows[0]) {
      throw new HttpError(400, "DUPLICATE_EMAIL", "이미 다른 교사가 사용 중인 이메일입니다.");
    }

    if (existing.rows[0]) {
      await pool.query(
        `UPDATE classroom_teachers
         SET google_email = $1, teacher_type = '관리자', teacher_name = '학교 관리자', updated_at = NOW()
         WHERE id = $2`,
        [email, existing.rows[0].id]
      );
    } else {
      await pool.query(
        `INSERT INTO classroom_teachers
           (school_id, teacher_name, academic_year, grade, class_number, teacher_type, google_email)
         VALUES ($1, '학교 관리자', NULL, NULL, NULL, '관리자', $2)`,
        [schoolId, email]
      );
    }
    res.json({ ok: true, email });
  }));

  router.delete("/admin/schools/:schoolId", asyncRoute(async (req, res) => {
    await requireAdmin(req);
    const schoolId = Number(req.params.schoolId);
    if (!Number.isInteger(schoolId) || schoolId < 1) {
      throw new HttpError(400, "INVALID_SCHOOL", "School not found.");
    }
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      
      // Delete students manually first if cascade isn't guaranteed
      await client.query(`DELETE FROM classroom_students WHERE class_id IN (SELECT id FROM classroom_classes WHERE school_id = $1)`, [schoolId]);
      // Delete classes
      await client.query(`DELETE FROM classroom_classes WHERE school_id = $1`, [schoolId]);
      // Delete teachers
      await client.query(`DELETE FROM classroom_teachers WHERE school_id = $1`, [schoolId]);
      
      const result = await client.query("DELETE FROM classroom_schools WHERE id = $1 RETURNING id", [schoolId]);
      if (!result.rows[0]) throw new HttpError(404, "SCHOOL_NOT_FOUND", "School not found.");
      
      await client.query("COMMIT");
      res.json({ ok: true });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }));

  router.get("/teacher/profile", asyncRoute(async (req, res) => {
    // Deliberately not gated on user.role: a Google account's role is a
    // single priority slot (admin/teacher can't both show there), but the
    // same person can be a registered teacher in classroom_teachers
    // regardless of what their top-level role says. Look the row up directly.
    const user = await requireUser(req);
    const result = await pool.query(
      `SELECT t.id, t.teacher_name, t.active, t.academic_year, t.grade, t.class_number, t.teacher_type,
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
        teacherType: profile.teacher_type,
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
    const classMetaRes = await pool.query(
      `SELECT school_id, grade FROM classroom_classes WHERE id = $1`,
      [classId]
    );
    const classMeta = classMetaRes.rows[0];
    let annualSchedules = [];
    if (classMeta) {
      const annualRes = await pool.query(
        `SELECT id, event_date::TEXT AS event_date, title, details, category, target_scope, target_grades, event_type
         FROM school_annual_schedules
         WHERE school_id = $1
           AND event_date >= CURRENT_DATE - 31
           AND event_date < CURRENT_DATE + 370
           AND (target_scope = 'ALL' OR (target_scope = 'GRADE' AND $2 = ANY(target_grades)))
         ORDER BY event_date, id`,
        [classMeta.school_id, classMeta.grade]
      );
      annualSchedules = annualRes.rows.map((row) => ({
        id: `annual_${row.id}`,
        date: row.event_date,
        title: row.title,
        details: row.details || "",
        category: row.category,
        scope: row.target_scope,
        eventType: row.event_type,
        type: "annual_schedule",
        canDelete: false
      }));
    }

    const savedSchedules = result.rows.map((row) => ({
      id: String(row.id), date: row.event_date, title: row.title, details: row.details || "", type: "schedule", scope: "CLASS", canDelete: true
    }));
    const schedules = [...annualSchedules, ...savedSchedules, ...birthdayScheduleRows(birthdaysResult.rows)]
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

  router.get("/teacher/available-classes", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const teacherResult = await pool.query(
      `SELECT school_id, teacher_type, subject_name, room_name FROM classroom_teachers WHERE user_id = $1`,
      [teacher.id]
    );
    const teacherInfo = teacherResult.rows[0];
    if (!teacherInfo) return res.json({ classes: [] });

    // Ensures this teacher's own homeroom class exists in classroom_classes
    // even if they've never opened the roster editor before.
    await userClassId(teacher);

    const classesResult = await pool.query(
      `SELECT c.id, c.academic_year, c.grade, c.class_number, c.teacher_name,
              (
                SELECT COUNT(*) FROM (
                  SELECT student_number FROM school_students ss
                   WHERE ss.school_id = c.school_id AND ss.academic_year = c.academic_year
                     AND ss.grade = c.grade AND ss.class_number = c.class_number
                  UNION
                  SELECT s.student_number::TEXT FROM classroom_students s WHERE s.class_id = c.id
                ) merged
              ) AS student_count
       FROM classroom_classes c
       WHERE c.school_id = $1
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

    // Homeroom teachers are provisioned into classroom_classes on demand from
    // classroom_teachers.grade/class_number, so a freshly assigned teacher
    // sees their real school_students roster on first load instead of an
    // empty classroom.
    if (!isSubjectTeacher) await userClassId(teacher);

    let classroom = null;
    const requestedClassId = req.query.classId;

    if (requestedClassId) {
      const classResult = await pool.query(
        `SELECT c.*, sc.name AS school_name, sc.school_code, sc.location_name
         FROM classroom_classes c
         JOIN classroom_schools sc ON sc.id = c.school_id
         WHERE c.id = $1 AND c.school_id = $2`,
        [requestedClassId, teacherInfo?.school_id]
      );
      classroom = classResult.rows[0];
    }

    if (!classroom) {
      const classResult = await pool.query(
        `SELECT c.*, sc.name AS school_name, sc.school_code, sc.location_name
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
        `SELECT c.*, sc.name AS school_name, sc.school_code, sc.location_name
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
      `SELECT s.student_number::TEXT AS student_number, s.roster_name, COALESCE(s.gender, '여') AS gender,
              NULL AS birthday_mmdd, TRUE AS birthday_visible,
              NULL AS avatar_key,
              s.student_email, s.guardian1_email, s.guardian2_email,
              s.user_id IS NOT NULL AS student_linked,
              EXISTS(SELECT 1 FROM classroom_users u WHERE LOWER(u.email) = LOWER(s.guardian1_email)) AS guardian1_linked,
              EXISTS(SELECT 1 FROM classroom_users u WHERE LOWER(u.email) = LOWER(s.guardian2_email)) AS guardian2_linked
       FROM school_students s
       WHERE s.school_id = $1 AND s.academic_year = $2 AND s.grade = $3 AND s.class_number = $4
       UNION ALL
       SELECT s.student_number::TEXT AS student_number, s.roster_name, COALESCE(s.gender, '남') AS gender,
              s.birthday_mmdd, s.birthday_visible,
              s.avatar_key,
              s.student_email, s.guardian1_email, s.guardian2_email,
              s.user_id IS NOT NULL AS student_linked,
              EXISTS(SELECT 1 FROM classroom_users u WHERE LOWER(u.email) = LOWER(s.guardian1_email)) AS guardian1_linked,
              EXISTS(SELECT 1 FROM classroom_users u WHERE LOWER(u.email) = LOWER(s.guardian2_email)) AS guardian2_linked
       FROM classroom_students s
       WHERE s.class_id = $5
         AND NOT EXISTS (
           SELECT 1 FROM school_students ss
           WHERE ss.school_id = $1 AND ss.academic_year = $2 AND ss.grade = $3 AND ss.class_number = $4
             AND ss.student_number = s.student_number::TEXT
         )
       ORDER BY CASE WHEN student_number ~ '^[0-9]+$' THEN student_number::INTEGER END,
                student_number`,
      [classroom.school_id, classroom.academic_year, classroom.grade, classroom.class_number, classroom.id]
    );

    return res.json({
      classroom: {
        id: classroom.id,
        schoolName: classroom.school_name,
        schoolCode: classroom.school_code,
        locationName: classroom.location_name || "",
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
          studentLinked: student.student_linked,
          guardian1Linked: student.guardian1_linked,
          guardian2Linked: student.guardian2_linked
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
        gender,
        studentEmail: String(student?.studentEmail || "").trim().toLowerCase() || null,
        guardian1Email: String(student?.guardian1Email || "").trim().toLowerCase() || null,
        guardian2Email: String(student?.guardian2Email || "").trim().toLowerCase() || null
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
        `SELECT student_number, user_id, birthday_mmdd, birthday_visible, avatar_key
         FROM classroom_students
         WHERE class_id = $1 AND student_number = ANY($2::TEXT[])`,
        [classroom.id, numbers]
      );
      const existingPasswords = new Map(
        existingPasswordsResult.rows.map((student) => [student.student_number, {
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
        const avatarKey = existingPassword?.avatarKey || pickRandomAvailableAvatar(avatarUsageCounts, maximumAvatarUses);
        if (!existingPassword?.avatarKey) {
          avatarUsageCounts.set(avatarKey, Number(avatarUsageCounts.get(avatarKey) || 0) + 1);
        }

        await client.query(
          `INSERT INTO classroom_students
            (class_id, student_number, roster_name, gender, birthday_mmdd, birthday_visible, birth_date, avatar_key, student_email, guardian1_email, guardian2_email)
           VALUES ($1, $2, $3, $4, $5, $6, NULL, $7, $8, $9, $10)
           ON CONFLICT (class_id, student_number) DO UPDATE SET
             roster_name = EXCLUDED.roster_name,
             gender = EXCLUDED.gender,
             birthday_mmdd = EXCLUDED.birthday_mmdd,
             birthday_visible = EXCLUDED.birthday_visible,
             birth_date = NULL,
             avatar_key = COALESCE(classroom_students.avatar_key, EXCLUDED.avatar_key),
             student_email = EXCLUDED.student_email,
             guardian1_email = EXCLUDED.guardian1_email,
             guardian2_email = EXCLUDED.guardian2_email,
             updated_at = NOW()`,
          [classroom.id, student.number, student.name, student.gender,
           existingPassword?.birthdayMmdd || null, existingPassword?.birthdayVisible || false, avatarKey,
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

  router.use("/reading", readingBank.router);
  router.use("/metacognition", metacognition.router);

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

  // ----------------------------------------------------
  // Notice & Attendance Platform API Routes
  // 0. Address Book Tree Data API (Teacher)
  router.get("/teacher/addressbook", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const tp = await pool.query(
      `SELECT school_id FROM classroom_teachers WHERE user_id = $1 AND active = TRUE`,
      [teacher.id]
    );
    const schoolId = tp.rows[0]?.school_id || 1;
    const year = Number(req.query.year) || new Date().getFullYear();

    // 1. Homeroom Classes from school_students
    const classesRes = await pool.query(
      `SELECT grade, class_number, COUNT(*)::INTEGER AS student_count
       FROM school_students
       WHERE school_id = $1 AND academic_year = $2
       GROUP BY grade, class_number
       ORDER BY grade, class_number`,
      [schoolId, year]
    );

    // 2. Additional Groups with integrated student counts (homeroom, club, afterschool, shuttle)
    const groupsRes = await pool.query(
      `SELECT g.id, g.group_name, g.group_type,
              (
                SELECT COUNT(*)::INTEGER
                FROM (
                  SELECT ss.id FROM school_students ss
                  WHERE g.group_type = 'homeroom' AND g.grade IS NOT NULL AND g.class_number IS NOT NULL
                    AND ss.school_id = g.school_id AND ss.academic_year = g.academic_year AND ss.grade = g.grade AND ss.class_number = g.class_number
                  UNION
                  SELECT ss.id FROM school_students ss
                  WHERE g.group_type != 'homeroom'
                    AND ss.school_id = g.school_id AND ss.academic_year = g.academic_year
                    AND (
                      ss.custom_fields->>'club' = g.group_name OR
                      ss.custom_fields->>'afterschool' = g.group_name OR
                      ss.custom_fields->>'shuttle' = g.group_name OR
                      ss.custom_fields->>'bus' = g.group_name OR
                      ss.custom_fields->>'subject' = g.group_name OR
                      ss.custom_fields->>'group' = g.group_name OR
                      ss.custom_fields::text ILIKE '%' || g.group_name || '%'
                    )
                  UNION
                  SELECT gs.student_id FROM teacher_group_students gs WHERE gs.group_id = g.id
                ) AS st_union
              ) AS student_count
       FROM teacher_groups g
       WHERE g.school_id = $1 AND g.academic_year = $2
       ORDER BY g.group_type, g.group_name`,
      [schoolId, year]
    );

    // 3. All Students & Guardians from school_students
    const studentsRes = await pool.query(
      `SELECT s.id::TEXT AS student_id, s.grade, s.class_number, s.student_number, s.roster_name AS name,
              s.guardian1_email, s.guardian2_email, s.custom_fields
       FROM school_students s
       WHERE s.school_id = $1 AND s.academic_year = $2
       ORDER BY s.grade, s.class_number, NULLIF(regexp_replace(s.student_number, '\\D', '', 'g'), '')::INT`,
      [schoolId, year]
    );

    res.json({
      classes: classesRes.rows,
      groups: groupsRes.rows,
      students: studentsRes.rows
    });
  }));

  // 1. Send Notice (Teacher)
  router.post("/teacher/notices", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const title = String(req.body?.title || "").trim();
    const contentType = String(req.body?.contentType || "text").trim();
    const contentBody = String(req.body?.contentBody || "").trim();
    const targetType = String(req.body?.targetType || "all").trim();
    const targetGrade = req.body?.targetGrade ? Number(req.body.targetGrade) : null;
    const targetClassNumber = req.body?.targetClassNumber ? Number(req.body.targetClassNumber) : null;
    const targetStudentNumbers = req.body?.targetStudentNumbers ? String(req.body.targetStudentNumbers).trim() : null;
    const requiresSignature = Boolean(req.body?.requiresSignature);

    if (!title || !contentBody) {
      throw new HttpError(400, "TITLE_AND_CONTENT_REQUIRED", "제목과 내용을 입력하세요.");
    }

    const teacherProfileRes = await pool.query(
      `SELECT t.school_id, t.teacher_name
       FROM classroom_teachers t
       WHERE t.user_id = $1`,
      [teacher.id]
    );
    const teacherInfo = teacherProfileRes.rows[0];
    const schoolId = teacherInfo?.school_id || null;
    const senderName = teacherInfo?.teacher_name || teacher.displayName || "담임선생님";

    const insertRes = await pool.query(
      `INSERT INTO classroom_notices
         (school_id, sender_teacher_name, title, content_type, content_body, target_type, target_grade, target_class_number, target_student_numbers, requires_signature)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, created_at`,
      [schoolId, senderName, title, contentType, contentBody, targetType, targetGrade, targetClassNumber, targetStudentNumbers, requiresSignature]
    );

    res.status(201).json({ ok: true, noticeId: String(insertRes.rows[0].id) });
  }));

  // ── General School Events (일반 행사) ──
  // 등교여부(190일 산정)에는 영향을 주지 않는 일반 행사. 학사일정(school_annual_schedules)과
  // 달리 관리자 전용이 아니라 모든 교사가 등록할 수 있고, 등록한 교사가 담당자로 자동 기록된다.
  async function getTeacherContext(teacherId) {
    const res = await pool.query(
      `SELECT t.school_id, t.teacher_name, t.teacher_type, sc.name AS school_name
       FROM classroom_teachers t
       JOIN classroom_schools sc ON sc.id = t.school_id
       WHERE t.user_id = $1 AND t.active = TRUE`,
      [teacherId]
    );
    return res.rows[0] || null;
  }

  router.get("/teacher/general-events", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const ctx = await getTeacherContext(teacher.id);
    if (!ctx) throw new HttpError(403, "TEACHER_REGISTRATION_REQUIRED", "학급 등록 정보를 찾을 수 없습니다.");

    const month = /^\d{4}-\d{2}$/.test(req.query.month) ? req.query.month : new Date().toISOString().slice(0, 7);
    const [monthYear, monthNum] = month.split("-").map(Number);
    const monthStart = `${month}-01`;
    const monthEnd = new Date(monthYear, monthNum, 0).toISOString().slice(0, 10); // last day of month
    const result = await pool.query(
      `SELECT id, event_date::TEXT AS event_date, end_date::TEXT AS end_date, title, location, event_time, period,
              target_scope, target_grades, organizer_name, created_by
       FROM school_general_events
       WHERE school_id = $1 AND event_date <= $3 AND COALESCE(end_date, event_date) >= $2
       ORDER BY event_date, id`,
      [ctx.school_id, monthStart, monthEnd]
    );
    res.json({
      month,
      schoolName: ctx.school_name,
      events: result.rows.map(e => ({ ...e, isOwner: String(e.created_by) === String(teacher.id) }))
    });
  }));

  router.post("/teacher/general-events", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const ctx = await getTeacherContext(teacher.id);
    if (!ctx) throw new HttpError(403, "TEACHER_REGISTRATION_REQUIRED", "학급 등록 정보를 찾을 수 없습니다.");

    const date = String(req.body?.date || "").trim();
    const endDateRaw = String(req.body?.endDate || "").trim();
    const endDate = endDateRaw || null;
    const title = String(req.body?.title || "").normalize("NFC").trim();
    const location = String(req.body?.location || "").normalize("NFC").trim();
    const eventTime = String(req.body?.eventTime || "").trim();
    const period = String(req.body?.period || "").normalize("NFC").trim();
    const targetScope = String(req.body?.targetScope || "ALL").toUpperCase();
    const targetGrades = Array.isArray(req.body?.targetGrades) ? req.body.targetGrades.map(Number).filter(n => n >= 1 && n <= 12) : [];

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new HttpError(400, "INVALID_DATE", "유효한 날짜를 입력하세요.");
    }
    if (endDate && (!/^\d{4}-\d{2}-\d{2}$/.test(endDate) || endDate < date)) {
      throw new HttpError(400, "INVALID_END_DATE", "종료일은 시작일과 같거나 이후 날짜여야 합니다.");
    }
    if (!title || title.length > 100) {
      throw new HttpError(400, "INVALID_TITLE", "행사명은 1~100자로 입력하세요.");
    }

    const result = await pool.query(
      `INSERT INTO school_general_events
       (school_id, event_date, end_date, title, location, event_time, period, target_scope, target_grades, organizer_name, created_by)
       VALUES ($1, $2::DATE, $3::DATE, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id, event_date::TEXT AS event_date, end_date::TEXT AS end_date, title, location, event_time, period, target_scope, target_grades, organizer_name, created_by`,
      [ctx.school_id, date, endDate, title, location, eventTime, period, targetScope, targetGrades, ctx.teacher_name, teacher.id]
    );

    res.status(201).json({ event: { ...result.rows[0], isOwner: true } });
  }));

  router.delete("/teacher/general-events/:eventId", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const ctx = await getTeacherContext(teacher.id);
    if (!ctx) throw new HttpError(403, "TEACHER_REGISTRATION_REQUIRED", "학급 등록 정보를 찾을 수 없습니다.");

    const eventId = Number(req.params.eventId);
    if (!Number.isInteger(eventId) || eventId < 1) {
      throw new HttpError(400, "INVALID_EVENT", "행사를 찾을 수 없습니다.");
    }

    const isAdmin = ["관리자", "교장", "교감"].includes(ctx.teacher_type);
    const condition = isAdmin ? `id = $1 AND school_id = $2` : `id = $1 AND school_id = $2 AND created_by = $3`;
    const params = isAdmin ? [eventId, ctx.school_id] : [eventId, ctx.school_id, teacher.id];

    const result = await pool.query(
      `DELETE FROM school_general_events WHERE ${condition} RETURNING id`,
      params
    );
    if (!result.rows[0]) throw new HttpError(404, "EVENT_NOT_FOUND", "행사를 찾을 수 없거나 삭제 권한이 없습니다(등록한 담당자 또는 관리자만 삭제 가능).");
    res.json({ ok: true });
  }));

  // Read-only holiday view for the general-events page — reuses the same per-school cache
  // the school-admin public-holidays endpoints maintain (see below), just without write access.
  router.get("/teacher/public-holidays", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const ctx = await getTeacherContext(teacher.id);
    if (!ctx) throw new HttpError(403, "TEACHER_REGISTRATION_REQUIRED", "학급 등록 정보를 찾을 수 없습니다.");

    const year = Number(req.query.year || new Date().getFullYear());
    let cached = await pool.query(
      `SELECT holiday_date::TEXT AS date, name, excluded
       FROM school_public_holidays_cache WHERE school_id = $1 AND year = $2 ORDER BY holiday_date`,
      [ctx.school_id, year]
    );

    if (cached.rows.length === 0) {
      try {
        const holidays = await fetchNagerHolidays(year);
        await upsertApiHolidays(ctx.school_id, year, holidays);
        cached = await pool.query(
          `SELECT holiday_date::TEXT AS date, name, excluded
           FROM school_public_holidays_cache WHERE school_id = $1 AND year = $2 ORDER BY holiday_date`,
          [ctx.school_id, year]
        );
      } catch (err) {
        console.error("Failed to fetch live public holidays:", err.message);
      }
    }

    res.json({ year, holidays: cached.rows.filter(h => !h.excluded).map(h => ({ date: h.date, name: h.name })) });
  }));

  // Read-only vacation-period view for the general-events page (여름방학/겨울방학/학년말방학 표시용).
  router.get("/teacher/vacation-settings", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const ctx = await getTeacherContext(teacher.id);
    if (!ctx) throw new HttpError(403, "TEACHER_REGISTRATION_REQUIRED", "학급 등록 정보를 찾을 수 없습니다.");

    const year = Number(req.query.academicYear || new Date().getFullYear());
    const result = await pool.query(
      `SELECT is_integrated, summer_start::TEXT AS summer_start, summer_end::TEXT AS summer_end,
              winter_start::TEXT AS winter_start, winter_end::TEXT AS winter_end,
              spring_start::TEXT AS spring_start, spring_end::TEXT AS spring_end
       FROM school_vacation_settings
       WHERE school_id = $1 AND academic_year = $2`,
      [ctx.school_id, year]
    );
    res.json({ settings: result.rows[0] || null });
  }));

  // 2. Fetch Notice List (Parent / Student / Teacher)
  router.get("/notice/list", asyncRoute(async (req, res) => {
    let user = await sessionUser(req);
    let schoolId = null;
    let grade = null;
    let classNumber = null;
    let studentNumber = null;

    if (user && user.membership) {
      schoolId = user.membership.schoolId;
      grade = user.membership.grade;
      classNumber = user.membership.classNumber;
      studentNumber = String(user.membership.studentNumber || "");
    }

    const noticesRes = await pool.query(
      `SELECT id, school_id, sender_teacher_name, title, content_type, content_body,
              target_type, target_grade, target_class_number, target_student_numbers, requires_signature, created_at
       FROM classroom_notices
       ORDER BY created_at DESC
       LIMIT 50`
    );

    const filtered = noticesRes.rows.filter(n => {
      // Deny by default: a notice is only visible once its targeting actually
      // matches this viewer. (This used to fall through to `return true` for
      // any unmatched case, which leaked every notice -- including ones aimed
      // at a different school -- to every viewer.)
      if (n.school_id && schoolId && String(n.school_id) !== String(schoolId)) return false;
      if (n.target_type === 'all') return true;
      if (n.target_type === 'grade') return Number(n.target_grade) === Number(grade);
      if (n.target_type === 'class') {
        return Number(n.target_grade) === Number(grade) && Number(n.target_class_number) === Number(classNumber);
      }
      if (n.target_type === 'students') {
        if (Number(n.target_grade) !== Number(grade) || Number(n.target_class_number) !== Number(classNumber)) return false;
        if (!n.target_student_numbers || !studentNumber) return true;
        const nums = String(n.target_student_numbers).split(',').map(s => s.trim());
        return nums.includes(String(studentNumber));
      }
      return false;
    });

    res.json({
      notices: filtered.map(n => ({
        id: String(n.id),
        senderName: n.sender_teacher_name,
        title: n.title,
        contentType: n.content_type,
        contentBody: n.content_body,
        targetType: n.target_type,
        requiresSignature: n.requires_signature,
        createdAt: n.created_at
      }))
    });
  }));

  // Resolve which student a notice submission is for. Logged-in parents are trusted via
  // their session membership; anonymous submissions must match a real roster entry so
  // arbitrary school/grade/class/student combinations can't be injected.
  // Verifies the signed-in caller is actually this student's own account or one of
  // their registered guardian accounts before accepting a submission on that
  // student's behalf. (Previously gated on `user?.membership`, a property
  // sessionUser() never actually sets -- every submission silently fell through
  // to trusting whatever schoolId/grade/classNumber/studentNumber the client
  // sent, with no check that the signed-in account had any relationship to
  // that student at all.)
  async function resolveNoticeStudent(user, body) {
    const schoolId = Number(body?.schoolId);
    const grade = Number(body?.grade);
    const classNumber = Number(body?.classNumber);
    const studentNumber = String(body?.studentNumber || "").trim();

    if (!schoolId || !grade || !classNumber || !studentNumber) {
      throw new HttpError(400, "STUDENT_IDENTIFICATION_REQUIRED", "학교/학년/반/번호를 입력하세요.");
    }

    const rosterRes = await pool.query(
      `SELECT roster_name, student_email, guardian1_email, guardian2_email
       FROM school_students
       WHERE school_id = $1 AND grade = $2 AND class_number = $3 AND student_number = $4
       UNION ALL
       SELECT s.roster_name, s.student_email, s.guardian1_email, s.guardian2_email
       FROM classroom_students s
       JOIN classroom_classes c ON c.id = s.class_id
       WHERE c.school_id = $1 AND c.grade = $2 AND c.class_number = $3 AND s.student_number = $4
       LIMIT 1`,
      [schoolId, grade, classNumber, studentNumber]
    );
    const row = rosterRes.rows[0];
    if (!row) {
      throw new HttpError(400, "STUDENT_NOT_FOUND", "입력하신 학년/반/번호와 일치하는 학생을 찾을 수 없습니다.");
    }

    if (!user) {
      throw new HttpError(401, "SIGN_IN_REQUIRED", "제출하려면 로그인이 필요합니다.");
    }
    const email = String(user.email || "").toLowerCase();
    const isThisStudent = row.student_email && String(row.student_email).toLowerCase() === email;
    const isGuardian = (row.guardian1_email && String(row.guardian1_email).toLowerCase() === email)
      || (row.guardian2_email && String(row.guardian2_email).toLowerCase() === email);
    if (!isThisStudent && !isGuardian) {
      throw new HttpError(403, "NOT_AUTHORIZED_FOR_STUDENT", "본인 또는 보호자로 등록된 구글 계정으로 로그인해야 제출할 수 있습니다.");
    }

    return { schoolId, grade, classNumber, studentNumber, studentName: row.roster_name };
  }

  // 3. Quick Attendance Alert (Parent -> Teacher)
  router.post("/notice/quick-absence", asyncRoute(async (req, res) => {
    let user = await sessionUser(req);
    const noticeType = String(req.body?.noticeType || "결석").trim();
    const expectedDate = String(req.body?.expectedDate || "").trim();
    const reason = String(req.body?.reason || "").trim();

    if (!expectedDate || !reason) {
      throw new HttpError(400, "DATE_AND_REASON_REQUIRED", "날짜와 사유를 입력하세요.");
    }

    const { schoolId, grade, classNumber, studentNumber, studentName } = await resolveNoticeStudent(user, req.body);

    const insertRes = await pool.query(
      `INSERT INTO classroom_absence_notices
         (school_id, grade, class_number, student_number, student_name, notice_type, expected_date, reason)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, created_at`,
      [schoolId, grade, classNumber, studentNumber, studentName, noticeType, expectedDate, reason]
    );

    res.status(201).json({ ok: true, id: String(insertRes.rows[0].id) });
  }));

  // 4. Quick Attendance Inbox (Teacher)
  router.get("/teacher/quick-absences", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const result = await pool.query(
      `SELECT n.id, n.grade, n.class_number, n.student_number, n.student_name, n.notice_type, n.expected_date, n.reason, n.created_at
       FROM classroom_absence_notices n
       JOIN classroom_teachers t ON t.user_id = $1 AND t.grade = n.grade AND t.class_number = n.class_number
       WHERE n.school_id = t.school_id
       ORDER BY n.created_at DESC
       LIMIT 100`,
      [teacher.id]
    );

    res.json({
      alerts: result.rows.map(r => ({
        id: String(r.id),
        grade: r.grade,
        classNumber: r.class_number,
        studentNumber: r.student_number,
        studentName: r.student_name,
        noticeType: r.notice_type,
        expectedDate: r.expected_date,
        reason: r.reason,
        createdAt: r.created_at
      }))
    });
  }));

  // 5. Absence Notes Submit (Parent -> Teacher)
  router.post("/notice/absence-notes", asyncRoute(async (req, res) => {
    let user = await sessionUser(req);
    const startDate = String(req.body?.startDate || "").trim();
    const endDate = String(req.body?.endDate || "").trim();
    const totalDays = Number(req.body?.totalDays || 1);
    const reasonType = String(req.body?.reasonType || "질병결석").trim();
    const reasonDetail = String(req.body?.reasonDetail || "").trim();
    const evidenceUrl = String(req.body?.evidenceUrl || "").trim();
    const parentName = String(req.body?.parentName || "").trim();
    const parentSignature = String(req.body?.parentSignature || "").trim();

    if (!startDate || !endDate || !reasonDetail || !parentName || !parentSignature) {
      throw new HttpError(400, "MISSING_REQUIRED_FIELDS", "필수 입력 항목(기간, 사유, 보호자 성명 및 전자서명)을 작성해 주세요.");
    }

    const { schoolId, grade, classNumber, studentNumber, studentName } = await resolveNoticeStudent(user, req.body);

    const insertRes = await pool.query(
      `INSERT INTO classroom_absence_notes
         (school_id, grade, class_number, student_number, student_name, start_date, end_date, total_days, reason_type, reason_detail, evidence_url, parent_name, parent_signature, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'pending')
       RETURNING id, created_at`,
      [schoolId, grade, classNumber, studentNumber, studentName, startDate, endDate, totalDays, reasonType, reasonDetail, evidenceUrl, parentName, parentSignature]
    );

    res.status(201).json({ ok: true, id: String(insertRes.rows[0].id) });
  }));

  // 6. Absence Notes Inbox & Approve (Teacher)
  router.get("/teacher/absence-notes", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const result = await pool.query(
      `SELECT a.id, a.grade, a.class_number, a.student_number, a.student_name, a.start_date, a.end_date, a.total_days, a.reason_type, a.reason_detail, a.evidence_url, a.parent_name, a.parent_signature, a.status, a.created_at
       FROM classroom_absence_notes a
       JOIN classroom_teachers t ON t.user_id = $1 AND t.grade = a.grade AND t.class_number = a.class_number
       WHERE a.school_id = t.school_id
       ORDER BY a.created_at DESC
       LIMIT 100`,
      [teacher.id]
    );

    res.json({
      notes: result.rows.map(r => ({
        id: String(r.id),
        grade: r.grade,
        classNumber: r.class_number,
        studentNumber: r.student_number,
        studentName: r.student_name,
        startDate: r.start_date,
        endDate: r.end_date,
        totalDays: r.total_days,
        reasonType: r.reason_type,
        reasonDetail: r.reason_detail,
        evidenceUrl: r.evidence_url,
        parentName: r.parent_name,
        parentSignature: r.parent_signature,
        status: r.status,
        createdAt: r.created_at
      }))
    });
  }));

  router.patch("/teacher/absence-notes/:id/approve", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const id = Number(req.params.id);
    const status = String(req.body?.status || "approved").trim();

    const updateRes = await pool.query(
      `UPDATE classroom_absence_notes a
       SET status = $1, teacher_check = 'approved'
       WHERE a.id = $2
         AND EXISTS (
           SELECT 1 FROM classroom_teachers t
           WHERE t.user_id = $3 AND t.grade = a.grade AND t.class_number = a.class_number
         )
       RETURNING a.id, a.status`,
      [status, id, teacher.id]
    );

    if (!updateRes.rows[0]) throw new HttpError(404, "NOT_FOUND", "결석계를 찾을 수 없습니다.");
    res.json({ ok: true, id: String(updateRes.rows[0].id), status: updateRes.rows[0].status });
  }));

  // 7. Experiential Learning Application & Report API
  router.post("/notice/experiential-apps", asyncRoute(async (req, res) => {
    let user = await sessionUser(req);
    const startDate = String(req.body?.startDate || "").trim();
    const endDate = String(req.body?.endDate || "").trim();
    const totalDays = Number(req.body?.totalDays || 1);
    const destination = String(req.body?.location || req.body?.destination || "").trim();
    const planDetail = String(req.body?.planDetail || "").trim();
    const parentPhone = String(req.body?.parentPhone || "").trim();
    const parentName = String(req.body?.parentName || "").trim();
    const parentSignature = String(req.body?.parentSignature || "").trim();

    if (!startDate || !endDate || !destination || !planDetail || !parentName || !parentSignature) {
      throw new HttpError(400, "MISSING_REQUIRED_FIELDS", "필수 입력 항목(기간, 목적지, 학습계획, 보호자 성명 및 서명)을 입력하세요.");
    }

    const { schoolId, grade, classNumber, studentNumber, studentName } = await resolveNoticeStudent(user, req.body);

    const insertRes = await pool.query(
      `INSERT INTO classroom_experiential_apps
         (school_id, grade, class_number, student_number, student_name, parent_phone, start_date, end_date, total_days, location, plan_detail, parent_name, parent_signature, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'pending')
       RETURNING id, created_at`,
      [schoolId, grade, classNumber, studentNumber, studentName, parentPhone, startDate, endDate, totalDays, destination, planDetail, parentName, parentSignature]
    );

    res.status(201).json({ ok: true, id: String(insertRes.rows[0].id) });
  }));

  router.post("/notice/experiential-reports", asyncRoute(async (req, res) => {
    let user = await sessionUser(req);
    const startDate = String(req.body?.startDate || "").trim();
    const endDate = String(req.body?.endDate || "").trim();
    const totalDays = Number(req.body?.totalDays || 1);
    const destination = String(req.body?.location || req.body?.destination || "").trim();
    const reportDetail = String(req.body?.reportDetail || "").trim();
    const photoUrl = String(req.body?.photoUrl || "").trim();
    const parentName = String(req.body?.parentName || "").trim();
    const parentSignature = String(req.body?.parentSignature || "").trim();

    if (!startDate || !endDate || !destination || !reportDetail || !parentName || !parentSignature) {
      throw new HttpError(400, "MISSING_REQUIRED_FIELDS", "필수 입력 항목(기간, 목적지, 보고서 내용, 보호자 서명)을 입력하세요.");
    }

    const { schoolId, grade, classNumber, studentNumber, studentName } = await resolveNoticeStudent(user, req.body);

    const insertRes = await pool.query(
      `INSERT INTO classroom_experiential_reports
         (school_id, grade, class_number, student_number, student_name, start_date, end_date, total_days, location, report_detail, photo_url, parent_name, parent_signature, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'pending')
       RETURNING id, created_at`,
      [schoolId, grade, classNumber, studentNumber, studentName, startDate, endDate, totalDays, destination, reportDetail, photoUrl, parentName, parentSignature]
    );

    res.status(201).json({ ok: true, id: String(insertRes.rows[0].id) });
  }));

  // 학부모/학생이 낸 결석계·체험학습 신청서가 승인됐는지 확인할 방법이 없었다 --
  // 제출 후 조용히 잠기는 문제. 로그인한 학생 본인, 또는 학부모라면 연결된
  // 자녀 전원의 최근 제출 내역과 상태(검토 중/승인됨)를 함께 보여준다.
  router.get("/notice/my-submissions", asyncRoute(async (req, res) => {
    const user = await sessionUser(req);
    if (!user) return res.json({ submissions: [] });

    let targets = [];
    const membership = await studentMembership(user.id);
    if (membership) {
      targets = [{
        schoolId: null, grade: membership.grade, classNumber: membership.classNumber,
        studentNumber: membership.studentNumber, studentName: membership.studentName
      }];
      // studentMembership() doesn't return school_id -- look it up once.
      const schoolRes = await pool.query(
        `SELECT s.id FROM school_students s WHERE s.user_id = $1
         UNION ALL
         SELECT sc.id FROM classroom_students s
          JOIN classroom_classes c ON c.id = s.class_id JOIN classroom_schools sc ON sc.id = c.school_id
          WHERE s.user_id = $1
         LIMIT 1`,
        [user.id]
      );
      if (schoolRes.rows[0]) targets[0].schoolId = schoolRes.rows[0].id;
    } else {
      const children = await getGuardianChildren(user);
      targets = children.map(c => ({
        schoolId: c.schoolId, grade: c.grade, classNumber: c.classNumber,
        studentNumber: c.studentNumber, studentName: c.studentName
      }));
    }
    targets = targets.filter(t => t.schoolId && t.grade && t.classNumber && t.studentNumber);
    if (targets.length === 0) return res.json({ submissions: [] });

    const submissions = [];
    for (const t of targets) {
      const notesRes = await pool.query(
        `SELECT id, start_date, end_date, reason_type, status, created_at
         FROM classroom_absence_notes
         WHERE school_id = $1 AND grade = $2 AND class_number = $3 AND student_number = $4
         ORDER BY created_at DESC LIMIT 20`,
        [t.schoolId, t.grade, t.classNumber, t.studentNumber]
      );
      notesRes.rows.forEach(r => submissions.push({
        id: String(r.id), type: "absenceNote", studentName: t.studentName,
        startDate: r.start_date, endDate: r.end_date, detail: r.reason_type,
        status: r.status, createdAt: r.created_at
      }));

      const appsRes = await pool.query(
        `SELECT id, start_date, end_date, location, status, created_at
         FROM classroom_experiential_apps
         WHERE school_id = $1 AND grade = $2 AND class_number = $3 AND student_number = $4
         ORDER BY created_at DESC LIMIT 20`,
        [t.schoolId, t.grade, t.classNumber, t.studentNumber]
      );
      appsRes.rows.forEach(r => submissions.push({
        id: String(r.id), type: "experientialApp", studentName: t.studentName,
        startDate: r.start_date, endDate: r.end_date, detail: r.location,
        status: r.status, createdAt: r.created_at
      }));
    }
    submissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ submissions });
  }));

  router.get("/teacher/experiential-apps", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const appsRes = await pool.query(
      `SELECT e.id, e.grade, e.class_number, e.student_number, e.student_name, e.parent_phone, e.start_date, e.end_date, e.total_days, e.location, e.plan_detail, e.parent_name, e.parent_signature, e.status, e.created_at
       FROM classroom_experiential_apps e
       JOIN classroom_teachers t ON t.user_id = $1 AND t.grade = e.grade AND t.class_number = e.class_number
       WHERE e.school_id = t.school_id
       ORDER BY e.created_at DESC
       LIMIT 100`,
      [teacher.id]
    );

    const reportsRes = await pool.query(
      `SELECT r.id, r.grade, r.class_number, r.student_number, r.student_name, r.start_date, r.end_date, r.total_days, r.location, r.report_detail, r.photo_url, r.parent_name, r.parent_signature, r.status, r.created_at
       FROM classroom_experiential_reports r
       JOIN classroom_teachers t ON t.user_id = $1 AND t.grade = r.grade AND t.class_number = r.class_number
       WHERE r.school_id = t.school_id
       ORDER BY r.created_at DESC
       LIMIT 100`,
      [teacher.id]
    );

    res.json({
      applications: appsRes.rows.map(a => ({
        id: String(a.id),
        grade: a.grade,
        classNumber: a.class_number,
        studentNumber: a.student_number,
        studentName: a.student_name,
        parentPhone: a.parent_phone,
        startDate: a.start_date,
        endDate: a.end_date,
        totalDays: a.total_days,
        location: a.location,
        planDetail: a.plan_detail,
        parentName: a.parent_name,
        parentSignature: a.parent_signature,
        status: a.status,
        createdAt: a.created_at
      })),
      reports: reportsRes.rows.map(r => ({
        id: String(r.id),
        grade: r.grade,
        classNumber: r.class_number,
        studentNumber: r.student_number,
        studentName: r.student_name,
        startDate: r.start_date,
        endDate: r.end_date,
        totalDays: r.total_days,
        location: r.location,
        reportDetail: r.report_detail,
        photoUrl: r.photo_url,
        parentName: r.parent_name,
        parentSignature: r.parent_signature,
        status: r.status,
        createdAt: r.created_at
      }))
    });
  }));

  router.patch("/teacher/experiential-apps/:id/approve", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const id = Number(req.params.id);
    const type = String(req.query.type || "app");
    const status = String(req.body?.status || "approved").trim();

    const table = type === "report" ? "classroom_experiential_reports" : "classroom_experiential_apps";
    const updateRes = await pool.query(
      `UPDATE ${table} e
       SET status = $1
       WHERE e.id = $2
         AND EXISTS (
           SELECT 1 FROM classroom_teachers t
           WHERE t.user_id = $3 AND t.grade = e.grade AND t.class_number = e.class_number
         )
       RETURNING e.id`,
      [status, id, teacher.id]
    );
    if (!updateRes.rows[0]) throw new HttpError(404, "NOT_FOUND", "신청서를 찾을 수 없습니다.");

    res.json({ ok: true, id: String(id), status });
  }));

  // 8. Official Form Print Data (Teacher / School Admin)
  const NOTICE_DOC_TABLES = {
    absence: "classroom_absence_notes",
    exp_app: "classroom_experiential_apps",
    exp_report: "classroom_experiential_reports"
  };

  function formatNoticeDocResponse(formType, row) {
    const created = new Date(row.created_at);
    const base = {
      year: created.getFullYear(),
      month: created.getMonth() + 1,
      day: created.getDate(),
      grade: row.grade,
      classNumber: row.class_number,
      studentNumber: row.student_number,
      studentName: row.student_name,
      gender: row.gender,
      startDate: row.start_date,
      endDate: row.end_date,
      totalDays: row.total_days,
      parentName: row.parent_name,
      parentSignature: row.parent_signature
    };
    if (formType === "absence") {
      return {
        ...base,
        reasonType: row.reason_type,
        reasonDetail: row.reason_detail,
        evidenceUrl: row.evidence_url,
        teacherCheck: row.teacher_check
      };
    }
    if (formType === "exp_app") {
      return { ...base, parentPhone: row.parent_phone, location: row.location, planDetail: row.plan_detail };
    }
    return { ...base, location: row.location, reportDetail: row.report_detail, photoUrl: row.photo_url };
  }

  router.get("/notice/docs/:formType/:docId", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const formType = String(req.params.formType || "");
    const docId = Number(req.params.docId);
    const table = NOTICE_DOC_TABLES[formType];
    if (!table || !Number.isInteger(docId)) {
      throw new HttpError(400, "INVALID_DOC_REQUEST", "잘못된 서식 요청입니다.");
    }

    const teacherRow = await pool.query(
      `SELECT school_id, teacher_type FROM classroom_teachers WHERE user_id = $1 AND active = TRUE`,
      [teacher.id]
    );
    const teacherInfo = teacherRow.rows[0];
    if (!teacherInfo) throw new HttpError(403, "TEACHER_REGISTRATION_REQUIRED", "교사 등록 정보가 없습니다.");
    const isAdmin = ["관리자", "교장", "교감"].includes(teacherInfo.teacher_type);

    const scopeClause = isAdmin
      ? "d.school_id = $2"
      : `d.school_id = $2 AND EXISTS (
           SELECT 1 FROM classroom_teachers t
           WHERE t.user_id = $3 AND t.grade = d.grade AND t.class_number = d.class_number
         )`;
    const params = isAdmin ? [docId, teacherInfo.school_id] : [docId, teacherInfo.school_id, teacher.id];

    const result = await pool.query(`SELECT d.* FROM ${table} d WHERE d.id = $1 AND ${scopeClause}`, params);
    const row = result.rows[0];
    if (!row) throw new HttpError(404, "NOT_FOUND", "문서를 찾을 수 없습니다.");

    res.json(formatNoticeDocResponse(formType, row));
  }));

  // --- Classboard (학급 알리미) API ---
  router.get("/classboard/posts", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    const classId = await userClassId(user);
    if (!classId) return res.json({ posts: [] });

    const postsResult = await pool.query(
      `SELECT p.id, p.content, p.created_at, p.updated_at,
              u.display_name as author_name, u.picture_url as author_picture,
              u.role as author_role, p.author_user_id
       FROM classroom_classboard_posts p
       JOIN classroom_users u ON u.id = p.author_user_id
       WHERE p.class_id = $1
       ORDER BY p.created_at DESC`,
      [classId]
    );

    const commentsResult = await pool.query(
      `SELECT c.id, c.post_id, c.content, c.created_at, c.updated_at,
              u.display_name as author_name, u.picture_url as author_picture,
              u.role as author_role, c.author_user_id
       FROM classroom_classboard_comments c
       JOIN classroom_classboard_posts p ON p.id = c.post_id
       JOIN classroom_users u ON u.id = c.author_user_id
       WHERE p.class_id = $1
       ORDER BY c.created_at ASC`,
      [classId]
    );

    const posts = postsResult.rows.map(row => {
      const postComments = commentsResult.rows
        .filter(c => String(c.post_id) === String(row.id))
        .map(c => ({
          id: String(c.id),
          content: c.content,
          authorName: c.author_name,
          authorPicture: c.author_picture,
          authorRole: c.author_role,
          isMine: c.author_user_id === user.id,
          createdAt: c.created_at
        }));
      return {
        id: String(row.id),
        content: row.content,
        authorName: row.author_name,
        authorPicture: row.author_picture,
        authorRole: row.author_role,
        isMine: row.author_user_id === user.id,
        createdAt: row.created_at,
        comments: postComments
      };
    });

    res.json({ posts });
  }));

  router.post("/classboard/posts", asyncRoute(async (req, res) => {
    const user = await requireTeacher(req);
    const classId = await userClassId(user);
    if (!classId) throw new HttpError(403, "NO_CLASS", "선생님은 배정된 학급이 없습니다.");
    
    const content = String(req.body?.content || "").trim();
    if (!content) throw new HttpError(400, "INVALID_CONTENT", "내용을 입력해주세요.");

    const result = await pool.query(
      `INSERT INTO classroom_classboard_posts (class_id, author_user_id, content)
       VALUES ($1, $2, $3) RETURNING id`,
      [classId, user.id, content]
    );
    res.json({ ok: true, id: String(result.rows[0].id) });
  }));

  router.delete("/classboard/posts/:postId", asyncRoute(async (req, res) => {
    const user = await requireTeacher(req);
    const classId = await userClassId(user);
    const postId = Number(req.params.postId);

    await pool.query(
      `DELETE FROM classroom_classboard_posts WHERE id = $1 AND class_id = $2`,
      [postId, classId]
    );
    res.json({ ok: true });
  }));

  router.post("/classboard/posts/:postId/comments", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    const classId = await userClassId(user);
    if (!classId) throw new HttpError(403, "NO_CLASS", "소속된 학급이 없습니다.");

    const postId = Number(req.params.postId);
    const content = String(req.body?.content || "").trim();
    if (!content) throw new HttpError(400, "INVALID_CONTENT", "내용을 입력해주세요.");

    const postCheck = await pool.query(
      `SELECT 1 FROM classroom_classboard_posts WHERE id = $1 AND class_id = $2`,
      [postId, classId]
    );
    if (postCheck.rowCount === 0) throw new HttpError(404, "NOT_FOUND", "게시글을 찾을 수 없습니다.");

    const result = await pool.query(
      `INSERT INTO classroom_classboard_comments (post_id, author_user_id, content)
       VALUES ($1, $2, $3) RETURNING id`,
      [postId, user.id, content]
    );
    res.json({ ok: true, id: String(result.rows[0].id) });
  }));

  router.delete("/classboard/posts/:postId/comments/:commentId", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    const classId = await userClassId(user);
    if (!classId) throw new HttpError(403, "NO_CLASS", "소속된 학급이 없습니다.");

    const commentId = Number(req.params.commentId);
    
    if (user.role === 'teacher') {
      await pool.query(
        `DELETE FROM classroom_classboard_comments c
         USING classroom_classboard_posts p
         WHERE c.id = $1 AND c.post_id = p.id AND p.class_id = $2`,
        [commentId, classId]
      );
    } else {
      await pool.query(
        `DELETE FROM classroom_classboard_comments c
         USING classroom_classboard_posts p
         WHERE c.id = $1 AND c.post_id = p.id AND p.class_id = $2 AND c.author_user_id = $3`,
        [commentId, classId, user.id]
      );
    }
    res.json({ ok: true });
  }));

  // School Admin (Principal / Vice Principal) APIs
  router.get("/school-admin/dashboard", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const date = String(req.query.date || new Date().toISOString().split('T')[0]);
    
    // Total students per class
    const rosterRes = await pool.query(
      `SELECT g.grade, g.class_number, COUNT(DISTINCT g.st_id) as total_students
       FROM (
         SELECT grade, class_number, id::TEXT as st_id FROM school_students WHERE school_id = $1
         UNION ALL
         SELECT c.grade, c.class_number, s.id::TEXT as st_id
         FROM classroom_classes c
         JOIN classroom_students s ON s.class_id = c.id
         WHERE c.school_id = $1
       ) g
       WHERE g.grade IS NOT NULL AND g.class_number IS NOT NULL
       GROUP BY g.grade, g.class_number
       ORDER BY g.grade, g.class_number`,
      [profile.school_id]
    );

    // Absence notices for the date
    const absenceRes = await pool.query(
      `SELECT grade, class_number, notice_type, COUNT(*) as count
       FROM classroom_absence_notices
       WHERE school_id = $1 AND expected_date = $2
       GROUP BY grade, class_number, notice_type`,
      [profile.school_id, date]
    );

    // Formal absence notes for the date (spanning start_date to end_date)
    const formalNotesRes = await pool.query(
      `SELECT grade, class_number, COUNT(*) as count
       FROM classroom_absence_notes
       WHERE school_id = $1 AND start_date <= $2 AND end_date >= $2 AND status = 'approved'
       GROUP BY grade, class_number`,
      [profile.school_id, date]
    );

    // Approved experiential learning applications for the date (spanning start_date to end_date)
    const experientialAppsRes = await pool.query(
      `SELECT grade, class_number, COUNT(*) as count
       FROM classroom_experiential_apps
       WHERE school_id = $1 AND start_date <= $2 AND end_date >= $2 AND status = 'approved'
       GROUP BY grade, class_number`,
      [profile.school_id, date]
    );

    res.json({
      schoolName: profile.school_name,
      date,
      roster: rosterRes.rows,
      notices: absenceRes.rows,
      formalNotes: formalNotesRes.rows,
      experientialApps: experientialAppsRes.rows
    });
  }));

  router.get("/school-admin/students", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);

    // school_students (the whole-school roster admins actually maintain) is the
    // source of truth; classroom_students only fills in students that exist
    // there but not yet in school_students (legacy per-teacher entries). This
    // used to go classroom_teachers -> classroom_classes -> classroom_students,
    // which silently dropped an entire homeroom's students whenever that
    // teacher hadn't been auto-provisioned into classroom_classes yet.
    const result = await pool.query(
      `SELECT grade, class_number, student_number, name FROM (
         SELECT grade, class_number, student_number, roster_name AS name
         FROM school_students
         WHERE school_id = $1
         UNION ALL
         SELECT c.grade, c.class_number, s.student_number, s.roster_name AS name
         FROM classroom_students s
         JOIN classroom_classes c ON c.id = s.class_id
         WHERE c.school_id = $1
           AND NOT EXISTS (
             SELECT 1 FROM school_students ss
             WHERE ss.school_id = $1 AND ss.grade = c.grade AND ss.class_number = c.class_number
               AND ss.student_number = s.student_number
           )
       ) combined
       ORDER BY grade, class_number,
                NULLIF(regexp_replace(student_number, '\\D', '', 'g'), '')::int`,
      [profile.school_id]
    );

    res.json({
      schoolName: profile.school_name,
      students: result.rows
    });
  }));

  router.get("/school-admin/annual-schedules", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const result = await pool.query(
      `SELECT id, academic_year, event_date::TEXT AS event_date, title, category, target_scope, target_grades, event_type,
              COALESCE(event_periods, 6) AS event_periods,
              COALESCE(grade_periods, '{}'::jsonb) AS grade_periods,
              details, created_at
       FROM school_annual_schedules
       WHERE school_id = $1 AND academic_year = $2
       ORDER BY event_date, id`,
      [profile.school_id, year]
    );
    res.json({
      schoolName: profile.school_name,
      academicYear: year,
      schedules: result.rows
    });
  }));

  router.post("/school-admin/annual-schedules", asyncRoute(async (req, res) => {
    const { user, profile } = await requireSchoolAdmin(req);
    const academicYear = Number(req.body?.academicYear || new Date().getFullYear());
    const date = String(req.body?.date || "").trim();
    const title = String(req.body?.title || "").normalize("NFC").trim();
    const category = String(req.body?.category || "EVENT").toUpperCase();
    const targetScope = String(req.body?.targetScope || "ALL").toUpperCase();
    const targetGrades = Array.isArray(req.body?.targetGrades) ? req.body.targetGrades.map(Number).filter(n => n >= 1 && n <= 12) : [];
    const eventType = String(req.body?.eventType || "FULL").toUpperCase();
    const eventPeriods = Math.min(8, Math.max(0, Number(req.body?.eventPeriods || (category === 'DISCRETIONARY' ? 0 : 6))));
    const gradePeriods = typeof req.body?.gradePeriods === 'object' && req.body?.gradePeriods !== null ? req.body.gradePeriods : {};
    const details = String(req.body?.details || "").normalize("NFC").trim();

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new HttpError(400, "INVALID_DATE", "유효한 날짜를 입력하세요.");
    }
    if (!title || title.length > 60) {
      throw new HttpError(400, "INVALID_TITLE", "일정 제목은 1~60자로 입력하세요.");
    }

    const result = await pool.query(
      `INSERT INTO school_annual_schedules
       (school_id, academic_year, event_date, title, category, target_scope, target_grades, event_type, event_periods, grade_periods, details, created_by)
       VALUES ($1, $2, $3::DATE, $4, $5, $6, $7, $8, $9, $10::jsonb, $11, $12)
       RETURNING id, academic_year, event_date::TEXT AS event_date, title, category, target_scope, target_grades, event_type, event_periods, grade_periods, details`,
      [profile.school_id, academicYear, date, title, category, targetScope, targetGrades, eventType, eventPeriods, JSON.stringify(gradePeriods), details, user.id]
    );

    res.status(201).json({ schedule: result.rows[0] });
  }));

  router.delete("/school-admin/annual-schedules/:scheduleId", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const scheduleId = Number(req.params.scheduleId);
    if (!Number.isInteger(scheduleId) || scheduleId < 1) {
      throw new HttpError(400, "INVALID_SCHEDULE", "일정을 찾을 수 없습니다.");
    }
    const result = await pool.query(
      `DELETE FROM school_annual_schedules WHERE id = $1 AND school_id = $2 RETURNING id`,
      [scheduleId, profile.school_id]
    );
    if (!result.rows[0]) throw new HttpError(404, "SCHEDULE_NOT_FOUND", "일정을 찾을 수 없거나 삭제 권한이 없습니다.");
    res.json({ ok: true });
  }));

  // ── Public Holidays: DB-cached + admin-correctable ──
  // Cache is per-school so a school admin's manual corrections never affect other schools.
  async function fetchNagerHolidays(year) {
    const resp = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/KR`);
    if (!resp.ok) throw new Error(`Nager.Date API responded ${resp.status}`);
    const data = await resp.json();
    return data.map(h => ({ date: h.date, name: h.localName || h.name }));
  }

  // Upserts freshly-fetched holidays into the cache, but never overwrites a row
  // the school admin has manually added, renamed, or excluded (source = 'MANUAL').
  async function upsertApiHolidays(schoolId, year, holidays) {
    for (const h of holidays) {
      await pool.query(
        `INSERT INTO school_public_holidays_cache (school_id, year, holiday_date, name, source, excluded)
         VALUES ($1, $2, $3::DATE, $4, 'API', FALSE)
         ON CONFLICT (school_id, year, holiday_date) DO UPDATE
         SET name = EXCLUDED.name, updated_at = NOW()
         WHERE school_public_holidays_cache.source = 'API'`,
        [schoolId, year, h.date, h.name]
      );
    }
  }

  router.get("/school-admin/public-holidays", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.year || new Date().getFullYear());

    let cached = await pool.query(
      `SELECT id, holiday_date::TEXT AS date, name, source, excluded
       FROM school_public_holidays_cache WHERE school_id = $1 AND year = $2 ORDER BY holiday_date`,
      [profile.school_id, year]
    );

    if (cached.rows.length === 0) {
      try {
        const holidays = await fetchNagerHolidays(year);
        await upsertApiHolidays(profile.school_id, year, holidays);
        cached = await pool.query(
          `SELECT id, holiday_date::TEXT AS date, name, source, excluded
           FROM school_public_holidays_cache WHERE school_id = $1 AND year = $2 ORDER BY holiday_date`,
          [profile.school_id, year]
        );
      } catch (err) {
        console.error("Failed to fetch live public holidays:", err.message);
      }
    }

    res.json({
      year,
      holidays: cached.rows
        .filter(h => !h.excluded)
        .map(h => ({ date: h.date, localName: h.name, name: h.name })),
      all: cached.rows
    });
  }));

  // Re-fetches from the source API and refreshes API-sourced rows (manual overrides are untouched).
  router.post("/school-admin/public-holidays/refresh", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.body?.year || new Date().getFullYear());
    const holidays = await fetchNagerHolidays(year);
    await upsertApiHolidays(profile.school_id, year, holidays);
    const result = await pool.query(
      `SELECT id, holiday_date::TEXT AS date, name, source, excluded
       FROM school_public_holidays_cache WHERE school_id = $1 AND year = $2 ORDER BY holiday_date`,
      [profile.school_id, year]
    );
    res.json({ year, all: result.rows });
  }));

  // Manual correction: add a missing holiday (e.g. a newly-announced election day) or
  // exclude/rename one the admin knows is wrong for their school.
  router.post("/school-admin/public-holidays", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.body?.year || new Date().getFullYear());
    const date = String(req.body?.date || "").trim();
    const name = String(req.body?.name || "").normalize("NFC").trim();
    const excluded = Boolean(req.body?.excluded);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new HttpError(400, "INVALID_DATE", "유효한 날짜를 입력하세요.");
    }
    if (!excluded && (!name || name.length > 60)) {
      throw new HttpError(400, "INVALID_NAME", "공휴일 이름은 1~60자로 입력하세요.");
    }

    const result = await pool.query(
      `INSERT INTO school_public_holidays_cache (school_id, year, holiday_date, name, source, excluded)
       VALUES ($1, $2, $3::DATE, $4, 'MANUAL', $5)
       ON CONFLICT (school_id, year, holiday_date) DO UPDATE
       SET name = EXCLUDED.name, source = 'MANUAL', excluded = EXCLUDED.excluded, updated_at = NOW()
       RETURNING id, holiday_date::TEXT AS date, name, source, excluded`,
      [profile.school_id, year, date, name || '제외됨', excluded]
    );
    res.status(201).json({ holiday: result.rows[0] });
  }));

  // Reverts a manual correction back to whatever the source API says (deletes the override row).
  router.delete("/school-admin/public-holidays/:holidayId", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const holidayId = Number(req.params.holidayId);
    if (!Number.isInteger(holidayId) || holidayId < 1) {
      throw new HttpError(400, "INVALID_HOLIDAY", "공휴일 항목을 찾을 수 없습니다.");
    }
    const result = await pool.query(
      `DELETE FROM school_public_holidays_cache WHERE id = $1 AND school_id = $2 RETURNING id`,
      [holidayId, profile.school_id]
    );
    if (!result.rows[0]) throw new HttpError(404, "HOLIDAY_NOT_FOUND", "항목을 찾을 수 없거나 삭제 권한이 없습니다.");
    res.json({ ok: true });
  }));

  // ── Curriculum Hours APIs ──
  const CURRICULUM_CATEGORIES = new Set(["SUBJECT", "CHANGTAE"]);

  function parseCurriculumGrade(value) {
    const grade = Number(value);
    if (!Number.isInteger(grade) || grade < 1 || grade > 12) {
      throw new HttpError(400, "INVALID_GRADE", "학년은 1~12 사이의 정수여야 합니다.");
    }
    return grade;
  }

  router.get("/school-admin/curriculum-hours", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const grade = parseCurriculumGrade(req.query.grade || 1);
    const result = await pool.query(
      `SELECT subject_name, weekly_hours, annual_required_hours, category
       FROM school_curriculum_hours
       WHERE school_id = $1 AND academic_year = $2 AND grade = $3
       ORDER BY category, id`,
      [profile.school_id, year, grade]
    );

    // 2022 개정 교육과정 기준시수는 학년군(1-2, 3-4, 5-6) 단위로 정해지므로, 각 군의
    // 두 번째 학년(2/4/6)에서는 첫 번째 학년(작년, 한 학년 아래)에 이미 배정한 시수를
    // 참고용으로 같이 보여준다. 편집이나 재계산에는 관여하지 않음 -- 순수 참고 정보.
    let previousYear = null;
    if (grade % 2 === 0 && grade > 1) {
      const prevResult = await pool.query(
        `SELECT subject_name, weekly_hours, annual_required_hours, category
         FROM school_curriculum_hours
         WHERE school_id = $1 AND academic_year = $2 AND grade = $3
         ORDER BY category, id`,
        [profile.school_id, year - 1, grade - 1]
      );
      previousYear = { academicYear: year - 1, grade: grade - 1, hours: prevResult.rows };
    }

    res.json({ hours: result.rows, previousYear });
  }));

  // Total weekly hours per grade (all subjects/changtae summed) — used to validate that
  // the weekly period allocation (시정표 탭) actually adds up to what curriculum hours requires.
  router.get("/school-admin/curriculum-hours-summary", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const result = await pool.query(
      `SELECT grade, COALESCE(SUM(weekly_hours), 0) AS total_weekly_hours
       FROM school_curriculum_hours
       WHERE school_id = $1 AND academic_year = $2
       GROUP BY grade`,
      [profile.school_id, year]
    );
    res.json({ totals: result.rows.map(r => ({ grade: r.grade, totalWeeklyHours: Number(r.total_weekly_hours) })) });
  }));

  router.post("/school-admin/curriculum-hours", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.body?.academicYear || new Date().getFullYear());
    const grade = parseCurriculumGrade(req.body?.grade || 1);
    const hoursList = Array.isArray(req.body?.hours) ? req.body.hours : [];

    for (const item of hoursList) {
      const subjectName = String(item.subjectName || "").trim().slice(0, 100);
      const weeklyHours = Math.min(40, Math.max(0, Math.round(Number(item.weeklyHours || 0) * 10) / 10));
      const annualRequiredHours = Math.min(2000, Math.max(0, Math.round(Number(item.annualRequiredHours || 0))));
      const category = String(item.category || "SUBJECT").toUpperCase();

      if (!subjectName) continue;
      if (!CURRICULUM_CATEGORIES.has(category)) {
        throw new HttpError(400, "INVALID_CATEGORY", `알 수 없는 교과 구분입니다: ${category}`);
      }

      await pool.query(
        `INSERT INTO school_curriculum_hours (school_id, academic_year, grade, subject_name, weekly_hours, annual_required_hours, category)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (school_id, academic_year, grade, subject_name) DO UPDATE
         SET weekly_hours = EXCLUDED.weekly_hours,
             annual_required_hours = EXCLUDED.annual_required_hours,
             category = EXCLUDED.category,
             updated_at = NOW()`,
        [profile.school_id, year, grade, subjectName, weeklyHours, annualRequiredHours, category]
      );
    }
    res.json({ ok: true });
  }));

  // ── Bell Schedule (시정표) APIs ──
  // Stored per-grade (not a fixed 1~3/4~6 band) since schools vary: some run one
  // schedule for all grades, some split by band, some differ grade-by-grade.
  router.get("/school-admin/bell-schedule", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const result = await pool.query(
      `SELECT grade, arrival_start::TEXT AS arrival_start, arrival_end::TEXT AS arrival_end,
              period_times, lunch_after_period, lunch_start::TEXT AS lunch_start, lunch_end::TEXT AS lunch_end
       FROM school_bell_schedule
       WHERE school_id = $1 AND academic_year = $2
       ORDER BY grade`,
      [profile.school_id, year]
    );
    res.json({ schedules: result.rows });
  }));

  router.post("/school-admin/bell-schedule", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.body?.academicYear || new Date().getFullYear());
    const grades = Array.isArray(req.body?.grades) ? req.body.grades.map(Number).filter(g => Number.isInteger(g) && g >= 1 && g <= 12) : [];
    if (grades.length === 0) {
      throw new HttpError(400, "INVALID_GRADES", "적용할 학년을 1개 이상 선택하세요.");
    }
    const arrivalStart = req.body?.arrivalStart || null;
    const arrivalEnd = req.body?.arrivalEnd || null;
    const periodTimes = typeof req.body?.periodTimes === "object" && req.body?.periodTimes !== null ? req.body.periodTimes : {};
    const lunchAfterPeriod = Math.min(8, Math.max(0, Number(req.body?.lunchAfterPeriod || 0)));
    const lunchStart = req.body?.lunchStart || null;
    const lunchEnd = req.body?.lunchEnd || null;

    for (const grade of grades) {
      await pool.query(
        `INSERT INTO school_bell_schedule
         (school_id, academic_year, grade, arrival_start, arrival_end, period_times, lunch_after_period, lunch_start, lunch_end)
         VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9)
         ON CONFLICT (school_id, academic_year, grade) DO UPDATE
         SET arrival_start = EXCLUDED.arrival_start,
             arrival_end = EXCLUDED.arrival_end,
             period_times = EXCLUDED.period_times,
             lunch_after_period = EXCLUDED.lunch_after_period,
             lunch_start = EXCLUDED.lunch_start,
             lunch_end = EXCLUDED.lunch_end,
             updated_at = NOW()`,
        [profile.school_id, year, grade, arrivalStart, arrivalEnd, JSON.stringify(periodTimes), lunchAfterPeriod, lunchStart, lunchEnd]
      );
    }
    res.json({ ok: true });
  }));

  // ── Weekly Period Allocation (학년별 주간 수업 배당표) APIs ──
  router.get("/school-admin/weekly-period-allocation", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const result = await pool.query(
      `SELECT grade, day_of_week, period_count
       FROM school_weekly_period_allocation
       WHERE school_id = $1 AND academic_year = $2
       ORDER BY grade, day_of_week`,
      [profile.school_id, year]
    );
    res.json({ allocations: result.rows });
  }));

  router.post("/school-admin/weekly-period-allocation", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.body?.academicYear || new Date().getFullYear());
    const allocations = Array.isArray(req.body?.allocations) ? req.body.allocations : [];

    for (const item of allocations) {
      const grade = Number(item.grade);
      const dayOfWeek = Number(item.dayOfWeek);
      const periodCount = Math.min(8, Math.max(0, Number(item.periodCount || 0)));
      if (!Number.isInteger(grade) || grade < 1 || grade > 12) continue;
      if (!Number.isInteger(dayOfWeek) || dayOfWeek < 1 || dayOfWeek > 5) continue;

      await pool.query(
        `INSERT INTO school_weekly_period_allocation (school_id, academic_year, grade, day_of_week, period_count)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (school_id, academic_year, grade, day_of_week) DO UPDATE
         SET period_count = EXCLUDED.period_count, updated_at = NOW()`,
        [profile.school_id, year, grade, dayOfWeek, periodCount]
      );
    }
    res.json({ ok: true });
  }));

  // ── Teacher Dashboard Multi-Device Sync Settings APIs ──
  router.get("/teacher/dashboard-settings", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    const result = await pool.query(
      `SELECT timetable, slogan_text, slogan_align, slogan_font_size, card_order
       FROM classroom_teacher_dashboard_settings
       WHERE user_id = $1`,
      [user.id]
    );
    if (result.rows.length === 0) {
      return res.json({ settings: null });
    }
    const row = result.rows[0];
    res.json({
      settings: {
        timetable: row.timetable,
        sloganText: row.slogan_text,
        sloganAlign: row.slogan_align,
        sloganFontSize: row.slogan_font_size,
        cardOrder: row.card_order
      }
    });
  }));

  router.put("/teacher/dashboard-settings", asyncRoute(async (req, res) => {
    const user = await requireUser(req);
    const timetable = req.body?.timetable || {};
    const sloganText = String(req.body?.sloganText || "");
    const sloganAlign = String(req.body?.sloganAlign || "center");
    const sloganFontSize = Number(req.body?.sloganFontSize || 42);
    const cardOrder = Array.isArray(req.body?.cardOrder) ? req.body.cardOrder : [];

    await pool.query(
      `INSERT INTO classroom_teacher_dashboard_settings
         (user_id, timetable, slogan_text, slogan_align, slogan_font_size, card_order, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         timetable = EXCLUDED.timetable,
         slogan_text = EXCLUDED.slogan_text,
         slogan_align = EXCLUDED.slogan_align,
         slogan_font_size = EXCLUDED.slogan_font_size,
         card_order = EXCLUDED.card_order,
         updated_at = NOW()`,
      [user.id, JSON.stringify(timetable), sloganText, sloganAlign, sloganFontSize, JSON.stringify(cardOrder)]
    );
    res.json({ ok: true });
  }));

  // ── Master Timetable Grid APIs ──
  router.get("/school-admin/master-timetable", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const grade = Number(req.query.grade || 1);
    const classNum = Number(req.query.classNumber || 0);

    const result = await pool.query(
      `SELECT day_of_week, period, subject_name, teacher_user_id, room_name
       FROM school_master_timetable
       WHERE school_id = $1 AND academic_year = $2 AND grade = $3 AND class_number = $4`,
      [profile.school_id, year, grade, classNum]
    );
    res.json({ timetable: result.rows });
  }));

  // The class-side 기초시간표 view may only edit subject_name on cells that no
  // specialist-teacher/special-room screen has claimed, and may only *clear*
  // (never assign) a claimed cell -- creation happens only through
  // PUT /school-admin/specialist-timetable and /room-timetable, which is the
  // single source of truth that keeps a teacher/room from double-booking.
  router.post("/school-admin/master-timetable", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.body?.academicYear || new Date().getFullYear());
    const grade = Number(req.body?.grade || 1);
    const classNum = Number(req.body?.classNumber || 0);
    const cells = Array.isArray(req.body?.cells) ? req.body.cells : [];

    for (const cell of cells) {
      const dayOfWeek = Number(cell.dayOfWeek);
      const period = Number(cell.period);
      const subjectName = String(cell.subjectName || "").trim();
      const clearSpecialist = Boolean(cell.clearSpecialist);

      if (dayOfWeek >= 1 && dayOfWeek <= 5 && period >= 1 && period <= 8) {
        if (clearSpecialist) {
          await pool.query(
            `UPDATE school_master_timetable
             SET subject_name = '', teacher_user_id = NULL, room_name = NULL, updated_at = NOW()
             WHERE school_id = $1 AND academic_year = $2 AND grade = $3 AND class_number = $4 AND day_of_week = $5 AND period = $6`,
            [profile.school_id, year, grade, classNum, dayOfWeek, period]
          );
          continue;
        }
        await pool.query(
          `INSERT INTO school_master_timetable (school_id, academic_year, grade, class_number, day_of_week, period, subject_name)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (school_id, academic_year, grade, class_number, day_of_week, period) DO UPDATE
           SET subject_name = EXCLUDED.subject_name, updated_at = NOW()
           WHERE school_master_timetable.teacher_user_id IS NULL AND school_master_timetable.room_name IS NULL`,
          [profile.school_id, year, grade, classNum, dayOfWeek, period, subjectName]
        );
      }
    }
    res.json({ ok: true });
  }));

  // 전담교사 한 명 = 그리드 하나. 담당 학년/반을 배정하면 school_master_timetable에
  // 바로 반영되므로 기초시간표 쪽에서 별도 동기화가 필요 없다. 같은 교사를 같은
  // 요일/교시에 다른 반에 또 배정하면 school_master_timetable_teacher_slot_idx가 막는다.
  router.get("/school-admin/specialist-teachers", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const result = await pool.query(
      `SELECT id, teacher_name, teacher_type, grade, class_number
       FROM classroom_teachers
       WHERE school_id = $1 AND active = TRUE AND user_id IS NOT NULL
         AND teacher_type NOT IN ('관리자', '교장', '교감')
       ORDER BY teacher_type, teacher_name`,
      [profile.school_id]
    );
    res.json({
      teachers: result.rows.map(row => ({
        id: String(row.id),
        name: row.teacher_name,
        type: row.teacher_type,
        homeroomGrade: row.grade,
        homeroomClassNumber: row.class_number
      }))
    });
  }));

  router.get("/school-admin/specialist-timetable", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const teacherUserId = Number(req.query.teacherUserId);
    if (!Number.isInteger(teacherUserId) || teacherUserId < 1) {
      throw new HttpError(400, "INVALID_TEACHER", "교사를 선택하세요.");
    }
    const result = await pool.query(
      `SELECT grade, class_number, day_of_week, period, subject_name, room_name
       FROM school_master_timetable
       WHERE school_id = $1 AND academic_year = $2 AND teacher_user_id = $3`,
      [profile.school_id, year, teacherUserId]
    );
    res.json({ timetable: result.rows });
  }));

  router.put("/school-admin/specialist-timetable", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.body?.academicYear || new Date().getFullYear());
    const teacherUserId = Number(req.body?.teacherUserId);
    if (!Number.isInteger(teacherUserId) || teacherUserId < 1) {
      throw new HttpError(400, "INVALID_TEACHER", "교사를 선택하세요.");
    }
    const cells = Array.isArray(req.body?.cells) ? req.body.cells : [];

    for (const cell of cells) {
      const grade = Number(cell.grade);
      const classNumber = Number(cell.classNumber);
      const dayOfWeek = Number(cell.dayOfWeek);
      const period = Number(cell.period);
      if (!(grade >= 1 && grade <= 12 && classNumber >= 1 && classNumber <= 30 && dayOfWeek >= 1 && dayOfWeek <= 5 && period >= 1 && period <= 8)) continue;

      if (cell.clear) {
        await pool.query(
          `UPDATE school_master_timetable
           SET teacher_user_id = NULL, subject_name = ''
           WHERE school_id = $1 AND academic_year = $2 AND grade = $3 AND class_number = $4
             AND day_of_week = $5 AND period = $6 AND teacher_user_id = $7`,
          [profile.school_id, year, grade, classNumber, dayOfWeek, period, teacherUserId]
        );
        continue;
      }

      const subjectName = String(cell.subjectName || "").trim();
      let conflictResult;
      try {
        conflictResult = await pool.query(
          `INSERT INTO school_master_timetable (school_id, academic_year, grade, class_number, day_of_week, period, subject_name, teacher_user_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (school_id, academic_year, grade, class_number, day_of_week, period) DO UPDATE
           SET subject_name = EXCLUDED.subject_name, teacher_user_id = EXCLUDED.teacher_user_id, updated_at = NOW()
           WHERE school_master_timetable.teacher_user_id IS NULL OR school_master_timetable.teacher_user_id = EXCLUDED.teacher_user_id
           RETURNING id`,
          [profile.school_id, year, grade, classNumber, dayOfWeek, period, subjectName, teacherUserId]
        );
      } catch (error) {
        if (error.code === "23505") {
          throw new HttpError(409, "TEACHER_ALREADY_BOOKED", `이 교사는 이 요일·교시에 이미 다른 반 수업이 배정되어 있습니다.`);
        }
        throw error;
      }
      if (conflictResult.rowCount === 0) {
        throw new HttpError(409, "SLOT_ALREADY_TAKEN", `${grade}학년 ${classNumber}반의 이 시간은 이미 다른 전담교사가 배정되어 있습니다.`);
      }
    }
    res.json({ ok: true });
  }));

  // 특별실 하나 = 그리드 하나. 같은 방을 같은 요일/교시에 다른 반이 또 배정하면
  // school_master_timetable_room_slot_idx가 막는다. teacher_user_id는 건드리지
  // 않으므로 전담교사가 이미 배정된 칸에 방만 추가로 지정할 수 있다.
  router.get("/school-admin/room-timetable", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const roomName = String(req.query.room || "").trim();
    if (!roomName) throw new HttpError(400, "INVALID_ROOM", "특별실 이름을 입력하세요.");
    const result = await pool.query(
      `SELECT grade, class_number, day_of_week, period, subject_name, teacher_user_id
       FROM school_master_timetable
       WHERE school_id = $1 AND academic_year = $2 AND room_name = $3`,
      [profile.school_id, year, roomName]
    );
    res.json({ timetable: result.rows });
  }));

  router.get("/school-admin/rooms", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const result = await pool.query(
      `SELECT DISTINCT room_name FROM school_master_timetable
       WHERE school_id = $1 AND academic_year = $2 AND room_name IS NOT NULL
       ORDER BY room_name`,
      [profile.school_id, year]
    );
    res.json({ rooms: result.rows.map(r => r.room_name) });
  }));

  router.put("/school-admin/room-timetable", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.body?.academicYear || new Date().getFullYear());
    const roomName = String(req.body?.room || "").trim();
    if (!roomName) throw new HttpError(400, "INVALID_ROOM", "특별실 이름을 입력하세요.");
    const cells = Array.isArray(req.body?.cells) ? req.body.cells : [];

    for (const cell of cells) {
      const grade = Number(cell.grade);
      const classNumber = Number(cell.classNumber);
      const dayOfWeek = Number(cell.dayOfWeek);
      const period = Number(cell.period);
      if (!(grade >= 1 && grade <= 12 && classNumber >= 1 && classNumber <= 30 && dayOfWeek >= 1 && dayOfWeek <= 5 && period >= 1 && period <= 8)) continue;

      if (cell.clear) {
        await pool.query(
          `UPDATE school_master_timetable
           SET room_name = NULL
           WHERE school_id = $1 AND academic_year = $2 AND grade = $3 AND class_number = $4
             AND day_of_week = $5 AND period = $6 AND room_name = $7`,
          [profile.school_id, year, grade, classNumber, dayOfWeek, period, roomName]
        );
        continue;
      }

      const subjectName = String(cell.subjectName || "").trim();
      let conflictResult;
      try {
        conflictResult = await pool.query(
          `INSERT INTO school_master_timetable (school_id, academic_year, grade, class_number, day_of_week, period, subject_name, room_name)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (school_id, academic_year, grade, class_number, day_of_week, period) DO UPDATE
           SET subject_name = COALESCE(NULLIF(EXCLUDED.subject_name, ''), school_master_timetable.subject_name), room_name = EXCLUDED.room_name, updated_at = NOW()
           WHERE school_master_timetable.room_name IS NULL OR school_master_timetable.room_name = EXCLUDED.room_name
           RETURNING id`,
          [profile.school_id, year, grade, classNumber, dayOfWeek, period, subjectName, roomName]
        );
      } catch (error) {
        if (error.code === "23505") {
          throw new HttpError(409, "ROOM_ALREADY_BOOKED", `이 특별실은 이 요일·교시에 이미 다른 반이 사용 중입니다.`);
        }
        throw error;
      }
      if (conflictResult.rowCount === 0) {
        throw new HttpError(409, "SLOT_ALREADY_TAKEN", `${grade}학년 ${classNumber}반의 이 시간은 이미 다른 특별실이 배정되어 있습니다.`);
      }
    }
    res.json({ ok: true });
  }));

  // ── Vacation Settings APIs (DB Persistence) ──
  router.get("/school-admin/vacation-settings", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const result = await pool.query(
      `SELECT is_integrated, summer_start::TEXT AS summer_start, summer_end::TEXT AS summer_end,
              winter_start::TEXT AS winter_start, winter_end::TEXT AS winter_end,
              spring_start::TEXT AS spring_start, spring_end::TEXT AS spring_end,
              entrance_ceremony_date::TEXT AS entrance_ceremony_date,
              graduation_ceremony_date::TEXT AS graduation_ceremony_date
       FROM school_vacation_settings
       WHERE school_id = $1 AND academic_year = $2`,
      [profile.school_id, year]
    );
    res.json({ settings: result.rows[0] || null });
  }));

  router.post("/school-admin/vacation-settings", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.body?.academicYear || new Date().getFullYear());
    const isIntegrated = Boolean(req.body?.isIntegrated);
    const summerStart = req.body?.summerStart || null;
    const summerEnd = req.body?.summerEnd || null;
    const winterStart = req.body?.winterStart || null;
    const winterEnd = req.body?.winterEnd || null;
    const springStart = req.body?.springStart || null;
    const springEnd = req.body?.springEnd || null;
    const entranceCeremonyDate = req.body?.entranceCeremonyDate || null;
    const graduationCeremonyDate = req.body?.graduationCeremonyDate || null;

    await pool.query(
      `INSERT INTO school_vacation_settings
       (school_id, academic_year, is_integrated, summer_start, summer_end, winter_start, winter_end, spring_start, spring_end, entrance_ceremony_date, graduation_ceremony_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (school_id, academic_year) DO UPDATE
       SET is_integrated = EXCLUDED.is_integrated,
           summer_start = EXCLUDED.summer_start,
           summer_end = EXCLUDED.summer_end,
           winter_start = EXCLUDED.winter_start,
           winter_end = EXCLUDED.winter_end,
           spring_start = EXCLUDED.spring_start,
           spring_end = EXCLUDED.spring_end,
           entrance_ceremony_date = EXCLUDED.entrance_ceremony_date,
           graduation_ceremony_date = EXCLUDED.graduation_ceremony_date,
           updated_at = NOW()`,
      [profile.school_id, year, isIntegrated, summerStart, summerEnd, winterStart, winterEnd, springStart, springEnd, entranceCeremonyDate, graduationCeremonyDate]
    );
    res.json({ ok: true });
  }));

  // ── Step 5: Annual 34-Week Timetable Synthesis API ──
  router.get("/school-admin/annual-timetable-34weeks", asyncRoute(async (req, res) => {
    const { profile } = await requireSchoolAdmin(req);
    const year = Number(req.query.academicYear || new Date().getFullYear());
    const grade = Number(req.query.grade || 5);
    const classNum = Number(req.query.classNumber || 1);

    const academicYearStart = `${year}-03-01`;
    const academicYearEnd = new Date(year + 1, 2, 0).toISOString().slice(0, 10); // Feb 28/29 of next year

    // Fetch DB Data
    const [vacRes, schedRes, ttRes, genEvRes] = await Promise.all([
      pool.query(`SELECT * FROM school_vacation_settings WHERE school_id = $1 AND academic_year = $2`, [profile.school_id, year]),
      // 재량휴업일은 특정 학년에만 적용될 수 있으므로, 이 반의 학년에 실제로 해당되는
      // 항목만 가져온다 (다른 학년만 쉬는 날을 이 학년도 쉬는 것처럼 잘못 표시하지 않도록).
      pool.query(
        `SELECT event_date::TEXT AS event_date, title, category
         FROM school_annual_schedules
         WHERE school_id = $1 AND academic_year = $2 AND (target_scope = 'ALL' OR $3 = ANY(target_grades))`,
        [profile.school_id, year, grade]
      ),
      pool.query(`SELECT day_of_week, period, subject_name FROM school_master_timetable WHERE school_id = $1 AND academic_year = $2 AND grade = $3 AND class_number = $4`, [profile.school_id, year, grade, classNum]),
      // 등교여부와 무관한 일반 행사 — 시간표 과목은 바꾸지 않고 딱지(요약 텍스트)로만 덧붙인다.
      pool.query(
        `SELECT event_date::TEXT AS event_date, end_date::TEXT AS end_date, title, event_time, period, location
         FROM school_general_events
         WHERE school_id = $1 AND event_date <= $2 AND COALESCE(end_date, event_date) >= $3
           AND (target_scope = 'ALL' OR $4 = ANY(target_grades))`,
        [profile.school_id, academicYearEnd, academicYearStart, grade]
      )
    ]);

    const vacSettings = vacRes.rows[0] || {};
    const schedList = schedRes.rows || [];
    const ttList = ttRes.rows || [];
    const generalEvents = genEvRes.rows || [];

    // Calculate daily period count per day_of_week (1..5) from actual class master timetable
    const dailyPeriodsMap = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ttList.forEach(cell => {
      if (cell.subject_name && cell.subject_name !== '-' && cell.subject_name !== '수업없음') {
        dailyPeriodsMap[cell.day_of_week] = Math.max(dailyPeriodsMap[cell.day_of_week], cell.period);
      }
    });

    // Fallback default periods per day if no timetable configured yet
    if (Object.values(dailyPeriodsMap).every(v => v === 0)) {
      if (grade <= 2) { dailyPeriodsMap[1] = 4; dailyPeriodsMap[2] = 5; dailyPeriodsMap[3] = 5; dailyPeriodsMap[4] = 5; dailyPeriodsMap[5] = 4; }
      else if (grade <= 4) { dailyPeriodsMap[1] = 5; dailyPeriodsMap[2] = 5; dailyPeriodsMap[3] = 5; dailyPeriodsMap[4] = 6; dailyPeriodsMap[5] = 5; }
      else { dailyPeriodsMap[1] = 6; dailyPeriodsMap[2] = 6; dailyPeriodsMap[3] = 5; dailyPeriodsMap[4] = 6; dailyPeriodsMap[5] = 6; }
    }

    res.json({
      academicYear: year,
      grade,
      classNumber: classNum,
      vacationSettings: vacSettings,
      schedules: schedList,
      generalEvents,
      dailyPeriodsMap
    });
  }));


  // ─────────────────────────────────────────────────────────────
  // 전교생 통합 명단 APIs (school_students)
  // ─────────────────────────────────────────────────────────────

  // GET: 전교생 명단 조회 (학교에 속한 모든 교직원 접근 가능)
  router.get("/school/students", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const teacherProfile = await pool.query(
      `SELECT school_id FROM classroom_teachers WHERE user_id = $1 AND active = TRUE`,
      [teacher.id]
    );
    if (!teacherProfile.rows[0]) throw new HttpError(403, "TEACHER_REQUIRED", "교사 계정이 필요합니다.");
    const schoolId = teacherProfile.rows[0].school_id;
    const year = Number(req.query.year) || new Date().getFullYear();

    const students = await pool.query(
      `SELECT s.id, s.grade, s.class_number, s.student_number, s.roster_name,
              s.gender, s.student_email, s.guardian1_email, s.guardian2_email,
              s.custom_fields, s.user_id, s.created_at
       FROM school_students s
       WHERE s.school_id = $1 AND s.academic_year = $2
       ORDER BY s.grade, s.class_number,
                NULLIF(regexp_replace(s.student_number, '\\D', '', 'g'), '')::int`,
      [schoolId, year]
    );

    // clubs per student
    const clubs = await pool.query(
      `SELECT ssc.student_id, sc.club_name
       FROM school_student_clubs ssc
       JOIN school_clubs sc ON sc.id = ssc.club_id
       WHERE sc.school_id = $1 AND sc.academic_year = $2`,
      [schoolId, year]
    );
    const clubMap = {};
    for (const row of clubs.rows) {
      if (!clubMap[row.student_id]) clubMap[row.student_id] = [];
      clubMap[row.student_id].push(row.club_name);
    }

    // afterschool per student
    const afterschool = await pool.query(
      `SELECT ssa.student_id, sa.program_name
       FROM school_student_afterschool ssa
       JOIN school_afterschool sa ON sa.id = ssa.program_id
       WHERE sa.school_id = $1 AND sa.academic_year = $2`,
      [schoolId, year]
    );
    const afterschoolMap = {};
    for (const row of afterschool.rows) {
      if (!afterschoolMap[row.student_id]) afterschoolMap[row.student_id] = [];
      afterschoolMap[row.student_id].push(row.program_name);
    }

    // shuttle per student
    const shuttle = await pool.query(
      `SELECT sss.student_id, sl.slot_name, sss.shuttle_number
       FROM school_student_shuttle sss
       JOIN school_shuttle_slots sl ON sl.id = sss.slot_id
       WHERE sl.school_id = $1`,
      [schoolId]
    );
    const shuttleMap = {};
    for (const row of shuttle.rows) {
      if (!shuttleMap[row.student_id]) shuttleMap[row.student_id] = {};
      shuttleMap[row.student_id][row.slot_name] = row.shuttle_number;
    }

    res.json({
      students: students.rows.map(s => ({
        ...s,
        clubs: clubMap[s.id] || [],
        afterschool: afterschoolMap[s.id] || [],
        shuttle: shuttleMap[s.id] || {}
      })),
      year
    });
  }));

  // PUT: 전교생 명단 일괄 저장 (학년/반 단위)
  router.put("/school/students", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const teacherProfile = await pool.query(
      `SELECT school_id, teacher_type FROM classroom_teachers WHERE user_id = $1 AND active = TRUE`,
      [teacher.id]
    );
    if (!teacherProfile.rows[0]) throw new HttpError(403, "TEACHER_REQUIRED", "교사 계정이 필요합니다.");
    const { school_id: schoolId, teacher_type: teacherType } = teacherProfile.rows[0];
    if (!["관리자", "교장", "교감"].includes(teacherType)) {
      throw new HttpError(403, "ADMIN_ONLY", "전교생 명단 편집 권한은 학교 관리자만 갖고 있습니다.");
    }

    const { students, year } = req.body;
    const academicYear = Number(year) || new Date().getFullYear();
    if (!Array.isArray(students)) throw new HttpError(400, "INVALID_PAYLOAD", "학생 목록이 필요합니다.");
    if (students.length > 2000) throw new HttpError(400, "TOO_MANY_STUDENTS", "최대 2000명까지 저장할 수 있습니다.");

    const clean = students.map(s => ({
      grade: Number(s.grade),
      classNumber: Number(s.classNumber),
      studentNumber: String(s.studentNumber || "").trim(),
      rosterName: String(s.rosterName || "").normalize("NFC").trim(),
      gender: ["남", "여"].includes(s.gender) ? s.gender : "남",
      studentEmail: String(s.studentEmail || "").trim().toLowerCase() || null,
      guardian1Email: String(s.guardian1Email || "").trim().toLowerCase() || null,
      guardian2Email: String(s.guardian2Email || "").trim().toLowerCase() || null,
      customFields: (typeof s.customFields === 'object' && s.customFields !== null) ? s.customFields : {}
    })).filter(s => s.studentNumber && s.rosterName);

    const seenKeys = new Set();
    for (const s of clean) {
      if (!Number.isInteger(s.grade) || s.grade < 1 || s.grade > 12)
        throw new HttpError(400, "INVALID_GRADE", `학년이 올바르지 않습니다: ${s.rosterName}`);
      if (!Number.isInteger(s.classNumber) || s.classNumber < 1 || s.classNumber > 30)
        throw new HttpError(400, "INVALID_CLASS_NUMBER", `반이 올바르지 않습니다: ${s.rosterName}`);

      const key = `${s.grade}-${s.classNumber}-${s.studentNumber}`;
      if (seenKeys.has(key)) {
        throw new HttpError(400, "DUPLICATE_STUDENT_NUMBER", `중복된 학생 번호가 있습니다: ${s.grade}학년 ${s.classNumber}반 ${s.studentNumber}번 (${s.rosterName}). 번호를 다르게 지정해 주세요.`);
      }
      seenKeys.add(key);
    }

    const gradeTotalCounts = new Map();
    for (const s of clean) {
      gradeTotalCounts.set(s.grade, (gradeTotalCounts.get(s.grade) || 0) + 1);
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Avatars are assigned once per new student and kept stable afterward
      // (mirrors the classroom_students roster-save assignment below). Usage
      // is tracked per grade so the whole-school save can span many grades.
      const existingResult = await client.query(
        `SELECT grade, class_number, student_number, avatar_key
         FROM school_students
         WHERE school_id = $1 AND academic_year = $2`,
        [schoolId, academicYear]
      );
      const existingAvatarByKey = new Map(
        existingResult.rows.map((row) => [`${row.grade}-${row.class_number}-${row.student_number}`, row.avatar_key || ""])
      );
      const usageResult = await client.query(
        `SELECT grade, avatar_key, COUNT(*)::INTEGER AS usage_count
         FROM school_students
         WHERE school_id = $1 AND academic_year = $2 AND avatar_key IS NOT NULL
         GROUP BY grade, avatar_key`,
        [schoolId, academicYear]
      );
      const avatarUsageByGrade = new Map();
      for (const row of usageResult.rows) {
        if (!avatarUsageByGrade.has(row.grade)) avatarUsageByGrade.set(row.grade, new Map());
        avatarUsageByGrade.get(row.grade).set(row.avatar_key, Number(row.usage_count || 0));
      }

      for (const s of clean) {
        const rosterKey = `${s.grade}-${s.classNumber}-${s.studentNumber}`;
        const existingAvatarKey = existingAvatarByKey.get(rosterKey);
        let avatarKey = existingAvatarKey || null;
        if (!avatarKey) {
          if (!avatarUsageByGrade.has(s.grade)) avatarUsageByGrade.set(s.grade, new Map());
          const gradeUsage = avatarUsageByGrade.get(s.grade);
          const capacity = avatarCapacity(gradeTotalCounts.get(s.grade));
          avatarKey = pickRandomAvailableAvatar(gradeUsage, capacity);
          gradeUsage.set(avatarKey, Number(gradeUsage.get(avatarKey) || 0) + 1);
        }

        await client.query(
          `INSERT INTO school_students
             (school_id, academic_year, grade, class_number, student_number, roster_name, gender, student_email, guardian1_email, guardian2_email, custom_fields, avatar_key)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
           ON CONFLICT (school_id, academic_year, grade, class_number, student_number) DO UPDATE SET
             roster_name = EXCLUDED.roster_name,
             gender = EXCLUDED.gender,
             student_email = EXCLUDED.student_email,
             guardian1_email = EXCLUDED.guardian1_email,
             guardian2_email = EXCLUDED.guardian2_email,
             custom_fields = EXCLUDED.custom_fields,
             avatar_key = COALESCE(school_students.avatar_key, EXCLUDED.avatar_key),
             updated_at = NOW()`,
          [schoolId, academicYear, s.grade, s.classNumber, s.studentNumber, s.rosterName, s.gender, s.studentEmail, s.guardian1Email, s.guardian2Email, JSON.stringify(s.customFields), avatarKey]
        );
        // Auto-link student Google account
        if (s.studentEmail) {
          const userRes = await client.query(
            `SELECT id FROM classroom_users WHERE LOWER(email) = $1`,
            [s.studentEmail]
          );
          if (userRes.rows[0]) {
            await client.query(
              `UPDATE school_students SET user_id = $1, updated_at = NOW()
               WHERE school_id = $2 AND academic_year = $3 AND grade = $4 AND class_number = $5 AND student_number = $6`,
              [userRes.rows[0].id, schoolId, academicYear, s.grade, s.classNumber, s.studentNumber]
            );
          }
        }
      }

      if (clean.length > 0) {
        const gradeList = clean.map(s => s.grade);
        const classList = clean.map(s => s.classNumber);
        const numberList = clean.map(s => s.studentNumber);
        await client.query(
          `DELETE FROM school_students
           WHERE school_id = $1 AND academic_year = $2
             AND NOT EXISTS (
               SELECT 1 FROM unnest($3::int[], $4::int[], $5::text[]) AS k(g, c, n)
               WHERE school_students.grade = k.g
                 AND school_students.class_number = k.c
                 AND school_students.student_number = k.n
             )`,
          [schoolId, academicYear, gradeList, classList, numberList]
        );
      } else {
        await client.query(
          `DELETE FROM school_students WHERE school_id = $1 AND academic_year = $2`,
          [schoolId, academicYear]
        );
      }

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    res.json({ ok: true, saved: clean.length });
  }));

  // GET: 학교 설정 (동아리/방과후/셔틀 목록)
  router.get("/school/settings", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const tp = await pool.query(
      `SELECT t.school_id, t.teacher_type, s.name as school_name
       FROM classroom_teachers t
       LEFT JOIN classroom_schools s ON s.id = t.school_id
       WHERE t.user_id = $1 AND t.active = TRUE`,
      [teacher.id]
    );
    if (!tp.rows[0]) throw new HttpError(403, "TEACHER_REQUIRED", "교사 계정이 필요합니다.");
    const schoolId = tp.rows[0].school_id;
    const year = Number(req.query.year) || new Date().getFullYear();
    const isAdmin = ["관리자", "교장", "교감"].includes(tp.rows[0].teacher_type);

    const [clubs, afterschool, shuttle] = await Promise.all([
      pool.query(`SELECT id, club_name, sort_order FROM school_clubs WHERE school_id = $1 AND academic_year = $2 ORDER BY sort_order, id`, [schoolId, year]),
      pool.query(`SELECT id, program_name, sort_order FROM school_afterschool WHERE school_id = $1 AND academic_year = $2 ORDER BY sort_order, id`, [schoolId, year]),
      pool.query(`SELECT id, slot_name, sort_order FROM school_shuttle_slots WHERE school_id = $1 ORDER BY sort_order, id`, [schoolId])
    ]);

    res.json({
      schoolName: tp.rows[0].school_name,
      clubs: clubs.rows,
      afterschool: afterschool.rows,
      shuttleSlots: shuttle.rows,
      isAdmin,
      year
    });
  }));

  // PUT: 학교 설정 저장 (동아리/방과후/셔틀 목록)
  router.put("/school/settings", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const tp = await pool.query(
      `SELECT t.school_id, t.teacher_type FROM classroom_teachers t WHERE t.user_id = $1 AND t.active = TRUE`,
      [teacher.id]
    );
    if (!tp.rows[0]) throw new HttpError(403, "TEACHER_REQUIRED", "교사 계정이 필요합니다.");
    const schoolId = tp.rows[0].school_id;
    const year = Number(req.body.year) || new Date().getFullYear();

    const extractName = (item) => {
      if (!item) return "";
      if (typeof item === "string") return item.trim();
      if (typeof item === "object") return String(item.club_name || item.program_name || item.slot_name || item.name || "").trim();
      return String(item).trim();
    };

    const clubs = (req.body.clubs || []).map((item, i) => ({ name: extractName(item), order: i })).filter(c => c.name && c.name !== "[object Object]");
    const afterschool = (req.body.afterschool || []).map((item, i) => ({ name: extractName(item), order: i })).filter(a => a.name && a.name !== "[object Object]");
    const shuttleSlots = (req.body.shuttleSlots || []).map((item, i) => ({ name: extractName(item), order: i })).filter(s => s.name && s.name !== "[object Object]");

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      // Clubs
      await client.query(`DELETE FROM school_clubs WHERE school_id = $1 AND academic_year = $2`, [schoolId, year]);
      for (const c of clubs) {
        await client.query(
          `INSERT INTO school_clubs (school_id, academic_year, club_name, sort_order) VALUES ($1, $2, $3, $4)`,
          [schoolId, year, c.name, c.order]
        );
      }
      // Afterschool
      await client.query(`DELETE FROM school_afterschool WHERE school_id = $1 AND academic_year = $2`, [schoolId, year]);
      for (const a of afterschool) {
        await client.query(
          `INSERT INTO school_afterschool (school_id, academic_year, program_name, sort_order) VALUES ($1, $2, $3, $4)`,
          [schoolId, year, a.name, a.order]
        );
      }
      // Shuttle slots
      await client.query(`DELETE FROM school_shuttle_slots WHERE school_id = $1`, [schoolId]);
      for (const s of shuttleSlots) {
        await client.query(
          `INSERT INTO school_shuttle_slots (school_id, slot_name, sort_order) VALUES ($1, $2, $3)`,
          [schoolId, s.name, s.order]
        );
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    res.json({ ok: true });
  }));

  // GET: 학교 교사 명단 조회
  router.get("/school/teachers", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const tp = await pool.query(
      `SELECT t.school_id, t.teacher_type FROM classroom_teachers t WHERE t.user_id = $1 AND t.active = TRUE`,
      [teacher.id]
    );
    if (!tp.rows[0]) throw new HttpError(403, "TEACHER_REQUIRED", "교사 계정이 필요합니다.");
    const schoolId = tp.rows[0].school_id;
    const isAdmin = ["관리자", "교장", "교감"].includes(tp.rows[0].teacher_type);

    const teachersResult = await pool.query(
      `SELECT id, teacher_name, teacher_type, google_email, grade, class_number, subject_name, room_name, active, user_id IS NOT NULL AS linked
       FROM classroom_teachers
       WHERE school_id = $1
       ORDER BY CASE WHEN teacher_type = '관리자' THEN 1 WHEN teacher_type = '담임' THEN 2 ELSE 3 END, grade, class_number, id`,
      [schoolId]
    );

    res.json({
      teachers: teachersResult.rows.map(r => ({
        id: r.id,
        name: r.teacher_name,
        type: r.teacher_type,
        email: r.google_email,
        grade: r.grade,
        classNumber: r.class_number,
        subjectName: r.subject_name,
        roomName: r.room_name,
        linked: r.linked
      })),
      isAdmin
    });
  }));

  // PUT: 학교 교사 명단 저장/수정 (관리자 전용 -- 전교 교사의 학년/반/이메일을 일괄로
  // 바꾸고 목록에 없는 교사는 삭제하므로, 반드시 관리자만 호출할 수 있어야 한다)
  router.put("/school/teachers", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const tp = await pool.query(
      `SELECT t.school_id, t.teacher_type FROM classroom_teachers t WHERE t.user_id = $1 AND t.active = TRUE`,
      [teacher.id]
    );
    if (!tp.rows[0]) throw new HttpError(403, "TEACHER_REQUIRED", "교사 계정이 필요합니다.");
    if (!["관리자", "교장", "교감"].includes(tp.rows[0].teacher_type)) {
      throw new HttpError(403, "ADMIN_ONLY", "교사 명단 편집 권한은 학교 관리자만 갖고 있습니다.");
    }
    const schoolId = tp.rows[0].school_id;
    const teachers = Array.isArray(req.body?.teachers) ? req.body.teachers : [];

    const cleanTeachers = teachers.map((t) => ({
      type: String(t?.type || "담임").trim(),
      name: String(t?.name || "").normalize("NFC").replace(/\s+/g, ""),
      email: (t?.email && String(t.email).includes("@")) ? normalizeEmail(t.email) : null,
      grade: t?.grade ? Number(t.grade) : null,
      classNumber: t?.classNumber ? Number(t.classNumber) : null,
      subjectName: t?.subjectName ? String(t.subjectName).trim().slice(0, 50) : null,
      roomName: t?.roomName ? String(t.roomName).trim().slice(0, 50) : null
    })).filter(t => t.name);

    for (const t of cleanTeachers) {
      if (!t.name || t.name.length > 30) throw new HttpError(400, "INVALID_TEACHER_NAME", "성명을 확인해 주세요.");
      if (t.email && !t.email.includes("@")) throw new HttpError(400, "INVALID_TEACHER_EMAIL", `${t.name}의 이메일 주소를 확인해 주세요.`);
      if ((t.grade && !t.classNumber) || (!t.grade && t.classNumber)) {
        throw new HttpError(400, "INVALID_GRADE_CLASS", `'${t.name}' 교사의 학년과 반을 모두 입력하거나, 전담인 경우 둘 다 비워두세요.`);
      }
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const savedIds = [];
      for (const t of cleanTeachers) {
        let existing = null;
        if (t.email) {
          const exEmail = await client.query(
            `SELECT id, teacher_type, teacher_name, google_email FROM classroom_teachers WHERE school_id = $1 AND LOWER(google_email) = LOWER($2)`,
            [schoolId, t.email]
          );
          existing = exEmail.rows[0];
        }
        if (!existing) {
          const exName = await client.query(
            `SELECT id, teacher_type, teacher_name, google_email FROM classroom_teachers WHERE school_id = $1 AND teacher_name = $2`,
            [schoolId, t.name]
          );
          existing = exName.rows[0];
        }

        if (existing) {
          const isAdminRow = ["관리자", "교장", "교감"].includes(existing.teacher_type) || existing.teacher_name === "학교관리자" || existing.teacher_name === "관리자";
          const finalName = isAdminRow ? existing.teacher_name : t.name;
          const finalEmail = isAdminRow ? existing.google_email : t.email;
          const finalType = isAdminRow ? "관리자" : t.type;
          const finalGrade = isAdminRow ? null : t.grade;
          const finalClass = isAdminRow ? null : t.classNumber;
          const finalSubject = isAdminRow ? null : t.subjectName;
          const finalRoom = isAdminRow ? null : t.roomName;

          const updated = await client.query(
            `UPDATE classroom_teachers
             SET teacher_name = $1, teacher_type = $2, google_email = $3, grade = $4, class_number = $5,
                 subject_name = $6, room_name = $7, updated_at = NOW()
             WHERE id = $8 RETURNING id`,
            [finalName, finalType, finalEmail, finalGrade, finalClass, finalSubject, finalRoom, existing.id]
          );
          savedIds.push(updated.rows[0].id);
        } else {
          const inserted = await client.query(
            `INSERT INTO classroom_teachers
               (school_id, teacher_name, grade, class_number, teacher_type, google_email, subject_name, room_name)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            [schoolId, t.name, t.grade, t.classNumber, t.type, t.email, t.subjectName, t.roomName]
          );
          savedIds.push(inserted.rows[0].id);
        }
      }

      // Delete any teacher records in this school that are no longer in savedIds (NEVER delete admin rows!)
      if (savedIds.length > 0) {
        await client.query(
          `DELETE FROM classroom_teachers
           WHERE school_id = $1 AND NOT (id = ANY($2::BIGINT[])) AND teacher_type NOT IN ('관리자', '교장', '교감') AND teacher_name NOT IN ('학교관리자', '관리자')`,
          [schoolId, savedIds]
        );
      } else {
        await client.query(
          "DELETE FROM classroom_teachers WHERE school_id = $1 AND teacher_type NOT IN ('관리자', '교장', '교감') AND teacher_name NOT IN ('학교관리자', '관리자')",
          [schoolId]
        );
      }

      // A teacher reassigned to a different grade/class, or removed as
      // homeroom, must not keep the old classroom_classes linkage --
      // otherwise the dashboard would keep resolving to a stale class.
      // The new/current assignment gets re-provisioned on next dashboard
      // load via userClassId().
      await client.query(
        `UPDATE classroom_classes c
         SET teacher_user_id = NULL, updated_at = NOW()
         WHERE c.school_id = $1
           AND c.teacher_user_id IS NOT NULL
           AND NOT EXISTS (
             SELECT 1 FROM classroom_teachers t
             WHERE t.user_id = c.teacher_user_id
               AND t.school_id = c.school_id
               AND t.grade = c.grade
               AND t.class_number = c.class_number
               AND t.active = TRUE
           )`,
        [schoolId]
      );

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    res.json({ ok: true, saved: cleanTeachers.length });
  }));

  router.get("/teacher/available-groups", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const tp = await pool.query(
      `SELECT school_id FROM classroom_teachers WHERE user_id = $1 AND active = TRUE`,
      [teacher.id]
    );
    if (!tp.rows[0]) throw new HttpError(403, "TEACHER_REQUIRED", "교사 계정이 필요합니다.");
    const schoolId = tp.rows[0].school_id;
    const year = Number(req.query.year) || new Date().getFullYear();

    // 1. Homeroom classes in school_students
    const classesRes = await pool.query(
      `SELECT DISTINCT grade, class_number
       FROM school_students
       WHERE school_id = $1 AND academic_year = $2
       ORDER BY grade, class_number`,
      [schoolId, year]
    );

    // 2. Clubs in school_students custom_fields & school_clubs
    const clubsRes = await pool.query(
      `SELECT DISTINCT name FROM (
         SELECT custom_fields->>'club' AS name FROM school_students WHERE school_id = $1 AND academic_year = $2 AND custom_fields->>'club' IS NOT NULL
         UNION
         SELECT name FROM school_clubs WHERE school_id = $1 AND academic_year = $2
       ) t WHERE name IS NOT NULL AND name != '' ORDER BY name`,
      [schoolId, year]
    );

    // 3. Afterschool in school_students custom_fields
    const afterschoolRes = await pool.query(
      `SELECT DISTINCT custom_fields->>'afterschool' AS name
       FROM school_students
       WHERE school_id = $1 AND academic_year = $2 AND custom_fields->>'afterschool' IS NOT NULL AND custom_fields->>'afterschool' != ''
       ORDER BY name`,
      [schoolId, year]
    );

    // 4. Shuttle bus in school_students custom_fields (1호차, 2호차 등)
    const shuttleRes = await pool.query(
      `SELECT DISTINCT name FROM (
         SELECT custom_fields->>'shuttle' AS name FROM school_students WHERE school_id = $1 AND academic_year = $2 AND custom_fields->>'shuttle' IS NOT NULL
         UNION
         SELECT custom_fields->>'bus' AS name FROM school_students WHERE school_id = $1 AND academic_year = $2 AND custom_fields->>'bus' IS NOT NULL
       ) t WHERE name IS NOT NULL AND name != '' ORDER BY name`,
      [schoolId, year]
    );

    // Fallback default choices if database doesn't have custom_fields populated yet
    const homerooms = classesRes.rows.length > 0 ? classesRes.rows.map(r => ({ name: `${r.grade}-${r.class_number}`, label: `${r.grade}학년 ${r.class_number}반 (${r.grade}-${r.class_number})`, grade: r.grade, class_number: r.class_number })) : [
      { name: '1-1', label: '1학년 1반 (1-1)', grade: 1, class_number: 1 },
      { name: '1-2', label: '1학년 2반 (1-2)', grade: 1, class_number: 2 },
      { name: '2-1', label: '2학년 1반 (2-1)', grade: 2, class_number: 1 },
      { name: '3-1', label: '3학년 1반 (3-1)', grade: 3, class_number: 1 },
      { name: '4-1', label: '4학년 1반 (4-1)', grade: 4, class_number: 1 },
      { name: '5-1', label: '5학년 1반 (5-1)', grade: 5, class_number: 1 },
      { name: '6-1', label: '6학년 1반 (6-1)', grade: 6, class_number: 1 },
      { name: '6-2', label: '6학년 2반 (6-2)', grade: 6, class_number: 2 }
    ];

    const defaultClubs = ['오케스트라', '로봇코딩부', '방송부', '수학탐구부', '연극부', '미술부', '합창단', '도서부'];
    const clubs = Array.from(new Set([...clubsRes.rows.map(r => r.name), ...defaultClubs]));

    const defaultAfterschool = ['축구부', '농구부', '바둑교실', '컴퓨터교실', '영어회화부', '우쿨렐레교실'];
    const afterschools = Array.from(new Set([...afterschoolRes.rows.map(r => r.name).filter(Boolean), ...defaultAfterschool]));

    const defaultShuttles = ['1호차', '2호차', '3호차', '4호차', '5호차'];
    const shuttles = Array.from(new Set([...shuttleRes.rows.map(r => r.name).filter(Boolean), ...defaultShuttles]));

    res.json({ homerooms, clubs, afterschools, shuttles });
  }));

  router.get("/teacher/groups", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const year = Number(req.query.year) || new Date().getFullYear();

    // Auto-provision default homeroom group if teacher has a class assigned.
    // Reads the assignment directly off classroom_teachers rather than via
    // classroom_classes, so a teacher who has never opened their dashboard
    // (and so was never auto-provisioned into classroom_classes) still gets
    // their default group created here.
    const teacherClass = await pool.query(
      `SELECT t.school_id, t.grade, t.class_number
       FROM classroom_teachers t
       WHERE t.user_id = $1 AND t.active = TRUE AND t.academic_year = $2
         AND t.grade IS NOT NULL AND t.class_number IS NOT NULL
       LIMIT 1`,
      [teacher.id, year]
    );

    if (teacherClass.rows[0]) {
      const tc = teacherClass.rows[0];
      const gName = `${tc.grade}-${tc.class_number}`;
      await pool.query(
        `INSERT INTO teacher_groups (school_id, teacher_user_id, academic_year, group_name, group_type, grade, class_number)
         VALUES ($1, $2, $3, $4, 'homeroom', $5, $6)
         ON CONFLICT (teacher_user_id, academic_year, group_name) DO NOTHING`,
        [tc.school_id, teacher.id, year, gName, tc.grade, tc.class_number]
      ).catch(() => {});
    }

    const result = await pool.query(
      `SELECT g.id, g.group_name, g.group_type, g.grade, g.class_number, g.sort_order,
              (
                SELECT COUNT(*)
                FROM (
                  -- Homeroom class matching
                  SELECT ss.id FROM school_students ss
                  WHERE g.group_type = 'homeroom' AND g.grade IS NOT NULL AND g.class_number IS NOT NULL
                    AND ss.school_id = g.school_id AND ss.academic_year = g.academic_year AND ss.grade = g.grade AND ss.class_number = g.class_number
                  UNION
                  -- Custom attribute matching (e.g. club = '오케스트라', shuttle = '1호차')
                  SELECT ss.id FROM school_students ss
                  WHERE g.group_type != 'homeroom'
                    AND ss.school_id = g.school_id AND ss.academic_year = g.academic_year
                    AND (
                      ss.custom_fields->>'club' = g.group_name OR
                      ss.custom_fields->>'afterschool' = g.group_name OR
                      ss.custom_fields->>'shuttle' = g.group_name OR
                      ss.custom_fields->>'bus' = g.group_name OR
                      ss.custom_fields->>'subject' = g.group_name OR
                      ss.custom_fields->>'group' = g.group_name OR
                      ss.custom_fields::text ILIKE '%' || g.group_name || '%'
                    )
                  UNION
                  -- Explicit membership
                  SELECT gs.student_id FROM teacher_group_students gs WHERE gs.group_id = g.id
                ) AS st_union
              ) AS student_count
       FROM teacher_groups g
       WHERE g.teacher_user_id = $1 AND g.academic_year = $2
       ORDER BY g.sort_order, g.id`,
      [teacher.id, year]
    );

    res.json({ groups: result.rows, year });
  }));

  // POST: 새 그룹 개설
  router.post("/teacher/groups", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const tp = await pool.query(
      `SELECT school_id FROM classroom_teachers WHERE user_id = $1 AND active = TRUE`,
      [teacher.id]
    );
    if (!tp.rows[0]) throw new HttpError(403, "TEACHER_REQUIRED", "교사 계정이 필요합니다.");
    const schoolId = tp.rows[0].school_id;
    const year = Number(req.body.year) || new Date().getFullYear();
    const groupName = String(req.body.groupName || "").normalize("NFC").trim();
    const groupType = req.body.groupType || "homeroom";
    const grade = req.body.grade ? Number(req.body.grade) : null;
    const classNumber = req.body.classNumber ? Number(req.body.classNumber) : null;

    if (!groupName || groupName.length > 60) throw new HttpError(400, "INVALID_GROUP_NAME", "그룹 이름을 확인해 주세요 (1~60자).");
    if (!["homeroom", "subject", "activity", "club", "afterschool", "shuttle", "other"].includes(groupType))
      throw new HttpError(400, "INVALID_GROUP_TYPE", "그룹 유형이 올바르지 않습니다.");

    const result = await pool.query(
      `INSERT INTO teacher_groups (school_id, teacher_user_id, academic_year, group_name, group_type, grade, class_number)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [schoolId, teacher.id, year, groupName, groupType, grade, classNumber]
    );
    res.json({ ok: true, groupId: String(result.rows[0].id) });
  }));

  // DELETE: 그룹 삭제
  router.delete("/teacher/groups/:groupId", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const groupId = Number(req.params.groupId);
    const result = await pool.query(
      `DELETE FROM teacher_groups WHERE id = $1 AND teacher_user_id = $2 RETURNING id`,
      [groupId, teacher.id]
    );
    if (result.rowCount === 0) throw new HttpError(404, "GROUP_NOT_FOUND", "그룹을 찾을 수 없습니다.");
    res.json({ ok: true });
  }));

  // PUT: 그룹 학생 구성 저장
  router.put("/teacher/groups/:groupId/students", asyncRoute(async (req, res) => {
    const teacher = await requireTeacher(req);
    const groupId = Number(req.params.groupId);
    const studentIds = (req.body.studentIds || []).map(Number).filter(n => n > 0);

    const groupCheck = await pool.query(
      `SELECT id FROM teacher_groups WHERE id = $1 AND teacher_user_id = $2`,
      [groupId, teacher.id]
    );
    if (groupCheck.rowCount === 0) throw new HttpError(404, "GROUP_NOT_FOUND", "그룹을 찾을 수 없습니다.");

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(`DELETE FROM teacher_group_students WHERE group_id = $1`, [groupId]);
      for (let i = 0; i < studentIds.length; i++) {
        await client.query(
          `INSERT INTO teacher_group_students (group_id, student_id, sort_order) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
          [groupId, studentIds[i], i]
        );
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
    res.json({ ok: true });
  }));

  return {
    router,
    initialize,
    configuration,
    requireSiteAccess,
    verifyMuseumPresenceTicket,
    verifyLearnerBand,
    // 152개 정식 키만 통과시키므로 클라이언트가 보낸 값을 그대로 검증하는 데 쓴다.
    avatarUrl,
    listFinisherRecords,
    saveFinisherRecord,
    saveMultiplayerRoomSnapshot,
    loadMultiplayerRoomSnapshot,
    deleteMultiplayerRoomSnapshot
  };
}

module.exports = {
  createClassroomPlatform,
  AVATAR_KEYS,
  avatarCapacity,
  avatarChangeWindow,
  normalizeAvatarKey,
  createAuthenticationFailureLimiter,
  normalizePersonName,
  parseTeacherEmails
};
