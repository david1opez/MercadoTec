import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native'
import React, {useState, useEffect} from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Validate from '../hooks/Validate';
import * as Notification from 'expo-notifications';

import { colors, templates } from '../StyleVariables'

// COMPONENTS
import Icon from '../assets/icons'
import ErrorPopup from '../components/ErrorPopup'
import TermsPopup from '../components/TermsPopup';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type RegisterUserScreenProp = StackNavigationProp<RootStackParamList, 'RegisterUser'>;


const RegisterUser = () => {
  const navigation = useNavigation<RegisterUserScreenProp>();

  const auth = getAuth();
  const db = getFirestore();

  const [isLoading, setIsLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [termsPopup, setTermsPopup] = useState(false);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);

  const [contactOption, setContactOption] = useState('Whatsapp');
  const [contact, setContact] = useState('');

  const getExpoNotificationToken = async () => {
    const token = (await Notification.getExpoPushTokenAsync()).data;
    return token;
  }

  const registerUser = async () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setIsLoading(true);

      const uid: any = auth.currentUser?.uid;

      let link: string;

      let phoneNumber = contact.replace(/\s/g, '').replace(/[^0-9]/g, '');
      
      let currentDay = new Date().getTime() / 86400000;

      if(contactOption == 'Whatsapp') link = `https://wa.me/${phoneNumber}`;
      else if(contactOption == 'Telegram') link = `https://telegram.me/${contact.replace(/\s/g, '')}`;
      else link = `https://m.me/${contact.replace(/\s/g, '')}`;

      AsyncStorage.setItem('@link', link)
      .then(() => {
        getExpoNotificationToken().then((token) => {
          if(token) {
            setDoc(doc(db, "Users", uid), {
              notificationToken: token,
              freeTrial: true,
              cutOffDate: Math.trunc(currentDay + 16),
            })
          }
          else {
            setDoc(doc(db, "Users", uid), {
              notificationToken: token,
              freeTrial: true,
              cutOffDate: Math.trunc(currentDay + 16),
            })
          }
        })
        .then(() => {
          setIsLoading(false);
          navigation.replace('RegisterProduct', {link: link})
        })
        .catch((error) => {
          setIsLoading(false);
          if(error.message.includes("network-request-failed")) setErrorPopup(6);
          else {
            setErrorPopup(404);
            setErrorMessage(error.message);
          };
        })
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorPopup(404);
        setErrorMessage(error.message);
      });
    })
    .catch((error) => {
      setIsLoading(false);
      if(error.message.includes('email-already-in-use')) setErrorPopup(7);
      else if(error.message.includes("network-request-failed")) setErrorPopup(6);
      else {
        setErrorPopup(404);
        setErrorMessage(error.message);
      }
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={templates.returnIcon} onPress={() => navigation.goBack()}>
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
      </TouchableOpacity>

      <Text style={styles.title}>ÚNETE A{"\n"}MERCADOTEC</Text>
      <Text style={styles.description}>Ya no utilices Facebook para vender en el campus. Nostros te ayudamos a tener un público más enfocado para que puedas vender más :)</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Correo:</Text>
        <TextInput style={styles.input} onChangeText={(value) => {
          setEmail(value.replace(/\s/g, ''))
        }} value={email} autoCapitalize={"none"}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Contraseña:</Text>
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
            <Icon name={seePassword ? "closedEye" : "eye"} width={vs(15)} height={vs(15)} color={"#FFF"}/>
          </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Modo de contacto:</Text>

        <View style={styles.optionsContainer}>
          {
            ['Whatsapp', 'Telegram', 'Messenger'].map((option, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={contactOption != option ? styles.contactOption : styles.activeContactOption}
                  onPress={() => {setContactOption(option)}}
                >
                  <Text style={contactOption != option ? styles.contactOptionText : styles.activeContactOptionText}>{option}</Text>
                </TouchableOpacity>
              )})
          }
        </View>

        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            setContact(value);
          }}
          autoCapitalize="none"
          placeholder={contactOption == 'Whatsapp' ? '528441234567' : contactOption == 'Telegram' ? 'Nombre de usuario' : 'Nombre de usuario'}
          placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
          keyboardType={contactOption == 'Whatsapp' ? 'phone-pad' : 'default'}
          value={contactOption == 'Whatsapp' ? contact.replace(/\s/g, '').replace(/[^0-9]/g, '') : contact.replace(/\s/g, '')}
        />
      </View>

      <TouchableOpacity style={styles.mainButton}
        onPress={() => {
          if(isLoading) return;
          Validate('user', {email, password, contact, contactOption}).then((id) => {
            Keyboard.dismiss();
            if(id == 0) registerUser();
            else setErrorPopup(id);
          })
        }}
      >
        {
          isLoading ? (
            <ActivityIndicator size={"large"} color={colors.primary}/>
          ) : (
            <Text style={styles.mainButtonText}>Registrarse</Text>
          )
        }
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setTermsPopup(true)}
      >
        <Text style={styles.terms}>Términos y condiciones</Text>
      </TouchableOpacity>

      <Text style={styles.disclosure}>
        Al hacer click en "Registrarse" aceptas que has leído y aceptas los términos y condiciones de MercadoTec
      </Text>

      {
        termsPopup && (
          <TermsPopup
            onClose={() => setTermsPopup(false)}
          />
        )
      }

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

export default RegisterUser

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
    marginBottom: vs(30),
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: vs(20),
    marginRight: s(30),
  },
  inputLabel: {
    fontSize: vs(9),
    fontFamily: "GorditaMedium",
    color: "#FFF",
  },
  input: {
    width: s(270),
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    fontFamily: "GorditaRegular",
    color: "#FFF",
  },
  mainButton: {
    marginTop: vs(15),
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: s(270),
    marginTop: vs(5),
    marginBottom: vs(10),
  },
  activeContactOption: {
    backgroundColor: "#FFF",
    paddingHorizontal: s(10),
    borderRadius: 3,
    paddingVertical: vs(2),
  },
  activeContactOptionText: {
    fontSize: vs(10),
    fontFamily: "GorditaMedium",
    color: colors.primary,
  },
  contactOption: {
    paddingHorizontal: s(10),
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 3,
    paddingVertical: vs(2),
  },
  contactOptionText: {
    fontSize: vs(10),
    fontFamily: "GorditaMedium",
    color: "#FFF",
  },
  eyeIcon: {
    position: "absolute",
    top: vs(15),
    right: vs(5), 
  },
})