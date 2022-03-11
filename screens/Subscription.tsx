import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import {vs, s} from "react-native-size-matters";
import {colors, templates} from '../StyleVariables';
import {useNavigation} from '@react-navigation/native';
import {getAuth} from 'firebase/auth';
import { getFirestore, updateDoc, increment, doc } from 'firebase/firestore';

// COMPONENTS
import PaymentPopup from '../components/PaymentPopup';
import TermsPopup from '../components/TermsPopup'
import Icon from '../assets/icons';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type SubscriptionScreenProps = StackNavigationProp<RootStackParamList, 'Subscription'>;

const Subscription = () => {
  const navigation = useNavigation<SubscriptionScreenProps>();

  const auth = getAuth();
  const db = getFirestore();

  const [selectedPlan, setSelectedPlan] = useState(2);
  const [showPopup, setShowPopup] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const updateSubscription = async () => {
    const uid: any = auth.currentUser?.uid;

    await updateDoc(doc(db, "Users", uid), {
      cutOffDate: selectedPlan == 1 ? increment(30) : increment(90),
      freeTrial: false
    })
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity style={templates.returnIcon} onPress={() => {navigation.goBack()}}>
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
      </TouchableOpacity>

      <Text style={styles.title}>TU SUSCRIPCIÓN A MERCADOTEC</Text>
      <Text style={styles.description}>
        Puedes invertir en tu negocio por menos de la mitad de lo que gastas en ,
        todos los usuarios que están en MercadoTec están aquí para comprar y si
        tu publicación está aquí, nosotros te ayudamos a vender más.
      </Text>

      <Text style={styles.subtitle}>Selecciona un plan:</Text>

      <View style={styles.plansContainer}>
        <TouchableOpacity style={styles.plan}
          onPress={() => {setSelectedPlan(1)}}
        >
          <Text style={styles.header}>1 mes</Text>
          <Text style={styles.price}>$27</Text>
          <View style={styles.checkbox}>
            <View style={selectedPlan == 1 && styles.activeCheckbox} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.plan}
          onPress={() => {setSelectedPlan(2)}}
        >
          <Text style={styles.header}>3 meses</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$19</Text>
            <Text style={styles.month}>/mes</Text>
          </View>
          <View style={styles.checkbox}>
            <View style={selectedPlan == 2 && styles.activeCheckbox} />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}
        onPress={() => {setShowPopup(true)}}
      >
        <Text style={styles.textButton}>SUSCRIBIRSE</Text>
      </TouchableOpacity>


      <Text style={styles.disclaimer}>
          Si por necesidades económicas, no tienes la posibilidad de
          pagar por tu suscripción de MercadoTec, puedes contactarnos
          al correo mercadotec22@gmail.com, platicarnos tú situación
          y te presentaremos con otras opciónes para seguir
          publicando tus productos.
      </Text>

      <TouchableOpacity style={styles.terms}
        onPress={() => {setShowTerms(true)}}
      >
        <Text style={styles.termsText}>Términos y condiciones</Text>
      </TouchableOpacity>

      {
        showTerms && (
          <TermsPopup onClose={() => {setShowTerms(false)}}/>
        )
      }

      {
        showPopup && (
          <PaymentPopup
            onClose={() => {setShowPopup(false)}}
            onSuccess={() => {
              updateSubscription().then(() => {
                setSuccessPopup(true);
              })
            }}
            price={selectedPlan == 1 ? 27 : 57}
            item={selectedPlan == 1 ? 'Suscripción por 1 mes' : 'Suscripción por 3 meses'}
          />
        )
      }

      {
        successPopup && (
          <View style={styles.popupContainer}>
            <View style={styles.successPopup}>
              <Text style={styles.successText}>¡Se realizó la compra con éxito!</Text>

              <TouchableOpacity style={styles.successButton}
                onPress={() => {setSuccessPopup(false)}}
              >
                  <Text style={styles.successButtonText}>ACEPTAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default Subscription

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: s(30),
    fontFamily: 'GorditaBold',
    lineHeight: s(40),
    marginBottom: vs(10),
  },
  description: {
    paddingHorizontal: vs(15),
    color: '#FFF',
    fontSize: s(11),
    lineHeight: s(14),
    fontFamily: 'GorditaRegular',
    marginBottom: vs(50),
  },
  subtitle: {
    color: '#FFF',
    fontSize: s(14),
    fontFamily: 'GorditaMedium',
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
    marginLeft: vs(15),
    marginBottom: vs(15),
  },
  plansContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  plan: {
    borderWidth: 1,
    borderColor: '#FFF',
    width: vs(135),
    borderRadius: 3,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFF',
    textAlign: 'center',
    fontFamily: 'GorditaBold',
    color: colors.primary,
    fontSize: s(16),
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    width: '100%',
    marginBottom: vs(15)
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems:'baseline'
  },
  price: {
    color: '#FFF',
    fontFamily: 'GorditaBold',
    fontSize: s(22),
  },
  month: {
    color: '#FFF',
    fontFamily: 'GorditaBold',
    paddingBottom: vs(3)
  },
  checkbox: {
    width: vs(15),
    height: vs(15),
    borderRadius: vs(100),
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vs(10),
  },
  activeCheckbox: {
    backgroundColor: '#FFF',
    width: vs(8),
    height: vs(8),
    borderRadius: vs(100),
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 3,
    marginTop: vs(40),
  },
  textButton: {
    color: colors.primary,
    fontFamily: 'GorditaBold',
    fontSize: s(16),
    paddingHorizontal: s(20),
    paddingVertical: vs(3)
  },
  disclaimer: {
    color: '#FFF',
    fontFamily: 'GorditaRegular',
    fontSize: s(7),
    textAlign: 'center',
    lineHeight: s(10),
    marginTop: vs(10),
    paddingHorizontal: vs(15),
  },
  terms: {
    marginVertical: vs(25),
  },
  termsText: {
    color: '#FFF',
    fontFamily: 'GorditaRegular',
    fontSize: s(11),
    textDecorationLine: 'underline',
  },
  popupContainer: {
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
  successPopup: {
    width: s(300),
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vs(15),
  },
  successText: {
    fontFamily: 'GorditaBold',
    fontSize: vs(13),
    color: colors.primary,
    marginBottom: vs(10)
  },
  successButton: {
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  successButtonText: {
    fontFamily: 'GorditaBold',
    fontSize: vs(10),
    color: '#fff',
    paddingHorizontal: s(20),
    paddingVertical: s(3),
  },
})