import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';

import { colors } from '../StyleVariables'

// COMPONENTS
import Icon from '../assets/icons'

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type RegisterUserScreenProp = StackNavigationProp<RootStackParamList, 'RegisterUser'>;

const Login = () => {
  const navigation = useNavigation<RegisterUserScreenProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnIcon} onPress={() => navigation.goBack()}>
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
      </TouchableOpacity>

      <Text style={styles.title}>¿LISTO PARA VENDER MÁS?</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputPlaceholder}>Correo:</Text>
        <TextInput style={styles.input} onChangeText={(value) => setEmail(value)} value={email} autoCapitalize={"none"}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputPlaceholder}>Contraseña:</Text>
        <TextInput style={styles.input} onChangeText={(value) => {setPassword(value)}} value={password} autoCapitalize={"none"} secureTextEntry={true}/>
      </View>

      <TouchableOpacity style={styles.mainButton}>
        <Text style={styles.mainButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("RegisterUser")}}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnIcon: {
    width: vs(26),
    height: vs(26),
    position: 'absolute',
    top: vs(35),
    right: s(15),
    zIndex: 1,
  },
  title: {
    fontSize: vs(32),
    fontFamily: "GorditaBold",
    color: "#FFF",
    lineHeight: vs(50),
    width: s(345),
    marginLeft: s(40),
    marginBottom: vs(40),
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: vs(20),
    marginRight: s(20),
  },
  inputPlaceholder: {
    fontSize: vs(10),
    fontFamily: "GorditaMedium",
    color: "#FFF",
  },
  input: {
    width: s(270),
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    fontFamily: "GorditaRegular",
    color: "#FFF",
    fontSize: vs(12),
  },
  mainButton: {
    marginTop: vs(30),
    backgroundColor: "#FFF",
    paddingHorizontal: s(50),
    paddingVertical: vs(5),
    borderRadius: 3,
  },
  mainButtonText: {
    fontSize: vs(12),
    fontFamily: "GorditaMedium",
    color: colors.primary,
  },
  forgotPassword: {
    marginTop: vs(5),
  },
  forgotPasswordText: {
    fontFamily: "GorditaRegular",
    fontSize: vs(9),
    color: "#FFF",
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: vs(20),
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 3,
    paddingHorizontal: s(30),
    paddingVertical: vs(4),
    marginBottom: vs(30),
  },
  buttonText: {
    fontSize: vs(11),
    fontFamily: "GorditaMedium",
    color: "#FFF",
  },
})