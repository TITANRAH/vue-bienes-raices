<script setup>
import { RouterView } from 'vue-router'

import { useAuthStore } from './stores/auth'
import { storeToRefs } from 'pinia';

const auth = useAuthStore()
// solo funciona este destructuring para elementos reactivos 
// ref reactive computed
// const {isAuth} = storeToRefs(auth)

// para funcionalidades puedo declarar el store como arriba con la const auth 
// y luego destructuring en auth
// const {login} = auth;

</script>

<template>
  <!-- en el buscador de documentacion poner v-card y podemos ver losprops
que se pueden utilizar con v-card -->
  <v-card elevation="3" max-width="1200" class="mx-auto">

    <v-layout>
      <v-app-bar color="blue-darken-1">

        <!-- esto ubica el elemento al lado derecho -->
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }">
            Bienes Raices - VueFire
          </v-btn>

        </template>
        <!-- esto ubica el elemento al lado izquierdo -->
        <template v-slot:append>
          <div v-if="auth.isAuth">

            <v-btn :to="{ name: 'admin-propiedades' }">
              Admin
            </v-btn>
            <v-btn
            @click="auth.logout()"  
            >
              Cerrar Sesión
            </v-btn>
          </div>

          <div v-else>
            <v-btn :to="{ name: 'home' }">
              Inicio
            </v-btn>
            <v-btn :to="{ name: 'login' }">
              Iniciar Sesión
            </v-btn>

          </div>

        </template>

      </v-app-bar>

      <v-main>
        <v-container>
          <RouterView />

        </v-container>
      </v-main>

    </v-layout>
  </v-card>
</template>

