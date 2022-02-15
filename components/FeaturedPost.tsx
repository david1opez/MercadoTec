import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {vs, s} from "react-native-size-matters";

import{ colors } from "../StyleVariables";


const FeaturedPost = ({index}: {index: number}) => {
  return (
    <TouchableOpacity style={index != 0 ? styles.container : [styles.container, {marginLeft: s(15)}]}>

      <Image style={styles.image} source={{uri: "https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6"}} />
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>Paletas de chocolate Hershey</Text>
        <Text style={styles.seller}>Abraham Licona</Text>
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