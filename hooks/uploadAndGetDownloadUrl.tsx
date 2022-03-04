import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadAndGetDownloadUrl = async (filename: string, blob: Blob) => {
    const storage = getStorage();
    const storageRef = ref(storage, filename);

    uploadBytes(storageRef, blob)
    .then(() => {
      getDownloadURL(storageRef)
      .then((url) => {
        console.log(url)
        return url;
      })
      .catch((error) => {
        console.log(error)
        return '';
      })
    })
    .catch((error) => {
      console.log(error)
      return '';
    });
}

export default uploadAndGetDownloadUrl;