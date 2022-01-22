"use strict";
exports.__esModule = true;
exports.actions = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    isModalWindowShown: false,
    modalWindowTaskText: '',
    filteredTasksToShow: [],
    modalWindowTaskId: null,
    modalWindowAction: null,
    isLoaderShown: false
};
var stateSlice = (0, toolkit_1.createSlice)({
    name: 'stateSlice',
    initialState: initialState,
    reducers: {
        setModalWindowVisibility: function (state, action) {
            state.isModalWindowShown = action.payload;
        },
        setModalWindowTaskText: function (state, action) {
            state.modalWindowTaskText = action.payload;
        },
        setFilteredTasksToShow: function (state, action) {
            state.filteredTasksToShow = action.payload;
        },
        setModalWindowTaskId: function (state, action) {
            state.modalWindowTaskId = action.payload;
        },
        setModalWindowAction: function (state, action) {
            state.modalWindowAction = action.payload;
        },
        setLoaderVisibility: function (state, action) {
            state.isLoaderShown = action.payload;
        }
    }
});
var store = (0, toolkit_1.configureStore)({
    reducer: stateSlice.reducer
});
exports.actions = stateSlice.actions;
exports["default"] = store;
