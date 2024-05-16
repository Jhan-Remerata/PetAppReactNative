import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ImagePicker from 'react-native-image-picker';

const Profile = () => {
  const [avatarSource, setAvatarSource] = useState(null);

  const selectImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setAvatarSource(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage} style={styles.avatarContainer}>
        {avatarSource ? (
          <Image source={{ uri: avatarSource }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarText}>Select Avatar</Text>
        )}
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>John Doe</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>johndoe@example.com</Text>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>+1234567890</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>123 Main Street, City, Country</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
  info: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Profile;
