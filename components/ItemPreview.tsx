import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {vs, s} from "react-native-size-matters";

import {colors} from "../StyleVariables";

const ItemPreview = ({index, title, description, image, price, removeItem}: {index: number, title: string, description: string, price: number, image: string, removeItem: Function}) => {
  return (
    <View style={styles.container}>

      <View>
        <Image source={{uri: image}} style={styles.image}/>
        <View style={styles.darkenImage} />
      </View>

      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {price > 0 && (
          <Text style={styles.price}>${price}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.deleteIcon}
        onPress={() => removeItem(index)}
      >
        <Text style={styles.deleteIconText}>_</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItemPreview

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: vs(10),
    alignItems: 'center',
    paddingVertical: vs(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  image: {
    width: vs(50),
    height: vs(50),
    borderRadius: 3,
    marginRight: vs(15),
  },
  darkenImage: {
    width: vs(50),
    height: vs(50),
    backgroundColor: 'rgba(0,0,0,0.15)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    borderRadius: 3,
  },
  title: {
    fontSize: vs(11),
    fontFamily: 'GorditaBold',
    maxWidth: vs(170),
    marginBottom: vs(3),
    lineHeight: vs(15),
  },
  description: {
    fontSize: vs(8),
    fontFamily: 'GorditaRegular',
    lineHeight: vs(13),
    maxWidth: vs(170),
    marginBottom: vs(3),
  },
  price: {
    fontSize: vs(11),
    fontFamily: 'GorditaBold',
    color: colors.primary,
  },
  deleteIcon: {
    width: vs(15),
    height: vs(15),
    marginLeft: vs(10),
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIconText: {
    fontSize: vs(10),
    fontFamily: 'GorditaBold',
    color: colors.primary,
    textAlign: 'center',
    lineHeight: vs(2),
  },
})