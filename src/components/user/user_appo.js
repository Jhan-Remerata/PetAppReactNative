import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { retrieveData, storeData } from '../../hooks/kv-store';

export default function UserAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const storedAppointments = await retrieveData('userAppointments');
        if (storedAppointments) {
          // Sort appointments by status and then by date
          const sortedAppointments = storedAppointments.sort((a, b) => {
            // If status is different, sort by status
            if (a.status !== b.status) {
              return a.status === 'Approved' ? 1 : -1;
            }
            // If status is the same, sort by date
            return new Date(a.date) - new Date(b.date);
          });
          setAppointments(sortedAppointments);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAppointments();
  }, []);
  

  const handleCancel = async (index) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            const updatedAppointments = appointments.filter((_, i) => i !== index);
            setAppointments(updatedAppointments);
            await storeData('userAppointments', updatedAppointments);
            Alert.alert("Appointment Cancelled", "Your appointment has been cancelled.");
          }
        }
      ]
    );
  };

  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-bold mb-4">My Appointments</Text>
      {loading && <Text>Loading...</Text>}
      {appointments.length === 0 && !loading && <Text className="text-gray-500">No appointments found.</Text>}
      {appointments.length > 0 && (
        appointments.map((appointment, index) => (
          <View key={index} className="w-full p-4 mb-4 border border-gray-300 rounded bg-gray-100">
            <Text className="text-lg mb-2">Service: {appointment.serviceType}</Text>
            <Text className="text-lg mb-2">Animal: {appointment.animalType}</Text>
            <Text className="text-lg mb-2">Date: {new Date(appointment.date).toLocaleString()}</Text>
            <Text className="text-lg mb-2">Status: {appointment.status}</Text>
            {appointment.status !== 'Approved' && (
              <TouchableOpacity className="bg-red-500 py-2 px-4 rounded-lg mt-2" onPress={() => handleCancel(index)}>
                <Text className="text-white text-center">Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
