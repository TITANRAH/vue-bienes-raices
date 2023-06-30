// cuando usar composable o store:

// cuando solo quiero funcionalidades reutilizables usar composable

// cuando quiero ademas de funcionalidades reutilizables y mantener state usar store

// para subir imagenes solo hara eso no neesito un state

// para autenticacion si necesito unstorecon state por que es un usaurio
//  que necesito en toda la app

import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid'
import { computed } from 'vue'




export default function useImage(){

    // identificacion de credenciales mias en las variables de entorno
    const storage = useFirebaseStorage()

    // identifica donde lo guardara
    const storageRefPath = storageRef(storage, `/propiedades/${uid()}.jpg`)
    
    // esto finalmente nos ayuda a suvbir, url es donde quedo guardadea la iamgen
    // y upload la fncion que sube 
    // uploadProgress, uploadError, uploadTask,  puedo destrucitrar esto que me da otras opciones (investigar)
    // instanciamos url y upload para utilizarlos url lo pasamos en el return y upload en la funcion
    // uploadImage
    const {url, upload} = useStorageFile(storageRefPath)

    function uploadImage (e) {
        console.log('e.target.files[0] desde composable imagen ',e.target.files[0]);

        const data = e.target.files[0];

        if(data){
           upload(data)
        }

        console.log(' url de la imagen desde composable imagen', url)
    }

    const image = computed(()=>{

        return url.value ? url.value : null
    })

    return {
        uploadImage,
        image,
        url
    }
}