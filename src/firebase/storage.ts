import { ChatHistoryEntry } from "../data/chatHistory";
import { storage } from "./firebase"
import {getBytes, getDownloadURL, ref} from "firebase/storage";


const getUserStorageRef = (uid: string) => {
    return ref(storage, `users/${uid}`);
}

export const getChatHistory = (uid: string) => {
    const r = ref(getUserStorageRef(uid), 'chatHistory.json');
    getDownloadURL(r)
    .then((url)=>{ return getBytes(r); })
    .then((bytes)=>{ return JSON.parse(new TextDecoder().decode(bytes)); })
    .catch((e)=>{ 
        
     });
}   

