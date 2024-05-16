import { View, Text, TouchableOpacity, Image } from "react-native";


export default function UserDashboard({ navigation, route }) {
  const { username } = route.params;
  return (
    <View className="h-screen flex flex-col bg-slate-400" style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}> 
      <View>
        <Text className="text-4xl mt-3 ml-2 font-bold text-start text-white">Welcome {username}</Text>
      </View>
        <View className="flex flex-col items-center justify-center h-[30%] m-2">
          <View className='w-full h-full gap-y-4'>
            <TouchableOpacity
              onPress={() => navigation.navigate("ServiceForm")}
              className="flex w-full h-full items-center justify-center bg-slate-300"
            >
              <Image
                source={require("../../../assets/book.webp")}
                className="w-full h-full rounded-md"
              />
              <Text className="absolute text-xl font-bold text-black top-0 left-0 m-2">
                Booking for an Appointment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserAppointment")}
              className="flex w-full h-full items-center justify-center bg-slate-300"
            >
              <Image
                source={require("../../../assets/check.webp")}
                className="w-full h-full rounded-md"
              />
              <Text className="absolute text-xl font-bold text-black top-0 left-0 m-2">
                Check Pending Appointment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ApprovedAppointments")}
              className="flex w-full h-full items-center justify-center bg-slate-300"
            >
              <Image
                source={require("../../../assets/approved.png")}
                className="w-full h-full rounded-md"
              />
              <Text className="absolute text-xl font-bold text-black top-0 left-0 m-2">
                Approved Appointments
              </Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  );
}
