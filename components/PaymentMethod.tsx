import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import {colors} from '../StyleVariables'
import { vs } from 'react-native-size-matters'
// TYPES
type PaymentMethodProps = {
    selectedMethod: string,
    currentMethod: 'Card' | 'Oxxo',
    title: string,
    onPress: (method: 'Card' | 'Oxxo') => void
}

const PaymentMethod = ({selectedMethod, currentMethod, title, onPress}: PaymentMethodProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {onPress(currentMethod)}}>
      <View style={styles.checkBox}>
          <View style={currentMethod == selectedMethod && styles.activeCheckbox}/>
      </View>

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PaymentMethod

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      borderRadius: 3,
      marginBottom: vs(8),
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: vs(4),
      paddingLeft: vs(8),
    },
    checkBox: {
      width: vs(14),
      height: vs(14),
      borderWidth: 2,
      borderColor: "#FFF",
      borderRadius: vs(100),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: vs(8),
    },
    activeCheckbox: {
      backgroundColor: "#FFF",
      width: vs(7),
      height: vs(7),
      borderRadius: vs(100),
    },
    title: {
      color: "#FFF",
      fontSize: vs(9),
      fontFamily: "GorditaMedium",
    },
})