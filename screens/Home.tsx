import { ScrollView, StyleSheet, Text, View, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import {vs, s} from "react-native-size-matters";
import { doc, getFirestore, getDoc } from 'firebase/firestore'
import * as SplashScreen from 'expo-splash-screen';

import{ colors } from "../StyleVariables";

// COMPONENTS
import Navbar from "../components/Navbar";
import Post from '../components/Post';
import PromotedPost from '../components/PromotedPost';
import Category from '../components/Category';
import NoConnectionComponent from '../components/NoConnectionComponent';

// TYPES
type Post = {title: string, description: string, image: string, id: string}
type PromotedPost = {title: string, seller: string, image: string, id: string}
type AllPosts = {
  [key: string]: Post[]
}


const Home = () => {
  const db = getFirestore();

  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const [allProducts, setAllProducts] = useState<AllPosts>();
  const [promotedPosts, setPromotedPosts] = useState<PromotedPost[]>([]);
  const [activeCategoryProducts, setActiveCategoryProducts] = useState<Post[]>([]);

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchBarvalue, setSearchBarValue] = useState<string>("");

  const [isConnected, setIsConnected] = useState<boolean>(true);

  const categories: string[] = [
    "Todos",
    "Comida",
    "Regalos",
    "Ropa",
    "Higiene",
    "Otros"
  ];

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
    if(!activeCategoryProducts || !promotedPosts) {
      SplashScreen.preventAutoHideAsync();
    }

    GetPromotedPosts();
    GetProducts();
  }, [])

  useEffect(() => {
    if(!allProducts) return;
    let category: string = categories[activeCategoryIndex];
    setActiveCategoryProducts(allProducts[category]);
  }, [allProducts]);

  useEffect(() => {
    if(!activeCategoryProducts) return;
    let category: string = categories[activeCategoryIndex];
    if(allProducts) setActiveCategoryProducts(allProducts[category]);
  }, [activeCategoryIndex]);


  if(!isConnected) {
    return (
      <NoConnectionComponent onConnectionStatusChange={(status) => setIsConnected(status)}/>
    )
  }

  if(activeCategoryProducts && promotedPosts) {
    SplashScreen.hideAsync();
  }

  return (
    <View style={styles.container}>

      <Navbar
        onChangeSearchValue={(text) => {
          if(text == "" || text == " ") {
            setIsSearching(false);
            return;
          };
          setIsSearching(true);
          setSearchBarValue(text);
        }}
        onPress={() => {
          setIsSearching(false);
          Keyboard.dismiss();
          GetProducts();
          GetPromotedPosts();
        }}
      />

      {
        isSearching ? (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.searchResultsTitle}>Resultados de la búsqueda</Text>
            <ScrollView>
              {
                allProducts?.Todos.filter((product: Post): boolean => {

                  let titleResults = product?.title.toLowerCase().replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchBarvalue.replace(/\s/g, ''))
                  let descriptionResults = product?.description.toLowerCase().replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchBarvalue.replace(/\s/g, ''));

                  return titleResults || descriptionResults;

                }).map((product: Post, index: number) => {
                  return (
                    <Post
                      key={index}
                      title={product.title}
                      description={product.description}
                      image={product.image}
                      id={product.id}
                    />
                  )
                })
              }
            </ScrollView>
          </View>
        ) : (
          <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.promotedPostsContainer}>
              {
                promotedPosts.length > 0 ? (
                  promotedPosts.map((post: PromotedPost, index: number) => {
                    return (
                      <PromotedPost
                        key={index}
                        index={index}
                        title={post.title}
                        seller={post.seller}
                        image={post.image}
                        id={post.id}
                      />
                    )
                  })
                ) : (
                  <View style={styles.loadingPromotedPosts}/>
                )
              }
            </ScrollView>

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

            <View style={styles.postsContainer}>
              <ScrollView>
                {
                  activeCategoryProducts.length > 0 && (
                    activeCategoryProducts.reverse().map((post: any, index: number) => {
                      return (
                        <Post
                          key={index}
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

    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  promotedPostsContainer: {
    marginBottom: vs(20),
  },
  categoriesContainer: {
    marginBottom: vs(20),
  },
  categoriesTitle: {
    marginLeft: s(16),
    marginBottom: vs(5),
    fontFamily: "GorditaMedium",
    color: colors.primary,
    fontSize: s(9),
    textDecorationLine: "underline",
  },
  postsContainer: {
    marginHorizontal: s(16),
    height: vs(360),
  },
  searchResultsContainer: {
    marginHorizontal: s(16),
  },
  searchResultsTitle: {
    fontFamily: "GorditaMedium",
    fontSize: s(9),
    marginBottom: vs(10),
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  loadingPromotedPosts: {
    height: vs(200),
    width: s(150),
  }
})