import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native-compressor';
import ImageResizer from 'react-native-image-resizer';

// TYPES
type URI = string;
type Images = Promise<{
    uriResult: URI,
    smallUriResult: URI
    blobResult: Blob
    smallBlobResult: Blob
} | null>


async function SelectImage(): Promise<URI|null> {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
        maxWidth: 1000,
        maxHeight: 1000,
    });
    
    if (!result.cancelled) {
        return result.uri
    }

    return null;
}

async function CompressImage(URI: URI): Promise<URI> {
    const result = await Image.compress(URI, {
        maxWidth: 1000,
        quality: 0.6,
    });

    return result;
}

async function ResizeImage(URI: URI): Promise<URI> {
    const result = await ImageResizer.createResizedImage(
        URI,
        200, 200,
        'JPEG',
        0.6,
        0, undefined, false, 
        {onlyScaleDown: true}
    );

    return result.uri;
}

async function TransformToBlob(URI: URI): Promise<Blob> {
    const response = await fetch(URI);
    const blob = await response.blob();

    return blob;
}


async function GetImage(): Images {
    const image = await SelectImage();

    if(image) {
        const uriResult = await CompressImage(image);
        const smallUriResult = await ResizeImage(uriResult);

        const blobResult = await TransformToBlob(uriResult);
        const smallBlobResult = await TransformToBlob(smallUriResult);

        return {
            uriResult,
            smallUriResult,
            blobResult,
            smallBlobResult
        };
    }
    else return null;
}

export default GetImage();