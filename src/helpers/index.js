// para usar un copmputed con parametro pero no lo usare
// por quye me lo traje de usePropiedades por que cada vez
// quue lo llamo genera un llamado a base de datos

//    // crear computed property con parametro
//    const propertyPrice = computed(()=>{

//     return (price) =>

//         Number(price).toLocaleString('es-CL',{
//             style: 'currency',
//             currency: 'CLP'
//         })

// })

// crear computed property con parametro
export const propertyPrice = (price) =>
  Number(price).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
