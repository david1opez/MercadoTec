import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
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

const RegisterUser = () => {
  const navigation = useNavigation<RegisterUserScreenProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnIcon} onPress={() => navigation.goBack()}>
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
      </TouchableOpacity>

      <Text style={styles.title}>MORE INFO{"\n"}LESS & DOWN</Text>
      <Text style={styles.description}>If you want to check it out, I feel compelled to warn you that it's not the most well-documented tool, and has many other people around</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputPlaceholder}>Nombre:</Text>
        <TextInput style={styles.input} onChangeText={(value) => {setName(value)}} value={name}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputPlaceholder}>Correo:</Text>
        <TextInput style={styles.input} onChangeText={(value) => {setEmail(value)}} value={email}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputPlaceholder}>Contraseña:</Text>
        <TextInput style={styles.input} onChangeText={(value) => {setPassword(value)}} value={password}/>
      </View>

      <TouchableOpacity style={styles.mainButton}>
        <Text style={styles.mainButtonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.terms}>Términos y condiciones</Text>
      </TouchableOpacity>

      <Text style={styles.disclosure}>
        Al hacer click en "Registrarse" aceptas que has leído y aceptas los términos y condiciones de MercadoTec
      </Text>
    </View>
  )
}

export default RegisterUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnIcon: {
    width: vs(30),
    height: vs(30),
    position: 'absolute',
    top: vs(25),
    right: s(15),
    zIndex: 1,
  },
  title: {
    fontSize: vs(30),
    fontFamily: "GorditaBold",
    color: "#FFF",
    lineHeight: vs(47),
    width: s(345),
    marginLeft: s(40),
    marginBottom: vs(5),
  },
  description: {
    fontSize: vs(9),
    fontFamily: "GorditaRegular",
    color: "#FFF",
    lineHeight: vs(13),
    width: s(345),
    marginLeft: s(40),
    paddingRight: s(55),
    marginBottom: vs(40),
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: vs(20),
    marginRight: s(30),
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
    color: "#000",
  },
  mainButton: {
    marginTop: vs(30),
    backgroundColor: "#FFF",
    paddingHorizontal: s(50),
    paddingVertical: vs(5),
    borderRadius: 3,
    marginBottom: vs(15),
  },
  mainButtonText: {
    fontSize: vs(12),
    fontFamily: "GorditaBold",
    color: colors.primary,
  },
  terms: {
    fontSize: vs(9),
    fontFamily: "GorditaRegular",
    color: "#FFF",
    textDecorationLine: 'underline',
  },
  disclosure: {
    fontSize: vs(8),
    fontFamily: "GorditaRegular",
    color: "#FFF",
    marginTop: vs(20),
    paddingHorizontal: s(50),
    textAlign: 'center',
    lineHeight: vs(12),
  },

})