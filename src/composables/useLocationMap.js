import { ref } from "vue"



export default function useLocationMap(){

    const zoom = ref(17)
    const center = ref([-33.569485, -70.556860])

    function pin(e){

        // este getLatLng viene en la respuesta y entrega los datos de latitud longitud
       const marker = e.target.getLatLng()
       center.value = [marker.lat, marker.lng]

       console.log('center.value desde compsable useLocation', center.value);
    }

    return {
        zoom,
        center,
        pin

    }
}