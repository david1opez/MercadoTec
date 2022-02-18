import { StyleSheet, Text, View, TouchableOpacity, Image, Touchable } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import {useNavigation} from '@react-navigation/native';

import { colors } from '../StyleVariables'

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type ProductInfoScreenProp = StackNavigationProp<RootStackParamList, 'ProductInfo'>;


const Post = ({title, description, image, id}: {title: string, description: string, image: string, id: string}) => {
  const navigation = useNavigation<ProductInfoScreenProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {navigation.navigate("ProductInfo", {id: id})}}
    >

      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View>
        <Image style={styles.image} source={{uri: image}} />
        <View style={styles.darkenImage} />
      </View>
    </TouchableOpacity>
  )
}

export default Post

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: s(15),
    borderBottomWidth: 1,
    borderColor: colors.primary,
    paddingBottom: s(15),
  },
  leftContainer: {
    flex: 1,
  },
  title: {
    fontSize: vs(10),
    fontFamily: "GorditaMedium",
    marginBottom: s(5),
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: vs(7),
    fontFamily: "GorditaRegular",
    lineHeight: vs(10),
  },
  image: {
    width: vs(65),
    height: vs(50),
    borderRadius: 3,
  },
  darkenImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0,0,0,0.6)",
    opacity: 0.3,
  },
})