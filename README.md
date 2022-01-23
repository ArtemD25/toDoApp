# ToDo App

The application allows you to create, update and delete tasks as well as mark / unmark them completed or important.

## Launching the app

1. Change working directory to /frontend
```shell
cd frontend
```
2. Run script to
   1. compile server- and redux-file to js
   2. build react-app
   3. run server
```shell
npm run dev-tsc
```
## Database

When you connect to your local database and launch the app, there will be no data available since yiu haven`t added anything yet. You can add data manually in the app (there is a 'Add task' button). But you also can fill your database with dummy data before launching the app. In order to do that launch the code in the following sql-file:
```
backend/db/create_db_and_fill_with_dummy_data.sql
```

## Technologies used

HTML, CSS, JS, React, Express, SQL (PostgreSQL), Knex and Docker
