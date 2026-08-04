const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgres://postgres:postgres@localhost:5432/class_platform' });
async function run() {
  const q = `
    SELECT conname, contype, pg_get_constraintdef(c.oid)
    FROM pg_constraint c
    JOIN pg_namespace n ON n.oid = c.connamespace
    WHERE conrelid::regclass::text IN (
      'classroom_teachers', 'classroom_classes', 'classroom_student_access_resets'
    );
  `;
  const res = await pool.query(q);
  console.log(JSON.stringify(res.rows, null, 2));
  process.exit(0);
}
run();
