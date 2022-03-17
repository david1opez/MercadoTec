import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';
import {doc, updateDoc, increment, getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import{ colors } from "../StyleVariables";

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type ProductInfoScreenProp = StackNavigationProp<RootStackParamList, 'ProductInfo'>;
type PromotedPostProps = {
  index: number,
  title: string,
  image: string,
  id: string,
  description: string,
}

const PromotedPost = ({index, title, image, id, description}: PromotedPostProps) => {
  const navigation = useNavigation<ProductInfoScreenProp>();

  const db = getFirestore();
  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  const increaseViewCount = async () => {
    if(uid == id) {
      navigation.navigate("ProductInfo", {id: id})
      return;
    };

    updateDoc(doc(db, "Products", id), {
      views: increment(1)
    })
    .then( () => {
      navigation.navigate("ProductInfo", {id: id})
    })
    .catch((error) => {
      alert(error);
    })
  }

  return (
    <TouchableOpacity
      style={index == 0 ? [styles.container, {marginLeft: s(15)}] : styles.container}
      onPress={() => {increaseViewCount()}}
    >

      <ImageBackground
        source={{uri: image}}
        style={styles.image}
        imageStyle={{ borderRadius: 5}}
      >
        <View style={styles.darkenImage}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>
              {description?.substring(0, 150)}...
            </Text>
          </View>
        </View>
      </ImageBackground>

    </TouchableOpacity> 
  )
}

export default PromotedPost

const styles = StyleSheet.create({
  container: {
    marginRight: s(20),
  },
  image: {
    width: s(270),
    height: vs(165),
    borderRadius: 5,
  },
  darkenImage: {
    width: s(270),
    height: vs(165),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textContainer: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: vs(9),
    paddingHorizontal: s(12),
  },
  infoContainer: {
    position: 'absolute',
    bottom: vs(5),
    left: s(10),
    marginBottom: vs(10),
  },
  title: {
    fontFamily: "GorditaMedium",
    color: "#fff",
    fontSize: s(14),
  },
  description: {
    fontFamily: "GorditaRegular",
    fontSize: vs(8),
    color: "#fff",
    lineHeight: vs(11),
    marginLeft: s(2),
    marginTop: vs(1),
    paddingRight: s(10)
  },
})