import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

import { colors } from '../StyleVariables'

// COMPONENTS
import Icon from '../assets/icons'

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type RegisterUserScreenProp = StackNavigationProp<RootStackParamList, 'RegisterUser'>;

const RegisterUser = () => {
  const navigation = useNavigation<RegisterUserScreenProp>();

  const auth = getAuth();
  const db = getFirestore();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [contactOption, setContactOption] = useState('Whatsapp');
  const [contact, setContact] = useState('');

  const validate = () => {
    setIsLoading(true);
    
    if (name.length == 0 || email.length == 0 || password.length == 0) {
      alert('Parece que dejaste algunos campos vacíos');
      return false;
    }
    else if (!email.includes('@')) {
      alert('El correo es inválido, porfavor comprueba que esté bien escrito');
      return false;
    }
    else if (!email.includes('.')) {
      alert('El correo es inválido, porfavor comprueba que esté bien escrito');
      return false;
    }
    else if (email.length < 5) {
      alert('El correo es inválido, porfavor comprueba que esté bien escrito');
      return false;
    }
    else if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    else if(contact.length == 0) {
      alert('Por favor ingresa un modo para que tus clientes te puedan contactar');
      return false;
    }
    else if(contactOption == 'Whatsapp' && contact.length != 12) {
      alert('El numero de whatsapp debe tener 12 dígitos, empezando con el codigo de país (52)');
      return false;
    }
    else {
      return (
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setIsLoading(true);

          const uid: any = auth.currentUser?.uid;

          let link: string;

          if(contactOption == 'Whatsapp') {
            link = `https://wa.me/${contact}`;
          }
          else if(contactOption == 'Telegram') {
            link = `https://telegram.me/${contact}`;
          }
          else if(contactOption == 'Messenger') {
            link = `https://m.me/${contact}`;
          }

          setDoc(doc(db, "Users", uid), {
            name: name,
          })
          .then(() => {
            setIsLoading(false);
            navigation.replace('RegisterProduct', {link: link})
          })
          .catch((error) => {alert(error.message)})
        })
        .catch((error) => {
        if(error.message === 'Firebase: Error (auth/email-already-in-use)') {
          alert('El correo ya está en uso');
        }
        else {
          alert(error.message);
        }
        return false;
        })
      );
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnIcon} onPress={() => navigation.goBack()}>
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
      </TouchableOpacity>

      <Text style={styles.title}>ÚNETE A{"\n"}MERCADOTEC</Text>
      <Text style={styles.description}>Ya no utilices Facebook para vender en el campus. Nostros te ayudamos a tener un público más enfocado para que puedas vender más</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nombre:</Text>
        <TextInput style={styles.input} onChangeText={(value) => {setName(value)}} value={name}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Correo:</Text>
        <TextInput style={styles.input} onChangeText={(value) => {
          setEmail(value.replace(/\s/g, ''))
        }} value={email} autoCapitalize={"none"}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Contraseña:</Text>
        <TextInput style={styles.input} onChangeText={(value) => {setPassword(value)}} value={password} autoCapitalize={"none"} secureTextEntry={true}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Modo de contacto:</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={contactOption != 'Whatsapp' ? styles.contactOption : styles.activeContactOption}
            onPress={() => {setContactOption('Whatsapp')}}
          >
            <Text style={contactOption != 'Whatsapp' ? styles.contactOptionText : styles.activeContactOptionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={contactOption != 'Telegram' ? styles.contactOption : styles.activeContactOption}
            onPress={() => {setContactOption('Telegram')}}
          >
            <Text style={contactOption != 'Telegram' ? styles.contactOptionText : styles.activeContactOptionText}>Telegram</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={contactOption != 'Messenger' ? styles.contactOption : styles.activeContactOption}
            onPress={() => {setContactOption('Messenger')}}
          >
            <Text style={contactOption != 'Messenger' ? styles.contactOptionText : styles.activeContactOptionText}>Messenger</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input} onChangeText={(value) => {setContact(value)}}
          autoCapitalize={"none"}
          placeholder={contactOption == 'Whatsapp' ? 'Teléfono ej. 528441234567' : contactOption == 'Telegram' ? 'Nombre de usuario' : 'Nombre de usuario'}
          placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
          keyboardType={contactOption == 'Whatsapp' ? 'numeric' : 'default'}
        />
      </View>

      <TouchableOpacity style={styles.mainButton}
        onPress={() => {
          if(isLoading) return;
          validate()
        }}
      >
        {
          isLoading ? (
            <ActivityIndicator size={"large"} color={"#FFF"}/>
          ) : (
            <Text style={styles.mainButtonText}>Registrarse</Text>
          )
        }
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
    marginBottom: vs(30),
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: vs(20),
    marginRight: s(30),
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
  },
  mainButton: {
    marginTop: vs(25),
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
  contactOption: {
    backgroundColor: "#FFF",
    paddingHorizontal: s(10),
    borderRadius: 3,
    paddingVertical: vs(2),
  },
  contactOptionText: {
    fontSize: vs(10),
    fontFamily: "GorditaMedium",
    color: colors.primary,
  },
  activeContactOption: {
    paddingHorizontal: s(10),
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 3,
    paddingVertical: vs(2),
  },
  activeContactOptionText: {
    fontSize: vs(10),
    fontFamily: "GorditaMedium",
    color: "#FFF",
  }

})