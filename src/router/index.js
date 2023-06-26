import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
USEORI

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      // este sera el parametro que me sirve para ejecutar el guard de rutas
      meta: {requiresAuth: true}, // con poner el requiresAuth en la ruta padre basta para proteger a los hijos
      children: [
        {
          path: '/admin/propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue'),
          meta: {requiresAuth: true}, 
        },
        {
          path: '/admin/nueva',
          name: 'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue'),
          meta: {requiresAuth: true}, 
        },
        {
          path: '/admin/editar/:id',
          name: 'editar-propiedades',
          component: () => import('../views/admin/EditarPropiedadView.vue'),
          meta: {requiresAuth: true}, 
        },
     
      ]
    }

  ]
})

// guard de navegacion
router.beforeEach(async (to, from, next)=>{
  // console.log(to); //hacia donde vamos
  // console.log(from); //en donde nos encontramos
  // console.log(next); //ir al siguiente middleware

  // to.matched comprueba elemento padre e hijos cada ruta donde el meta requiredAuth esta en true
  // esto retorna que si el endpoint o ruta que estamos visitando requiere requiredAuth
  // que el usuario este autenticado en alguna de las rutas donde este el meta requiredAuth esta en true
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)

  // si una ruta requiere autenticacion comprobar que el usuario este autenticado
  if(requiresAuth){
    // la ruta esta protegida y necesitamos verificar que el usuario este autenticado
    // si la ruta requiere autenticacio y si la comprobacion se raliza ira al try si no se ira al catch
    try {
      // si la promesa se resuelve avanza hacia la vista 
      await authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      // si no se resuelve la promesa envialo a login para que vuelva a ejecutarse la comprobacion y seguir la navegacion normal
     next({name: 'login'})
      
    }
    // si no requiere autenticacion quiiere decir que no tiene el meta con requiredAuth dejalo ver la vista que corresponda osea las que no tienen el meta
  } else {
    // no esta protegido y con next mostramos la vista
    next()
    
  }
 

})


function authenticateUser(){
  // instanciamos la autenticacion mia en firebase proporcinada por vuefire esto evita que mandemos el getAuth que dice la docu
  // por que vuefire realiza el trabajo de ver mis credenciales en firebase
  const auth = useFirebaseAuth();

  // new promise tiene 2 parametros resolve se resuelve la condicion y reject se rechaza
  return new Promise((resolve, reject)=> {

    // dentro de esta promesa traigo nuevamente el onAuthStateChanged para comprobar una sesion activa
    // si devuelve el user esta funcion la promesa se resuelve con user si no se rechaza en reject
    const unsuscribe = onAuthStateChanged(auth,(user)=>{

      console.log('user desde el archivo de rutas', user)

      // esto se raliza para que solo una vez se haga la verificacion de sesion
      unsuscribe()
      // si la session esta activa osea que hay un usuario resolve el user la promesa se resuelve
      if(user){
        resolve(user)
      } else {
        // al poner reject se va hacia el catch de router.before y lo lleva a login
        reject()
      }
    } )

  })
}


export default router
