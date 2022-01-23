import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialState = {
  isModalWindowShown: false,
  modalWindowTaskText: '',
  filteredTasksToShow: [],
  modalWindowTaskId: null,
  modalWindowAction: null,
  isLoaderShown: false,
  appPageOpened: ''
}

interface Task {
  [key: string]: number | string | boolean;
  id: number;
  text: string;
  is_completed: boolean;
  is_important: boolean;
}

const stateSlice = createSlice({
  name: 'stateSlice',
  initialState,
  reducers: {
    setModalWindowVisibility(state, action) {
      state.isModalWindowShown = action.payload;
    },
    setModalWindowTaskText(state, action) {
      state.modalWindowTaskText = action.payload;
    },
    setFilteredTasksToShow(state, action) {
      const tasksArray = JSON.parse(JSON.stringify(action.payload));
      state.filteredTasksToShow = tasksArray.sort((firstTask: Task, secondTask: Task) => {
        return firstTask.id - secondTask.id
      });
    },
    setModalWindowTaskId(state, action) {
      state.modalWindowTaskId = action.payload;
    },
    setModalWindowAction(state, action) {
      state.modalWindowAction = action.payload;
    },
    setLoaderVisibility(state, action) {
      state.isLoaderShown = action.payload;
    },
    setAppPageOpened(state, action) {
      state.appPageOpened = action.payload;
    }
  }
});

const store = configureStore({
  reducer: stateSlice.reducer
})

export const actions = stateSlice.actions;
export default store;


