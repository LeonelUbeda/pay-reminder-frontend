import { Groups } from './databases'



export async function initialize(){

    let defaultGroup = await Groups.getItem('default')
    if(defaultGroup === null){
        await Groups.setItem('default', {
            id: 'default',
            name: 'Sin grupos',
        })
    }

}

