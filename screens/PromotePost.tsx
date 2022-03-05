import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import {vs, s} from "react-native-size-matters";
import { useNavigation } from '@react-navigation/native';

import { colors, templates } from '../StyleVariables'

// COMPONENTS
import PromotedPostPreview from '../components/PromotedPostPreview'
import PromotePostPopup from '../components/PromotePostPopup'
import Icon from '../assets/icons';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type PromotePostScreenProp = StackNavigationProp<RootStackParamList, 'PromotePost'>;

const PromotePost = () => {
  const navigation = useNavigation<PromotePostScreenProp>();
  
  const [showInfo, setShowInfo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState({index: 0, price: 0});

  const promotedPosts: any = [
    {
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      title: 'Lorem ipsum dolor sit',
      index: 0,
      price: 35
    },
    {
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      title: 'Lorem ipsum dolor sit',
      index: 1,
      price: 30
    },
    {
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      title: 'Lorem ipsum dolor sit',
      index: 2,
      price: 25
    },
    {
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      title: 'Lorem ipsum dolor sit',
      index: 3,
      price: 20
    },
    {
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      title: 'Lorem ipsum dolor sit',
      index: 4,
      price: 15
    }
  ]

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

      <View style={styles.scrollContainer}>
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
                    setShowPopup(true);
                    setPopupInfo({index: index, price: post.price});
                  }}
                />
              )
            })
          }
        </ScrollView>
      </View>

      {
        showPopup && (
          <PromotePostPopup
            onClose={() => setShowPopup(false)}
            index={popupInfo.index}
            price={popupInfo.price}
          />
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
  scrollContainer: {},
})