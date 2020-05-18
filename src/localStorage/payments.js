import {Groups, Payments} from './databases'



// Busca entre el arreglo de objetos tipo groups, si existe alguno con el id especificado
function returnNameOfGroupWithKey(groups, key){
    for (let group of groups ){
        if(group.id === key){
            return group.name
        }
    }
    return null
}


export async function getAllStoredPayments(){
    /*let groupsKeys = await Groups.keys()
    let groups = []
    
    groups = await groups.map(group => Groups.getItem(group))*/
    let paymentsKeys = await Payments.keys()
    let payments = []
    for( let paymentKey of paymentsKeys){
        payments.push(await Payments.getItem(paymentKey))
    }
    /*payments = payments.map(async payment => {
        let paymentItem = await Payments.getItem(payment)
        if(paymentItem.group !== null){
            paymentItem.group__name = returnNameOfGroupWithKey(groups, paymentItem.group)
        }
    })*/
    return payments
}


// recibe un objeto tipo Payment, por lo tanto tiene que tener la propiedad id
export async function findAndEditPayment(payment){
    return new Promise((resolve, reject) => {
        if(typeof payment.id === 'undefined'){
            reject('Es requerida la propiedad id') 
        }
        Payments.getItem(payment.id)
        .then((storedPayment) => {
            if(storedPayment === null){
                reject('No existe un elemento con el id proporcionado')
            }
            Payments.setItem(payment.id, {
                ...storedPayment,
                ...payment
            }).then(updatedPayment => {
                resolve(updatedPayment)
            })
        })
        .catch(error => {
            reject(error)
        })
    })
}