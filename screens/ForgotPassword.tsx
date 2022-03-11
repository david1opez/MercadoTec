import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {vs, s} from "react-native-size-matters";
import * as Linking from 'expo-linking';

import {colors, templates} from '../StyleVariables'

/* === COMPONENTS === */
import Icon from '../assets/icons'
import ErrorPopup from '../components/ErrorPopup'
import NoConnectionComponent from '../components/NoConnectionComponent';


/* == TYPES === */
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type ForgotPasswordScreenProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;



const ResetPassword = () => {
    const navigation = useNavigation<ForgotPasswordScreenProp>();

    const auth = getAuth();

    const [email, setEmail] = useState('');
    
    const [errorPopup, setErrorPopup] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const [successPopup, setSuccessPopup] = useState(false);

    const [loading, setLoading] = useState(false);

    const [isConnected, setIsConnected] = useState<boolean>(true);

    const handleSubmit = () => {
        setLoading(true);

        sendPasswordResetEmail(auth, email)
        .then(() => {
            setSuccessPopup(true);
            setEmail('');
            setLoading(false);
        })
        .catch((error) => {
            if (error.code == "auth/missing-email") {
                setErrorPopup(1);
            }
            else if (error.code == "auth/invalid-email") {
                setErrorPopup(2);
            }
            else if (error.code == "auth/user-not-found") {
                setErrorPopup(8);
            }
            else if (error.code == "auth/network-request-failed") {
                setErrorPopup(6);
            }
            else{
                setErrorPopup(404);
                setErrorMessage(error.message);
            }
            setLoading(false);
        });
    }


    if(!isConnected) {
        return (
          <NoConnectionComponent onConnectionStatusChange={(status) => setIsConnected(status)}/>
        )
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity style={templates.returnIcon}
                onPress={() => navigation.goBack()}
            >
                <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
            </TouchableOpacity>

            <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
            <Text style={styles.description}>Ingresa el correo de tu cuenta para ayudarte</Text>

            <TextInput
                autoCapitalize='none'
                placeholder="ejemplo@correo.com"
                style={styles.input}
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                onChangeText={(text) => {
                    text = text.replace(/\s/g, '').toLowerCase();
                    setEmail(text)
                }}
            />

            <TouchableOpacity style={styles.button}
                onPress={() => {
                    if(loading) return;
                    handleSubmit();
                    Keyboard.dismiss();
                }}
            >
                {
                    loading ? (
                        <ActivityIndicator size="small" color={colors.primary}/>
                    ) : (
                        <Text style={styles.buttonText}>Recuperar contraseña</Text>
                    )
                }
            </TouchableOpacity>

            <Text style={styles.footer}>
                Enviaremos un correo de verificación dónde podrás restablecer tu contraseña
            </Text>

                {successPopup && (

                <View style={styles.darkBackground}>
                    <View style={styles.popupContainer}>
                        <Text style={styles.popupTitle}>¡El correo de verificación fue enviado con éxito!</Text>
                        <Text style={styles.popupDescription}>Porfavor revisa tu correo para seguir con el proceso</Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.popupButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                )}

            <TouchableOpacity style={styles.contact}
                onPress={() => Linking.openURL('mailto: mercadotec22@gmail.com')}
            >
                <Text style={styles.contactText}>Contactar a Servicio Técnico</Text>
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

export default ResetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingVertical: s(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: vs(30),
        lineHeight: vs(40),
        fontFamily: "GorditaBold",
        color: "#FFF",
        textAlign: "center",
        marginBottom: vs(20),
    },
    description: {
        fontFamily: "GorditaRegular",
        fontSize: vs(10),
        color: "#FFF"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#FFF",
        width: s(250),
        textAlign: "center",
        marginVertical: vs(15),
        color: "#FFF",
        fontFamily: "GorditaRegular",
    },
    button: {
        backgroundColor: "#FFF",
        paddingVertical: vs(4),
        paddingHorizontal: s(15),
        borderRadius: 3,
        marginTop: vs(10),
    },
    buttonText: {
        fontFamily: "GorditaBold",
        fontSize: vs(11),
        color: colors.primary,
    },
    footer: {
        fontFamily: "GorditaRegular",
        fontSize: vs(8),
        lineHeight: vs(12),
        color: "#FFF",
        textAlign: "center",
        marginTop: vs(10),
        paddingHorizontal: s(80),
    },
    contact: {
        position: "absolute",
        bottom: vs(20),
        right: s(20),
    },
    contactText: {
        fontFamily: "GorditaRegular",
        fontSize: vs(9),
        color: "#FFF",
        textDecorationLine: 'underline',
    },
    darkBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        height: vs(705),
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    popupContainer: {
        backgroundColor: "#FFF",
        borderRadius: 3,
        paddingHorizontal: s(30),
        paddingVertical: s(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    popupTitle: {
        fontFamily: "GorditaBold",
        fontSize: vs(12),
        lineHeight: vs(17),
        color: colors.primary,
        textAlign: "center",
    },
    popupDescription: {
        fontFamily: "GorditaRegular",
        fontSize: vs(9),
        lineHeight: vs(12),
        color: colors.primary,
        marginVertical: vs(10),
        textAlign: "center",
        paddingHorizontal: vs(20),
    },
    popupButtonText: {
        fontFamily: "GorditaMedium",
        fontSize: vs(10),
        color: "#FFF",
        backgroundColor: colors.primary,
        paddingHorizontal: s(25),
        paddingVertical: vs(3),
        borderRadius: 3,
        marginTop: vs(10),
    },
})


