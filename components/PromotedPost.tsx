import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';

import{ colors } from "../StyleVariables";

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type ProductInfoScreenProp = StackNavigationProp<RootStackParamList, 'ProductInfo'>;
type PromotedPostProps = {
  index: number,
  title: string,
  image: string,
  id: string
}

const PromotedPost = ({index, title, image, id}: PromotedPostProps) => {
  const navigation = useNavigation<ProductInfoScreenProp>();

  return (
    <TouchableOpacity
      style={index == 0 ? [styles.container, {marginLeft: s(15)}] : styles.container}
      onPress={() => {navigation.navigate("ProductInfo", {id: id})}}
    >

    <View>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.darkenImage} />
    </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

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
    height: vs(130),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  darkenImage: {
    width: s(270),
    height: vs(130),
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textContainer: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: vs(9),
    paddingHorizontal: s(12),
  },
  title: {
    fontFamily: "GorditaBold",
    color: "#fff",
    fontSize: s(14),
  },
  seller: {
    fontFamily: "GorditaRegular",
    fontSize: vs(7),
    color: "#fff",
    marginLeft: s(2),
    marginTop: vs(1)
  },
})