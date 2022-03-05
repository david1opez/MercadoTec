import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { vs, s } from 'react-native-size-matters'

import { colors } from '../StyleVariables'

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
        <View>
            <View>
                <Image source={{uri: image}} style={styles.image}/>
                <View style={styles.darkenImage} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.index}>{index+1}.</Text>
            </View>
        </View>

        <View style={[styles.buyContainer, index == 4 && {marginBottom: vs(250)}]}>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>${price}</Text>
                <Text style={styles.priceSubtitle}>Oferta mínima</Text>
            </View>
            <TouchableOpacity onPress={() => onPress()}>
                <Text style={styles.buyButton}>COMPRAR</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default PromotedPostPreview

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: vs(150),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    darkenImage: {
        position: 'absolute',
        width: '100%',
        height: vs(150),
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    textContainer: {
        width: '100%',
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: colors.primary,
        paddingHorizontal: vs(10),
        paddingVertical: vs(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'GorditaMedium',
        fontSize: vs(10),
        color: colors.primary,
    },
    index: {
        fontFamily: 'GorditaBold',
        fontSize: vs(13),
        color: colors.primary,
    },
    buyContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: vs(10),
        marginBottom: vs(20),
    },
    priceContainer: {
        alignItems: 'center',
    },
    price: {
        fontFamily: 'GorditaBold',
        fontSize: vs(15),
        color: colors.primary,
    },
    priceSubtitle: {
        fontFamily: 'GorditaRegular',
        fontSize: vs(8),
        color: colors.primary,
    },
    buyButton: {
        fontFamily: 'GorditaBold',
        fontSize: vs(10),
        color: "#FFF",
        backgroundColor: colors.primary,
        marginLeft: vs(20),
        paddingHorizontal: vs(10),
        paddingVertical: vs(2),
        borderRadius: 3,
    },
})