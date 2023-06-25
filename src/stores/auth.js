import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, computed, onMounted } from "vue";
import { useRouter} from 'vue-router'

export const useAuthStore = defineStore("auth", () => {

// al usar vuefire no tengoq ue pasar el getAuth que sale en la documentacion 
// de firebase en los metodos de onAuthStateChanged u otros
// ya que vuefire se encarga de eso de verificar mis credenciales en firebase
// PARA INTERACTUAR CON LA AUTENTICACION SE USA useFirebaseAuth 
// EN ESTE CASO PARA INTERACUTAR CON LA BASDE DE DATOS USAMOS useFirestore  

const auth = useFirebaseAuth();

  const errorMsg = ref("");
  // podemos validar mas facilmente si el usuario esta autenticado o no
  // al ponerlo como null
  const authUser = ref(null);

  const router = useRouter()

  console.log("authUser.value desde store", authUser.value);

//   diccionario de errores de firebase como vienen en ingles lo hago en español
  const errorCodes = {
    "auth/user-not-found": "Usuario no encontrado",
    "auth/wrong-password": "El password es incorrecto",
  };

  onMounted(() => {
    // onAuthStateChanged comrueba en firebase que el usuario esta autentiado esto es propio de firebase
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user AUTENTICADO desde onmounted store onAuthStateChanged,", user);
        // si el usuario esta autenticado le pasamos el usuario de valor al ref del usuario en el sitio
      authUser.value= user
    }
    });
  });

  const login = ({ email, password }) => {

    // signInWithEmailAndPassword funcion propia de firebase para loguearse
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // creo una variable user y digo que la respuesta es igual a esta variable userCredential.user que devuelve la funcion signInWithEmailAndPassword
        const user = userCredential.user;
        // digo que el user es igual a la variable del sitio ref y lo redirijo a admin-propiedades
        authUser.value = user;
        router.push({name: 'admin-propiedades'})
        //    console.log(authUser.value);
      })
      .catch((e) => {
        // asi inyectamos variables dentro de objetos para realizar alguna accion
        // relaciono el mensaje de error con el diccionario creado para pasar errores a español
        errorMsg.value = errorCodes[e.code];
      });
  };

  const logout = () => {

    // esta funcion me sirve para desloguarme de firebase
    // pero para el front necesito tambienb ejecutar codigo y pasar el ref a null nuevamente para ejecutar los guards
    signOut(auth).then(()=>{
        // asi el computed isAuth que verifica el usuario autenticado vuelve a funcionar y devolveria false
        authUser.value = null
        router.push({name: 'login'})
        console.log('hizo logout')
    }).catch(e =>{ 
        console.log(e)
    })
  }
    // si hay un error retorna el mensaje de error
  const hasError = computed(() => {
    return errorMsg.value;
  });

//   ESTO RETORNA TRUE O FALSE PARA SABER SI ESTA AUTENTICADO
  const isAuth = computed(()=>{
    return authUser.value
  })

  return {
    login,
    logout,
    hasError,
    errorMsg,
    authUser,
    isAuth
  };
});
