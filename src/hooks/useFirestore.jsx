//Koleksiyon oluşturma: -- addDoc ile döküman ekleme
import { collection, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";

//Koleksiyonu çalıştırmak için:
import { db } from "../firebase/config";

//Verileri "Reducer" ile göndermek için:
import { useReducer } from "react";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {

    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }

        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }

        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }

        case 'UPDATED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }

        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }

        default:
            return state
    }

}

export const useFirestore = (collections) => {

    const [response, dispatch] = useReducer(firestoreReducer, initialState);

    const ref = collection(db, collections);

    const documentAdd = async (doc) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const attachedDocument = await addDoc(ref, { ...doc, date: serverTimestamp() })
            dispatch({ type: 'ADDED_DOCUMENT', payload: attachedDocument })
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message })
        }
    }

    const documentDelete = async (id) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            await deleteDoc(doc(db, collections, id))
            dispatch({ type: 'DELETED_DOCUMENT' })
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message })
        }

    }

    const documentUpdate = async (id, currentData) => {

        dispatch({ type: 'IS_PENDING' })

        try {

            const docRef = await doc(db, collections, id);
            await updateDoc(docRef, currentData)

            dispatch({ type: 'UPDATED_DOCUMENT', payload: currentData })
            return currentData

        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message })
            return null
        }

    }

    return { documentAdd, documentDelete, documentUpdate, response }

}

