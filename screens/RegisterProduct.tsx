import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native'
import React, {useState} from 'react';
import { vs, s } from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import SelectImage from '../hooks/SelectImage';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getFirestore, updateDoc, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { colors } from '../StyleVariables'

// COMPONENTS
import Icon from '../assets/icons'

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type RegisterProductScreenProp = StackNavigationProp<RootStackParamList, 'RegisterProduct'>;

const RegisterProduct = ({route}: any) => {
  const navigation = useNavigation<RegisterProductScreenProp>();

  const link = route.params.link;

  const auth = getAuth();
  const uid: any = auth.currentUser?.uid;
  const db = getFirestore();
  const storage = getStorage();

  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Comida");

  const validate = async () => {
    setIsLoading(true);

    if(title.length == 0) {
      alert('Porfavor escribe un título para describir tu producto');
      setIsLoading(false);
      return false;
    }
    else if(description.length == 0) {
      alert('Porfavor escribe la descripción de tu producto');
      setIsLoading(false);
      return false;
    }
    else if(image.length == 0) {
      alert('Porfavor selecciona una imagen para tu producto');
      setIsLoading(false);
      return false;
    }
    else if(category.length == 0) {
      alert('Porfavor selecciona una categoría para tu producto');
      setIsLoading(false);
      return false;
    }
    else {
      const uri = await fetch(image)
      const blob = await uri.blob();

      const storageRef = ref(storage, `${uid}_MPI.jpg`);

      const creationDate = new Date().getTime() / 86400000;

      uploadBytes(storageRef, blob)
      .then(() => {
        getDownloadURL(storageRef)
        .then((url) => {
          setDoc(doc(db, "Products", uid), {
            title: title,
            description: description,
            image: url,
            items: [],
            link: link,
            views: 0,
            active: title == "ELIMINAR" ? false : true,
            category: category,
            creationDate: creationDate,
            id: uid
          })
          .then(() => {
              setIsLoading(false);
              navigation.navigate('RegisterItems');
          })
          .catch((error) => {
            alert(error.message);
            setIsLoading(false);
          });
        })
        .catch((error) => {
          alert(error.message)
          setIsLoading(false);
        })
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false);
      })

    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnIcon} onPress={() => navigation.navigate("Home")}>
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={"#FFF"}/>
      </TouchableOpacity>

      <Text style={styles.title}>¿QUÉ ESTÁS{"\n"}VENDIENDO?</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Título:</Text>
        <TextInput style={styles.input}
          onChangeText={(value) => {setTitle(value)}}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Descripción:</Text>
        <TextInput style={styles.longInput}
          multiline={true}
          numberOfLines={6}
          onChangeText={(value) => {setDescription(value)}}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Categoría:</Text>

        <TouchableOpacity style={styles.categoryButton}
          onPress={() => {setShowOptions(true)}}
        >
          <Text style={styles.categoryButtonText}>{category}</Text>
        </TouchableOpacity>

        {
          showOptions && (
            <View style={styles.categoryOptions}>

              <TouchableOpacity style={styles.categoryOption} onPress={() => {
                setCategory("Comida");
                setShowOptions(false)
              }}>
                <Text style={styles.categoryOptionText}>Comida</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.categoryOption} onPress={() => {
                setCategory("Regalos");
                setShowOptions(false)
              }}>
                <Text style={styles.categoryOptionText}>Regalos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryOption} onPress={() => {
                setCategory("Ropa");
                setShowOptions(false)
              }}>
                <Text style={styles.categoryOptionText}>Ropa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryOption} onPress={() => {
                setCategory("Cuidado Personal");
                setShowOptions(false)
              }}>
                <Text style={styles.categoryOptionText}>Cuidado Personal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryOption} onPress={() => {
                setCategory("Otros");
                setShowOptions(false)
              }}>
                <Text style={styles.categoryOptionText}>Otros</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>

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
          <TouchableOpacity onPress={() => SelectImage().then(uri => {setImage(uri)})}>
            <Text style={styles.textImageInput}>Seleccionar archivo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.mainButton}
        onPress={() => {
          if(isLoading) return;
          validate()
        }}
      >
        {
          isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <Text style={styles.mainButtonText}>Siguiente</Text>
          )
        }
      </TouchableOpacity>

    </View>
  )
}

export default RegisterProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: vs(27),
    color: '#FFF',
    marginBottom: vs(20),
    fontFamily: 'GorditaBold',
    lineHeight: vs(43),
    marginRight: s(90),
    marginTop: vs(20),
  },
  returnIcon: {
    width: vs(26),
    height: vs(26),
    position: 'absolute',
    top: vs(35),
    right: s(15),
    zIndex: 1,
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: vs(10),
    marginRight: s(30),
  },
  inputLabel: {
    fontSize: vs(9),
    fontFamily: "GorditaMedium",
    color: "#FFF",
  },
  input: {
    width: s(270),
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    fontFamily: "GorditaRegular",
    color: "#FFF",
  },
  longInput: {
    marginTop: vs(5),
    width: s(270),
    borderWidth: 1,
    borderColor: "#FFF",
    textAlignVertical: 'top',
    fontFamily: "GorditaRegular",
    color: "#FFF",
    paddingHorizontal: s(10),
    paddingVertical: vs(10),
    fontSize: vs(9),
    borderRadius: 3,
    maxHeight: vs(120),
  },
  imageInputContainer: {
    width: s(270),
    height: vs(130),
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(5),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  imageContainer: {
    width: s(270),
    height: vs(130),
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 3,
  },
  image: {
    width: s(270),
    height: vs(130),
    top: 0,
    left: 0,
    position: 'absolute',
    borderRadius: 3,
  },
  darkenImage: {
    width: s(270),
    height: vs(130),
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 3,
  },
  textImageInput: {
    fontSize: vs(10),
    fontFamily: "GorditaRegular",
    color: "#FFF",
    textDecorationLine: 'underline',
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
  categoryButton: {
    width: s(270),
    backgroundColor: "#FFF",
    paddingVertical: vs(3),
    paddingLeft: s(10),
    marginTop: vs(5),
    marginBottom: vs(3),
    borderRadius: 3,
  },
  categoryButtonText: {
    fontSize: vs(10),
    fontFamily: "GorditaMedium",
    color: colors.primary,
  },
  categoryOptions: {
    width: s(200),
    backgroundColor: "#FFF",
    borderRadius: 3,
  },
  categoryOption: {
    paddingLeft: s(10),
    width: s(200),
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  categoryOptionText: {
    fontFamily: "GorditaRegular",
    fontSize: vs(9),
    paddingVertical: vs(5),
    color: "#000"
  },
})