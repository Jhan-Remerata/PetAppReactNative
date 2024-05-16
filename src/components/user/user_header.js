import React, { useContext } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NotificationContext } from '../notificationContext';
import Badge from '../badge';// Adjust the import path as necessary

export default function Header() {
  const navigation = useNavigation();
  const { notificationCount } = useContext(NotificationContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('UserDashboard')}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('UserNotification')} style={styles.iconWrapper}>
          <Icon name="notifications-outline" size={25} color="white" />
          <Badge count={notificationCount} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={styles.iconWrapper}>
          <Icon name="settings-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 30,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#06B6D4',
    borderRadius: 10,
    position: 'relative',
  },
});
