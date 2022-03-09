import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { vs, s } from 'react-native-size-matters';

import { colors } from '../StyleVariables'

// COMPONENTS
import Icon from '../assets/icons';

// TYPES
type PromotePostPopupProps = {
  onClose: () => void,
  index: number,
  minOffer: number,
  onBuy: (price: number) => void,
}


const PromotePostPopup = ({onClose, index, minOffer, onBuy}: PromotePostPopupProps) => {
  const [price, setPrice] = useState(minOffer);

  return (
    <View style={styles.container}>
      <View style={styles.popupContainer}>
        <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
          <Icon name="close" width={vs(17)} height={vs(17)} color={"#FFF"} />
        </TouchableOpacity>

        <Text style={styles.title}>COMPRAR LUGAR #{index+1}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={'rgba(255,255,255,0.5)'}
            onChangeText={(value) => {
                let formattedPrice = value.replace(/\s/g, '').replace(/[^0-9]/g, '')
                formattedPrice = formattedPrice == "" ? "0" : formattedPrice;
                setPrice(parseInt(formattedPrice))
            }}
            value={price.toString() != "NaN" ? price.toString() : "0"}

          />
          <Text style={styles.currency}>MXN</Text>
        </View>

        <Text style={styles.subtitle}>Entre más alta sea tu oferta, más tiempo durará :)</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onBuy(price)
            onClose()
          }}
        >
          <Text style={styles.buttonText}>COMPRAR</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Las publicaciones promocionadas pueden obtener hasta un 41% más de visitas.
          Recuerda qué lo máximo qué puede estar una publicación en algún lugar es una semana.
        </Text>

      </View>
    </View>
  )
}

export default PromotePostPopup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: s(350),
    height: vs(700),
    zIndex: 1,
  },
  popupContainer: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: '93%',
    alignItems: 'center',
    paddingVertical: vs(15),
  },
  closeButton: {
    position: 'absolute',
    top: vs(10),
    right: vs(10),
  },
  title: {
    fontFamily: 'GorditaBold',
    fontSize: vs(17),
    color: "#FFF",
    marginTop: vs(5),
    marginBottom: vs(20),
    textDecorationLine: 'underline',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'GorditaBold',
    fontSize: vs(25),
    lineHeight: vs(35),
    color: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    textAlign: 'center',
    width: s(110),
  },
  dollarSign: {
    fontFamily: 'GorditaMedium',
    fontSize: vs(15),
    color: "#FFF",
  },
  currency: {
    fontFamily: 'GorditaMedium',
    fontSize: vs(7),
    color: "#FFF",
    marginTop: vs(23),
    marginLeft: vs(4),
  },
  subtitle: {
    fontFamily: 'GorditaRegular',
    fontSize: vs(8),
    lineHeight: vs(12),
    color: "#FFF",
    marginTop: vs(10),
    paddingHorizontal: s(80),
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 3,
    marginTop: vs(10),
    marginBottom: vs(25),
  },
  buttonText: {
    fontFamily: 'GorditaBold',
    fontSize: vs(12),
    color: colors.primary,
    paddingHorizontal: s(25),
    paddingVertical: vs(3),
  },
  footer: {
    fontFamily: 'GorditaRegular',
    fontSize: vs(7),
    lineHeight: vs(10),
    color: "#FFF",
    textAlign: 'center',
    paddingHorizontal: s(10),
    opacity: 0.75,
  },
})