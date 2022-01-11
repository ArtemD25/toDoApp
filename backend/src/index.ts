const path = require("path");
const express = require('express');
const app = express();

const tasks = [
  {
    id: 1,
    text: 'Buy some fish',
    completed: false,
    important: false
  },
  {
    id: 2,
    text: 'Get birthday presents for Carl',
    completed: false,
    important: true
  },
  {
    id: 3,
    text: 'Feed the cat',
    completed: false,
    important: false
  },
  {
    id: 4,
    text: 'Bake the cake',
    completed: false,
    important: true
  },
  {
    id: 5,
    text: 'Write a letter',
    completed: true,
    important: false
  },
  {
    id: 6,
    text: 'Go backpacking to the Carpathians',
    completed: true,
    important: false
  }
]

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
  console.log('Sending all tasks...');
  res.json(tasks);
});

app.get('/completedTasks', (req, res, next) => {
  res.json(getfilteredTasks(true, false));
});

app.get('/importantTasks', (req, res, next) => {
  res.json(getfilteredTasks(false, true));
});

app.put('/tasks/:id', (req, res, next) => {
  if (!Object.prototype.toString.call(req.body).includes('Object')) {
    return res.status(400).send('The data you provided is not correct!');
  } else if (!tasks.some(item => +item.id === +req.params.id)) {
    return res.status(400).send('You can`t update a non existing task!');
  }
  const id = req.params.id;
  const propertyToChange = Object.keys(req.body)[0];
  const newValueForProperty = req.body[propertyToChange];

  console.log(`Server got req: change ${propertyToChange} prop to ${newValueForProperty}`);
  console.log(req.body)

  let index;
  for (let i = 0; i < tasks.length; i++) {
    if (+tasks[i].id === +id) {
      console.log(`---`);
      console.log(tasks[i]);
      console.log(`Old value: ${tasks[i][propertyToChange]}`);
      tasks[i][propertyToChange] = newValueForProperty;
      console.log(`New value: ${tasks[i][propertyToChange]}`);
      console.log(tasks[i]);
      console.log(`---`);
      index = i;
      break;
    }
  }

  console.log(`Server changed ${propertyToChange} property to ${tasks[index][propertyToChange]}`);

  res.json(tasks[index]);
})

app.delete('/tasks/:id', (req, res, next) => {
  if (!Object.prototype.toString.call(req.body).includes('Object')) {
    return res.status(400).send('The data you provided is not correct!');
  } else if (!tasks.some(item => +item.id === +req.params.id)) {
    return res.status(400).send('You can`t update a non existing task!');
  }

  let object;
  for (let i = 0; i < tasks.length; i++) {
    if (+tasks[i].id === +req.params.id) {
      object = tasks[i];
      tasks.splice(i, 1);
      break;
    }
  }

  res.json(object);
})

app.listen(3001, () => {
  const date = new Date();
  console.log(`Server started at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
})

function getfilteredTasks(completed: boolean, important: boolean) {
  if (completed) {
    return tasks.filter(task => task.completed);
  } else if (important) {
    return tasks.filter(task => task.important);
  }
}