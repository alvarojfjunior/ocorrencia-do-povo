import { firebaseStorage } from '../config/firebase'


export async function UploadImage(directory, name, file) {
    try {
        const fileRef = firebaseStorage.ref()
        const metadata = {
            contentType: "image/jpeg"
        };
        const uploadTaskSnapshot = await fileRef.child(`${directory}/${name}`).put(file, metadata);
        const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
        return downloadURL;
    } catch (error) {
        console.log("ERR ===", error);
    }
}