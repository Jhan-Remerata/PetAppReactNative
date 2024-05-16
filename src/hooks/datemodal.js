import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function DateSelectorModal({ visible, onClose, onSelectDate }) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  const handleConfirm = () => {
    onSelectDate(selectedDate);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{ [selectedDate]: { selected: true } }}
          />
        </View>
        <Button title="Confirm" onPress={handleConfirm} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    marginBottom: 20,
  },
});
