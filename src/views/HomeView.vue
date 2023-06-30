<script setup>



import Propiedad from '../components/Propiedad.vue';
import usePropiedades from '../composables/usePropiedades'
import { propertyPrice } from '../helpers';

const {alberca, filterItems} = usePropiedades()

</script>

<template>

    <h1 class="text-center">Nuestras Propiedades</h1>
    <v-card-title class="text-h5">

      Búsqueda

      <v-checkbox
      label="Alberca"
      v-model="alberca"
      />

    </v-card-title>
    <v-row>
      <Propiedad
        v-for="propiedad in filterItems"
        :key="propiedad.id"
        :propiedad="propiedad"
        :price="propertyPrice"
        />

    
    </v-row>

</template>
