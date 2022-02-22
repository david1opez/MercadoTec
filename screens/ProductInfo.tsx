import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import * as Linking from 'expo-linking';

import{ colors } from "../StyleVariables";

// COMPONENTS
import Item from '../components/Item';
import Icon from '../assets/icons'


const ProductInfo = ({route}: any) => {
  const navigation = useNavigation();

  const id = route.params.id;

  const db = getFirestore();

  const [product, setProduct] = useState<any>();

  useEffect(() => {
    getDoc(doc(db, "Products", id))
    .then((result) => {
      setProduct(result.data());
    })
  }, [])

  if(!product) {
    return (
      <View />
    )
  }

  return (
    <View>
      <TouchableOpacity style={styles.returnIcon} onPress={() => {navigation.goBack()}}>
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
      </TouchableOpacity>

      <View>
        <Image source={{uri: product.image}} style={styles.mainImage}/>
        <View style={styles.darkenImage}/>
      </View>

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            product.items.map((item: any, index: number) => {
              return(
                <Item key={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  index={index}
                  itemsLenght={product.items.length}
                />
              )
            })
          }

        </ScrollView>
      </View>

      <TouchableOpacity style={styles.button}
        onPress={() => {
          Linking.openURL(product.link);
        }}
      >
        <Text style={styles.buttonText}>Contactar</Text>
      </TouchableOpacity>

    </View>
  )
}

export default ProductInfo

const styles = StyleSheet.create({
  returnIcon: {
    width: vs(26),
    height: vs(26),
    position: 'absolute',
    top: vs(35),
    right: s(15),
    zIndex: 1,
  },
  mainImage: {
    width: '100%',
    height: vs(250),
    marginBottom: vs(15),
  },
  darkenImage: {
    width: '100%',
    height: vs(250),
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  title: {
    fontFamily: 'GorditaBold',
    marginHorizontal: s(15),
    fontSize: vs(16),
    marginBottom: vs(5),
  },
  description: {
    fontFamily: 'GorditaRegular',
    fontSize: vs(9),
    lineHeight: vs(12),
    marginHorizontal: s(15),
    marginBottom: vs(10),
  },
  scrollContainer: {
    marginHorizontal: s(20),
    height: vs(305),
  },
  button: {
    position: 'absolute',
    bottom: vs(30),
    backgroundColor: colors.primary,
    left: s(70),
    right: s(70),
    paddingVertical: vs(5),
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 6,
  },
  buttonText: {
    color: "#FFF",
    fontFamily: 'GorditaMedium',
    fontSize: vs(12),
    textAlign: 'center',
  },
})