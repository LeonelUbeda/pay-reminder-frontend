import { Groups } from './databases'


export async function getAllStoredGroups(){
    let groupsKeys = await Groups.keys()
    let groups = []
    groupsKeys.forEach(async key => {
        groups.push(await Groups.getItem(key))
    })
    console.log(groups)
    return groups
}
