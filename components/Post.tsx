import { StyleSheet, Text, View, TouchableOpacity, Image, Touchable } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'

import { colors } from '../StyleVariables'


const Post = ({title, description, image, id}: {title: string, description: string, image: string, id: string}) => {
  return (
    <TouchableOpacity style={styles.container}>

      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <Image style={styles.image} source={{uri: image}} />
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
})