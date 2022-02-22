import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';

import {colors} from "../StyleVariables";

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type RegisterItemsScreenProp = StackNavigationProp<RootStackParamList, 'RegisterItems'>;

const SuccessPopup = () => {
  const navigation = useNavigation<RegisterItemsScreenProp>();

  return (
    <View style={styles.darkBackground}>
        <View style={styles.container}>
            <Text style={styles.title}>¡ TU PUBLICACiÓN SE SUBIÓ{'\n'}CON ÉXITO A MERCADOTEC !</Text>

            <Image style={styles.gif} source={{uri: "https://media2.giphy.com/media/fr0a9Np0PlcJTVevU5/giphy.gif?cid=ecf05e47637c873051241c4ffafeed3b643a55acbea94ce3&rid=giphy.gif&ct=g"}}/>

            <TouchableOpacity style={styles.button}
                onPress={() => navigation.replace('PromotePost')}
            >
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default SuccessPopup

const styles = StyleSheet.create({
    darkBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        zIndex: 2,
    },
    container: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 3,
        paddingHorizontal: s(10),
        paddingVertical: s(15),
        paddingBottom: s(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: vs(12),
        color: colors.primary,
        marginBottom: vs(15),
        fontFamily: 'GorditaBold',
        lineHeight: vs(20),
        textAlign: 'center',
    },
    gif: {
        width: "90%",
        height: vs(140),
        marginBottom: vs(15),
        borderRadius: 3,
    },
    button: {
        backgroundColor: colors.primary,
        paddingHorizontal: s(25),
        paddingVertical: vs(5),
        borderRadius: 3,
    },
    buttonText: {
        fontSize: vs(10),
        color: '#fff',
        fontFamily: 'GorditaMedium',
    },
})