import { Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

const RooyLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assest/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assest/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assest/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assest/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assest/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assest/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assest/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assest/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assest/fonts/Poppins-Thin.ttf"),
    "Calistoga-Regular": require("../assest/fonts/Calistoga-Regular.ttf"),
    "Calligraffitti-Regular": require("../assest/fonts/Calligraffitti-Regular.ttf"),
    "Cambay-Regular": require("../assest/fonts/Cambay-Regular.ttf"),
    "IBMPlexMono-Regular": require("../assest/fonts/IBMPlexMono-Regular.ttf"),
    "IBMPlexMono-Bold": require("../assest/fonts/IBMPlexMono-Bold.ttf"),
    
  });

  useEffect(() => {
    // Prevent the splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();

    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen when fonts are loaded
    }

    if (error) {
      console.error('Error loading fonts:', error);
    }
  }, [fontsLoaded, error]);

  // Render a loading indicator if fonts aren't loaded yet
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return (
 
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

  );
};

export default RooyLayout;
