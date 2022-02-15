import React, {useState, useEffect} from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

/* === SCREENS === */
import Home from "./screens/Home";


const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    GorditaRegular: require('./assets/fonts/GorditaRegular.otf'),
    GorditaMedium: require('./assets/fonts/GorditaMedium.otf'),
    GorditaBold: require('./assets/fonts/GorditaBold.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return(
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}