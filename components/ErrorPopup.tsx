import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters';

import { colors } from '../StyleVariables'
// TYPES
type ErrorMessage = {
    type: "Warning" | "Error",
    title: string,
    message: string,
    gif: string,
    id: number
};

const errorMessages: ErrorMessage[] = [
    {
        type: "Warning",
        title: "Uy!, parece que dejaste algunos campos vacíos",
        message: "Por favor verifica que hayas llenado todos los datos requeridos",
        gif: "https://media4.giphy.com/media/KBYyUGgDEsILK/giphy.gif?cid=ecf05e474ymd5jmy4v8qalv38uaa4qvg0kbamcxym3z7rcfo&rid=giphy.gif&ct=g",
        id: 1
    },
    {
        type: "Warning",
        title: "El correo qué ingresaste no es válido",
        message: "Por favor comprueba que hayas escrito bien tú correo",
        gif: "https://media1.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif?cid=ecf05e47gs0yssgbr2utcx5395zvdoklkm87yoe0g4hl7i6f&rid=giphy.gif&ct=g",
        id: 2
    },
    {
        type: "Warning",
        title: "La contraseña debe tener al menos 6 caracteres",
        message: "La contraseña es poco segura, porfavor ingresa una contraseña con más de 6 caracteres",
        gif: "https://media1.giphy.com/media/oO8Io8e7uHu8gJQYbg/giphy.gif?cid=ecf05e47jt5s56jwbr2bqeegnlw3ar2d0zkd7olgn2qvnl7j&rid=giphy.gif&ct=g",
        id: 3
    },
    {
        type: "Warning",
        title: "Mmmm... parece qué no agregaste un modo de contacto",
        message: "Por favor ingresa un modo para que tus clientes te puedan contactar",
        gif: "https://media4.giphy.com/media/dtBi0s3hndz7q/giphy.gif?cid=ecf05e47t2s7x368pki830drh4ikqxmf2xmj1luu6r0tzaa0&rid=giphy.gif&ct=g",
        id: 4
    },
    {
        type: "Warning",
        title: "El numero de whatsapp debe tener 12 dígitos",
        message: "Por favor ingresa un numero de whatsapp válido, empezando con el codigo de país",
        gif: "https://media2.giphy.com/media/Vy9bLZxNutIlLuNXOZ/giphy.gif?cid=ecf05e47bb549cndwnjtn54lxvt2v9enpjlqho4k47zjidbi&rid=giphy.gif&ct=g",
        id: 5
    },
    {
        type: "Error",
        title: "No tenemos conexión a internet",
        message: "Por favor revisa tu conexión a internet e inténtalo de nuevo",
        gif: "",
        id: 6
    },
    {
        type: "Error",
        title: "El correo que ingresaste ya está registrado",
        message: "Por favor ingresa un correo que no esté registrado o intenta iniciar sesión",
        gif: "https://media0.giphy.com/media/13ioANG5T8UbE4/giphy.gif?cid=ecf05e47ywj8yfluv7t5dhbx5m38pbtmkuj7t6zg22n1s2sy&rid=giphy.gif&ct=g",
        id: 7
    },
    {
        type: "Error",
        title: "Usuario no encontrado",
        message: "No tenemos registrado ese correo, comprueba qué esté bien escrito o intenta registrandote",
        gif: "https://media2.giphy.com/media/l2SpZkQ0XT1XtKus0/giphy.gif?cid=ecf05e47zq8lkvx1j6ton1quxdqsw4q01lj6i8zdr1vd729g&rid=giphy.gif&ct=g",
        id: 8
    },
    {
        type: "Error",
        title: "La contraseña es incorrecta",
        message: 'Si olvidaste tú contraseña puedes dar click en "¿Olvidaste tu contraseña?"',
        gif: "https://media2.giphy.com/media/81xwEHX23zhvy/giphy.gif?cid=ecf05e47ee0qfx21l85vmczs0xkl84fwulz207mv1ofw8o7d&rid=giphy.gif&ct=g",
        id: 9
    }
];

const ErrorPopup = ({id, onClose, errorMessage}: {id: number, onClose: Function, errorMessage?: string}) => {
    if(id == 404 && errorMessage) errorMessages[404] = {
        type: "Error",
        title: errorMessage,
        message: "Umm... algo salió mal, puedes contactarnos para intentar resolverlo o puedes intentarlo otra vez",
        gif: "https://media4.giphy.com/media/nrXif9YExO9EI/giphy.gif?cid=ecf05e47zf7jggvg6nc3p62u18yhj06zr5o6pqkqo3gcdjty&rid=giphy.gif&ct=g",
        id: 404
    }

    return (
        <View style={styles.darkBackground}>
            <View style={styles.popupContainer}>
                {
                    errorMessages[id].type == "Warning" ? (
                        <Text style={styles.warningTitle}>ADVERTENCIA</Text>
                    ) : (
                        <Text style={styles.errorTitle}>ERROR</Text>
                    )
                }
            <View style={styles.container}>
                <Text style={styles.title}>{errorMessages[id].title}</Text>

                {
                    id == 5 ? (
                        <Image source={require("../assets/noConnection.gif")} style={styles.image}/>
                    ) : (
                        <Image source={{uri: errorMessages[id].gif}} style={styles.image}/>
                    )
                }

                <Text style={styles.message}>{errorMessages[id].message}</Text>

                <TouchableOpacity style={errorMessages[id].type == "Warning" ? styles.warningButton : styles.errorButton}
                    onPress={() => onClose()}
                >
                    <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

export default ErrorPopup

const styles = StyleSheet.create({
    darkBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: vs(705),
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContainer: {
        width: s(260),
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    warningTitle: {
        fontSize: vs(13),
        fontFamily: "GorditaBold",
        color: "#FFF",
        textAlign: "center",
        backgroundColor: colors.yellow,
        paddingVertical: vs(5),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    errorTitle: {
        fontSize: vs(13),
        fontFamily: "GorditaBold",
        color: "#FFF",
        textAlign: "center",
        backgroundColor: colors.primary,
        paddingVertical: vs(5),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: vs(25),
        paddingTop: vs(20),
    },
    title: {
        textAlign: 'center',
        fontFamily: "GorditaMedium",
        fontSize: vs(11),
        paddingHorizontal: s(30),
        lineHeight: vs(16),
    },
    message: {
        textAlign: 'center',
        marginBottom: vs(20),
        paddingHorizontal: s(30),
        fontFamily: "GorditaRegular",
        fontSize: vs(9),
        lineHeight: vs(13),
        color: "#000",
    },
    image: {
        width: s(230),
        height: s(130),
        marginVertical: vs(10),
    },
    warningButton: {
        backgroundColor: colors.yellow,
        borderRadius: 3,
    },
    errorButton: {
        backgroundColor: colors.primary,
        borderRadius: 3,
    },
    buttonText: {
        color: "#FFF",
        fontSize: vs(11),
        fontFamily: "GorditaMedium",
        paddingHorizontal: s(20),
        paddingVertical: vs(2),
    },
})