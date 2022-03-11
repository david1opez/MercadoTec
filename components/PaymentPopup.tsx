import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native'
import React, {useState} from 'react'
import {vs, s} from 'react-native-size-matters'
import {colors} from '../StyleVariables'
import Constants from 'expo-constants';
import {useConfirmPayment, CardField} from '@stripe/stripe-react-native';
import {getAuth} from 'firebase/auth';

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
    const {confirmPayment} = useConfirmPayment();
    const auth: any = getAuth();

    const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Oxxo'>('Card');

    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cardDetail, setCardDetails]: any = useState();

    const validate = () => {
        if(paymentMethod == "Oxxo") {
            if(!name) {
                alert("Parece que dejaste algunos campos vacíos")
                return false
            }
        }

        return true;
    }

    const fetchClientSecret = async () => {
        setIsLoading(true);

        const response = await fetch(Constants?.manifest?.extra?.APIURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: price*100
            })
        })

        const {clientSecret, error} = await response.json();

        return {clientSecret, error};
    }

    const makePayment = async () => {
        const {clientSecret, error} = await fetchClientSecret();

        if(error) {
            console.log(error)
            setIsLoading(false);
            return;
        }
        else {
            const {paymentIntent, error} = await confirmPayment(clientSecret, {
                type: "Card",
                billingDetails: {
                    email: auth?.currentUser?.email,
                }
            })

            if(error) {
                alert(error.localizedMessage)
                setIsLoading(false);
            }
            else if(paymentIntent) {
                setIsLoading(false);
                onSuccess();
            }  
        }
    }

    return (
        <View style={styles.darkBackground}>
        <View style={styles.popupContainer}>
            <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
                <Icon name="close" width={vs(17)} height={vs(17)} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.title}>Método de pago</Text>

            {/* <PaymentMethod
                selectedMethod={paymentMethod}
                currentMethod="Oxxo"
                title="Pago en efectivo con Oxxo"
                onPress={(method) => {setPaymentMethod(method)}}
            /> */}

            <PaymentMethod
                selectedMethod={paymentMethod}
                currentMethod="Card"
                title="Pago con tarjeta"
                onPress={(method) => {setPaymentMethod(method)}}
            />

            {
                paymentMethod === 'Card' && (
                    <CardField
                        postalCodeEnabled={false}
                        placeholder={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={styles.card}
                        style={styles.cardContainer}
                        onCardChange={(details) => {setCardDetails(details)}}
                    />
                )
            }

            {
                paymentMethod === 'Oxxo' && (
                    <View>
                        <Text style={styles.placeholder}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="words"
                            onChangeText={(text) => {setName(text)}}
                        />
                    </View>
                )
            }

            <Text style={[styles.details, paymentMethod == "Oxxo" && {marginTop: vs(20)}]}>{item}: ${price}</Text>
            <View style={styles.div} />
            <View style={styles.totalContainer}>
                <Text style={styles.total}>Total: ${price}.00</Text>
                <Text style={styles.currency}>MXN</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    Keyboard.dismiss();
                    if (isLoading) return;
                    if(validate()) {
                        makePayment()
                    }
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
    card: {
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 3,
        fontFamily: "GorditaRegular",
        fontSize: vs(10),
        alignItems: "center",
    },
    cardContainer: {
        height: vs(40),
        marginVertical: vs(20),
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 3,
        fontSize: vs(10),
        lineHeight: vs(14),
        paddingLeft: s(10),
        paddingVertical: vs(2),
        fontFamily: "GorditaRegular",
        color: colors.primary,
    },
    placeholder: {
        color: colors.primary,
        fontFamily: "GorditaMedium",
        fontSize: vs(9),
        marginTop: vs(10),
        marginBottom: vs(5),
    },
    details: {
        textAlign: "right",
        fontFamily: "GorditaRegular",
        color: colors.primary,
        fontSize: vs(9),
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