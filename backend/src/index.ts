const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('../db/knexfile.js');
const tasksRouter = express.Router();

const MIN_TEXT_LENGTH = 1;
const MAX_TEXT_LENGTH = 64;
const PORT = 3001;
const DATA_NOT_CORRECT_MSG = 'The data you provided is not correct!';

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/tasks', tasksRouter);

tasksRouter.get('/:query', async (req, res) => {
  try {
    const userQuery = req.params.query;
    let result;
    switch(userQuery) {
      case 'all':
        result = await knex
          .select('*')
          .from('tasks');
        break;
      case 'completed':
        result = await knex.select('*').from('tasks')
          .where({
            is_completed: true
          });
        break;
      case 'important':
        result = await knex.select('*').from('tasks')
          .where({
            is_important: true
          });
        break;
      default:
        return res.status(404).send({
          error: DATA_NOT_CORRECT_MSG
        })
    }

    res.json({
      tasks: result
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

tasksRouter.patch('/:id', async (req, res) => {
  try {
    if (!Object.prototype.toString.call(req.body).includes('Object')) {
      return res.status(400).json({
        error: DATA_NOT_CORRECT_MSG
      })
    }
    const id = req.params.id;
    const propertyToChange = Object.keys(req.body)[0];
    const newValueForProperty = req.body[propertyToChange];

    const result = await knex('tasks')
      .where('id', '=', id)
      .update(propertyToChange, newValueForProperty)
      .returning('*');

    if (result.length > 0) {
      return res.json(result[0]);
    } else {
      return res.status(400).json({
        error: DATA_NOT_CORRECT_MSG
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

tasksRouter.put('/newTask', async (req, res) => {
  try {
    if (!Object.prototype.toString.call(req.body).includes('Object')
      || req.body.text.length < MIN_TEXT_LENGTH
      || req.body.text.length > MAX_TEXT_LENGTH) {
      return res.status(400).send(DATA_NOT_CORRECT_MSG);
    }

    const addedTask = await knex('tasks')
      .insert({text: req.body.text})
      .returning('*');

    if (addedTask.length > 0) {
      res.json(addedTask[0]);
    } else {
      res.status(400).send(DATA_NOT_CORRECT_MSG);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
})

tasksRouter.delete('/:id', async (req, res) => {
  try {
    if (!Object.prototype.toString.call(req.body).includes('Object')) {
      return res.status(400).send(DATA_NOT_CORRECT_MSG);
    }

    const deletedTask = await knex('tasks')
      .where('id', '=', +req.params.id)
      .del()
      .returning('*');

    if (deletedTask.length > 0) {
      res.json(deletedTask[0]);
    } else {
      res.status(400).send(DATA_NOT_CORRECT_MSG);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(getTimeMessageString(new Date()));
});

app.use((error, req, res, next) => {
  res.status(500).json({
    error: error.message
  })
})

function getTimeMessageString(date: Date): string {
  const twoDigitsTime = [date.getHours(), date.getMinutes(), date.getSeconds()].map(time => {
    if (time.toString().length === 1) {
      return `0${time}`;
    }
    return `${time}`;
  });
  return `Server started at ${twoDigitsTime[0]}:${twoDigitsTime[1]}:${twoDigitsTime[2]} on port ${PORT}`
}
