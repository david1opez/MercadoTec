import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { vs, s } from 'react-native-size-matters';

import { colors, templates } from '../StyleVariables'
// COMPONENTS
import Icon from '../assets/icons';

// TYPES
type PromotePostPopupProps = {
  onClose: () => void,
  index: number,
  minOffer: number,
}


const PromotePostPopup = ({onClose, index, minOffer}: PromotePostPopupProps) => {
  const [price, setPrice] = useState(minOffer);

  return (
    <View style={styles.container}>
      <View style={styles.popupContainer}>
        <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
          <Icon name="close" width={vs(20)} height={vs(20)} color={"#FFF"} />
        </TouchableOpacity>

        <Text>COMPRAR LUGAR #{index}</Text>

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
          onPress={() => {}}
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
    width: '115%',
    height: vs(700),
    zIndex: 1,
  },
  popupContainer: {},
  closeButton: {},
  title: {},
  inputContainer: {},
  input: {},
  dollarSign: {},
  currency: {},
  subtitle: {},
  button: {},
  buttonText: {},
  footer: {},
})