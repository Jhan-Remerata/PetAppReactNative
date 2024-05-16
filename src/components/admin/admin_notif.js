import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";
import { retrieveData, storeData } from "../../hooks/kv-store";
import { NotificationContext } from "../notificationContext"; // Import the NotificationContext

export default function AdminNotifications({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const { setNotificationCount } = useContext(NotificationContext); // Use the NotificationContext

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const storedNotifications = await retrieveData('adminNotification');
      if (storedNotifications) {
        setNotifications(storedNotifications);
        setNotificationCount(storedNotifications.length); // Update notification count
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearNotifications = async () => {
    try {
      await storeData('adminNotification', []); // Clear notifications
      setNotifications([]); // Clear notifications state
      setNotificationCount(0); // Update notification count
      Alert.alert('Notifications Cleared', 'All notifications have been cleared.');
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('AppointmentApproval')}>
      <View style={styles.notificationItem}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Notifications</Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearNotifications}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No notifications</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notificationItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
