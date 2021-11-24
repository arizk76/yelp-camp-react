import { useState } from 'react';
import { storage } from './firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const useFireStorage = () => {
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const uploadImage = (imageFile, campName) => {
    const imageName = imageFile.name;
    // Create a image reference from firebase storage service
    const imagesRef = ref(storage, `images/${campName}/${imageName}`);

    const uploadTask = uploadBytesResumable(imagesRef, imageFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        // Handle unsuccessful uploads
        setUploadError(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(imagesRef).then((downloadURL) => {
          setImageURL(downloadURL);
        });
      }
    );
  };

  return {
    progress,
    uploadError,
    imageURL,
    uploadImage,
  };
};
