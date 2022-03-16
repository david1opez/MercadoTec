import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import {vs, s} from "react-native-size-matters";
import { useNavigation } from '@react-navigation/native';
import { doc, getFirestore, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

import { colors, templates } from '../StyleVariables'

// COMPONENTS
import PromotedPostPreview from '../components/PromotedPostPreview'
import PromotePostPopup from '../components/PromotePostPopup'
import Icon from '../assets/icons';
import PaymentPopup from '../components/PaymentPopup';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type PromotePostScreenProp = StackNavigationProp<RootStackParamList, 'PromotePost'>;

const PromotePost = () => {
  const db = getFirestore();
  const auth = getAuth();

  const uid: any = auth.currentUser?.uid;

  const navigation = useNavigation<PromotePostScreenProp>();
  
  const [showInfo, setShowInfo] = useState(false);
  const [showBuyPopup, setShowBuyPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState({index: 0, price: 0});
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [price, setPrice] = useState(0);

  const [promotedPosts, setPromotedPosts] = useState([]);

  const GetPromotedPosts = async () => {
    let docSnap = await getDoc(doc(getFirestore(), "Products", "Promoted"));
    if(!docSnap.exists()) return;
    let data = docSnap.data();
    setPromotedPosts(data.Posts);
  }

  const setNewPromotedPost = async (index: number, price: number) => {
    let docSnap = await getDoc(doc(db, "Products", "Promoted"));
    if(!docSnap.exists()) return;
    let data = docSnap.data();
    let posts = data.Posts;

    let newDocSnap = await getDoc(doc(db, "Products", uid));
    if(!newDocSnap.exists()) return;
    let newData = newDocSnap.data();

    let newPromotedPost = {
      id: uid,
      image: newData.image,
      price: price+5,
      title: newData.title,
      description: newData.description,
    }

    posts[index] = newPromotedPost;

    await updateDoc(doc(getFirestore(), "Products", "Promoted"), {Posts: posts});
    GetPromotedPosts();
  }

  useEffect(() => {
    GetPromotedPosts();
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={templates.returnIcon} onPress={() => {navigation.navigate("EditProduct")}}>
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={colors.primary}/>
      </TouchableOpacity>
      
      <Text style={styles.title}>PROMOCIONA TU PUBLICACIÓN</Text>
      <Text style={styles.description}>Haz que tu publicación sea lo primero que vean las personas al entrar a MercadoTec</Text>
      <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
        <Text style={styles.moreInfoButton}>¿Cómo funciona?</Text>
      </TouchableOpacity>

      {
        showInfo && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescription}>
              * Hay 5 lugares en las publicaciones promocionadas de la aplicación y tú puedes comprar alguno de estos lugares para mostrar lo que vendes.
              {"\n"}{"\n"}
              * Los precios de cada publicación van de $15 a $35 al inicio de cada semana, pero va aumentando conforme a las ofertas que hacen los demás.
              {"\n"}{"\n"}
              * Si quieres un lugar en las publicaciones promocionadas, pero ya está tomado, puedes hacer una oferta más alta y comprar el lugar qué prefieras
              {"\n"}{"\n"}
              * Entre más alta sea tú oferta más tiempo durará en las publicaciones promocionadas :)
            </Text>
          </View>
        )
      }

      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            promotedPosts.map((post: any, index: number) => {
              return(
                <PromotedPostPreview
                  key={index}
                  image={post.image}
                  price={post.price}
                  index={index}
                  title={post.title}
                  onPress={() => {
                    setShowBuyPopup(true);
                    setPopupInfo({index: index, price: post.price});
                  }}
                />
              )
            })
          }
        </ScrollView>
      </View>

      {
        showBuyPopup && (
          <PromotePostPopup
            onClose={() => setShowBuyPopup(false)}
            index={popupInfo.index}
            minOffer={popupInfo.price}
            onBuy={(price) => {
              setShowBuyPopup(false);
              setPaymentPopup(true);
              setPrice(price);
            }}
          />
        )
      }

      {
        paymentPopup && (
          <PaymentPopup
            onClose={() => setPaymentPopup(false)}
            oxxoPayment={false}
            price={price}
            item={"Publicación promocionada"}
            onSuccess={(oxxo) => {
              if(oxxo) {
                setPaymentPopup(false);
                alert("Una vez realizado el pago, podrás ver tu publicación en las publicaciones promocionadas");
              }
              setNewPromotedPost(popupInfo.index, price)
              .then(() => {
                setPaymentPopup(false);
                setSuccessPopup(true);
              })
            }}
          />
        )
      }

      {
        successPopup && (
          <View style={styles.popupContainer}>
            <View style={styles.successPopup}>
              <Text style={styles.successText}>¡Se realizó la compra con éxito!</Text>

              <TouchableOpacity style={styles.button}
                onPress={() => {setSuccessPopup(false)}}
              >
                  <Text style={styles.buttonText}>ACEPTAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default PromotePost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontFamily: 'GorditaBold',
    fontSize: vs(25),
    lineHeight: vs(35),
    color: colors.primary,
    marginTop: vs(40),
    marginBottom: vs(5),
  },
  description: {
    fontFamily: 'GorditaRegular',
    fontSize: vs(9),
    lineHeight: vs(12),
    color: colors.primary,
    paddingRight: s(40),
    marginBottom: vs(15)
  },
  moreInfoButton: {
    fontFamily: 'GorditaMedium',
    fontSize: vs(10),
    color: colors.primary,
    textDecorationLine: 'underline',
    marginBottom: vs(20)
  },
  infoContainer: {
    marginLeft: s(10),
  },
  infoDescription: {
    fontFamily: 'GorditaRegular',
    fontSize: vs(9),
    lineHeight: vs(12),
    color: colors.primary,
    marginTop: vs(-10),
    marginBottom: vs(20),
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
  button: {
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  buttonText: {
    fontFamily: 'GorditaBold',
    fontSize: vs(10),
    color: '#fff',
    paddingHorizontal: s(20),
    paddingVertical: s(3),
  },
})