import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, {useState} from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';
import { colors } from '../StyleVariables'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// COMPONENTS
import Icon from '../assets/icons'

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenProp>();

  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginWithEmail = async function (email: string, password: string) {
    if(email.length === 0 || password.length === 0) return;

    Keyboard.dismiss();
    
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        navigation.replace("EditProduct");
    })
    .catch((error) => {
        if (error.message == "Firebase: Error (auth/user-not-found).") {
          alert("Usuario no encontrado");
        }
        else if(error.message == "Firebase: Error (auth/invalid-email).") {
          alert("Correo inválido");
        }
        else if (error.message == "Firebase: Error (auth/wrong-password).") {
          alert("Contraseña incorrecta");
        }
        else {
          alert(error.message);
        }
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnIcon} onPress={() => navigation.goBack()}>
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
      </TouchableOpacity>

      <Text style={styles.title}>¿LISTO PARA{"\n"}VENDER MÁS?</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Correo:</Text>
        <TextInput style={styles.input} onChangeText={(value) => setEmail(value.replace(/\s/g, ''))} value={email} autoCapitalize={"none"}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Contraseña:</Text>
        <TextInput style={styles.input} onChangeText={(value) => {setPassword(value)}} value={password} autoCapitalize={"none"} secureTextEntry={true}/>
      </View>

      <TouchableOpacity style={styles.mainButton}
        onPress={() => LoginWithEmail(email, password)}
      >
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
    marginLeft: s(-25),
    lineHeight: vs(50),
    marginBottom: vs(40),
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: vs(20),
    marginRight: s(20),
  },
  inputLabel: {
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
    fontFamily: "GorditaBold",
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