CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    text VARCHAR(192) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    is_important BOOLEAN DEFAULT FALSE
);

-- Run the code below if you wanna fill the table with dummy data

-- INSERT INTO tasks(text)
-- VALUES
--     ('Feed the cat (or not)'),
--     ('Grab a bite at the McDonald`s'),
--     ('Get b-day presents for Carl and Helen'),
--     ('Walk the dog in the park'),
--     ('Get some sleep'),
--     ('Watch Game of Thrones, season 8');