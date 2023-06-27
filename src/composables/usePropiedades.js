import {collection} from 'firebase/firestore'
import { computed } from 'vue'
import { useFirestore, useCollection } from 'vuefire'

export default function usePropiedades(){

    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades') )

    // crear computed property con parametro
    const propertyPrice = computed(()=>{

        return (price) => 

            Number(price).toLocaleString('es-CL',{ 
                style: 'currency',
                currency: 'CLP'
            })
        
    })

    return {

        propiedadesCollection,
        propertyPrice
    }
}