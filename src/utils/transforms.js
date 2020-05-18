import {Currency} from '../Options'
export function formatGroupsToSelectInput(groups){
    let newGroup = []
    for(let group of groups){
        if(group.id !== 'default'){
            newGroup.push({
                value: group.id,
                label: group.name
            })
        }
    }

    return newGroup
}



export function transformCurrenciesToSelectInput(){
    return Currency.map(currency => {
        return {
            value: currency.id,
            label: `${currency.title} + (${currency.isoCode})`
        }
    })
}

