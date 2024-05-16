import React, { useContext } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NotificationContext } from '../notificationContext';// Import the NotificationContext

export default function AdminHeader() {
  const navigation = useNavigation();
  const { notificationCount } = useContext(NotificationContext); // Use the NotificationContext

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, marginTop: 30 }}>
      <TouchableOpacity onPress={() => navigation.navigate('AdminDashboard')}>
        <Image
          source={require('../../../assets/logo.png')}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminNotifications')} style={styles.notificationButton}>
          <Icon name="notifications-outline" size={25} color="white" />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AdminSettingsScreen')} style={styles.settingsButton}>
          <Icon name="settings-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#06B6D4',
    borderRadius: 10,
    position: 'relative',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#06B6D4',
    borderRadius: 10,
  },
  badge: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});
