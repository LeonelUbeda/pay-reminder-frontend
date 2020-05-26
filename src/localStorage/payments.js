import {Groups, Payments} from './databases'
import moment from 'moment'
import {v4 as uuidv4} from 'uuid'


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

export async function findAndDeletePayment(key){
    return new Promise((resolve, reject) => {
        Payments.removeItem(key)
        .then((removedItem) => {
            resolve(removedItem)
        })
        .catch(error => {
            reject(error)
        })
    })
}




export function CreateLocalPayment({
    name, 
    paymentDay, 
    frequency, 
    paymentState, 
    group, 
    description,
    remindMeBefore, 
    remindIsActivated, 
    paymentAmountChanges, 
    amountToPay, 
    clientIdentifier
}){
    console.log(name, group, frequency, paymentState )
    return new Promise((resolve, reject) => {
        if( typeof name === 'undefined' || typeof group === 'undefined' || typeof frequency === 'undefined' || 
            typeof paymentState === 'undefined' || typeof paymentDay === 'undefined'){

            reject('Argumentos incorrectos')
        }else{
            Groups.getItem(group).then((groupItem) => {
                console.log(group)
                if (groupItem === null){
                    reject('No existe ese grupo!')
                }
            }).then(() => {
                let payment = {
                    id: uuidv4(),
                    createdAt: moment().format('YYYY-MM-DD'),
                    name,
                    paymentDay,
                    frequency,
                    group, 
                    description,
                    paymentState,
                    remindMeBefore, 
                    remindIsActivated, 
                    paymentAmountChanges, 
                    amountToPay, 
                    clientIdentifier
                }
                Payments.setItem(payment.id, payment).then((createdPayment) => {
                    console.log(createdPayment)
                    resolve(createdPayment)
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    })
}