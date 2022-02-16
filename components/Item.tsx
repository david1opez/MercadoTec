import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {vs, s} from "react-native-size-matters";

import{ colors } from "../StyleVariables";


const Item = ({image, title, description, price, index, itemsLenght}:{image: string, title: string, description: string, price: number, index: number, itemsLenght: number}) => {
  return (
    <View key={index} style={index == 0 ? [styles.itemContainer, {marginTop: vs(25)}] : index == itemsLenght - 1 ? [styles.itemContainer, {marginBottom: vs(70)}] : styles.itemContainer}>
        <Image source={{uri: image}} style={styles.itemImage}/>
        
        <View>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemDescription}>{description}</Text>
            <Text style={styles.itemPrice}>${price}</Text>
        </View>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vs(20),
      },
      itemImage: {
        width: vs(60),
        height: vs(60),
        borderRadius: 3,
        marginRight: s(15),
      },
      itemTitle: {
        fontFamily: 'GorditaMedium',
        fontSize: vs(10),
        marginBottom: vs(5),
      },
      itemDescription: {
        fontFamily: 'GorditaRegular',
        fontSize: vs(8),
        lineHeight: vs(10),
        width: s(210),
        marginBottom: vs(5),
      },
      itemPrice: {
        fontFamily: 'GorditaBold',
        color: colors.primary,
        fontSize: vs(11),
      },
})