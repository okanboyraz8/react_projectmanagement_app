import { useState } from "react";

import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const login = async (email, password) => {

        setError(null)
        setIsPending(true)

        try {
            const res = await signInWithEmailAndPassword(auth, email, password)

            const { uid } = res.user;
            await updateDoc(doc(db, 'users', uid), {
                online: true
            })

            dispatch({ type: "LOGIN", payload: res.user })

            setIsPending(false)
            setError(null)

        } catch (error) {
            console.log("error", error);
            setError(error.message);
            setIsPending(false)
        }

    }

    return { login, error, isPending }

}