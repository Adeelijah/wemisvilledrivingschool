CREATE TABLE IF NOT EXISTS course_prices (
  course_code TEXT PRIMARY KEY,
  price_ngn INTEGER NOT NULL CHECK (price_ngn >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO course_prices (course_code, price_ngn)
VALUES
  ('WDS-101', 80000),
  ('WDS-201', 105000),
  ('WDS-301', 130000)
ON CONFLICT (course_code) DO NOTHING;
