import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import Svg, { Path, Rect } from "react-native-svg";
import Icon from "../assets/icons";
import {vs, s} from "react-native-size-matters";

import{ colors } from "../StyleVariables";

// COMPONENTS
import Navbar from "../components/Navbar";
import Post from '../components/Post';
import FeaturedPost from '../components/FeaturedPost';

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
    title: 'Paletas de chocolate Hershe',
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
  return (
    <View>

      <Navbar />

      {/* Featured */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          featuredPosts.map((post: any, index: number) => {
            return <FeaturedPost key={index} index={index}/>
          })
        }
      </ScrollView>

      {/* Categories */}
      <View>
        <ScrollView>
        </ScrollView>
      </View>

      {/* Posts */}
      <View>
        <ScrollView>
          {
            posts.map((post: any, index: number) => {
              return <Post key={index}/>
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
    flex: 1,
    backgroundColor: "#FFF",
  },
  FeaturedPostsContainer: {},
  CategoriesContainer: {},
  PostsContainer: {},
})