import { Histories } from './databases'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'
/*

{
    month: String: (0-11),
    year: String: (???? - ????),
    paidAt: String: moment().format('YYYY-MM-DD'),
    state: Number: (Hidde, Active, Paid,  Etc...),
    paidAmount?: Integer,
    payment: 23094820934823094823094
}


*/

export async function getAllStoredHistories(){
    let historiesKeys = await Histories.keys()
    let histories = []
    for (let key of historiesKeys){
        histories.push(await Histories.getItem(key))
    }
    return histories
}


export async function createLocalHistory(history){
    return new Promise((resolve, reject) => {
        if('month' in history && 'year' in history && 'payment' in history){

            let {month, year, payment} = history
            let id = uuidv4()
            let createdAt = moment().format('YYYY-MM-DD')
            Histories.setItem(id, {
                ...history, id, month, year, payment, createdAt,
            }).then(element => {
                resolve(element)
            })
        }
    })
}


export async function findAndDeleteHistory(key){
    return new Promise((resolve, reject) => {
        Histories.removeItem(key)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        })
    })
}

