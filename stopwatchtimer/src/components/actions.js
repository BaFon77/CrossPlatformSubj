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

export const setTimerDuration = (duration) => ({
  type: SET_TIMER_DURATION,
  payload: duration,
});

// Секундомер
export const startStopwatch = () => ({
  type: START_STOPWATCH,
});

export const pauseStopwatch = () => ({
  type: PAUSE_STOPWATCH,
});

export const restartStopwatch = () => ({
  type: RESTART_STOPWATCH,
});

export const addSecondStopwatch = () => ({
  type: ADD_SECOND_STOPWATCH,
});

// Таймер
export const startTimer = () => ({
  type: START_TIMER,
});

export const pauseTimer = () => ({
  type: PAUSE_TIMER,
});

export const restartTimer = () => ({
  type: RESTART_TIMER,
});

export const addSecondTimer = () => ({
  type: ADD_SECOND_TIMER,
});
