import Local from 'localforage'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { Frequency, State } from './Options'


let Payments = Local.createInstance({
    name: 'payments'
})


let Groups = Local.createInstance({
    name: 'groups'
})


export function checkIfUserIsLogin(){
    Local.getItem('user').then(user => {
        if (user === null){
            return false;
        }else{
            return true
        }
    })
}




let groupExample = {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    name: 'Chaaale',
}


let postExample = {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    createdAt: '2020-01-30',
    name: 'Hola',
    group: null || '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    frequency: Frequency.MONTHLY,
    state: State.ACTIVE
}


export function CreateLocalGroup({name}){
    return new Promise((resolve, reject) => {
        if( typeof name === 'undefined' ){
            reject('Argumentos incorrectos')
        }else{
            let group = {
                id: uuidv4(),
                name
            }

            Groups.setItem(group.id, group)
            .then(createdGroup => {
                resolve(createdGroup)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        }
    })
}


export function CreateLocalPayment({name, group, frequency, state, paymentDay}){
    console.log(name, group, frequency, state )
    return new Promise((resolve, reject) => {
        if( typeof name === 'undefined' || typeof group === 'undefined' || typeof frequency === 'undefined' || 
            typeof state === 'undefined' || typeof paymentDay === 'undefined'){

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
                    state,
                }
    
                Payments.setItem(payment.id, payment).then((value) => {
                    console.log(value)
                    resolve(value)
                }).catch((error) => {
                    reject(error)
                })
            })
        }
        
    })
}





export async function getGroups(){
    let groupsKeys = await Groups.keys()
    return groupsKeys.map(group => Groups.getItem(group))
}


