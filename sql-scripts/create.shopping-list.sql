DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery AS ENUM(
  'Main',
  'Snack',
  'Lunch',
  'Breakfast'
);

CREATE TABLE IF NOT EXISTS shopping_list(
  item_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  price  decimal(12,2) NOT NULL,
  date_added TIMESTAMP DEFAULT now() NOT NULL,
  checked BOOLEAN DEFAULT false,
  category grocery NOT NULL
);