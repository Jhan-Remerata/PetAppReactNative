import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.avatar}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>johndoe@example.com</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>+1234567890</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>123 Main Street, City, Country</Text>
        </View>
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
  info: {
    marginBottom: 20,
  },
  infoItem: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
});

export default Profile;
