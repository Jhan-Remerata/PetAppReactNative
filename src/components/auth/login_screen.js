import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { retrieveData } from "../../hooks/kv-store";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Retrieve saved username and password for the admin
      const adminUsername = "Admin";
      const adminPassword = "Admin";
  
      // If the entered credentials match the admin credentials, redirect to admin dashboard
      if (username === adminUsername && password === adminPassword) {
        navigation.navigate("AdminDashboard", { role: "Admin" });
        return;
      }
  
      // Retrieve saved username and password for the user
      const savedUsername = await retrieveData("username");
      const savedPassword = await retrieveData("password");
  
      // Validate user credentials
      if (username === savedUsername && password === savedPassword) {
        navigation.navigate("UserDashboard", { role: "User", username });
      } else {
        console.log("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    } finally {
      // Clear input values
      setUsername("");
      setPassword("");
    }
  };
  

  return (
    <View>
      <View className="flex flex-col items-center justify-center gap-y-5 mt-[100px]">
        <Image
          source={require("../../../assets/logo.png")}
          className="w-[200px] h-[200px] rounded-full"
        />
        <TextInput
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          className="bg-gray-200 p-2 rounded-lg w-[70%]"
        />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          className="bg-gray-200 p-2 rounded-lg w-[70%]"
        />
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-400 p-2 rounded-lg w-[70%]"
        >
          <Text className="text-lg font-bold text-center text-white">
            Login
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-center gap-x-2 mt-5">
          <Text className="text-lg font-bold text-center text-gray-400">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <Text className="text-lg font-bold text-blue-400">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}