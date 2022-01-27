# ToDo App

The application allows you to create, update and delete tasks as well as mark / unmark them completed or important

## Launching the app
Make sure you have node.js installed on your machine as well as docker. Also make sure there is no local database running on your port 5432. If that is the case, temporarily stop this process.

In order to launch the project, type in the following command in your shell (from the project root directory)
```shell
docker-compose up
```
This will take a while, so be patient :)

After all three containers are launched open your browser and explore `http://localhost:3000`

When you launch the app, there will be no data available since one hasn't added anything yet. You can add data (tasks) manually in the app (there is a 'Add task' button on the 'All tasks'-page)

You also can fill your database with dummy data using the following sql-command:
```postgresql
INSERT INTO tasks(text)
VALUES
    ('Feed the cat (or not)'),
    ('Grab a bite at the McDonald`s'),
    ('Get b-day presents for Carl and Helen'),
    ('Walk the dog in the park'),
    ('Get some sleep'),
    ('Watch Game of Thrones, season 8');
```

## Technologies used

HTML, CSS, JS, React, Express, SQL (PostgreSQL), Knex and Docker
