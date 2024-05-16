import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { storeData } from "../../hooks/kv-store";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      // Check if username and password are not empty
      if (!username || !password) {
        throw new Error("Username and password are required");
      }

      // Save user information
      await storeData("username", username);
      await storeData("password", password);

      // Navigate to the LoginScreen
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error signing up:", error.message);
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
          onPress={handleSignUp}
          className="bg-blue-400 p-2 rounded-lg w-[70%]"
        >
          <Text className="text-lg font-bold text-center text-white">
            Sign Up
          </Text>
        </TouchableOpacity>

        <View className="flex flex-row items-center justify-center gap-x-2 mt-5">
          <Text className="text-lg font-bold text-center text-gray-400">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text className="text-lg font-bold text-blue-400">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
