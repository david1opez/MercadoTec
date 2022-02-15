import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Svg, { Path, Rect } from "react-native-svg";
import Icon from "../assets/icons";
import {vs, s} from "react-native-size-matters";

import{ colors } from "../StyleVariables";

// COMPONENTS
import Navbar from "../components/Navbar";
import Post from '../components/Post';
import FeaturedPost from '../components/FeaturedPost';
import Category from '../components/Category';


type Post = {
  id: number,
  title: string,
  description: string,
  image: string,
}

type FeaturedPost = {
  id: number,
  title: string,
  seller: string,
  image: string,
}

const posts: Post[] = [
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    description: 'Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate Hershey con distintos diseños en $20️ estoy d...',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    description: 'Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate Hershey con distintos diseños en $20️ estoy d...',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    description: 'Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate Hershey con distintos diseños en $20️ estoy d...',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    description: 'Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate Hershey con distintos diseños en $20️ estoy d...',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    description: 'Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate Hershey con distintos diseños en $20️ estoy d...',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    description: 'Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate Hershey con distintos diseños en $20️ estoy d...',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    description: 'Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate Hershey con distintos diseños en $20️ estoy d...',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    description: 'Qué onda chavos!!! Si aún no tienen su regalito, hoy llevaré paletas de chocolate Hershey con distintos diseños en $20️ estoy d...',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
];
const featuredPosts: FeaturedPost[] = [
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    seller: 'Abraham Licona',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    seller: 'Abraham Licona',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    seller: 'Abraham Licona',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    seller: 'Abraham Licona',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
  {
    id: 1,
    title: 'Paletas de chocolate Hershey',
    seller: 'Abraham Licona',
    image: 'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/p720x720/273988752_4799358050151232_2951886400619287815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=5cd70e&_nc_eui2=AeFN19E_M2O7UBqM3Mxiw7RIf_WCfT_pbKV_9YJ9P-lspdSbyGg4yP0MUxklUGxeoillZ_ql9H0kDMFb1F06he6T&_nc_ohc=9MxFFenXNNMAX9ja2gl&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT9R4xMUojA0YeoSVtcu-OW-uXig_pPf-NqIA8iQy2nP3A&oe=621084E6',
  },
];

const categories: string[] = [
  "Cerca de ti",
  "Comida",
  "Regalos",
  "Ropa",
  "Higiene",
];

const Home = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <View style={styles.container}>

      <Navbar />

      {/* Featured */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.featuredPostsContainer}>
        {
          featuredPosts.map((post: any, index: number) => {
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
            posts.map((post: any, index: number) => {
              return (
                <Post key={index}
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  id={post.id}
                />
              )
            })
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