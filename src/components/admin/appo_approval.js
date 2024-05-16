import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { storeData, retrieveData } from '../../hooks/kv-store';
import { NotificationContext } from "../notificationContext";

const AppointmentApproval = () => {
  const { setIsAppointmentAccepted, setNotificationCount } = useContext(NotificationContext);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      setLoading(true);
      try {
        const storedAppointments = await retrieveData('userAppointments');
        if (storedAppointments) {
          const filteredPendingAppointments = storedAppointments.filter(appointment => appointment.status === 'Pending');
          setPendingAppointments(filteredPendingAppointments);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAppointments();
  }, []);

  const updateNotifications = async () => {
    const notifications = await retrieveData('userNotifications') || [];
    setNotificationCount(notifications.length);
  };

  const handleApprove = async (index) => {
    Alert.alert(
      "Confirm Approval",
      "Are you sure you want to approve this appointment?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Approve",
          onPress: async () => {
            if (index < 0 || index >= pendingAppointments.length) {
              Alert.alert('Error', 'Invalid index');
              return;
            }
          
            try {
              setLoading(true);
              const updatedPendingAppointments = [...pendingAppointments];
              const appointmentToApprove = updatedPendingAppointments[index];
              appointmentToApprove.status = 'Approved';
              
              // Remove approved appointment from pending list
              updatedPendingAppointments.splice(index, 1);
              
              // Store updated pending appointments
              await storeData('pendingAppointments', updatedPendingAppointments);
              
              // Retrieve and update the userAppointments
              const existingAppointments = await retrieveData('userAppointments') || [];
              const updatedUserAppointments = existingAppointments.map(app => 
                app.date === appointmentToApprove.date && app.serviceType === appointmentToApprove.serviceType 
                ? appointmentToApprove 
                : app
              );
              
              await storeData('userAppointments', updatedUserAppointments);
  
              // Add notification
              const notifications = await retrieveData('userNotifications') || [];
              notifications.push({ message: "Your appointment was accepted", type: "success" });
              await storeData('userNotifications', notifications);
  
              setPendingAppointments(updatedPendingAppointments);
              setIsAppointmentAccepted(true); // Update context state
              updateNotifications(); // Update notification count
            } catch (error) {
              console.error(error);
            } finally {
              setLoading(false);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleReject = async (index) => {
    Alert.alert(
      "Confirm Rejection",
      "Are you sure you want to reject this appointment?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reject",
          onPress: async () => {
            if (index < 0 || index >= pendingAppointments.length) {
              Alert.alert('Error', 'Invalid index');
              return;
            }
        
            try {
              const updatedAppointments = [...pendingAppointments];
              updatedAppointments.splice(index, 1);
        
              // Update the main appointments list
              const storedAppointments = await retrieveData('userAppointments') || [];
              const allAppointments = storedAppointments.filter((appointment, idx) => idx !== index);
              await storeData('userAppointments', allAppointments);
              
              // Add notification
              const notifications = await retrieveData('userNotifications') || [];
              notifications.push({ message: "Your appointment was rejected", type: "error" });
              await storeData('userNotifications', notifications);
              
              setPendingAppointments(updatedAppointments);
              Alert.alert("Appointment Rejected", "The appointment has been rejected.");
              updateNotifications(); // Update notification count
            } catch (error) {
              console.error(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View className="mb-4 p-4 border border-gray-300 rounded">
        <Text className="text-lg font-bold mb-2">Service:</Text>
        <Text>{item.serviceType}</Text>
        <Text className="text-lg font-bold mt-4">Animal:</Text>
        <Text>{item.animalType}</Text>
                <Text className="text-lg font-bold mt-4">Date:</Text>
        <Text>{new Date(item.date).toLocaleString()}</Text>
        <Text className="text-lg font-bold mt-4">Status:</Text>
        <Text>{item.status}</Text>
        <View className="flex flex-row mt-4 space-x-4">
          <TouchableOpacity className="bg-green-500 py-2 px-4 rounded" onPress={() => handleApprove(index)}>
            <Text className="text-white font-bold">Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-500 py-2 px-4 rounded" onPress={() => handleReject(index)}>
            <Text className="text-white font-bold">Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4 text-center">Pending Appointments</Text>
      {loading && <Text>Loading...</Text>}
      {!loading && pendingAppointments.length === 0 && <Text>No pending appointments</Text>}
      {!loading && pendingAppointments.length > 0 && (
        <FlatList
          data={pendingAppointments}
          renderItem={renderItem}
          // keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
};

export default AppointmentApproval;

