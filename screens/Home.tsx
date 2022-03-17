import { ScrollView, StyleSheet, Text, View, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {vs, s} from "react-native-size-matters";
import { doc, getFirestore, getDoc, getDocs, collection, query, where, limit, startAt, orderBy } from 'firebase/firestore'
import * as SplashScreen from 'expo-splash-screen';
import algoliasearch from 'algoliasearch';
import Constants from 'expo-constants';

const client = algoliasearch(Constants?.manifest?.extra?.ALGOLIAAPPID, Constants?.manifest?.extra?.ALGOLIAAPIKEY);
const algoliaIndex = client.initIndex('mercadotec_posts');

import{ colors } from "../StyleVariables";

// COMPONENTS
import Navbar from "../components/Navbar";
import Post from '../components/Post';
import PromotedPost from '../components/PromotedPost';
import Category from '../components/Category';
import NoConnectionComponent from '../components/NoConnectionComponent';

// TYPES
type Post = {title: string, description: string, image: string, id: string}
type PromotedPost = {title: string, seller: string, image: string, id: string, description: string}
type AllPosts = {
  [key: string]: Post[]
}


const Home = () => {
  const db = getFirestore();

  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const [posts, setPosts] = useState<any>([]);
  const [promotedPosts, setPromotedPosts] = useState([]);
  const [searchResults, setSearchResults] = useState<any>([]);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [isConnected, setIsConnected] = useState<boolean>(true);

  const [lastDoc, setLastDoc] = useState<any>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const categories: string[] = [
    "Todos",
    "Comida",
    "Regalos",
    "Ropa",
    "Cuidado Personal",
    "Otros"
  ];

  const GetPromotedPosts = async () => {
    let docSnap = await getDoc(doc(db, "Products", "Promoted"));
    if(!docSnap.exists()) return;
    let data = docSnap.data();
    setPromotedPosts(data.Posts);
  }

  const GetFirstProducts = async (category?: string) => {
    const productsRef = collection(db, "Products");

    setPosts([]);

    let firstquery;

    if(category) {
      firstquery = query(productsRef,
        where("category", "==", category),
        where("active", "==", true),
        // orderBy("views", "desc"),
        // orderBy("creationDate", "desc"),
        limit(5),
      );
    } else {
      firstquery = query(productsRef,
        where("active", "==", true),
        // orderBy("views", "desc"),
        // orderBy("creationDate", "desc"),
        limit(5)
      );
    }

    const firstDocs = await getDocs(firstquery);

    setLastDoc(firstDocs.docs[firstDocs.size-1]);

    firstDocs.forEach((doc: any) => {
      setPosts((prevState: any) => {
        return [...prevState, doc.data()]
      });
    });
  }

  const GetNextProducts = async (category?: string) => {
    const productsRef = collection(db, "Products");

    let q1;

    if(category) {
      q1 = query(productsRef,
        where("category", "==", category),
        where("active", "==", true),
        // orderBy("views", "desc"),
        // orderBy("creationDate", "desc"),
        limit(5),
        startAt(lastDoc)
      );
    } else {
      q1 = query(productsRef,
        where("active", "==", true),
        // orderBy("views", "desc"),
        // orderBy("creationDate", "desc"),
        limit(5),
        startAt(lastDoc)
      );
    }

    const documents = await getDocs(q1);

    setLastDoc(documents.docs[documents.size-1]);

    documents.forEach((doc: any) => {
      setPosts((prevState: any) => {
        if(doc.data().id == lastDoc.data().id) {return prevState};
        return [...prevState, doc.data()]
      });
    });
  }

  const Search = async (text: string) => {
    const results = await algoliaIndex.search(text, {
      hitsPerPage: 5,
    });
    setSearchResults(results.hits);
  }

  useEffect(() => {
    if(!promotedPosts) {
      SplashScreen.preventAutoHideAsync();
    }

    setIsLoading(true);
    GetPromotedPosts().then(() => {
      GetFirstProducts().then(() => {
        setIsLoading(false);
      })
    })
  }, [])

  useEffect(() => {
    if(activeCategory == "Todos") {
      GetFirstProducts();
    } else {
      GetFirstProducts(activeCategory);
    }
  }, [activeCategory])


  if(!isConnected) {
    return (
      <NoConnectionComponent onConnectionStatusChange={(status) => setIsConnected(status)}/>
    )
  }

  if(promotedPosts) {
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
          Search(text);
        }}
        onPress={() => {
          setIsSearching(false);
          Keyboard.dismiss();
          GetPromotedPosts();
          GetFirstProducts();
        }}
      />

      {
        isSearching ? (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.searchResultsTitle}>Resultados de la búsqueda</Text>
            <ScrollView>
              {
                searchResults.length > 0 && (
                searchResults.map((post: any, index: number) => {
                  if(
                    post.title.toLowerCase().includes("vape") ||
                    post.title.toLowerCase().includes("masking") ||
                    post.description.toLowerCase().includes("vape") ||
                    post.description.toLowerCase().includes("masking") ||
                    post.description.toLowerCase().includes("vaping") ||
                    post.title.toLowerCase().includes("vaping")
                  )
                  return(
                    <Post
                      key={index}
                      title={post.title}
                      description={post.description}
                      id={post.objectID}
                    />
                  ) 
                })
                )}
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
                        image={post.image}
                        id={post.id}
                        description={post.description}
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
                      category={category}
                      activeCategory={activeCategory}
                      onChangeCategory={(category) => {
                        setActiveCategory(category);
                      }}
                    />
                  )
                })
              }
            </ScrollView>

            <View style={styles.postsContainer}>
              <ScrollView>
                {
                  posts.map((post: any, index: number) => {
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
                }

                {
                  !isLoading && (
                    <TouchableOpacity style={styles.loadMoreButton}
                      onPress={() => {
                        if(activeCategory == "Todos") {
                          GetNextProducts();
                        } else {
                          GetNextProducts(activeCategory);
                        }
                      }}
                    >
                      <Text style={styles.loadMoreButtonText}>Cargar más</Text>
                    </TouchableOpacity>
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
    height: vs(370),
  },
  searchResultsContainer: {
    marginHorizontal: s(16),
    height: vs(600),
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
  },
  loadMoreButton: {
    marginBottom: vs(20),
  },
  loadMoreButtonText: {
    fontFamily: "GorditaMedium",
    fontSize: s(10),
    textAlign: "center",
    color: colors.primary,
    textDecorationLine: 'underline',
  }
})