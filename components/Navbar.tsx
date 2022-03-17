import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import {vs, s} from "react-native-size-matters";
import Icon from "../assets/icons";
import {useNavigation} from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import{ colors, templates } from "../StyleVariables";

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;
type NavbarProps = {
  onChangeSearchValue: (text: string) => void,
  onPress: Function,
}


const Navbar = ({onChangeSearchValue, onPress}: NavbarProps) => {
  const navigation = useNavigation<LoginScreenProp>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) { setIsLoggedIn(true) }
      else { setIsLoggedIn(false) }
    });
  }, []);

  return (
    <View style={styles.navbarContainer}>

      <TouchableOpacity style={styles.container}
        onPress={() => onPress()}
      >

        <Icon name="logo" width={vs(20)} height={vs(20)} color={colors.primary}/>
        
        <View style={templates.logoTextContainer}>
          <Text style={templates.upperLogoText}>Mercado</Text>
          <Text style={templates.bottomLogoText}>Tec</Text>
        </View>

      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.searchbarContainer}>
          <Icon name="search" width={vs(15)} height={vs(15)} color={colors.primary} style={styles.searchButton}/>
          <TextInput
            placeholder={"Buscar..."}
            style={styles.searchbar}
            onChangeText={(text) => {
                // Remove accents and transform to lower case
                onChangeSearchValue(text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
            }}
          />
        </View>
        
        <TouchableOpacity style={styles.sellerButton}
          onPress={() => {
            if(isLoggedIn) navigation.navigate("EditProduct")
            else navigation.navigate("Login")
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
    container: {
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