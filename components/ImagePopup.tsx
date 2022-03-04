import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { vs, s} from "react-native-size-matters";

// COMPONENTS
import Icon from '../assets/icons'

// TYPES
type ImagePopupProps = {
    image: string,
    onClose: Function
}


const ImagePopup = ({image, onClose}: ImagePopupProps)=> {
  return (
    <View style={styles.darkBackground}>
        <View style={styles.popupContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {onClose()}}>
                <Icon name="close" height={vs(20)} width={vs(20)} color={"#FFF"}/>
            </TouchableOpacity>
            <Image source={{uri: image}} style={styles.image}/>
            <View style={styles.darkenImage}/>
        </View>
    </View>
  )
}

export default ImagePopup

const styles = StyleSheet.create({
    darkBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: vs(705),
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContainer: {
        width: vs(290),
        height: vs(240),
        backgroundColor: '#FFF',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vs(50),
    },
    closeButton: {
        position: 'absolute',
        top: vs(15),
        right: vs(15),
        zIndex: 2,
    },
    image: {
        width: vs(285),
        height: vs(230),
        borderRadius: 3,
    },
    darkenImage: {
        width: vs(285),
        height: vs(230),
        backgroundColor: 'rgba(0,0,0,0.25)',
        position: 'absolute',
        borderRadius: 3,

    }
})