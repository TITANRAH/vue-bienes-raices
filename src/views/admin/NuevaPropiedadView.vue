<script setup>
import { useForm, useField } from 'vee-validate';
import { validationSchema, imageSchema } from '@/validation/propiedadSchema'
import { collection, addDoc } from "firebase/firestore";
import {useFirestore} from 'vuefire'
import { useRouter } from 'vue-router';
import useImage from '@/composables/useImage';


// PARA INTERACTUAR CON LA AUTENTICACION SE USA useFirebaseAuth 
// EN ESTE CASO PARA INTERACUTAR CON LA BASDE DE DATOS USAMOS useFirestore
const items = [1, 2, 3, 4, 5]

const {uploadImage, image, url} = useImage()
const router = useRouter()

const db = useFirestore()

const { handleSubmit } = useForm({
  // lo usamos asi por que creamos una validacion separada para imnagen
  // para cuando toque editar, no lo requeriremos en este caso si  
  // por que es una nueva propiedad y la forma de unirlos es asi con el spred 
  // operator ya que handleSubmit admite solo un validationSchema 
  validationSchema: {
    ...validationSchema,
    ...imageSchema
  }
})

const titulo = useField('titulo')
const imagen = useField('imagen')
const precio = useField('precio')
const habitaciones = useField('habitaciones')
const wc = useField('wc')
const descripcion = useField('descripcion')
const estacionamiento = useField('estacionamiento')
// como no todos tendran alberca le pasamos un valor por defecto de esta forma 
// el null es por que usefield ya tiene validaciones pero podemos pasar valores iniciales
// el oproblema que soluciona esto es que si no le pasas un valor de alberca 
// firebase dara error por no pasar el valor de este check
const alberca = useField('alberca', null, {
  initialValue: false
})

const submit = handleSubmit(async (values) => {
  // console.log(values) 
  const {imagen, ...propiedad} = values
  // destructuramos y hacemos solo consolelog a propiedad 
  // que es el resto de los campos del formulario excepto imagen
  // la idea de esto es subir una imagen a cloud storage pero no a la base de datos 
  // en base de datos solo guardaremos la ubicacion de la imagen
  console.log(propiedad)

  const docRef = await addDoc(collection(db, "propiedades"), {
    // con spred operator puedo guardar los campos sin necesidad de que sea un objeto 
    // osea se guarda como campos y no como objeto, es mejor
    ...propiedad,
    imagen: url.value
  });
  // cuando se genere el guardado se va a admnin-propiedades
  if(docRef.id){
    router.push({name: 'admin-propiedades'})
  }
  console.log("Document written with ID: ", docRef.id);
})


</script>
<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Nueva Propiedad
    </v-card-title>

    <v-card-subtitle class="text-h5 py-5">
      Crea una nueva propiedad llenando el siguiente formulario
    </v-card-subtitle>

    <!-- se pone value.value por que tiene una propiedad value 
    esto es use Field de vee-validate -->
    <v-form class="mt-10">
      <v-text-field class="mb-5" label="Título Propiedad" v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value" />

      <!-- acepta iconos de material desing busco aca https://pictogrammers.com/library/mdi/ con el prefijo mdi -->
      <v-file-input accept="image/jpeg" label="Fotografía" prepend-icon="mdi-camera" class="mb-5"
        v-model="imagen.value.value" :error-messages="imagen.errorMessage.value"
        @change="uploadImage"
        >
      </v-file-input>

      <div v-if="image" class="my-5">
        <p class="font-weight-bold">Imagen Propiedad: </p>
        <img :src="image" class="w-50">
      </div>

      <v-text-field class="mb-5" label="Precio" v-model="precio.value.value"
        :error-messages="precio.errorMessage.value" />

      <v-row>
        <v-col cols="12" md="4">
          <v-select label="Habitaciones" class="mb-5" :items="items" v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value"></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-select label="WC" class="mb-5" :items="items" v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-select label="Lugares de estacionamiento" class="mb-5" :items="items" v-model="estacionamiento.value.value"
            :error-messages="estacionamiento.errorMessage.value"></v-select>
        </v-col>
      </v-row>

      <v-textarea class="mb-5" label="Decripción" v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value">
      </v-textarea>

      <v-checkbox label="Alberca" v-model="alberca.value.value" :error-messages="alberca.errorMessage.value" />

      <v-btn color="pink-accent-3" block @click="submit">
        Agregar Propiedad
      </v-btn>
    </v-form>
  </v-card>
</template>
