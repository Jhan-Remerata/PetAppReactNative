import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { retrieveData } from '../../hooks/kv-store';

const ApprovedAppointments = () => {
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApprovedAppointments = async () => {
      setLoading(true);
      try {
        const storedAppointments = await retrieveData('userAppointments');
        if (storedAppointments) {
          const filteredApprovedAppointments = storedAppointments.filter(appointment => appointment.status === 'Approved');
          setApprovedAppointments(filteredApprovedAppointments);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedAppointments();
  }, []);

  const renderItem = ({ item }) => (
    <View className="mb-4 p-4 border border-gray-300 rounded bg-gray-100">
      <Text className="text-lg mb-2">Service: {item.serviceType}</Text>
      <Text className="text-lg mb-2">Animal: {item.animalType}</Text>
      <Text className="text-lg mb-2">Date: {new Date(item.date).toLocaleString()}</Text>
      <Text className="text-lg mb-2">Status: {item.status}</Text>
    </View>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">Approved Appointments</Text>
      {loading && <Text>Loading...</Text>}
      {!loading && approvedAppointments.length === 0 && <Text>No approved appointments</Text>}
      {!loading && approvedAppointments.length > 0 && (
        <FlatList
          data={approvedAppointments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
};

export default ApprovedAppointments;
