import { Alert } from "react-native";
import { publicRequest } from "../api/request";

export const handleSignup = async ({ email, username, password }) => {
  try {
    const response = await publicRequest.post('/signupuser', { username, email, password });

    if (response && response.data) {
      return response.data;  // Return response data to the component
    }
  } catch (error) {
    console.log("Signup error:", error);
    throw new Error(error.response?.data?.message || "An error occurred during signup.");
  }
};

export const handleLogin = async ({email, password}) => {
  try {
    const response  = await publicRequest.post('/loginuser', {email, password})
    if (response && response.data) {
      return response.data;  // Return response data to the component
    }
    const token = response.data.token;

    // Store token in AsyncStorage
    await AsyncStorage.setItem('authToken', token);
  

  } catch (error) {
    Alert.alert("Error", error.response.data.message )
    console.log("Login error:", error.response.data.message);
    throw new Error(error.response.data.message || "An error occurred during login.");
 
  }
}
