import {
  START_STOPWATCH,
  PAUSE_STOPWATCH,
  RESTART_STOPWATCH,
  ADD_SECOND_STOPWATCH,
  START_TIMER,
  PAUSE_TIMER,
  RESTART_TIMER,
  ADD_SECOND_TIMER,
  SET_TIMER_DURATION,
} from '../types';

const initialState = {
  stopwatch: {
    isPlaying: false,
    elapsedTime: 0,
  },
  timer: {
    isPlaying: false,
    elapsedTime: 0,
    duration: null,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case START_STOPWATCH:
      return {
        ...state,
        stopwatch: { ...state.stopwatch, isPlaying: true },
      };
    case PAUSE_STOPWATCH:
      return {
        ...state,
        stopwatch: { ...state.stopwatch, isPlaying: false },
      };
    case RESTART_STOPWATCH:
      return {
        ...state,
        stopwatch: { isPlaying: false, elapsedTime: 0 },
      };
    case ADD_SECOND_STOPWATCH:
      return {
        ...state,
        stopwatch: { ...state.stopwatch, elapsedTime: state.stopwatch.elapsedTime + 10 },
      };

    case START_TIMER:
      return {
        ...state,
        timer: { ...state.timer, isPlaying: true },
      };
    case PAUSE_TIMER:
      return {
        ...state,
        timer: { ...state.timer, isPlaying: false },
      };
    case RESTART_TIMER:
      return {
        ...state,
        timer: { isPlaying: false, elapsedTime: 0, duration: null },
      };
    case ADD_SECOND_TIMER:
      return {
        ...state,
        timer: { ...state.timer, elapsedTime: state.timer.elapsedTime + 1000 },
      };
    case SET_TIMER_DURATION:
      return {
        ...state,
        timer: { ...state.timer, duration: action.payload },
      };
    default:
      return state;
  }
}

export default reducer;
