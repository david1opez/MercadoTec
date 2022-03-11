import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'

import{ colors } from "../StyleVariables";

// TYPES
type Category = {
    category: string,
    activeCategory: string,
    onChangeCategory: (category: string) => void
}

const Category = ({category, activeCategory, onChangeCategory}: Category) => {
  return (
    <TouchableOpacity
        style={[
            activeCategory == category ? styles.activeCategoryContainer : styles.categoryContainer,
            {marginLeft: category == "Todos" ? s(15) : 0}
        ]}
        onPress={() => onChangeCategory(category)}
    >

        <Text style={activeCategory == category ? styles.activeCategoryText : styles.categoryText}>
            {category}
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
        paddingHorizontal: vs(10),
        paddingVertical: vs(2),
        borderRadius: 3,
    },
    activeCategoryContainer: {
        backgroundColor: colors.primary,
        marginRight: vs(10),
        paddingHorizontal: vs(10),
        paddingVertical: vs(3),
        borderRadius: 3,
    }
})