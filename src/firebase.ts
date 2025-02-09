import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  StorageReference,
  getBlob,
  getMetadata,
  deleteObject,
  listAll,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuriu7xAbxmWZN2hVvJhDNy36LlxkjLWU",
  authDomain: "dentall-kamaji.firebaseapp.com",
  projectId: "dentall-kamaji",
  storageBucket: "dentall-kamaji.appspot.com",
  messagingSenderId: "362307280369",
  appId: "1:362307280369:web:e255a61ab411bf27d77850",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

const getFileUrl = async (path: string): Promise<string> => {
  const storageRef: StorageReference = ref(storage, path);
  return getDownloadURL(storageRef);
};

async function uploadSignature(file: File, filename: string) {
  const path = `signatures/${filename}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}

async function uploadSignatureDataURL(dataURL: string, filename: string) {
  const path = `signatures/${filename}`;
  const fileRef = ref(storage, path);
  const blob = await fetch(dataURL).then((res) => res.blob());
  await uploadBytes(fileRef, blob);
  const url = await getDownloadURL(fileRef);
  return url;
}

async function checkFileExists(filename: string): Promise<boolean> {
  const path = `signatures/${filename}`;
  const fileRef = ref(storage, path);

  try {
    await getMetadata(fileRef);
    return true;
  } catch (error) {
    return false;
  }
}

async function deleteSignature(filename: string) {
  const path = `signatures/${filename}`;
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}

async function downloadBlob(filename: string) {
  const path = `${filename}`;
  const storageRef: StorageReference = ref(storage, path);
  const blob = await getBlob(storageRef);
  return blob;
}

async function getSignatureList() {
  return await listAllFiles("signatures");
}

async function listAllFiles(path: string) {
  const storageRef: StorageReference = ref(storage, path);
  return await listAll(storageRef);
}

export {
  googleAuthProvider,
  checkFileExists,
  deleteSignature,
  uploadSignature,
  getSignatureList,
  listAllFiles,
  getFileUrl,
  uploadSignatureDataURL,
  downloadBlob,
};
