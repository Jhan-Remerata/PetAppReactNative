import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const AdminSettingsScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'start', alignItems: 'start' }} className="mt-2">
      <Text className="text-black text-[30px] font-bold mt-1 ml-1 ">
          Settings
        </Text>
        <View className="gap-3 mt-1 mr-1">
        <TouchableOpacity className="flex-row items-center bg-cyan-600 rounded-lg p-4" onPress={() => navigation.navigate('AdminProfile')}>
          <Icon name="person-outline" size={25} color="white" />
          <Text className="text-white ml-4 text-lg">Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-cyan-600 rounded-lg p-4" onPress={() => navigation.navigate('AboutUs')}>
          <Icon name="information-outline" size={25} color="white" />
          <Text className="text-white ml-4 text-lg">About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-cyan-600 rounded-lg p-4" onPress={() => {
          navigation.navigate('LoginScreen');
        }}>
          <Icon name="log-out-outline" size={25} color="white" />
          <Text className="text-white ml-4 text-lg">LogOut</Text>
        </TouchableOpacity>
        </View>
       
    </View>
  );
};

export default AdminSettingsScreen;
