# ToDo App

The application allows you to create, update and delete tasks as well as mark / unmark them completed or important

## Launching the app

1. Make sure you have node.js installed on your machine. Install all packages needed to build and launch the app on frontend (**/frontend**):
```shell
cd frontend
npm install
```
and on backend (**/backend**):
```shell
cd ../backend
npm install
```
2. Change working directory to /frontend
```shell
cd frontend
```
2. Run the script below to
   1. compile typescript server- and redux-file to javascript
   2. build react-app
   3. run server
```shell
npm run dev-tsc
```
## Database

When you connect to your local database and launch the app, there will be no data available since one has not added anything yet. You can add data manually in the app (there is a 'Add task' button). But you also can fill your database with dummy data before launching the app. In order to do that launch the code in the following sql-file:
```
backend/db/create_db_and_fill_with_dummy_data.sql
```

## Technologies used

HTML, CSS, JS, React, Express, SQL (PostgreSQL), Knex and Docker
