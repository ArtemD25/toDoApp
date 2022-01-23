CREATE DATABASE to_do_app_tasks;

-- At this point connect to your database and after that proceed

CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  text VARCHAR(192) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  is_important BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks(text)
VALUES
  ('Feed the cat (or not)'),
  ('Grab a bite at the McDonald`s'),
  ('Get b-day presents for Carl and Helen'),
  ('Walk the dog in the park'),
  ('Get some sleep'),
  ('Watch Game of Thrones, season 8');
