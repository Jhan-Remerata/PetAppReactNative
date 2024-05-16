import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { retrieveData, storeData } from '../../hooks/kv-store';

const ApprovedAppointmentsByAdmin = () => {
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

  const handleDone = async (index) => {
    Alert.alert(
      "Confirm Completion",
      "Are you sure you want to mark this appointment as done?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Done",
          onPress: async () => {
            if (index < 0 || index >= approvedAppointments.length) {
              Alert.alert('Error', 'Invalid index');
              return;
            }
        
            try {
              setLoading(true);
              const updatedApprovedAppointments = [...approvedAppointments];
              const appointmentToMarkDone = updatedApprovedAppointments[index];
              appointmentToMarkDone.status = 'Done';
              
              // Remove the appointment from the approved list
              updatedApprovedAppointments.splice(index, 1);
              
              // Retrieve and update the userAppointments
              const existingAppointments = await retrieveData('userAppointments') || [];
              const updatedUserAppointments = existingAppointments.map(app => 
                app.date === appointmentToMarkDone.date && app.serviceType === appointmentToMarkDone.serviceType 
                ? appointmentToMarkDone 
                : app
              );
              
              await storeData('userAppointments', updatedUserAppointments);
              setApprovedAppointments(updatedApprovedAppointments);
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

  const renderItem = ({ item, index }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.label}>Service:</Text>
      <Text>{item.serviceType}</Text>
      <Text style={styles.label}>Animal:</Text>
      <Text>{item.animalType}</Text>
      <Text style={styles.label}>Date:</Text>
      <Text>{new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text>{item.status}</Text>
      <TouchableOpacity style={styles.doneButton} onPress={() => handleDone(index)}>
        <Text style={styles.buttonText}>Mark as Done</Text>
      </TouchableOpacity>
    </View>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Approved Appointments</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  appointmentItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  doneButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ApprovedAppointmentsByAdmin;
