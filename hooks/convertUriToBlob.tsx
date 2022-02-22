const convertUriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob: Blob = await response.blob();
    return blob;
}

export default convertUriToBlob