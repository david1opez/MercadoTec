import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// TYPES
type PromotedPostPreviewProps = {
    onPress: () => void,
    image: string,
    price: number,
    index: number,
    title: string,
}

const PromotedPostPreview = ({onPress, image, title, index, price}: PromotedPostPreviewProps) => {
  return (
    <View>
        <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
            <Image source={{uri: image}} />
            <View style={styles.darkenImage} />
        </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{index}</Text>
            </View>
        </View>

        <View style={styles.buyContainer}>
            <Text style={styles.price}>${price}</Text>
            <TouchableOpacity onPress={() => onPress}>
                <Text style={styles.buy}>COMPRAR</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default PromotedPostPreview

const styles = StyleSheet.create({
    cardContainer: {},
    imageContainer: {},
    darkenImage: {},
    textContainer: {},
    title: {},
    subtitle: {},
    buyContainer: {},
    price: {},
    buy: {},
})