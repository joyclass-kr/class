CREATE TABLE IF NOT EXISTS metacognition_attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES classroom_users(id) ON DELETE CASCADE,
  student_id BIGINT REFERENCES classroom_students(id) ON DELETE SET NULL,
  class_id BIGINT REFERENCES classroom_classes(id) ON DELETE SET NULL,
  item_set_version TEXT NOT NULL,
  item_count SMALLINT NOT NULL CHECK (item_count BETWEEN 1 AND 200),
  -- 아래 지표는 모두 서버가 responses로부터 다시 계산해 넣는다.
  -- 클라이언트가 보낸 요약값은 저장하지 않는다(연구 자료 신뢰성).
  accuracy REAL NOT NULL CHECK (accuracy BETWEEN 0 AND 1),
  mean_confidence REAL NOT NULL CHECK (mean_confidence BETWEEN 0 AND 1),
  bias REAL NOT NULL CHECK (bias BETWEEN -1 AND 1),
  discrimination REAL CHECK (discrimination BETWEEN -1 AND 1),
  calibration_error REAL NOT NULL CHECK (calibration_error BETWEEN 0 AND 1),
  brier REAL NOT NULL CHECK (brier BETWEEN 0 AND 1),
  high_conf_error_count SMALLINT NOT NULL DEFAULT 0,
  certain_error_count SMALLINT NOT NULL DEFAULT 0,
  low_conf_hit_count SMALLINT NOT NULL DEFAULT 0,
  trap_penalty REAL,
  profile_key TEXT NOT NULL,
  responses JSONB NOT NULL CHECK (JSONB_TYPEOF(responses) = 'array'),
  client_summary JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS metacognition_attempts_user_idx
  ON metacognition_attempts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS metacognition_attempts_class_idx
  ON metacognition_attempts(class_id, created_at DESC);
CREATE INDEX IF NOT EXISTS metacognition_attempts_version_idx
  ON metacognition_attempts(item_set_version, created_at DESC);
