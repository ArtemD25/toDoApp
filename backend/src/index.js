var path = require("path");
var express = require('express');
var app = express();
var tasks = [
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
];
app.use(express.json());
app.use(function (req, res, next) {
    console.log("REQUEST INFO\n  Method: ".concat(req.method, "\n  URL: ").concat(req.originalUrl));
    console.log("REQUEST INFO: query");
    console.log(req.query);
    next();
});
app.use(express.static(path.resolve(__dirname + '/../../frontend/build')));
app.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../../frontend/build/index.html'));
});
app.get('/allTasks', function (req, res, next) {
    console.log('Sending all tasks...');
    res.json(tasks);
});
app.get('/completedTasks', function (req, res, next) {
    res.json(getfilteredTasks(true, false));
});
app.get('/importantTasks', function (req, res, next) {
    res.json(getfilteredTasks(false, true));
});
app.put('/tasks/:id', function (req, res, next) {
    if (!Object.prototype.toString.call(req.body).includes('Object')) {
        return res.status(400).send('The data you provided is not correct!');
    }
    else if (!tasks.some(function (item) { return +item.id === +req.params.id; })) {
        return res.status(400).send('You can`t update a non existing task!');
    }
    var id = req.params.id;
    var propertyToChange = Object.keys(req.body)[0];
    var newValueForProperty = req.body[propertyToChange];
    console.log("Server got req: change ".concat(propertyToChange, " prop to ").concat(newValueForProperty));
    console.log(req.body);
    var index;
    for (var i = 0; i < tasks.length; i++) {
        if (+tasks[i].id === +id) {
            console.log("---");
            console.log(tasks[i]);
            console.log("Old value: ".concat(tasks[i][propertyToChange]));
            tasks[i][propertyToChange] = newValueForProperty;
            console.log("New value: ".concat(tasks[i][propertyToChange]));
            console.log(tasks[i]);
            console.log("---");
            index = i;
            break;
        }
    }
    console.log("Server changed ".concat(propertyToChange, " property to ").concat(tasks[index][propertyToChange]));
    res.json(tasks[index]);
});
app["delete"]('/tasks/:id', function (req, res, next) {
    if (!Object.prototype.toString.call(req.body).includes('Object')) {
        return res.status(400).send('The data you provided is not correct!');
    }
    else if (!tasks.some(function (item) { return +item.id === +req.params.id; })) {
        return res.status(400).send('You can`t update a non existing task!');
    }
    var object;
    for (var i = 0; i < tasks.length; i++) {
        if (+tasks[i].id === +req.params.id) {
            object = tasks[i];
            tasks.splice(i, 1);
            break;
        }
    }
    res.json(object);
});
app.listen(3001, function () {
    var date = new Date();
    console.log("Server started at ".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds()));
});
function getfilteredTasks(completed, important) {
    if (completed) {
        return tasks.filter(function (task) { return task.completed; });
    }
    else if (important) {
        return tasks.filter(function (task) { return task.important; });
    }
}
