SELECT CURRENT_DATE;

-- DROP TABLE IF EXISTS notes;

-- CREATE TABLE notes(
--   id serial PRIMARY KEY,
--   title text NOT NULL,
--   content text,
--   created timestamp DEFAULT current_timestamp
-- );

-- SELECT * FROM notes;

-- INSERT INTO notes (title,content)
-- VALUES ('Water Plants','My plants are thisrty'),
--   ('Wash Dishes','My dishes are dirty'),
--   ('Read about SQL','Learning SQL is fun!'),
--   ('Call Mom','Mom called yesterday, I need to call her back'),
--   ('Exercise','You''re out of shape! Go to the Gym') 
--   RETURNING id,title;

--   INSERT INTO notes (title,content)
-- VALUES ('Wash Car','My car is dirty'),
--   ('Brush Teeth','My teeth are dirty. YUK!')
--   RETURNING id,title;

SELECT * FROM notes;