import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import {vs, s} from "react-native-size-matters";
import Icon from "../assets/icons";
import {useNavigation} from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import Constants from 'expo-constants';

import{ colors } from "../StyleVariables";

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

// FIREBASE
const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.APIKEY,
  authDomain: Constants?.manifest?.extra?.AUTHDOMAIN,
  projectId: Constants?.manifest?.extra?.PROJECTID,
  storageBucket: Constants?.manifest?.extra?.STORAGEBUCKET,
  messagingSenderId: Constants?.manifest?.extra?.MESSAGINGSENDERID,
  appId: Constants?.manifest?.extra?.APPID,
};

const firebaseApp = initializeApp(firebaseConfig);


const Navbar = () => {
  const navigation = useNavigation<LoginScreenProp>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(firebaseApp) checkAuthentication();
  }, [firebaseApp]);

  const checkAuthentication = () => {
    const auth = getAuth(); // This is for using Firebase authentication

    onAuthStateChanged(auth, (user) => {
      if (user) { setIsLoggedIn(true) }
      else { setIsLoggedIn(false) }
    });
  }

  return (
    <View style={styles.navbarContainer}>

        {/* Logo */}
        <View style={styles.logoContainer}>

          <Icon name="logo" width={vs(24)} height={vs(24)} color={colors.primary}/>
          
          <View style={styles.logoTextContainer}>
            <Text style={styles.UpperLogoText}>Mercado</Text>
            <Text style={styles.BottomLogoText}>Tec</Text>
          </View>

        </View>

        {/* Left column (Searchbar & Seller button)*/}
        <View style={styles.leftNavbarContainer}>

          {/* Searchbar */}
          <View style={styles.searchbarContainer}>
            <Icon name="search" width={vs(15)} height={vs(15)} color={colors.primary} style={styles.searchButton}/>
            <TextInput placeholder={"Buscar..."} style={styles.searchbar}/>
          </View>
          
          {/* Seller Button */}
          <TouchableOpacity style={styles.sellerButton}
            onPress={() => {
              if(isLoggedIn) {navigation.navigate("EditProduct")}
              else {navigation.navigate("Login")}
            }}
          >
            <Icon name="store" width={vs(20)} height={vs(20)} color={colors.primary}/>
          </TouchableOpacity>
        </View>

      </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    navbarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: vs(35),
        marginBottom: vs(35),
        paddingHorizontal: s(15),
      },
      logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      logoTextContainer: {
        marginLeft: s(7),
      },
      UpperLogoText: {
        fontFamily: "GorditaBold",
        fontSize: vs(11),
        marginBottom: vs(-5),
      },
      BottomLogoText: {
        fontFamily: "GorditaBold",
        fontSize: vs(11),
      },
      leftNavbarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      searchbarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      searchButton: {
        marginRight: s(-12),
      },
      searchbar: {
        width: s(160),
        fontFamily: "GorditaRegular",
        fontSize: vs(11),
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        paddingLeft: s(14),
      },
      sellerButton: {
        marginLeft: s(10),
      },
})