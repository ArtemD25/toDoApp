var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _this = this;
var path = require("path");
var express = require('express');
var app = express();
var knex = require('../db/knexfile.js');
var staticRouter = express.Router();
var apiRouter = express.Router();
var MIN_TEXT_LENGTH = 1;
var MAX_TEXT_LENGTH = 64;
var DATA_NOT_CORRECT_MSG = 'The data you provided is not correct!';
app.use(express.json());
/* DELETE */
app.use(function (req, res, next) {
    console.log("REQUEST INFO\n  Method: ".concat(req.method, "\n  URL: ").concat(req.originalUrl));
    console.log("REQUEST INFO: query");
    console.log(req.query);
    next();
});
app.use('/static', staticRouter);
app.use('/api', apiRouter);
app.use(express.static(path.resolve(__dirname + '/../../frontend/build')));
staticRouter.get(['/', '/allTasks', '/completedTasks', '/importantTasks'], function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../../frontend/build/index.html'));
});
app.get('/*', function (req, res, next) {
    res.redirect('/static');
});
apiRouter.get('/getAllTasks', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex
                    .select('*')
                    .from('tasks')];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json({
                        tasks: result
                    });
                }
                else {
                    res.status(500).send('Data not found');
                }
                return [2 /*return*/];
        }
    });
}); });
apiRouter.get('/getCompletedTasks', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex
                    .select('*')
                    .from('tasks')
                    .whereRaw('is_completed IS TRUE')];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json({
                        tasks: result
                    });
                }
                else {
                    res.status(500).send('Data not found');
                }
                return [2 /*return*/];
        }
    });
}); });
apiRouter.get('/getImportantTasks', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex
                    .select('*')
                    .from('tasks')
                    .whereRaw('is_important = TRUE')];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json({
                        tasks: result
                    });
                }
                else {
                    res.status(500).send('Data not found');
                }
                return [2 /*return*/];
        }
    });
}); });
apiRouter.patch('/tasks/:id', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var id, propertyToChange, newValueForProperty, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!Object.prototype.toString.call(req.body).includes('Object')) {
                    return [2 /*return*/, res.status(400).send(DATA_NOT_CORRECT_MSG)];
                }
                id = req.params.id;
                propertyToChange = Object.keys(req.body)[0];
                newValueForProperty = req.body[propertyToChange];
                return [4 /*yield*/, knex('tasks')
                        .where('id', '=', id)
                        .update(propertyToChange, newValueForProperty)
                        .returning('*')];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json(result[0]);
                }
                else {
                    res.status(400).send(DATA_NOT_CORRECT_MSG);
                }
                return [2 /*return*/];
        }
    });
}); });
apiRouter.put('/tasks/newTask', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var addedTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!Object.prototype.toString.call(req.body).includes('Object')
                    || req.body.text.length < MIN_TEXT_LENGTH
                    || req.body.text.length > MAX_TEXT_LENGTH) {
                    return [2 /*return*/, res.status(400).send(DATA_NOT_CORRECT_MSG)];
                }
                return [4 /*yield*/, knex('tasks')
                        .insert({ text: req.body.text })
                        .returning('*')];
            case 1:
                addedTask = _a.sent();
                if (addedTask) {
                    res.json(addedTask[0]);
                }
                else {
                    res.status(400).send(DATA_NOT_CORRECT_MSG);
                }
                return [2 /*return*/];
        }
    });
}); });
apiRouter["delete"]('/tasks/:id', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var deletedTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!Object.prototype.toString.call(req.body).includes('Object')) {
                    return [2 /*return*/, res.status(400).send(DATA_NOT_CORRECT_MSG)];
                }
                return [4 /*yield*/, knex('tasks')
                        .where('id', '=', +req.params.id)
                        .del()
                        .returning('*')];
            case 1:
                deletedTask = _a.sent();
                if (deletedTask) {
                    res.json(deletedTask[0]);
                }
                else {
                    res.status(400).send(DATA_NOT_CORRECT_MSG);
                }
                return [2 /*return*/];
        }
    });
}); });
app.listen(3001, function () {
    console.log(getTimeMessageString(new Date()));
});
app.use(function (error, req, res, next) {
    res.status(500).json({
        error: error.message
    });
});
function getTimeMessageString(date) {
    var twoDigitsTime = [date.getHours(), date.getMinutes(), date.getSeconds()].map(function (time) {
        if (time.toString().length === 1) {
            return "0".concat(time);
        }
        return "".concat(time);
    });
    return "Server started at ".concat(twoDigitsTime[0], ":").concat(twoDigitsTime[1], ":").concat(twoDigitsTime[2]);
}
