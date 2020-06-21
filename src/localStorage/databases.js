import LocalStorage from 'localforage'
import { Frequency, State } from '../Options'

export const Payments = LocalStorage.createInstance({
    name: 'payments'
})




export const Histories = LocalStorage.createInstance({
    name: 'histories'
})

export const Groups = LocalStorage.createInstance({
    name: 'groups'
})



export const Settings = LocalStorage.createInstance({
    name: 'settings'
})





export function checkIfUserIsLogin(){
    LocalStorage.getItem('user').then(user => {
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
