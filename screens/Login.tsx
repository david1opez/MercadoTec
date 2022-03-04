import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';
import * as Network from 'expo-network';
import LoginWithEmail from '../hooks/LoginWithEmail';

import { colors, templates } from '../StyleVariables'

// COMPONENTS
import Icon from '../assets/icons'
import NoConnectionComponent from '../components/NoConnectionComponent'
import ErrorPopup from '../components/ErrorPopup';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [seePassword, setSeePassword] = useState(true);

  const [errorPopup, setErrorPopup] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInterval(() => {
      Network.getNetworkStateAsync().then(async (state) => {
        if(state.isConnected) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      });
    }, 1000);
  }, [])

  if(!isConnected) {
    return (
      <NoConnectionComponent onConnectionStatusChange={(status) => setIsConnected(status)}/>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={templates.returnIcon} onPress={() => navigation.goBack()}>
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
      </TouchableOpacity>

      <Text style={styles.title}>¿LISTO PARA{"\n"}VENDER MÁS?</Text>

      <View style={styles.inputContainer}>
        <Text style={templates.inputLabel}>Correo:</Text>
        <TextInput style={styles.input} onChangeText={(value) => setEmail(value.replace(/\s/g, ''))} value={email} autoCapitalize={"none"}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={templates.inputLabel}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => {setPassword(value)}}
          value={password}
          autoCapitalize={"none"}
          secureTextEntry={seePassword}
        />
        <TouchableOpacity style={styles.eyeIcon}
          onPress={() => setSeePassword(!seePassword)}
        >
          <Icon name={seePassword ? "closedEye" : "eye"} width={vs(17)} height={vs(17)} color={"#FFF"}/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.mainButton}
        onPress={ async () => {
          setIsLoading(true);
          if (isLoading) return;
          let success = await LoginWithEmail(email, password);
          if(success == 0) navigation.replace("EditProduct");
          else if(typeof success == "string") {
            setErrorPopup(404);
            setErrorMessage(success);
          }
          else if (success){
            setErrorPopup(success);
          }
          setIsLoading(false);
        }}
      >
        {
          isLoading ? (
            <ActivityIndicator size="small" color={colors.primary}/>
          ) : (
            <Text style={styles.mainButtonText}>Iniciar sesión</Text>
          )
        }
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("RegisterUser")}}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      {
        errorPopup > 0 && (
          <ErrorPopup
            id={errorPopup-1}
            onClose={() => setErrorPopup(0)}
            errorMessage={errorPopup == 404 ? errorMessage : undefined}
          />
        )
      }
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
  title: {
    fontSize: vs(30),
    fontFamily: "GorditaBold",
    color: "#FFF",
    marginLeft: s(-25),
    lineHeight: vs(48),
    marginBottom: vs(40),
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: vs(20),
    marginRight: s(20),
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
    paddingVertical: vs(4),
    borderRadius: 3,
  },
  mainButtonText: {
    fontSize: vs(12),
    fontFamily: "GorditaBold",
    color: colors.primary,
  },
  forgotPassword: {
    marginTop: vs(5),
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
  eyeIcon: {
    position: "absolute",
    top: vs(14),
    right: vs(5), 
  },
})