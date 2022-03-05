import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'

// COMPONENTS
import PromotedPostPreview from '../components/PromotedPostPreview'
import PromotePostPopup from '../components/PromotePostPopup'

const PromotePost = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState({index: 0, price: 0});

  const promotedPosts: any = [
    {
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      title: 'Lorem ipsum dolor sit',
      index: 0,
      price: 15
    },
    {
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      title: 'Lorem ipsum dolor sit',
      index: 1,
      price: 20
    },
    {
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      title: 'Lorem ipsum dolor sit',
      index: 2,
      price: 25
    },
    {
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      title: 'Lorem ipsum dolor sit',
      index: 3,
      price: 30
    },
    {
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      title: 'Lorem ipsum dolor sit',
      index: 4,
      price: 35
    }
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROMOCIONA TU{"\n"}PUBLICACIÓN</Text>
      <Text style={styles.description}>Haz que tu publicación sea lo primero que vean las personas al entrar a MercadoTec</Text>
      <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
        <Text style={styles.moreInfoButton}>¿Cómo funciona?</Text>
      </TouchableOpacity>

      <View style={styles.scrollContainer}>
        <ScrollView>
          {
            promotedPosts.map((post: any, index: number) => {
              return(
                <PromotedPostPreview
                  key={index}
                  image={post.image}
                  price={post.price}
                  index={index}
                  title={post.title}
                  onPress={() => {
                    setShowPopup(true);
                    setPopupInfo({index: index, price: post.price});
                  }}
                />
              )
            })
          }
        </ScrollView>
      </View>

      {
        showPopup && (
          <PromotePostPopup
            onClose={() => setShowPopup(false)}
            index={popupInfo.index}
            price={popupInfo.price}
          />
        )
      }
    </View>
  )
}

export default PromotePost

const styles = StyleSheet.create({
  container: {},
  title: {},
  description: {},
  moreInfoButton: {},
  scrollContainer: {},
})