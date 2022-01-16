var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
app.get('/importantTasks', function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../../frontend/build/index.html'));
});
app.get('/getAllTasks', function (req, res, next) {
    console.log('Sending all tasks...');
    res.json(tasks);
});
app.get('/getCompletedTasks', function (req, res, next) {
    res.json(getFilteredTasks(true, false));
});
app.get('/getImportantTasks', function (req, res, next) {
    res.send(JSON.stringify(getFilteredTasks(false, true)));
});
app.patch('/tasks/:id', function (req, res, next) {
    if (!Object.prototype.toString.call(req.body).includes('Object')) {
        return res.status(400).send('The data you provided is not correct!');
    }
    else if (!tasks.some(function (item) { return +item.id === +req.params.id; })) {
        return res.status(400).send('You can`t update a non-existing task!');
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
app.put('/tasks/addNewTask', function (req, res, next) {
    if (!Object.prototype.toString.call(req.body).includes('Object')) {
        return res.status(400).send('The data you provided is not correct!');
    }
    var newTask = {
        id: idGenerator.next().value,
        text: req.body.text,
        completed: false,
        important: false
    };
    tasks.push(newTask);
    res.json(newTask);
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
function getFilteredTasks(completed, important) {
    if (completed) {
        return tasks.filter(function (task) { return task.completed; });
    }
    else if (important) {
        return tasks.filter(function (task) { return task.important; });
    }
}
function getId() {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = 50;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                id += 1;
                return [4 /*yield*/, id];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
var idGenerator = getId();
