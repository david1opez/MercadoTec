import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Touchable } from 'react-native';
import React, {useState} from 'react';
import { signOut, getAuth } from 'firebase/auth';
import {vs, s} from "react-native-size-matters";
import { useNavigation } from '@react-navigation/native'
import SelectImage from '../hooks/SelectImage';
import convertUriToBlob from '../hooks/convertUriToBlob';
import uploadAndGetDownloadUrl from '../hooks/uploadAndGetDownloadUrl';

import {colors} from "../StyleVariables";

// COMPONENTS
import AddProductPopup from '../components/AddProductPopup';
import Icon from '../assets/icons';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type EditProductScreenProp = StackNavigationProp<RootStackParamList, 'EditProduct'>;

const EditProduct = () => {
  const navigation = useNavigation<EditProductScreenProp>();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);
  const [contactLink, setContactLink] = useState('');

  const auth = getAuth();

  if(isLoading){
    return (<View/>);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.returnIcon}
        onPress={() => navigation.goBack()}
      >
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={colors.primary}/>
      </TouchableOpacity>
      <View style={styles.logoContainer}>

        <Icon name="logo" width={vs(24)} height={vs(24)} color={colors.primary}/>
        
        <View style={styles.logoTextContainer}>
          <Text style={styles.UpperLogoText}>Mercado</Text>
          <Text style={styles.BottomLogoText}>Tec</Text>
        </View>

      </View>


      <View style={styles.scrollContainer}>
        <ScrollView>
          <Text style={styles.title}>Editar publicación</Text>
          
          <TouchableOpacity style={styles.imageInputContainer}
            onPress={() => {SelectImage(setImage)}}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: image}}/>
              <View style={styles.darkenImage}/>
            </View>
            <Text style={styles.imageText}>CAMBIAR IMÁGEN</Text>
          </TouchableOpacity>


          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Título:</Text>
            <TextInput style={styles.input} onChangeText={(value) => {setTitle(value)}} value={title}/>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Descripción:</Text>
            <TextInput style={styles.longInput}
              multiline={true}
              numberOfLines={3}
              onChangeText={(value) => {setDescription(value)}}
              value={description}
            />
          </View>
        </ScrollView>

        <Text style={styles.inputLabel}>Productos</Text>

        <View style={styles.itemsScrollContainer}>
          <ScrollView>
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.addItemButton}
          onPress={() => {setIsOpen(true)}}
        >
          <Text style={styles.addItemButtonText}>Agregar producto</Text>
        </TouchableOpacity>

      </View>


    { isOpen && (
      <AddProductPopup
        index={45}
        onAddProduct={(title: string, description: string, image: string, price: number) => {}}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    )}


    </View>
  )
}

export default EditProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  returnIcon: {
    width: vs(26),
    height: vs(26),
    position: 'absolute',
    top: vs(35),
    right: s(15),
    zIndex: 1,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: vs(35),
    left: s(15),
  },
  logoTextContainer: {
    marginLeft: s(7),
  },
  UpperLogoText: {
    fontFamily: "GorditaBold",
    fontSize: vs(11),
    marginBottom: vs(-5),
  },
  BottomLogoText: {
    fontFamily: "GorditaBold",
    fontSize: vs(11),
  },
})