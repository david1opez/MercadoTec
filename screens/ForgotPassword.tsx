import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Vibration } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {vs, s} from "react-native-size-matters";

import { colors } from '../StyleVariables'

// COMPONENTS
import Icon from '../assets/icons'

// TYPES
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;



const ResetPassword = (props: any) => {
    const navigation = useNavigation<LoginScreenProp>();

    const [email, setEmail] = useState('');
    
    const [error, setError] = useState('');
    const [successPopup, setSuccessPopup] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {}


    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.returnIcon}
                onPress={() => navigation.goBack()}
            >
                <Icon name={"return"} width={vs(30)} height={vs(30)} color={"#FFF"}/>
            </TouchableOpacity>

            <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
            <Text style={styles.description}>Ingresa el correo de tu cuenta para ayudarte</Text>
            
        </View>
    )
}

export default ResetPassword

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
        color: Style.Color.White,
        fontSize: Style.FontSize.h0,
        fontFamily: "SemiBold",
        lineHeight: Style.FontSize.h0*1.15,
        marginHorizontal: Style.HorizontalSpacing.br7,
        textAlign: "center",
    },
    description: {
        color: Style.Color.White,
        fontFamily: "Regular",
        fontSize: Style.FontSize.h7,
        textAlign: "center",
        marginBottom: Style.VerticalSpacing.br5,
    },
})
