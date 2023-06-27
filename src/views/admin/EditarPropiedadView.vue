<script setup>
import { useRoute } from 'vue-router';
import { useFirestore } from 'vuefire';



const route = useRoute()


// asi rescato el id de la url
console.log(route.params.id);

</script>
<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Editar Propiedad</h2>
</template>
