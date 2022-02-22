import * as ImagePicker from 'expo-image-picker';


export default async function SelectImage(setFunction: Function) {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
    });
    
    if (!result.cancelled) {
        return setFunction(result.uri);
    }
}