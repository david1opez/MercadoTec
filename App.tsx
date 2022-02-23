import React, {useState, useEffect} from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';

/* === SCREENS === */
import Home from "./screens/Home";
import ProductInfo from "./screens/ProductInfo";
import Login from "./screens/Login";
import RegisterUser from "./screens/RegisterUser";
import RegisterProduct from "./screens/RegisterProduct";
import RegisterItems from "./screens/RegisterItems";
import EditProduct from "./screens/EditProduct";
import PromotePost from './screens/PromotePost';

export type RootStackParamList = {
  Home: undefined;
  ProductInfo: {id: string};
  Login: undefined;
  RegisterUser: undefined;
  RegisterProduct: {link: string};
  RegisterItems: undefined,
  EditProduct: undefined,
  PromotePost: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Ignore warnings
LogBox.ignoreAllLogs();


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
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RegisterUser" component={RegisterUser} />
      <Stack.Screen name="RegisterProduct" component={RegisterProduct} />
      <Stack.Screen name="RegisterItems" component={RegisterItems} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="PromotePost" component={PromotePost} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}