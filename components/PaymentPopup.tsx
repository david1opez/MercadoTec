import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'

import {colors} from '../StyleVariables'

// COMPONENTS
import PaymentMethod from './PaymentMethod'

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

    const makePayment = () => {}

    return (
        <View style={styles.darkBackground}>
        <View style={styles.popupContainer}>
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
                            <Text style={styles.placeholder}>Fecha de vencimiento</Text>
                            <TextInput
                                style={styles.shortInput}
                                keyboardType='phone-pad'
                                onChangeText={(text) => {setExpiryDate(text)}}
                            />

                            <Text style={styles.placeholder}>CVV</Text>
                            <TextInput
                                style={styles.shortInput}
                                keyboardType='phone-pad'
                                onChangeText={(text) => {setCvv(text)}}
                            />
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

            <Text style={styles.disclaimer}></Text>

        </View>
        </View>
    )
}

export default PaymentPopup

const styles = StyleSheet.create({
    darkBackground: {},
    popupContainer: {},
    title: {},
    cardInputsContainer: {},
    cardFlexInputs: {},
    input: {},
    placeholder: {},
    shortInput: {},
    oxxoInputsContainer: {},
    details: {},
    div: {},
    totalContainer: {},
    total: {},
    currency: {},
    button: {},
    buttonText: {},
    disclaimer: {},
})