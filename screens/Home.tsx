import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {vs, s} from "react-native-size-matters";
import{ colors } from "../StyleVariables";
import { doc, onSnapshot, getFirestore, getDoc } from 'firebase/firestore'

// COMPONENTS
import Navbar from "../components/Navbar";
import Post from '../components/Post';
import FeaturedPost from '../components/FeaturedPost';
import Category from '../components/Category';


const categories: string[] = [
  "Cerca de ti",
  "Comida",
  "Regalos",
  "Ropa",
  "Higiene",
  "Miscelaneos"
];

const Home = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const db = getFirestore();

  const [products, setProducts] = useState([]);
  const [promotedPosts, setPromotedPosts] = useState<any>([]);

  const [allProducts, setAllProducts] = useState<any>({});

  const GetPromotedPosts = async () => {
    let docSnap = await getDoc(doc(db, "Products", "Promoted"));

    if(!docSnap.exists()) return;

    let data = docSnap.data();
    setPromotedPosts(data.Posts);
  }

  const GetProducts = async () => {
    let docSnap = await getDoc(doc(db, "Products", "Preview"));

    if(!docSnap.exists()) return;
    setAllProducts(docSnap.data());
  }

  useEffect(() => {
    GetPromotedPosts();
    GetProducts();
  }, [])

  useEffect(() => {
    const dbCategories = [
      "Todos",
      "Comida",
      "Regalos",
      "Ropa",
      "Higiene",
      "Miscelaneos"
    ]

    if(!allProducts) return;
    setProducts(allProducts[dbCategories[activeCategoryIndex]]);

  }, [allProducts]);

  useEffect(() => {
    const dbCategories = [
      "Todos",
      "Comida",
      "Regalos",
      "Ropa",
      "Higiene",
      "Miscelaneos"
    ]

    if(!products) return;
    setProducts(allProducts[dbCategories[activeCategoryIndex]]);

  }, [activeCategoryIndex]);



  return (
    <View style={styles.container}>

      <Navbar />

      {/* Featured */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.featuredPostsContainer}>
        {
          promotedPosts.map((post: any, index: number) => {
            return (
              <FeaturedPost key={index} index={index}
                title={post.title}
                seller={post.seller}
                image={post.image}
                id={post.id}
              />
            )
          })
        }
      </ScrollView>

      {/* Categories */}
      <Text style={styles.categoriesTitle}>Categorías :</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {
          categories.map((category: string, index: number) => {
            return (
              <Category
                key={index}
                name={category}
                index={index}
                activeCategoryIndex={activeCategoryIndex}
                returnIndex={(index: number) => {setActiveCategoryIndex(index)}}
              />
            )
          })
        }
      </ScrollView>

      {/* Posts */}
      <View style={styles.postsContainer}>
        <ScrollView>
          {
            products && (
              products.map((post: any, index: number) => {
                return (
                  <Post key={index}
                    title={post.title}
                    description={post.description}
                    image={post.image}
                    id={post.id}
                  />
                )
              })
            )
          }
        </ScrollView>
      </View>

    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  featuredPostsContainer: {
    marginBottom: vs(20),
  },
  categoriesContainer: {
    marginBottom: vs(20),
  },
  categoriesTitle: {
    marginLeft: s(16),
    marginBottom: vs(5),
    fontFamily: "GorditaMedium",
    fontSize: s(9),
    textDecorationLine: "underline",
    color: colors.primary,
  },
  postsContainer: {
    marginHorizontal: s(16),
    height: vs(360),
  },
})