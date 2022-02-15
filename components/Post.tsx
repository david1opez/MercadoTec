import { StyleSheet, Text, View, TouchableOpacity, Image, Touchable } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'

import { colors } from '../StyleVariables'


const Post = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Paletas de chocolate Hershey</Text>
        <Text style={styles.description}>
          Qué onda chavos!!! Si aún no tienen su regalito,
          hoy llevaré paletas de chocolate Hershey con
          distintos diseños en $20 estoy d...
        </Text>
      </View>
      <Image style={styles.image} source={{uri: "https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6"}} />
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