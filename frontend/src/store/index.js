import {createStore} from 'redux';

const initialState = {
  isModalWindowShown: false,
  modalWindowTaskText: '',
  filteredTasksToShow: [],
  modalWindowTaskId: null,
  modalWindowAction: null
}

function toDoAppReducer(state = initialState, action) {
  if (action.type === 'showModalWindow' && !state.isModalWindowShown) {
    return {
      isModalWindowShown: true,
      modalWindowTaskText: state.modalWindowTaskText,
      filteredTasksToShow: state.filteredTasksToShow,
      modalWindowTaskId: state.modalWindowTaskId,
      modalWindowAction: state.modalWindowAction
    }
  } else if (action.type === 'closeModalWindow' && state.isModalWindowShown) {
    return {
      isModalWindowShown: false,
      modalWindowTaskText: state.modalWindowTaskText,
      filteredTasksToShow: state.filteredTasksToShow,
      modalWindowTaskId: state.modalWindowTaskId,
      modalWindowAction: state.modalWindowAction
    }
  } else if (action.type === 'setModalWindowTaskText') {
    return {
      isModalWindowShown: state.isModalWindowShown,
      modalWindowTaskText: action.modalWindowTaskText,
      filteredTasksToShow: state.filteredTasksToShow,
      modalWindowTaskId: state.modalWindowTaskId,
      modalWindowAction: state.modalWindowAction
    }
  } else if (action.type === 'setFilteredTasksToShow') {
    return {
      isModalWindowShown: state.isModalWindowShown,
      modalWindowTaskText: state.modalWindowTaskText,
      filteredTasksToShow: action.filteredTasksToShow,
      modalWindowTaskId: state.modalWindowTaskId,
      modalWindowAction: state.modalWindowAction
    }
  } else if (action.type === 'setModalWindowTaskId') {
    return {
      isModalWindowShown: state.isModalWindowShown,
      modalWindowTaskText: state.modalWindowTaskText,
      filteredTasksToShow: state.filteredTasksToShow,
      modalWindowTaskId: action.modalWindowTaskId,
      modalWindowAction: state.modalWindowAction
    }
  } else if (action.type === 'setModalWindowAction') {
    return {
      isModalWindowShown: state.isModalWindowShown,
      modalWindowTaskText: state.modalWindowTaskText,
      filteredTasksToShow: state.filteredTasksToShow,
      modalWindowTaskId: state.modalWindowTaskId,
      modalWindowAction: action.modalWindowAction
    }
  }
  
  return state;
}

const store = createStore(toDoAppReducer);

export default store;


