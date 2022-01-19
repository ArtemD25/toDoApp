const path = require("path");
const express = require('express');
const app = express();
const knex = require('../db/knexfile.js');

interface Task {
  [key: string]: number | string | boolean;
  id: number;
  text: string;
  is_completed: boolean;
  is_important: boolean;
}

const MIN_TEXT_LENGTH = 1;
const MAX_TEXT_LENGTH = 64;

app.use(express.json());
app.use((req, res, next) => {
  console.log(`REQUEST INFO
  Method: ${req.method}
  URL: ${req.originalUrl}`);
  console.log(`REQUEST INFO: query`);
  console.log(req.query)
  next();
});

app.use(express.static(path.resolve(__dirname + '/../../frontend/build')));

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname + '/../../frontend/build/index.html'));
});

app.get('/allTasks', (req, res, next) => {
  res.sendFile(path.resolve(__dirname + '/../../frontend/build/index.html'));
});

app.get('/completedTasks', (req, res, next) => {
  res.sendFile(path.resolve(__dirname + '/../../frontend/build/index.html'));
});

app.get('/importantTasks', (req, res, next) => {
  res.sendFile(path.resolve(__dirname + '/../../frontend/build/index.html'));
});

app.get('/getAllTasks', async (req, res, next) => {
  const result = await knex
    .select('*')
    .from('tasks');

  res.json({
    tasks: result
  });
});

app.get('/getCompletedTasks', async (req, res, next) => {
  const result = await knex
    .select('*')
    .from('tasks')
    .whereRaw('is_completed IS TRUE');

  res.json({
    tasks: result
  });
});

app.get('/getImportantTasks', async (req, res, next) => {
  const result = await knex
    .select('*')
    .from('tasks')
    .whereRaw('is_important = TRUE');

  res.json({
    tasks: result
  });
});


app.patch('/tasks/:id', async (req, res, next) => {
  if (!Object.prototype.toString.call(req.body).includes('Object')) {
    return res.status(400).send('The data you provided is not correct!')
  };
  const id = req.params.id;
  const propertyToChange = Object.keys(req.body)[0];
  const newValueForProperty = req.body[propertyToChange];

  console.log(`Server got req: change ${propertyToChange} prop to ${newValueForProperty}`);
  console.log(req.body);

  const result = await knex('tasks')
    .where('id', '=', id)
    .update(propertyToChange, newValueForProperty)
    .returning('*');

  if (result) {
    res.json(result[0]);
  } else {
    res.status(400).send('The data you provided is not correct!');
  }
})

app.put('/tasks/newTask', async (req, res, next) => {
  if (!Object.prototype.toString.call(req.body).includes('Object')
    || req.body.text.length < MIN_TEXT_LENGTH
    || req.body.text.length > MAX_TEXT_LENGTH) {
    return res.status(400).send('The data you provided is not correct!');
  }

  const addedTask = await knex('tasks')
    .insert({text: req.body.text})
    .returning('*');

  if (addedTask) {
    res.json(addedTask[0]);
  } else {
    res.status(400).send('The data you provided is not correct!');
  }
})

app.delete('/tasks/:id', async (req, res, next) => {
  if (!Object.prototype.toString.call(req.body).includes('Object')) {
    return res.status(400).send('The data you provided is not correct!');
  }

  const deletedTask = await knex('tasks')
    .where('id', '=', +req.params.id)
    .del()
    .returning('*');

  if (deletedTask) {
    res.json(deletedTask[0]);
  } else {
    res.status(400).send('The data you provided is not correct!');
  }
});

app.listen(3001, () => {
  const date = new Date();
  console.log(`Server started at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
});
