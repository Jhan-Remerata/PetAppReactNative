import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { retrieveData } from '../../hooks/kv-store';
import { NotificationContext } from "../notificationContext";// Adjust the import path as necessary

const UserNotification = ({ navigation }) => {
  const { notificationCount, clearNotifications } = useContext(NotificationContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const storedNotifications = await retrieveData('userNotifications');
        if (storedNotifications) {
          setNotifications(storedNotifications);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleClearNotifications = () => {
    Alert.alert(
      "Confirm Clear",
      "Are you sure you want to clear all notifications?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear",
          onPress: async () => {
            try {
              clearNotifications(); // Clear notifications and update context state
              setNotifications([]); // Update local state to reflect cleared notifications
            } catch (error) {
              console.error(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View className={`mb-4 p-4 border border-${item.type === 'success' ? 'green' : 'red'}-300 rounded`}>
      <Text className="text-lg mb-2">{item.message}</Text>
      {item.type === 'success' && (
        <TouchableOpacity className="mt-4 p-4 rounded bg-green-500" onPress={() => navigation.navigate('ApprovedAppointments')}>
          <Text className="text-lg text-white text-center">View Approved Appointments</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <View className="p-4">
      <View className="flex-row gap-[100px]">
      <Text className="text-2xl font-bold mb-4">Notifications</Text>
      <TouchableOpacity onPress={handleClearNotifications}>
        <Text className="text-md text-black text-center mt-2">Clear Notifications</Text>
      </TouchableOpacity>
      </View>
      {loading && <Text>Loading...</Text>}
      {!loading && notifications.length === 0 && <Text className="text-lg">No notifications</Text>}
      {!loading && notifications.length > 0 && (
        <FlatList
          data={notifications.reverse()} // Reverse the notifications array
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
};

export default UserNotification;
