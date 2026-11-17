import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase.js';

//creo la coleccion en la base de firebase
const booksCollection = collection(db, "boooks");

export const getAllBooks = async () => {
    const snapshot = await getDocs(booksCollection);
    return snapshot.docs.map((item) => ({
        ...item.data(),
        id: item.id
    }));
};