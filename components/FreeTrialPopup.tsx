import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {vs, s} from 'react-native-size-matters'

import {colors} from '../StyleVariables'

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type PaySubscriptionScreenProp = StackNavigationProp<RootStackParamList, 'EditProduct'>;

const FreeTrialPopup = ({daysLeft}: {daysLeft: number}) => {
    const navigation = useNavigation<PaySubscriptionScreenProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quedan {daysLeft} días de tú prueba gratis</Text>
            <Text style={styles.description}>Puedes actualizar tu suscripción por solo $15.00 al mes</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>MÁS INFORMACIÓN</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FreeTrialPopup

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        paddingVertical: vs(7),
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        alignSelf: 'center',
        marginTop: vs(50)
    },
    header: {
        color: "#FFF",
        fontFamily: "GorditaMedium",
        fontSize: s(11),
    },
    description: {
        color: "#FFF",
        textAlign: "center",
        fontFamily: "GorditaRegular",
        fontSize: vs(8),
        lineHeight: vs(11),
        marginVertical: vs(5),
    },
    button: {
        backgroundColor: "#FFF",
        paddingHorizontal: s(15),
        paddingVertical: vs(2),
        borderRadius: 3,
        marginTop: vs(5),
    },
    buttonText: {
        color: colors.primary,
        fontFamily: "GorditaBold",
        fontSize: vs(8),
    },
})