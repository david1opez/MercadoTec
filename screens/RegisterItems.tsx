import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import {vs, s} from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';
import SelectImage from '../hooks/SelectImage';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import convertUriToBlob from '../hooks/convertUriToBlob';

import { colors } from '../StyleVariables'

// COMPONENTS
import Icon from '../assets/icons'
import PreviewItemsList from '../components/PreviewItemsList'
import SuccessPopup from '../components/SuccessPopup'

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type RegisterItemsScreenProp = StackNavigationProp<RootStackParamList, 'RegisterItems'>;
type Items = [] | {
  title: string,
  description: string,
  image: string
  price: number
}[]

const RegisterItems = () => {
  const navigation = useNavigation<RegisterItemsScreenProp>();

  const auth = getAuth();
  const uid: any = auth.currentUser?.uid;
  const db = getFirestore();

  const [successPopup, setSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  const [items, setItems] = useState<Items>([]);

  const addItem = async () => {
    setIsLoading(true);
    convertUriToBlob(image).then((blob) => {
      const storage = getStorage();
      const storageRef = ref(storage, `${uid}_I${items.length}.jpg`);

      uploadBytes(storageRef, blob)
      .then(() => {
        getDownloadURL(storageRef)
        .then((url) => {
          setItems([...items, {
            title: title,
            description: description,
            image: url,
            price: price
          }]);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error)
        })
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error)
      });
    })
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  }

  const validate = () => {
    if(title.length == 0) {
      alert('Porfavor escribe un título para describir tu producto');
      setIsLoading(false);
      return false;
    }
    else if(description.length == 0) {
      setDescription("---");
      setIsLoading(false);
      return true;
    }
    else if(image.length == 0) {
      alert('Porfavor selecciona una imagen para tu producto');
      setIsLoading(false);
      return false;
    }
    else {
      return true;
    }
  }

  const uploadItems = async () => {
    updateDoc(doc(db, "Products", uid), {
      items: items
    }).then(() => {
      setSuccessPopup(true);
      setIsLoading(false);

      setImage('');
      setTitle('');
      setDescription('');
      setPrice(0);
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnIcon}
        onPress={() => navigation.replace("Home")}
      >
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
      </TouchableOpacity>

      <Text style={styles.title}>PRODUCTOS</Text>
      <Text style={styles.description}>Si ofreces distintos productos en lo que vendes puedes incluirlos uno por uno para mostrar sus precios</Text>

      <View style={styles.inputsContainer}>
        <View>

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

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Precio:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => {
                let formattedPrice = value.replace(/\s/g, '').replace(/[^0-9]/g, '')
                formattedPrice = formattedPrice == "" ? "0" : formattedPrice;
                setPrice(parseInt(formattedPrice))
              }}
              value={price.toString() != "NaN" ? price.toString() : "0"}
              keyboardType='phone-pad'
            />
          </View>

        </View>

        <View style={styles.rightColumn}>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Imágen:</Text>
            <View style={styles.imageInputContainer}>

              {
                image ?
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri: image}}/>
                  <View style={styles.darkenImage} />
                </View>
                :
                null
              }

              <TouchableOpacity onPress={() => SelectImage().then(uri => {setImage(uri); setIsLoading(false)})}>
                <Text style={styles.textImageInput}>Seleccionar archivo</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.secondaryButton}
            onPress={() => {
              if(isLoading) return;
              if(!validate) {
                setIsLoading(false);
                return;
              };
              addItem();
            }}
          >
            {
              isLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text style={styles.secondaryButtonText}>Agregar</Text>
              )
            }
          </TouchableOpacity>

        </View>

      </View>

      <View style={styles.itemsListScrollContainer}>
        <Text style={styles.inputLabel}>Lista de productos:</Text>

        <PreviewItemsList items={items}
          onDelete={(index: number) => removeItem(index)}
        />
      </View>

      <TouchableOpacity style={styles.mainButton}
        onPress={() => {
          if(isLoading) return;
          setIsLoading(true);
          if(items.length === 0) {
            setIsLoading(false);
            setSuccessPopup(true);
            return;
          }
          uploadItems();
        }}
      >
        {
          items.length > 0 ? (
            isLoading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <Text style={styles.mainButtonText}>Finalizar</Text>
            )
          ) : (
          <Text style={styles.mainButtonText}>Omitir</Text>
          )
        }
      </TouchableOpacity>

      {
        successPopup ? (
          <SuccessPopup />
        ) : null
      }

    </View>
  )
}

export default RegisterItems

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnIcon: {
    width: vs(26),
    height: vs(26),
    position: 'absolute',
    top: vs(35),
    right: s(15),
    zIndex: 1,
  },
  title: {
    fontSize: vs(27),
    color: '#FFF',
    marginBottom: vs(5),
    fontFamily: 'GorditaBold',
    lineHeight: vs(47),
    marginRight: s(90),
    marginTop: vs(20),
  },
  description: {
    fontSize: vs(9),
    fontFamily: "GorditaRegular",
    color: "#FFF",
    lineHeight: vs(13),
    width: s(345),
    marginLeft: s(45),
    paddingRight: s(55),
    marginBottom: vs(30),
  },
  inputsContainer: {
    flexDirection: 'row',
    width: '90%',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 3,
    padding: s(10),
    paddingBottom: vs(15),
    marginBottom: vs(20),
  },
  inputContainer: {
    alignItems: 'flex-start',
  },
  inputLabel: {
    fontSize: vs(9),
    fontFamily: "GorditaMedium",
    color: "#FFF",
  },
  input: {
    width: s(150),
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    fontFamily: "GorditaRegular",
    color: "#FFF",
    fontSize: vs(10),
    marginBottom: vs(10),
  },
  longInput: {
    marginTop: vs(5),
    width: s(150),
    borderWidth: 1,
    borderColor: "#FFF",
    textAlignVertical: 'top',
    fontFamily: "GorditaRegular",
    color: "#FFF",
    paddingHorizontal: s(10),
    paddingVertical: vs(5),
    fontSize: vs(9),
    borderRadius: 3,
    marginBottom: vs(10),
  },
  rightColumn: {
    marginLeft: vs(25),
  },
  imageInputContainer: {
    width: vs(95),
    height: vs(95),
    backgroundColor: 'rgba(255,255,255,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(6),
    borderRadius: 3,
  },
  imageContainer: {
    width: vs(95),
    height: vs(95),
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 3,
  },
  image: {
    width: vs(95),
    height: vs(95),
    top: 0,
    left: 0,
    position: 'absolute',
    borderRadius: 3,
  },
  darkenImage: {
    width: vs(95),
    height: vs(95),
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 3,
  },
  textImageInput: {
    fontSize: vs(8),
    fontFamily: "GorditaRegular",
    color: "#FFF",
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(25),
    paddingVertical: vs(3),
    marginTop: vs(30)
  },
  secondaryButtonText: {
    fontSize: vs(9),
    fontFamily: "GorditaBold",
    color: colors.primary
  },
  itemsListScrollContainer: {
    width: '90%',
    height: vs(200),
  },
  mainButton: {
    marginTop: vs(20),
    backgroundColor: "#FFF",
    paddingHorizontal: s(50),
    paddingVertical: vs(5),
    borderRadius: 3,
    marginBottom: vs(15),
  },
  mainButtonText: {
    fontSize: vs(12),
    fontFamily: "GorditaBold",
    color: colors.primary,
  },
})