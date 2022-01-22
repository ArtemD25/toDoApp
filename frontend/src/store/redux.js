import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialState = {
  isModalWindowShown: false,
  modalWindowTaskText: '',
  filteredTasksToShow: [],
  modalWindowTaskId: null,
  modalWindowAction: null,
  isLoaderShown: false
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
      state.filteredTasksToShow = action.payload;
    },
    setModalWindowTaskId(state, action) {
      state.modalWindowTaskId = action.payload;
    },
    setModalWindowAction(state, action) {
      state.modalWindowAction = action.payload;
    },
    setLoaderVisibility(state, action) {
      state.isLoaderShown = action.payload;
    }
  }
});

const store = configureStore({
  reducer: stateSlice.reducer
})

export const actions = stateSlice.actions;
export default store;


