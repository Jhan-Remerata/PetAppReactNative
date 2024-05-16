import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { storeData, retrieveData } from '../../hooks/kv-store';
import { NotificationContext } from '../notificationContext'; // Import the NotificationContext
import { Picker } from '@react-native-picker/picker';

const ServiceForm = ({ navigation }) => {
  const { setNotificationCount } = useContext(NotificationContext); // Use the NotificationContext
  const [serviceType, setServiceType] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableDays = async () => {
      setLoading(true);
      try {
        const storedAvailableDays = await retrieveData('adminAvailability');
        if (storedAvailableDays) {
          setAvailableDays(storedAvailableDays);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableDays();
  }, []);

  const handleSubmit = async () => {
    if (!serviceType || !animalType || !selectedDay) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const appointment = {
      serviceType,
      animalType,
      day: selectedDay.date,
      status: 'Pending',
      date: new Date(),
    };

    try {
      const existingAppointments = (await retrieveData('userAppointments')) || [];
      existingAppointments.push(appointment);
      await storeData('userAppointments', existingAppointments);

      // Update admin notifications
      const adminNotifications = (await retrieveData('adminNotification')) || [];
      adminNotifications.push({ message: 'New appointment request submitted.', date: new Date() });
      await storeData('adminNotification', adminNotifications);
      
      // Update the notification count in the context
      setNotificationCount(adminNotifications.length);

      Alert.alert('Success', 'Your appointment request has been submitted!', [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate('UserAppointment');
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-4">Service Form</Text>
      <View className="w-full">
        <Text className="text-lg mb-2">1. Choose the type of service you want to avail</Text>
        <Picker
          selectedValue={serviceType}
          style="h-12 bg-gray-200 rounded-lg w-full mb-4"
          onValueChange={(itemValue) => setServiceType(itemValue)}
        >
          <Picker.Item label="Deworming" value="Deworming" />
          <Picker.Item label="Groom" value="Groom" />
          <Picker.Item label="Surgery" value="Surgery" />
          <Picker.Item label="Vaccination" value="Vaccination" />
        </Picker>

        <Text className="text-lg mb-2">2. What type of animal do you want to be treated</Text>
        <Picker
          selectedValue={animalType}
          style="h-12 bg-gray-200 rounded-lg w-full mb-4"
          onValueChange={(itemValue) => setAnimalType(itemValue)}
        >
          <Picker.Item label="Dog" value="Dog" />
          <Picker.Item label="Cat" value="Cat" />
          <Picker.Item label="Bird" value="Bird" />
          <Picker.Item label="Fish" value="Fish" />
          <Picker.Item label="Others" value="Others" />
        </Picker>

        <Text className="text-lg mb-2">3. Choose an Available Day</Text>
        <FlatList
          data={availableDays.filter(day => day.available)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`p-2 rounded-lg mb-2 ${selectedDay === item ? 'bg-blue-500' : 'bg-gray-200'}`}
              onPress={() => setSelectedDay(item)}
            >
              <Text className={`${selectedDay === item ? 'text-white' : 'text-black'}`}>
                {`${item.date} (${item.time})`}
              </Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity className="bg-blue-500 rounded-lg py-3 px-6 text-white" onPress={handleSubmit}>
          <Text className="text-lg font-bold text-white text-center">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceForm;
