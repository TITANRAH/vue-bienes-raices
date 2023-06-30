import {collection, doc, deleteDoc} from 'firebase/firestore'
import { computed, ref } from 'vue'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

// esto es para el storage basicamente para eliminar 
// el ref es de referencia no es de ref de vue
import {ref as storageRef, deleteObject} from 'firebase/storage'

// useCollection es para traerme toda la coleccion en base de datos

export default function usePropiedades(){

    const alberca = ref(false)
    const storage = useFirebaseStorage()
    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades') )

    async function deleteItem(id, urlImage){

        if(confirm('¿Deseas eliminar esta propiedad?')){

            console.log(id);
    
            const docRef = doc(db, 'propiedades', id)
            const imageRef = storageRef(storage, urlImage)

            // como neceisto tener 2 await los puedo utilizar asi en un Promise.all 
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)

            ])
          

        }


    }
    // si tiene alberca trae las que tienen alberca si no todas
    // filtra lo que hay en memoria no hace peticiones a la base de datos
    const filterItems = computed(()=>{
        return alberca.value ? 
        propiedadesCollection.value.filter(propiedad => propiedad.alberca) : 
        propiedadesCollection.value
    })
 

    return {

        propiedadesCollection,
        filterItems,
        alberca,
        deleteItem
       
    }
}