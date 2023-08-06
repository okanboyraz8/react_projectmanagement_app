//Projenin bilgilerine erişmek için bir hooks ihtiyacımız var: useDocument
//useCollection: bir koleksiyondaki bütün belgelere erişim
//useFirestore: Ekleme ve Çıkarma işlemlerinin yapıldığı kısım, aynı zamanda firestoreReducer'da burada...

//İsteğimiz olay ise: id bilgisine sahip olduğumuz belgenin özelliklerine, yani diğer alanlarına erişmek.

import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { doc, onSnapshot } from 'firebase/firestore'
//onSnapshot: bilgilere anlık erişmek için

export const useDocument = (collection, id) => {

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = doc(db, collection, id);

        const unsubscribe = onSnapshot(ref, (doc) => {
            if (doc.data()) {
                setDocument({ ...doc.data(), id: doc.id })
                setError(null)
            } else {
                setError('Document not found')
            }
        }, err => {
            console.log(err.message)
            setError('The document could not be accessed')
        })

        return () => unsubscribe()

    }, [collection, id])

    return { document, error }
}