import {collection} from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'
export default function usePropiedades(){

    const db = useFirestore()
    const propiedadesCollection = useCollection(db, 'propiedaes' )
    return {

        propiedadesCollection
    }
}