import { useState } from "react";
import { auth, storage, db } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc } from "firebase/firestore";

import { useAuthContext } from "./useAuthContext";

//Storage için referans oluşturma => ref
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const {dispatch} = useAuthContext();

    const signup = async (email, password, username, thumbnail) => {

        setError(null)
        setIsPending(true)

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            //console.log("response.user", response.user);

            if(!response){
                throw new Error("Subscription failed!")
            }

            const filePath = `thumbnails/${response.user.uid}/${thumbnail.name}`
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, thumbnail);

            const imgUrl = await getDownloadURL(storageRef);

            updateProfile(response.user, {
                displayName: username,
                photoURL: imgUrl
            })

            const docRef = doc(db, 'users', response.user.uid)
            await setDoc(docRef, {
                online: true,
                username: username,
                photoURL: imgUrl
            })

            dispatch({type: "LOGIN", payload: response.user})

            setError(null)
            setIsPending(false)

        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setIsPending(false)            
        }

    }

    return {error, isPending, signup}

}