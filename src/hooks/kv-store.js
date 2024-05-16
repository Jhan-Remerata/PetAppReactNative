import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key.toString(), JSON.stringify(value));
    console.log("Data stored successfully!");
  } catch (error) {
    console.error("Error storing data: ", error);
    throw error;
  }
};

const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error retrieving data: ", error);
    throw error;
  }
};

const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Data deleted successfully!");
  } catch (error) {
    console.error("Error deleting data: ", error);
    throw error;
  }
};

export { storeData, retrieveData, deleteData };
