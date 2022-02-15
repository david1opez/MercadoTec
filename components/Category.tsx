import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'

import{ colors } from "../StyleVariables";


const Category = ({name, index, activeCategoryIndex, returnIndex}: {name: string, index: number, activeCategoryIndex: number, returnIndex: Function}) => {
  return (
    <TouchableOpacity
        style={[activeCategoryIndex == index ? styles.activeCategoryContainer : styles.categoryContainer, {marginLeft: index == 0 ? s(15) : 0}]}
        onPress={() => returnIndex(index)}
    >
        <Text style={activeCategoryIndex == index ? styles.activeCategoryText : styles.categoryText}>
            {name}
        </Text>
    </TouchableOpacity>
  )
}

export default Category

const styles = StyleSheet.create({
    categoryText: {
        color: colors.primary,
        fontSize: vs(8),
        fontFamily: "GorditaMedium"
    },
    activeCategoryText: {
        color: "#FFF",
        fontSize: vs(8),
        fontFamily: "GorditaMedium"
    },
    categoryContainer: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: colors.primary,
        marginRight: vs(10),
        paddingHorizontal: vs(15),
        paddingVertical: vs(3),
        borderRadius: 3,
    },
    activeCategoryContainer: {
        backgroundColor: colors.primary,
        marginRight: vs(10),
        paddingHorizontal: vs(15),
        paddingVertical: vs(3),
        borderRadius: 3,
    }
})