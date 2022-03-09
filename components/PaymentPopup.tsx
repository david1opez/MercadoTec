import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import {vs, s} from 'react-native-size-matters'
import {colors} from '../StyleVariables'

// COMPONENTS
import PaymentMethod from './PaymentMethod'
import Icon from '../assets/icons';

// TYPES
type PaymentPopupProps = {
    onClose: () => void,
    price: number,
    onSuccess: () => void,
    item: string
}

const PaymentPopup = ({onClose, price, onSuccess, item}: PaymentPopupProps) => {
    const [paymentMethod, setPaymentMethod] = useState('card');

    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [email, setEmail] = useState('');

    const validate = () => {
        return true;
    }

    const makePayment = async () => {}

    return (
        <View style={styles.darkBackground}>
        <View style={styles.popupContainer}>
            <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
                <Icon name="close" width={vs(17)} height={vs(17)} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.title}>Método de pago</Text>

            <PaymentMethod
                selectedMethod={paymentMethod}
                currentMethod="oxxo"
                title="Pago en efectivo con Oxxo"
                onPress={(method) => {setPaymentMethod(method)}}
            />

            <PaymentMethod
                selectedMethod={paymentMethod}
                currentMethod="card"
                title="Pago con tarjeta"
                onPress={(method) => {setPaymentMethod(method)}}
            />

            {
                paymentMethod === 'card' && (
                    <View style={styles.cardInputsContainer}>
                        <Text style={styles.placeholder}>Nombre del titular de la tarjeta</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="words"
                            onChangeText={(text) => {setName(text)}}
                        />

                        <Text style={styles.placeholder}>Número de tarjeta</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='phone-pad'
                            onChangeText={(text) => {setCardNumber(text)}}
                        />

                        <View style={styles.cardFlexInputs}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.placeholder}>Fecha de vencimiento</Text>
                                <TextInput
                                    style={styles.dateInput}
                                    keyboardType='phone-pad'
                                    onChangeText={(text) => {setExpiryDate(text)}}
                                />
                            </View>

                            <View>
                                <Text style={styles.placeholder}>CVV</Text>
                                <TextInput
                                    style={styles.cvvInput}
                                    keyboardType='phone-pad'
                                    onChangeText={(text) => {setCvv(text)}}
                                />
                            </View>
                        </View>
                    </View>
                )
            }

            {
                paymentMethod === 'oxxo' && (
                    <View style={styles.oxxoInputsContainer}>
                        <Text style={styles.placeholder}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="words"
                            onChangeText={(text) => {setName(text)}}
                        />

                        <Text style={styles.placeholder}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(text) => {setEmail(text.replace(/\s/g, ""))}}
                        />
                    </View>
                )
            }

            <Text style={styles.details}>{item}: ${price}</Text>
            <View style={styles.div} />
            <View style={styles.totalContainer}>
                <Text style={styles.total}>Total: ${price}.00</Text>
                <Text style={styles.currency}>MXN</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (isLoading) return;
                    if(validate()) makePayment()
                }}
            >
                {
                    isLoading ? (
                        <ActivityIndicator size="small" color={"#FFF"} />
                    ) : (
                        <Text style={styles.buttonText}>Pagar</Text>
                    )
                }
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
                Los pagos son manejados mediante Stripe, un
                Proveedor de servicios PCI de nivel 1, que es el nivel de certificación
                más exigente dentro de la industria de pagos, además la información es
                cifrada en reposo con AES-256, por lo qué en MercadoTec manejamos los
                pagos con los niveles más altos de seguridad.
            </Text>

        </View>
        </View>
    )
}

export default PaymentPopup

const styles = StyleSheet.create({
    darkBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: s(350),
        height: vs(705),
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContainer: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        width: s(300),
        paddingVertical: vs(20),
        paddingHorizontal: s(15),
    },
    closeButton: {
        position: 'absolute',
        top: vs(10),
        right: vs(10),
        zIndex: 2,
    },
    title: {
        color: colors.primary,
        fontFamily: "GorditaBold",
        fontSize: vs(14),
        textDecorationLine: 'underline',
        marginBottom: vs(8)
    },
    cardInputsContainer: {},
    cardFlexInputs: {
        flexDirection: 'row',
    },
    inputContainer: {
        marginRight: s(10),
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 3,
        fontSize: vs(11),
        lineHeight: vs(14),
        paddingLeft: s(10),
        paddingVertical: vs(2),
        fontFamily: "GorditaRegular",
    },
    placeholder: {
        color: colors.primary,
        fontFamily: "GorditaRegular",
        fontSize: vs(9),
        marginTop: vs(10),
        marginBottom: vs(5),
    },
    dateInput: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 3,
        fontSize: vs(11),
        lineHeight: vs(14),
        paddingLeft: s(10),
        fontFamily: "GorditaRegular",
        width: s(120),
    },
    cvvInput: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 3,
        fontSize: vs(11),
        lineHeight: vs(14),
        paddingLeft: s(10),
        fontFamily: "GorditaRegular",
        width: vs(50),
    },
    oxxoInputsContainer: {},
    details: {
        textAlign: "right",
        fontFamily: "GorditaRegular",
        color: colors.primary,
        fontSize: vs(9),
        marginTop: vs(20),
    },
    div: {
        height: 1,
        backgroundColor: colors.primary,
        marginVertical: vs(10),
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
    },
    total: {
        fontFamily: 'GorditaBold',
        fontSize: vs(12),
    },
    currency: {
        fontFamily: 'GorditaBold',
        fontSize: vs(7),
        marginLeft: s(4),
        paddingBottom: vs(2),
    },
    button: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginHorizontal: s(50),
        marginTop: s(25),
    },
    buttonText: {
        fontFamily: 'GorditaBold',
        fontSize: vs(12),
        color: '#FFF',
        paddingVertical: vs(3),
    },
    disclaimer: {
        fontFamily: "GorditaRegular",
        color: colors.primary,
        fontSize: vs(7),
        textAlign: "center",
        lineHeight: vs(9),
        marginTop: vs(20),
        opacity: 0.4,
    },
})