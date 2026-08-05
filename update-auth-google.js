const fs = require('fs');
let code = fs.readFileSync('game-hub-server/classroom-platform.js', 'utf8');

const authGoogleOld = `    let isGuardian = false;
    const dbGuardianCheck = await pool.query(
      "SELECT id FROM classroom_students WHERE LOWER(guardian1_email) = $1 OR LOWER(guardian2_email) = $1 LIMIT 1",
      [email]
    );
    if (dbGuardianCheck.rowCount > 0) {
      isGuardian = true;
    }

    if (!payload.hd && !isAdmin && !isGuardian) {
      throw new HttpError(403, "SCHOOL_ACCOUNT_REQUIRED", "Use the Google Workspace account issued by your school, or the email registered by the teacher.");
    }
    const userResult = await pool.query(
      \`INSERT INTO classroom_users
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
       RETURNING *\`,
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
    }`;

const authGoogleNew = `    let isGuardian = false;
    let isStudent = false;
    
    // Check Guardian
    const dbGuardianCheck = await pool.query(
      "SELECT id FROM classroom_students WHERE LOWER(guardian1_email) = $1 OR LOWER(guardian2_email) = $1",
      [email]
    );
    if (dbGuardianCheck.rowCount > 0) {
      isGuardian = true;
    }

    // Check Student
    let studentIds = [];
    const dbStudentCheck = await pool.query(
      "SELECT id FROM classroom_students WHERE LOWER(student_email) = $1",
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
      \`INSERT INTO classroom_users
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
       RETURNING *\`,
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
    
    if (isStudent && studentIds.length > 0) {
      await pool.query(
        "UPDATE classroom_students SET user_id = $1, updated_at = NOW() WHERE id = ANY($2)",
        [user.id, studentIds]
      );
    }`;

code = code.replace(authGoogleOld, authGoogleNew);
fs.writeFileSync('game-hub-server/classroom-platform.js', code);
console.log('Script executed successfully.');
