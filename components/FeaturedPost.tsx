import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';

import{ colors } from "../StyleVariables";

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type ProductInfoScreenProp = StackNavigationProp<RootStackParamList, 'ProductInfo'>;

const FeaturedPost = ({index, title, seller, image, id}: {index: number, title: string, seller: string, image: string, id: string}) => {
  const navigation = useNavigation<ProductInfoScreenProp>();

  return (
    <TouchableOpacity
      style={index == 0 ? [styles.container, {marginLeft: s(15)}] : styles.container}
      onPress={() => {navigation.navigate("ProductInfo", {id: id})}}
    >

      <Image style={styles.image} source={{uri: image}} />
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.seller}>{seller}</Text>
      </View>

    </TouchableOpacity> 
  )
}

export default FeaturedPost

const styles = StyleSheet.create({
  container: {
    marginRight: s(20),
  },
  image: {
    width: s(270),
    height: vs(130),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textContainer: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: vs(9),
    paddingHorizontal: s(12),
  },
  title: {
    fontFamily: "GorditaMedium",
    color: "#fff",
    fontSize: s(12),
  },
  seller: {
    fontFamily: "GorditaRegular",
    fontSize: vs(7),
    color: "#fff",
    marginLeft: s(2),
    marginTop: vs(1)
  },
})