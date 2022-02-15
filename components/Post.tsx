import { StyleSheet, Text, View, TouchableOpacity, Image, Touchable } from 'react-native'
import React from 'react'

const Post = () => {
  return (
    <TouchableOpacity>
      <View>
        <Text>Paletas de chocolate Hershey</Text>
        <Text>
          Qué onda chavos!!! Si aún no tienen su regalito,
          hoy llevaré paletas de chocolate Hershey con
          distintos diseños en $20 estoy d...
        </Text>
      </View>
      <Image source={{uri: "https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6"}} />
    </TouchableOpacity>
  )
}

export default Post

const styles = StyleSheet.create({})