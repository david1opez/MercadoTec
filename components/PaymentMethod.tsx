import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

// TYPES
type PaymentMethodProps = {
    selectedMethod: string,
    currentMethod: string,
    title: string,
    onPress: (method: string) => void
}

const PaymentMethod = ({selectedMethod, currentMethod, title, onPress}: PaymentMethodProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {onPress(currentMethod)}}>
      <View style={styles.checkBox}>
          <View style={currentMethod == selectedMethod ? styles.activeCheckbox : styles.inactiveCheckbox}/>
      </View>

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PaymentMethod

const styles = StyleSheet.create({
    container: {},
    checkBox: {},
    activeCheckbox: {},
    inactiveCheckbox: {},
    title: {},
})