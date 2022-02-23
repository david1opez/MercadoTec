import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import {vs, s} from "react-native-size-matters";

// COMPONENTS
import ItemPreview from '../components/ItemPreview'

// TYPES
type Items = [] | {
    title: string,
    description: string,
    image: string
    price: number
}[]

const PreviewItemsList = ({items, onDelete}: {items: Items, onDelete: Function}) => {
  return (
    <ScrollView style={styles.itemsListContainer}>
      {
        items.map((item, index) => {
          return (
            <ItemPreview
              key={index}
              index={index}
              title={item.title}
              description={item.description}
              image={item.image}
              price={item.price}
              onRemoveItem={(index: number) => onDelete(index)}
            />
          )
        })
      }
    </ScrollView>
  )
}

export default PreviewItemsList

const styles = StyleSheet.create({
  itemsListContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 3,
    marginTop: vs(10)
  },
})