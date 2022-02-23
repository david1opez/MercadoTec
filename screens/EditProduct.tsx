import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';
import { signOut, getAuth } from 'firebase/auth';
import {vs, s} from "react-native-size-matters";
import { useNavigation } from '@react-navigation/native'
import SelectImage from '../hooks/SelectImage';
import convertUriToBlob from '../hooks/convertUriToBlob';
import uploadAndGetDownloadUrl from '../hooks/uploadAndGetDownloadUrl';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

import {colors} from "../StyleVariables";

// COMPONENTS
import AddProductPopup from '../components/AddProductPopup';
import Icon from '../assets/icons';
import ItemPreview from '../components/ItemPreview';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { connectStorageEmulator } from 'firebase/storage';

type Item = {
  title: string
  description: string
  price: number
  image: string
}
type EditProductScreenProp = StackNavigationProp<RootStackParamList, 'EditProduct'>;

const EditProduct = () => {
  const navigation = useNavigation<EditProductScreenProp>();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems]: any = useState([]);
  const [contactOption, setContactOption] = useState('');
  const [contactLink, setContactLink] = useState('');

  const db = getFirestore();
  const auth = getAuth();
  const uid: any = auth.currentUser?.uid;

  const uploadToDatabase = async () => {
    if(!isImageChanged) {
      updateDoc(doc(db, "Products", uid), {
        title: title,
        description: description,
        image: image,
        link: contactLink,
        items: items,
      }).then(() => {
        alert("Tú publicación fue actualizada :)")
        navigation.goBack();
      })
      .catch((error) => alert(error))

      return;
    }

    const blob = await convertUriToBlob(image);
    const downloadUrl = await uploadAndGetDownloadUrl(`${uid}/mainProductImage.jpg`, blob);

    updateDoc(doc(db, "Products", uid), {
      title: title,
      description: description,
      image: image,
      link: contactLink,
      items: items,
    }).then(() => {
      alert("Tú publicación fue actualizada :)")
    })
    .catch((error) => alert(error))
  }

  useEffect(() => {
    getDoc(doc(db, "Products", uid))
    .then((result) => {
      setTitle(result.data()?.title);
      setDescription(result.data()?.description);
      setImage(result.data()?.image);
      setItems(result.data()?.items);
      setContactLink(result.data()?.link);
    
      let link = result.data()?.link;

      if(link.includes("wa.me")) {
        setContactOption("Whatsapp");
      } else if(link.includes("telegram.me")) {
        setContactOption("Telegram");
      } else if(link.includes("m.me")) {
        setContactOption("Messenger");
      }

      setIsLoading(false);
    })
  }, [])

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

      <Text style={styles.title}>Editar publicación</Text>


      <View style={styles.scrollContainer}>
        <ScrollView>          
          <TouchableOpacity style={styles.imageInputContainer}
            onPress={async () => {
              SelectImage(setImage)
              setIsImageChanged(true)
            }}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: image}}/>
              <View style={styles.darkenImage}/>
            </View>
            <Text style={styles.textImageInput}>CAMBIAR IMÁGEN</Text>
          </TouchableOpacity>


          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Título:</Text>
            <TextInput style={styles.input} onChangeText={(value) => {setTitle(value)}} value={title}/>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Descripción:</Text>
            <TextInput style={styles.longInput}
              multiline={true}
              numberOfLines={5}
              onChangeText={(value) => {setDescription(value)}}
              value={description}
            />
          </View>


          <Text style={styles.inputLabel}>Productos</Text>

          <View style={styles.itemsScrollContainer}>
            <ScrollView>
              {
                items.map((item: any, index: number) => {
                  return(
                    <ItemPreview
                      key={index}
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      price={item.price}
                      index={index}
                      onRemoveItem={(index: number) => {
                        setItems(items?.filter((_: any, i: number) => i !== index));
                      }}
                    />
                  );
                })
              }
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.addItemButton}
            onPress={() => {setIsOpen(true)}}
          >
            <Text style={styles.addItemButtonText}>Agregar producto</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Modo de contacto:</Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={contactOption != 'Whatsapp' ? styles.contactOption : styles.activeContactOption}
              onPress={() => {setContactOption('Whatsapp')}}
            >
              <Text style={contactOption != 'Whatsapp' ? styles.contactOptionText : styles.activeContactOptionText}>Whatsapp</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={contactOption != 'Telegram' ? styles.contactOption : styles.activeContactOption}
              onPress={() => {setContactOption('Telegram')}}
            >
              <Text style={contactOption != 'Telegram' ? styles.contactOptionText : styles.activeContactOptionText}>Telegram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={contactOption != 'Messenger' ? styles.contactOption : styles.activeContactOption}
              onPress={() => {setContactOption('Messenger')}}
            >
              <Text style={contactOption != 'Messenger' ? styles.contactOptionText : styles.activeContactOptionText}>Messenger</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input} onChangeText={(value) => {
              if(contactOption == 'Whatsapp'){
                setContactLink(`https://wa.me/${value}`);
              }
              else if(contactOption == 'Telegram'){
                setContactLink(`https://telegram.me/${value}`);
              }
              else {
                setContactLink(`https://m.me/${value}`);
              }
            }}
            autoCapitalize={"none"}
            placeholder={contactOption == 'Whatsapp' ? 'Teléfono ej. 528441234567' : contactOption == 'Telegram' ? 'Nombre de usuario' : 'Nombre de usuario'}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            keyboardType={contactOption == 'Whatsapp' ? 'numeric' : 'default'}
          />
          </View>

        </ScrollView>

      </View>

      <View style={styles.mainButtonsContainer}>
        <TouchableOpacity style={styles.saveButton}
          onPress={() => uploadToDatabase()}
        >
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.promoteButton}
          onPress={() => {
            alert('Esta función estará diponible a partir de la próxima semana :D')
            // navigation.navigate('PromotePost')
          }}
        >
          <Text style={styles.promoteButtonText}>¡PROMOCIONA LO QUE VENDES!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logOutButton}
          onPress={() => {
            signOut(auth)
            .then(() => {
              navigation.navigate('Home');
            })
          }}
        >
          <Text style={styles.logOutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>


    { isOpen && (
      <AddProductPopup
        index={45}
        onAddProduct={(title: string, description: string, image: string, price: number) => {
          let newItem = {
            title: title,
            description: description,
            image: image,
            price: price
          }
          setItems([...items, newItem]);
          setIsOpen(false);
        }}
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
    alignItems: 'flex-start',
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
  scrollContainer: {
    width: s(320),
    height: vs(400),
    marginLeft: s(15),
  },
  itemsScrollContainer: {
    width: s(320),
    maxHeight: vs(200),
  },
  title: {
    fontFamily: "GorditaBold",
    fontSize: vs(20),
    color: colors.primary,
    marginLeft: s(15),
    marginTop: vs(20),
  },
  inputContainer: {
    alignItems: 'flex-start',
  },
  inputLabel: {
    fontSize: vs(9),
    fontFamily: "GorditaMedium",
    color: colors.primary,
  },
  input: {
    width: s(300),
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    fontFamily: "GorditaRegular",
    color: "#000",
    fontSize: vs(10),
    marginBottom: vs(10),
  },
  longInput: {
    marginTop: vs(5),
    width: s(300),
    borderWidth: 1,
    borderColor: colors.primary,
    textAlignVertical: 'top',
    fontFamily: "GorditaRegular",
    color: "#000",
    paddingHorizontal: s(10),
    paddingVertical: vs(5),
    fontSize: vs(9),
    borderRadius: 3,
    marginBottom: vs(10),
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: s(270),
    marginTop: vs(5),
    marginBottom: vs(10),
  },
  contactOption: {
    paddingHorizontal: s(10),
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 3,
    paddingVertical: vs(2),
  },
  contactOptionText: {
    fontSize: vs(10),
    fontFamily: "GorditaMedium",
    color: colors.primary,
  },
  activeContactOption: {
    backgroundColor: colors.primary,
    paddingHorizontal: s(10),
    borderRadius: 3,
    paddingVertical: vs(2),
  },
  activeContactOptionText: {
    fontSize: vs(10),
    fontFamily: "GorditaMedium",
    color: "#FFF",
  },
  imageInputContainer: {
    width: s(300),
    height: vs(140),
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(10),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#FFF",
    marginBottom: vs(20),
  },
  imageContainer: {
    width: s(300),
    height: vs(140),
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 3,
  },
  image: {
    width: s(300),
    height: vs(140),
    top: 0,
    left: 0,
    position: 'absolute',
    borderRadius: 3,
  },
  darkenImage: {
    width: s(300),
    height: vs(140),
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 3,
  },
  textImageInput: {
    fontSize: vs(10),
    fontFamily: "GorditaMedium",
    color: "#FFF",
    textDecorationLine: 'underline',
  },
  addItemButton: {
    backgroundColor: colors.primary,
    paddingVertical: vs(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: vs(10),
    width: s(110),
    marginBottom: vs(20),
    alignSelf: 'flex-end',
    marginRight: s(15),
  },
  addItemButtonText: {
    fontSize: vs(9),
    fontFamily: "GorditaMedium",
    color: "#FFF",
  },
  mainButtonsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: vs(30),
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: vs(4),
    paddingHorizontal: s(15),
    borderRadius: 3,
    marginBottom: vs(10),
  },
  saveButtonText: {
    fontSize: vs(11),
    fontFamily: "GorditaMedium",
    color: "#FFF",
  },
  promoteButton: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    paddingVertical: vs(3),
    paddingHorizontal: s(15),
    borderRadius: 3,
  },
  promoteButtonText: {
    fontSize: vs(9),
    fontFamily: "GorditaBold",
    color: colors.primary,
  },
  logOutButton: {
    position: 'absolute',
    bottom: vs(-60),
    right: s(30),
  },
  logOutButtonText: {
    fontSize: vs(9),
    fontFamily: "GorditaMedium",
    textDecorationLine: 'underline',
    color: colors.primary,
  },
})