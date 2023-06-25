<script setup>


import {useForm, useField} from 'vee-validate'
import { loginSchema as validationSchema } from '@/validation/loginSchema'
import { useAuthStore } from '@/stores/auth';
// creo un archivo de validaciones lo importo y lo agrego aca
const { handleSubmit } = useForm({validationSchema})


const auth = useAuthStore()


const email = useField('email')
const password = useField('password')



const submit = handleSubmit((values)=>{
    auth.login(values)
})


</script>

<template>
    <v-card flat max-width="600" class="mx-auto my-10">
        <v-card-title class="text-h4 font-weight-bold" tag="h3">

            Iniciar Sesion
        </v-card-title>

        <v-card-subtitle class="text-h5">
            Inicia Sesión con tu cuenta
        </v-card-subtitle>

        <v-alert
            v-if="auth.hasError"
            class="my-5"
            type="error"
            :title="auth.errorMsg"
            
        >


        </v-alert>

        <v-form class="mt-5">
            <v-text-field
                type="email"
                label="Email"
                bg-color="blue-grey-lighten-5"
                v-model="email.value.value"
                class="mb-3"
                :error-messages="email.errorMessage.value"
            />
            <v-text-field
                type="password"
                label="Password"
                bg-color="blue-grey-lighten-5"
                v-model="password.value.value"
                class="mb-3"
                :error-messages="password.errorMessage.value"

            />

            <v-btn 
                block
                color="pink-accent-3"
                @click="submit"
                >
                Inicar Sesión
            </v-btn>
        </v-form>
    </v-card>
</template>


<!-- la asociacion es la siguiente

1 traemos desde vee validate useForm useField 

2 creamos dos campos que seran useField, email y password 

3 declaramos handleSubmit que esta destructurado de useForm y en use Form 
le pasamos el archivo de validaciones creado esxternamente llamado 
loginSchema pero con as le pusimos el mimso nombre de la propiedad de useForm 
validationSchema  

4 creamos una constante llamada submit que es igual al handleSubmit 

4 cramos un boton v-btn y en la funcion @click le pasamos la cosnbtante submit que a su vez es handlesubmit -->