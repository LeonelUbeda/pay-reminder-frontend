import { Groups } from './databases'


export const DEFAULT_GROUP = {
    id: 'default',
    name: 'Sin grupo'
}



export async function initialize(){

    let defaultGroup = await Groups.getItem('default')
    if(defaultGroup === null){
        await Groups.setItem(DEFAULT_GROUP.id, DEFAULT_GROUP)
    }

}

