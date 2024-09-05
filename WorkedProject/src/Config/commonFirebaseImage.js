import {
    getStorage,
    getDownloadURL,
    ref,
  } from 'firebase/storage';
  import { app } from '../firebase';

export const getDataFromFirebase = async (filePath) => {
    const dummyProfile = "";
    const storage = getStorage(app);
    try {
      const starsRef = ref(storage, `/${filePath}`);
      return new Promise(async (resolve, reject) => {
        try {
          await getDownloadURL(starsRef).then((fireBaseUrl) => {
            resolve(fireBaseUrl);
          });
        } catch (e) {
          resolve("");
        }
      });
    } catch (e) {
      return dummyProfile;
    }
  };