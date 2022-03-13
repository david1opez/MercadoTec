import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'

const storage = getStorage();

async function UploadImage(image: Blob, UID: string, index?: number) {
    const fileName = index ? `${UID}-I${index}.jpg` : `${UID}-MPI.jpg`;
    const storageRef = ref(storage, fileName);

    const downloadURL = await uploadBytes(storageRef, image)
    .then(async() => {
        const url = await getDownloadURL(storageRef);
        return url;
    })
    .catch(err => alert(err));

    return downloadURL;
}

async function DeleteFile(fileName: string) {
    const storageRef = ref(storage, fileName);
    const status = await deleteObject(storageRef)
    .then(() => {
        return true;
    })
    .catch(err => {
        alert(err);
        return false;
    });

    return status;
}

export {UploadImage, DeleteFile}