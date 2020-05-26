

function findPaymentsWithoutGroups(payments){
    return payments.filter(payment => (payment.group === null || typeof payment.group === 'undefined' || payment.group === ""))
}


function toLastPositionGroupsWithoutChilds(groups){
    // Esto se puede mejorar, pero por tiempo ahi lo dejo
    let groupsWithChilds = groups.filter(group => group.items.length > 0) 
    // Por ahora los grupos que no tienen items no se muestra :D
    //let groupsWithoutChilds = groups.filter(group => group.items.length === 0)
    return [...groupsWithChilds,/* ...groupsWithoutChilds*/]
}





export function orderPaymentsByGroups(groups,payments ){
    /*groups = [
        {
            name: 'Compras',
            id: 1
            'items': [{}],
        }
    ]*/
    let newGroups = []
    for(let group of groups){
        let {id, name} = group
        let item = {
            name,
            id,
            items: []
        }
        for(let payment of payments){
            if (payment.group !== null && typeof payment.group !== 'undefined'){
                if(payment.group === id){
                    item.items.push(payment)
                }

            }else{

            }
        }
        newGroups.push(item)
    }

    let paymentsWithoutGroups = findPaymentsWithoutGroups(payments)

    if(paymentsWithoutGroups.length > 0) {
        newGroups.push({
            name: 'Sin grupo',
            items: paymentsWithoutGroups
        })
    }
    return toLastPositionGroupsWithoutChilds(newGroups)
}


