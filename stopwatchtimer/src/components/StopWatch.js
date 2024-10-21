import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { startStopwatch, restartStopwatch, addSecondStopwatch } from './actions';

const StopWatch = () => {
  const dispatch = useDispatch();
  const { isPlaying, elapsedTime } = useSelector(state => state.stopwatch);
  const [laps, setLaps] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [currentElapsedTime, setCurrentElapsedTime] = useState(elapsedTime);
  const currentElapsedTimeRef = useRef(currentElapsedTime);

  useEffect(() => {
    currentElapsedTimeRef.current = currentElapsedTime; // обновляем реф каждый раз, когда изменяется текущее время
  }, [currentElapsedTime]);

  useEffect(() => {
    let requestId;
    if (isPlaying) {
      const updateElapsedTime = () => {
        const now = Date.now();
        const newElapsedTime = now - startTime;
        setCurrentElapsedTime(newElapsedTime);
        requestId = requestAnimationFrame(updateElapsedTime);
      };
      setStartTime(Date.now() - elapsedTime);
      updateElapsedTime();
    }

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      if (!isPlaying) {
        dispatch(addSecondStopwatch(currentElapsedTimeRef.current)); // используем реф для текущего времени
      }
    };
  }, [startTime, isPlaying, dispatch, elapsedTime]);

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleLap = () => {
    setLaps(laps => [...laps, currentElapsedTime]);
  };

  const clearLaps = () => {
    setLaps([]);
  };

  const handleReset = () => {
    dispatch(restartStopwatch());
    clearLaps();
    setCurrentElapsedTime(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{formatTime(currentElapsedTime)}</Text>
      <View style={styles.buttons}>
        {!isPlaying ? (
          <TouchableOpacity style={styles.button} onPress={() => dispatch(startStopwatch())}>
            <Text style={styles.buttonText}>Начать</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.lapButton]} onPress={() => dispatch(restartStopwatch())}>
            <Text style={styles.buttonText}>Стоп</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLap}>
          <Text style={styles.buttonText}>Круг</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearLaps}>
          <Text style={styles.buttonText}>Очистить круги</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
          <Text style={styles.buttonText}>Сбросить</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.lapsContainer}>
        {laps.length > 0 && laps.map((lap, index) => (
          <Text key={index} style={styles.lapItem}>
            Круг {index + 1}: {formatTime(lap)}
          </Text>
        ))}
      </ScrollView>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  lapButton: {
    backgroundColor: '#f44336',
  },
  clearButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#ffc107',
  },
  lapsContainer: {
    marginTop: 20,
    width: '100%',
    maxHeight: 200,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
  },
  lapItem: {
    color: 'white',
    fontFamily: 'monospace',
    paddingVertical: 5,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
  },
});

export default StopWatch;
