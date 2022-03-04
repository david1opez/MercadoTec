import * as ImagePicker from 'expo-image-picker';

export default async function SelectImage(): Promise<string> {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
    });
    
    if (!result.cancelled) {
        return result.uri
    }

    return '';
}