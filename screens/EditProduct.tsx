import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import React, {useState, useEffect} from 'react';
import { signOut, getAuth } from 'firebase/auth';
import {vs, s} from "react-native-size-matters";
import { useNavigation } from '@react-navigation/native'
import SelectImage from '../hooks/SelectImage';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import convertUriToBlob from '../hooks/convertUriToBlob';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {colors, templates} from "../StyleVariables";

// COMPONENTS
import AddProductPopup from '../components/AddProductPopup';
import Icon from '../assets/icons';
import ItemPreview from '../components/ItemPreview';
import FreeTrialPopup from '../components/FreeTrialPopup';
import NoConnectionComponent from '../components/NoConnectionComponent';

// TYPES
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type Item = {
  title: string
  description: string
  price: number
  image: string
}

type ContactOption = 'Whatsapp' | 'Messenger' | 'Telegram';

type EditProductScreenProp = StackNavigationProp<RootStackParamList, 'EditProduct'>;

const EditProduct = () => {
  const navigation = useNavigation<EditProductScreenProp>();

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isConnected, setIsConnected] = useState<Boolean>(true);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isImageChanged, setIsImageChanged] = useState<Boolean>(false);
  const [isInfoUploading, setIsInfoUploading] = useState<Boolean>(false);

  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  
  const [contactOption, setContactOption] = useState<ContactOption>('Whatsapp');
  const [contactLink, setContactLink] = useState<string>('');
  const [contactInputValue, setContactInputValue] = useState<string>('');

  const [views, setViews] = useState<number>(0);

  const [freeTrial, setFreeTrial] = useState<boolean>(false);
  const [cutOffDate, setCutOffDate] = useState<number>(0);
  const [expired, setExpired] = useState<boolean>(false);
  const day = new Date().getTime() / 86400000;

  const db = getFirestore();
  const auth = getAuth();
  const uid: any = auth.currentUser?.uid;

  const uploadToDatabase = async () => {
    setIsInfoUploading(true);

    if(!isImageChanged) {
      updateDoc(doc(db, "Products", uid), {
        title: title,
        description: description,
        image: image,
        link: contactLink,
        items: items,
      }).then(() => {
        getDoc(doc(db, "Products", "Preview"))
        .then((docs) => {
          let data = docs.data();
          let oldAllData = data?.Todos;

          oldAllData = oldAllData.filter((item: any) => item.id !== uid);

          let newData = {
            id: uid,
            title: title,
            description: description,
            image: image,
          }

          let newAllData = [...oldAllData, newData];

          console.log(newAllData);

          updateDoc(doc(db, "Products", "Preview"), {
            Todos: newAllData
          }).then(() => {
            alert("Tu publicación ha sido actualizada");
            setIsInfoUploading(false);
            navigation.navigate("Home");
          })
          .catch((err) => {
            setIsInfoUploading(false);
            alert(err)
          })

          
        })
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error)
      })

      return;
    }

    updateDoc(doc(db, "Products", uid), {
      title: title,
      description: description,
      image: image,
      link: contactLink,
      items: items,
      views: 0
    }).then(() => {
      getDoc(doc(db, "Products", "Preview"))
      .then((docs) => {
        let data = docs.data();
        let oldAllData = data?.Todos;

        oldAllData = oldAllData.filter((item: any) => item.id !== uid);

        let newData = {
          id: uid,
          title: title,
          description: description,
          image: image,
        }

        let newAllData = [...oldAllData, newData];

        updateDoc(doc(db, "Products", "Preview"), {
          Todos: newAllData
        }).then(() => {
          setIsInfoUploading(false);
          alert("Tu publicación ha sido actualizada");
          navigation.navigate("Home");
        })
        .catch((err) => {
          setIsInfoUploading(false);
          alert(err)
        })







        
      })
    })
    .catch((error) => {
      setIsInfoUploading(false);
      alert(error)
    })
  }

  const getProductInfo = async () => {
    getDoc(doc(db, "Products", uid))
    .then((result) => {
      if(!result.data()) {
        AsyncStorage.getItem("@link")
        .then((link) => {
          if(!link) link = "";
          navigation.navigate("RegisterProduct", {link: link});
          return
        })
        .catch((err) => {
          alert(err);
        })
      }
      setTitle(result.data()?.title);
      setDescription(result.data()?.description);
      setImage(result.data()?.image);
      setItems(result.data()?.items);
      setContactLink(result.data()?.link);
      setViews(result.data()?.views);
    
      let link = result.data()?.link;

      if(link.includes("wa.me")) {
        let inputValue = link.replace("https://wa.me/", "")
        setContactInputValue(inputValue)
        setContactOption("Whatsapp");
      } else if(link.includes("telegram.me")) {
        let inputValue = link.replace("https://telegram.me/", "")
        setContactInputValue(inputValue)
        setContactOption("Telegram");
      } else if(link.includes("m.me")) {
        let inputValue = link.replace("https://m.me/", "")
        setContactInputValue(inputValue)
        setContactOption("Messenger");
      }

      setIsLoading(false);
    })
  }

  const subscriptionStatus = async () => {
    const user = await getDoc(doc(db, "Users", uid));

    let freetrial = user.data()?.freeTrial;
    let cutOffDate = user.data()?.cutOffDate;

    setFreeTrial(freetrial);
    setCutOffDate(cutOffDate);
    
    if(day >= cutOffDate) {
      setExpired(true);
    }
  }

  useEffect(() => {
    getProductInfo();
    subscriptionStatus();
  }, [])

  if(isLoading){
    return (<View/>);
  }

  if(!isConnected) {
    return (
      <NoConnectionComponent onConnectionStatusChange={(status) => setIsConnected(status)}/>
    )
  }

  if(expired) {
    return (
      <View>
        <Text>asfhaosjdkjhaskfhalskfjlkh</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.returnIcon}
        onPress={() => navigation.replace("Home")}
      >
        <Icon name={"return"} width={vs(26)} height={vs(26)} color={colors.primary}/>
      </TouchableOpacity>
      <View style={templates.logoContainer}>

        <Icon name="logo" width={vs(24)} height={vs(24)} color={colors.primary}/>
        
        <View style={styles.logoTextContainer}>
          <Text style={styles.UpperLogoText}>Mercado</Text>
          <Text style={styles.BottomLogoText}>Tec</Text>
        </View>

      </View>

      {
        freeTrial && (
          <FreeTrialPopup daysLeft={Math.floor(cutOffDate - day)}/>
        )
      }

      <Text style={[styles.title, freeTrial && {marginTop: vs(10)}]}>Editar publicación</Text>
      <Text style={[styles.views, freeTrial && {top: vs(170)}]}>{views} visitas</Text>


      <View style={styles.scrollContainer}>
        <ScrollView>          
          <TouchableOpacity style={styles.imageInputContainer}
            onPress={async () => {
              SelectImage().then((uri) => {
                convertUriToBlob(uri).then((blob) => {
                  const storage = getStorage();
                  const storageRef = ref(storage, `${uid}/mainProductImage.jpg`);

                  uploadBytes(storageRef, blob)
                  .then(() => {
                    getDownloadURL(storageRef)
                    .then((url) => {
                      setImage(url);
                      setIsImageChanged(true);
                    })
                    .catch((error) => {
                      alert(error)
                    })
                  })
                  .catch((error) => {
                    alert(error)
                  });
                })
              })
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
            style={styles.input}
            onChangeText={(value) => {
              if(contactOption == 'Whatsapp'){
                let phoneNumber = value.replace(/\s/g, '').replace(/[^0-9]/g, '');
                setContactInputValue(phoneNumber);
                setContactLink(`https://wa.me/${phoneNumber}`);
              }
              else if(contactOption == 'Telegram'){
                setContactInputValue(value.replace(/\s/g, ''));
                setContactLink(`https://telegram.me/${value.replace(/\s/g, '')}`);
              }
              else {
                setContactInputValue(value.replace(/\s/g, ''));
                setContactLink(`https://m.me/${value.replace(/\s/g, '')}`);
              }
            }}
            autoCapitalize={"none"}
            placeholder={contactOption == 'Whatsapp' ? 'Teléfono ej. 528441234567' : contactOption == 'Telegram' ? 'Nombre de usuario' : 'Nombre de usuario'}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            keyboardType={contactOption == 'Whatsapp' ? 'numeric' : 'default'}
            value={contactInputValue}
          />
          </View>

        </ScrollView>

      </View>

      <View style={[styles.mainButtonsContainer, freeTrial && {marginTop: vs(10)}]}>
        <TouchableOpacity style={styles.saveButton}
          onPress={() => {
            if(isLoading) return;
            Keyboard.dismiss();
            uploadToDatabase()
          }}
        >
          {
            isInfoUploading ? (
              <ActivityIndicator size="large" color={"#FFF"}/>
            ) : (
              <Text style={styles.saveButtonText}>Guardar cambios</Text>
            )
          }
        </TouchableOpacity>

        <TouchableOpacity style={styles.promoteButton}
          onPress={() => {navigation.navigate('PromotePost')}}
        >
          <Text style={styles.promoteButtonText}>¡PROMOCIONA LO QUE VENDES!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.logOutButton, freeTrial && {bottom: vs(-25)}]}
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
        index={items.length}
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
  views: {
    position: 'absolute',
    top: vs(115),
    right: s(36),
    color: colors.primary,
    fontSize: vs(9),
    fontFamily: "GorditaMedium",
  },
  noWificontainer: {
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wifiTitle: {
    fontFamily: "GorditaRegular",
    fontSize: s(14),
    marginBottom: vs(20),
    color: 'rgba(0,0,0,0.5)',
  },
  retryButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: s(20),
    paddingVertical: vs(3),
    borderRadius: 3,
  },
  retryButtonText: {
    color: '#FFF',
    fontFamily: "GorditaMedium",
    fontSize: s(12),
  }
})