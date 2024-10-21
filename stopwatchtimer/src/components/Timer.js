import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTimerDuration, startTimer, pauseTimer, restartTimer, addSecondTimer } from './actions';

const Timer = () => {
  const dispatch = useDispatch();
  const { isPlaying, elapsedTime, duration } = useSelector(state => state.timer);
  const [inputTime, setInputTime] = useState('');

  const handleStart = () => {
    const timerDuration = parseInt(inputTime, 10) * 1000;
    if (!isNaN(timerDuration) && timerDuration > 0) {
      dispatch(setTimerDuration(timerDuration));
      dispatch(startTimer());
      Keyboard.dismiss();
    }
  };

  const handlePause = () => {
    dispatch(pauseTimer());
  };

  const handleRestart = () => {
    dispatch(restartTimer());
    setInputTime('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (elapsedTime < duration) {
          dispatch(addSecondTimer());
        } else {
          dispatch(pauseTimer());
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, elapsedTime, duration, dispatch]);

  const formatTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{formatTime(duration - elapsedTime)}</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите время в секундах"
        keyboardType="numeric"
        value={inputTime}
        onChangeText={setInputTime}
        onBlur={Keyboard.dismiss}
        placeholderTextColor="#aaa"
      />
      {!isPlaying ? (
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Старт</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={handlePause}>
          <Text style={styles.buttonText}>Пауза</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={handleRestart}>
        <Text style={styles.buttonText}>Сбросить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
    padding: 20,
  },
  display: {
    fontSize: 54,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
    backgroundColor: '#333',
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  pauseButton: {
    backgroundColor: '#f44336',
  },
  restartButton: {
    backgroundColor: '#4CAF50',
  },
});

export default Timer;
