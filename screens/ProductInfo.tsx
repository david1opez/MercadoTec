import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Touchable } from 'react-native'
import React from 'react'
import {vs, s} from "react-native-size-matters";

import{ colors } from "../StyleVariables";

// COMPONENTS
import Item from '../components/Item';

const items = [
  {
    title: "Ramo con girasol y 3 tulipanes",
    description: "Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate",
    image: "https://scontent.fgdl3-1.fna.fbcdn.net/v/t39.30808-6/273562759_5101563959930019_8995591478857708838_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeHU4QW_x0GuUWJoB4I3srtPADLXD6C70SIAMtcPoLvRIvjD5nYSwhIqGZ0GfbOo_CY6EMDiG8QBZV3mWY9IEDIQ&_nc_ohc=V8fOZXlqE84AX82FZ13&_nc_ht=scontent.fgdl3-1.fna&oh=00_AT_jo_4qs_xTDRuXG4zMF5P1-Hi0jL--5b6g98fQeyFsgQ&oe=6211A0E1",
    price: 115,
  },
  {
    title: "Ramo con girasol y 3 tulipanes",
    description: "Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate",
    image: "https://scontent.fgdl3-1.fna.fbcdn.net/v/t39.30808-6/273562759_5101563959930019_8995591478857708838_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeHU4QW_x0GuUWJoB4I3srtPADLXD6C70SIAMtcPoLvRIvjD5nYSwhIqGZ0GfbOo_CY6EMDiG8QBZV3mWY9IEDIQ&_nc_ohc=V8fOZXlqE84AX82FZ13&_nc_ht=scontent.fgdl3-1.fna&oh=00_AT_jo_4qs_xTDRuXG4zMF5P1-Hi0jL--5b6g98fQeyFsgQ&oe=6211A0E1",
    price: 115,
  },
  {
    title: "Ramo con girasol y 3 tulipanes",
    description: "Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate",
    image: "https://scontent.fgdl3-1.fna.fbcdn.net/v/t39.30808-6/273562759_5101563959930019_8995591478857708838_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeHU4QW_x0GuUWJoB4I3srtPADLXD6C70SIAMtcPoLvRIvjD5nYSwhIqGZ0GfbOo_CY6EMDiG8QBZV3mWY9IEDIQ&_nc_ohc=V8fOZXlqE84AX82FZ13&_nc_ht=scontent.fgdl3-1.fna&oh=00_AT_jo_4qs_xTDRuXG4zMF5P1-Hi0jL--5b6g98fQeyFsgQ&oe=6211A0E1",
    price: 115,
  },
  {
    title: "Ramo con girasol y 3 tulipanes",
    description: "Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate",
    image: "https://scontent.fgdl3-1.fna.fbcdn.net/v/t39.30808-6/273562759_5101563959930019_8995591478857708838_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeHU4QW_x0GuUWJoB4I3srtPADLXD6C70SIAMtcPoLvRIvjD5nYSwhIqGZ0GfbOo_CY6EMDiG8QBZV3mWY9IEDIQ&_nc_ohc=V8fOZXlqE84AX82FZ13&_nc_ht=scontent.fgdl3-1.fna&oh=00_AT_jo_4qs_xTDRuXG4zMF5P1-Hi0jL--5b6g98fQeyFsgQ&oe=6211A0E1",
    price: 115,
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
                <Item key={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  index={index}
                  itemsLenght={items.length}
                />
              )
            })
          }

        </ScrollView>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Contactar</Text>
      </TouchableOpacity>

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
  button: {
    position: 'absolute',
    bottom: vs(30),
    backgroundColor: colors.primary,
    left: s(70),
    right: s(70),
    paddingVertical: vs(5),
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 6,
  },
  buttonText: {
    color: "#FFF",
    fontFamily: 'GorditaMedium',
    fontSize: vs(12),
    textAlign: 'center',
  },
})