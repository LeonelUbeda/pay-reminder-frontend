import { Settings } from './databases'
import Group from '../Classes/Group'

export const DEFAULT_GROUP = new Group({name: 'No groups', id: 'NO_GROUPS'})



async function isFirstVisit(){
    if (await Settings.getItem('visited') === null){
        return true
    }
    return false

}

export async function firstVisit(){
    console.log('primera visita')
    let holap = await Promise.all([
        new Group({name: 'Entertainment'}).create(),
        new Group({name: 'Basic expenses'}).create(),
        new Group({name: 'Personal Care'}).create(),
        new Group({name: 'Education'}).create()
    ])
    console.log(holap)
}


export async function initialize(){
    if(await isFirstVisit()){
        await firstVisit()
        await Settings.setItem('visited', true)
    }
    
    if(!await DEFAULT_GROUP.exists()){
        DEFAULT_GROUP.create()
    }

}

