import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadAndGetDownloadUrl = async (filename: string, blob: Blob) => {
    const storage = getStorage();
    const storageRef = ref(storage, filename);

    uploadBytes(storageRef, blob)
    .then(() => {
      getDownloadURL(storageRef)
      .then((url) => {
        return url;
      })
      .catch((error) => {
        throw(error);
      })
    })
    .catch((error) => {
      throw(error);
    });
}

export default uploadAndGetDownloadUrl;