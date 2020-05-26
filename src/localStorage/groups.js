import { Groups, Payments } from './databases'
import {findAndEditPayment as findAndUpdatePayment} from './payments'

export async function getAllStoredGroups(){
    let groupsKeys = await Groups.keys()
    let groups = []
    groupsKeys.forEach(async key => {
        groups.push(await Groups.getItem(key))
    })
    console.log(groups)
    return groups
}

export async function findAndUpdateGroup(group){
    return new Promise((resolve, reject) => {
        Groups.getItem(group.id)
        .then(oldGroup => {
            if(oldGroup === null){
                reject('No se ha encontrado un grupo con ese identificador')
            }else{
                Groups.setItem(group.id, group).then(updatedGroup => {
                    console.log(group)
                    resolve(updatedGroup)
                })
            }
            
        }).catch(error => {
            reject(error)
        })
    })
}


export async function deleteGroupAndUpdatePayments(groupId){
    let paymentsKeys = await Payments.keys()
    paymentsKeys.forEach(async key => {
        let payment = await Payments.getItem(key)
        if (payment.group === groupId){
            payment.group = ''
        }
        let updatedPayment = await findAndUpdatePayment(payment)
    })
    await Groups.removeItem(groupId)
}