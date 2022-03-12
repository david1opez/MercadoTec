import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import SelectImage from '../hooks/SelectImage';
import {vs, s} from 'react-native-size-matters';
import { uploadBytes, getDownloadURL, getStorage, ref } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

import {colors} from '../StyleVariables';

// COMPONENTS
import Icon from '../assets/icons';


const AddProductPopup = ({index, onAddProduct, onClose}: {index: number, onAddProduct: Function, onClose: Function}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<any>('');
    const [price, setPrice] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    const validate = () => {
        setIsLoading(true);

        if(title.length == 0) {
            alert('Porfavor escribe un título para describir tu producto');
            setIsLoading(false);
            return false;
        }
        else if(description.length == 0) {
            setDescription(" ");
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

    return (
        <View style={styles.darkBackground}>
        <View style={styles.container}>

            <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
                <Icon name="close" height={vs(20)} width={vs(20)} color={"#FFF"}/>
            </TouchableOpacity>

            <Text style={styles.title}>AGREGAR PRODUCTO</Text>

            <View style={styles.columnsContainer}>
                <View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Nombre</Text>
                        <TextInput style={styles.input}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Descripción:</Text>
                        <TextInput style={styles.longInput}
                            multiline={true}
                            numberOfLines={6}
                            onChangeText={(value) => {setDescription(value)}}
                            value={description}
                        />
                    </View>
                </View>

                <View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Imágen:</Text>
                    <View style={styles.imageInputContainer}>

                    {
                        image ? (
                        <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: image}}/>
                        <View style={styles.darkenImage} />
                        </View>
                        ): null
                    }

                    <TouchableOpacity onPress={() => SelectImage().then((image) => {setImage(image)})}>
                        <Text style={styles.textImageInput}>Seleccionar archivo</Text>
                    </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Precio:</Text>
                    <TextInput style={styles.priceInput}
                        keyboardType='phone-pad'
                        onChangeText={(value) => {
                            let formattedPrice = value.replace(/\s/g, '').replace(/[^0-9]/g, '')
                            formattedPrice = formattedPrice == "" ? "0" : formattedPrice;
                            setPrice(parseInt(formattedPrice))
                        }}
                        value={price.toString() != "NaN" ? price.toString() : "0"}
                    />
                </View>

                </View>
            </View>

            <TouchableOpacity style={styles.button}
                onPress={async () => {
                    if(isLoading) return;
                    if(validate()) {
                        const uri = await fetch(image);
                        const blob = await uri.blob();
                    
                        const storage = getStorage();
                        const storageRef = ref(storage, `${uid}_I${index}.jpg`);
                    
                        uploadBytes(storageRef, blob)
                        .then(() => {
                        getDownloadURL(storageRef)
                        .then((url) => {
                            setIsLoading(false);
                            onAddProduct(title, description, url, price);
                        })
                        .catch((error) => {
                            setIsLoading(false);
                            alert(error.message);
                        })
                        })
                        .catch((error) => {
                            setIsLoading(false);
                            alert(error.message);
                        });
                    }
                }}
            >
                {
                    isLoading ? (
                        <ActivityIndicator size="small" color={colors.primary} />
                    ): (
                        <Text style={styles.buttonText}>Agregar</Text>
                    )
                }
            </TouchableOpacity>

        </View>
        </View>
    )
}

export default AddProductPopup

const styles = StyleSheet.create({
    darkBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: colors.primary,
        borderRadius: 5,
        paddingHorizontal: s(15),
        paddingVertical: vs(20),
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: vs(10),
        right: vs(10),
        zIndex: 2,
    },
    title: {
        fontSize: vs(14),
        fontFamily: 'GorditaBold',
        color: "#FFF",
        textDecorationLine: 'underline',
        marginBottom: vs(15),
    },
    columnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        marginBottom: vs(15),
    },
    inputLabel: {
        fontSize: vs(9),
        fontFamily: 'GorditaMedium',
        color: "#FFF",
    },
    input: {
        fontFamily: 'GorditaRegular',
        fontSize: vs(10),
        lineHeight: vs(12),
        color: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        width: s(150),
    },
    priceInput: {
        fontFamily: 'GorditaRegular',
        fontSize: vs(10),
        lineHeight: vs(12),
        color: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        width: s(90),
    },
    longInput: {
        fontFamily: 'GorditaRegular',
        fontSize: vs(9),
        lineHeight: vs(12),
        color: "#FFF",
        borderWidth: 1,
        borderColor: '#FFF',
        marginTop: vs(5),
        textAlignVertical: 'top',
        paddingVertical: vs(5),
        paddingHorizontal: s(7),
        width: s(160),
    },
    imageInputContainer: {
        width: vs(95),
        height: vs(80),
        backgroundColor: 'rgba(255,255,255,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vs(6),
        borderRadius: 3,
      },
      imageContainer: {
        width: vs(95),
        height: vs(80),
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 3,
      },
      image: {
        width: vs(95),
        height: vs(80),
        top: 0,
        left: 0,
        position: 'absolute',
        borderRadius: 3,
      },
      darkenImage: {
        width: vs(95),
        height: vs(80),
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
      button: {
        backgroundColor: "#FFF",
        borderRadius: 3,
        paddingHorizontal: s(25),
        paddingVertical: vs(3),
        marginTop: vs(10),
      },
      buttonText: {
        fontSize: vs(11),
        fontFamily: 'GorditaBold',
        color: colors.primary,
      }
})