import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { storeData, retrieveData } from '../../hooks/kv-store';

export default function AdminAvailability() {
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      const storedAvailability = await retrieveData('adminAvailability');
      if (storedAvailability) {
        setAvailability(storedAvailability);
      }
    };

    fetchAvailability();
  }, []);

  const getCurrentWeek = () => {
    const currentWeek = [];
    const today = new Date(); // Get the current date object
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayOfWeek = today.getDay();
    const currentDate = today.getDate();
    const currentMonth = today.toLocaleString('en-US', { month: 'long', timeZone: 'Asia/Manila' });
  
    for (let i = currentDayOfWeek; i < 7; i++) {
      const date = new Date(today); // Create a new date object for each day of the week
      date.setDate(currentDate - currentDayOfWeek + i);
      const day = daysOfWeek[date.getDay()];
      const formattedDate = `${day}, ${currentMonth} ${date.getDate()}`;
      currentWeek.push({ date: formattedDate, time: '8am - 5pm', available: true });
    }
  
    return currentWeek;
  };
  

  const toggleAvailability = async (index) => {
    const updatedAvailability = availability.map((day, i) =>
      i === index ? { ...day, available: !day.available } : day
    );
    setAvailability(updatedAvailability);
    await storeData('adminAvailability', updatedAvailability);
  };

  useEffect(() => {
    setAvailability(getCurrentWeek());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Availability</Text>
      {availability.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayText}>{day.date} ({day.time})</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              { backgroundColor: day.available ? 'green' : 'red' },
            ]}
            onPress={() => toggleAvailability(index)}
          >
            <Text style={styles.toggleButtonText}>
              {day.available ? 'Set Unavailable' : 'Set Available'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
