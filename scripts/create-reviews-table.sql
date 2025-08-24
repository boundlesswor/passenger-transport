-- Создание таблицы для отзывов клиентов
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Политика для чтения отзывов (все могут читать)
CREATE POLICY "Anyone can read reviews" ON reviews
  FOR SELECT USING (true);

-- Политика для создания отзывов (все могут создавать)
CREATE POLICY "Anyone can create reviews" ON reviews
  FOR INSERT WITH CHECK (true);

-- Создание индекса для быстрой сортировки по дате
CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON reviews (created_at DESC);
