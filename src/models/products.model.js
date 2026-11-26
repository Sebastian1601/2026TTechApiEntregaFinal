import { db } from '../config/firebase.js';

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';
//iumportamos los métodos para trabajar con firebase

//creamos el vinculo referencia a la coleccion "products" en firebase
const productsCollection = collection(db, 'products');

//obtener todos los productos de la colección
export async function listAllProducts() {
    const snapshotConsulta = await getDocs(productsCollection);
    if (!snapshotConsulta) {
        return null
    }
    const products = [];
    snapshotConsulta.forEach(doc => {
        products.push({
            id: doc.id,
            ...doc.data()
        });
    });
    return products;
};

//obtener un producto por id
export async function listSingleProduct(id) {
    const productDoc = await getDoc(doc(productsCollection, id));
    if (productDoc.exists()) {
        return productDoc.data();
    }
    return null;
};

//guardar producto nuevo
export async function createSingleProduct(data) {
    const addedProduct = await addDoc(productsCollection, data);
    return addedProduct.id;
};

//eliminar un producto
export async function deleteSingleProduct(id) {
    //primero se obtiene la referencia con doc(<coleccion>, <id del registro a referenciar>) 
    // y luego se elimina el registro de la referencia con deleteDoc(<referencia al documento a eliminar>)
    const docRef = doc(productsCollection, id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        await deleteDoc(docRef);
        return true;
    } else {
        return false;
    }
};

