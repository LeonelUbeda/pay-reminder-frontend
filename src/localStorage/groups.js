import { Groups, Payments } from './databases'
import {findAndEditPayment as findAndUpdatePayment} from './payments'
import Group from '../Classes/Group'
import {DEFAULT_GROUP} from '../localStorage/defaultValues'

export function addGroupToLocal(group){
    return new Promise((resolve, reject) => {
        if(!group instanceof Group){
            reject('A Group instance must be provided')
        }
        Groups.getItem(group.id)
        .then(search => {
            if(search !== null){
                reject('Already Exists')
            }

            Groups.setItem(group.getId(), group.getValues())
            .then(createdGroup => {
                resolve()
            }).catch(error => {
                console.log(error)
                reject()
            })
        })

        
        
    })
}

export async function groupExistsInLocal(groupId){
    let group = Groups.getItem(groupId)
    return group !== null ? true : false
}

export async function getAllStoredGroups(){
    let groupsKeys = await Groups.keys()
    let groups = await Promise.all( groupsKeys.map(key => Groups.getItem(key) ))
    return groups.map(element => new Group(element))
}

export async function findAndUpdateGroup(group){
    return new Promise((resolve, reject) => {
        if(!group instanceof Group){
            reject('A Group instance must be provided')
        }
        Groups.getItem(group.getId())
        .then(oldGroup => {
            if(oldGroup === null){
                reject('No group found')
            }
            Groups.setItem(group.getId(), group.getValues())
            .then(() => {
                resolve()
            })
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
            payment.group = DEFAULT_GROUP.getId()
        }
        let updatedPayment = await findAndUpdatePayment(payment)
    })
    await Groups.removeItem(groupId)
}