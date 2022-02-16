import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import {vs, s} from "react-native-size-matters";

import{ colors } from "../StyleVariables";

const items = [
  {
    title: "Ramo con girasol y 3 tulipanes",
    description: "Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate",
    image: "https://scontent.fgdl3-1.fna.fbcdn.net/v/t39.30808-6/273562759_5101563959930019_8995591478857708838_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeHU4QW_x0GuUWJoB4I3srtPADLXD6C70SIAMtcPoLvRIvjD5nYSwhIqGZ0GfbOo_CY6EMDiG8QBZV3mWY9IEDIQ&_nc_ohc=V8fOZXlqE84AX82FZ13&_nc_ht=scontent.fgdl3-1.fna&oh=00_AT_jo_4qs_xTDRuXG4zMF5P1-Hi0jL--5b6g98fQeyFsgQ&oe=6211A0E1",
    price: "115",
  },
  {
    title: "Ramo con girasol y 3 tulipanes",
    description: "Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate",
    image: "https://scontent.fgdl3-1.fna.fbcdn.net/v/t39.30808-6/273562759_5101563959930019_8995591478857708838_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeHU4QW_x0GuUWJoB4I3srtPADLXD6C70SIAMtcPoLvRIvjD5nYSwhIqGZ0GfbOo_CY6EMDiG8QBZV3mWY9IEDIQ&_nc_ohc=V8fOZXlqE84AX82FZ13&_nc_ht=scontent.fgdl3-1.fna&oh=00_AT_jo_4qs_xTDRuXG4zMF5P1-Hi0jL--5b6g98fQeyFsgQ&oe=6211A0E1",
    price: "115",
  },
  {
    title: "Ramo con girasol y 3 tulipanes",
    description: "Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate",
    image: "https://scontent.fgdl3-1.fna.fbcdn.net/v/t39.30808-6/273562759_5101563959930019_8995591478857708838_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeHU4QW_x0GuUWJoB4I3srtPADLXD6C70SIAMtcPoLvRIvjD5nYSwhIqGZ0GfbOo_CY6EMDiG8QBZV3mWY9IEDIQ&_nc_ohc=V8fOZXlqE84AX82FZ13&_nc_ht=scontent.fgdl3-1.fna&oh=00_AT_jo_4qs_xTDRuXG4zMF5P1-Hi0jL--5b6g98fQeyFsgQ&oe=6211A0E1",
    price: "115",
  },
  {
    title: "Ramo con girasol y 3 tulipanes",
    description: "Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate",
    image: "https://scontent.fgdl3-1.fna.fbcdn.net/v/t39.30808-6/273562759_5101563959930019_8995591478857708838_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeHU4QW_x0GuUWJoB4I3srtPADLXD6C70SIAMtcPoLvRIvjD5nYSwhIqGZ0GfbOo_CY6EMDiG8QBZV3mWY9IEDIQ&_nc_ohc=V8fOZXlqE84AX82FZ13&_nc_ht=scontent.fgdl3-1.fna&oh=00_AT_jo_4qs_xTDRuXG4zMF5P1-Hi0jL--5b6g98fQeyFsgQ&oe=6211A0E1",
    price: "115",
  }
]

const ProductInfo = ({route}: any) => {
  const id = route.params.id;

  return (
    <View>
      <Image source={{uri: "https://scontent.fgdl3-1.fna.fbcdn.net/v/t39.30808-6/273562759_5101563959930019_8995591478857708838_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeHU4QW_x0GuUWJoB4I3srtPADLXD6C70SIAMtcPoLvRIvjD5nYSwhIqGZ0GfbOo_CY6EMDiG8QBZV3mWY9IEDIQ&_nc_ohc=V8fOZXlqE84AX82FZ13&_nc_ht=scontent.fgdl3-1.fna&oh=00_AT_jo_4qs_xTDRuXG4zMF5P1-Hi0jL--5b6g98fQeyFsgQ&oe=6211A0E1"}} style={styles.mainImage}/>

      <Text style={styles.title}>Ramos Tejidos</Text>
      <Text style={styles.description}>
        Amix, el día de mañana voy a llevar roles de canela con y sin pasas en $25 también 
        pueden ir con y sin glaseado 👌🏻
        (referencia de tamaño en la segunda foto){"\n\n"}
        Y cakepops en $13 pesitos. 😋Estaré en la media luna de 3:00 pm a 6:00 pm y en
        diferentes salones hasta las 10:00 de la noche. Pueden mandarme mensaje si quieren
        que les aparte alguno o saber dónde estoy 844-552-9540. 💞
      </Text>

      <View style={styles.scrollContainer}>
        <ScrollView>
          {
            items.map((item, index) => {
              return(
                <View key={index} style={index == 0 ? [styles.itemContainer, {marginTop: vs(30)}] : index == items.length - 1 ? [styles.itemContainer, {marginBottom: vs(70)}] : styles.itemContainer}>
                  <Image source={{uri: item.image}} style={styles.itemImage}/>
                  
                  <View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                </View>
              )
            })
          }

        </ScrollView>
      </View>

    </View>
  )
}

export default ProductInfo

const styles = StyleSheet.create({
  mainImage: {
    width: '100%',
    height: vs(300),
    marginBottom: vs(15),
  },
  title: {
    fontFamily: 'GorditaBold',
    marginHorizontal: s(15),
    fontSize: vs(16),
    marginBottom: vs(5),
  },
  description: {
    fontFamily: 'GorditaRegular',
    fontSize: vs(9),
    lineHeight: vs(12),
    marginHorizontal: s(15),
    marginBottom: vs(10),
  },
  scrollContainer: {
    marginHorizontal: s(20),
    height: vs(255),
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(15),
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