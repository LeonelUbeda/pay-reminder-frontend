
import {v4 as uuid} from 'uuid'
import {Groups} from '../localStorage/databases'
import {actions, store} from '../store'
import {addGroupToLocal, groupExistsInLocal, deleteGroupAndUpdatePayments, findAndUpdateGroup} from '../localStorage/groups'


export default class Group{

    constructor({name, id}){
        this.name = name
        this.id = id || uuid()
    }
    create(){
        //El create y el update es lo mismo, solo que el create verifica el id xD
        return new Promise(async (resolve, reject) => {
            try {
                let group = new Group(this.getValues())
                //LocalStorage
                await addGroupToLocal(this)
                //App State
                store.action(actions.addGroupToState)(this)

                resolve(group)
            } catch (error) {
                reject(error)
            }
        })

    }
    update(){
        return new Promise(async (resolve, reject) => {
            try {
                let group = new Group(this.getValues())
                await findAndUpdateGroup(group)
                store.action(actions.updateGroupFromState)(group)
                resolve(group)
            } catch (error) {
                reject(error)
            }
        })    
    }

    delete(){
        return new Promise(async (resolve, reject) => {
            try {
                //LocalStorage
                await deleteGroupAndUpdatePayments(this.getId())
    
                //App State
                store.action(actions.removeGroupFromState)(this.getId())
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }


    getValues(){
        return {
            id: this.id,
            name: this.name
            
        }
    }

    getId(){
        return this.id
    }

    async exists(){
        let local = await groupExistsInLocal(this.getId())

        return local
    }
}