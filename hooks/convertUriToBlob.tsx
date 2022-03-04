const convertUriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    const blob: Blob = await response.blob();
    return blob;
}

export default convertUriToBlob