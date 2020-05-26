import createStore from 'unistore'
import { getAllStoredGroups } from './localStorage/groups'

let store = createStore({ 
    isLoggedIn: true,
    userInfo: {},
    tokenUser: '',
    isLoadingApp: true,
    payments: [],
    groups: [],
    histories: []
})


let actions = {
    setTokenUser: (store, token) =>{
        return {
            tokenUser: token,
        }
    },
    setUserLoggedStatus: (store, status) =>{
        return {
            isLoggedIn: status
        }
    },

    setIsLoadingAppTo: (store, value) => {
        return{
            isLoadingApp: value
        }
    },

    // ----------   PAYMENTS  ---------------//
    // ADD PAYMENT TO STATE
    addPaymentToState: (store, newPayment) => {
        return {
            payments: [
                ...store.payments,
                newPayment
            ]
        }
    },
    
    // INITIALIZE PAYMENTS AND STORE IN STATE
    setPaymentsToState: (store, payments) => {
        return {
            payments
        }
    },

    // FIND AND REMOVE PAYMENT FROM STATE
    removePaymentFromState: (store, paymentID) => {
        let newPayments = store.payments.filter(payment => {
            return payment.id !== paymentID
        })
        return {
            payments: newPayments
        }
    },

    updatePaymentFromState: ({payments}, newPayment) => {
        let findPaymentIndex = (element) => element.id === newPayment.id
        let newPaymentsArray = [...payments]
        newPaymentsArray[newPaymentsArray.findIndex(findPaymentIndex)] = newPayment
        return {
            payments: newPaymentsArray
        }
    },


    // ----------   GROUPS  ---------------//
    setGroupsToState: (store, groups) => {
        return {
            groups
        }
    },

    addGroupToState: (store, newGroup) => {
        return {
            groups: [
                ...store.groups,
                newGroup
            ]
        }
    },

    updateGroupFromState: ({groups}, newGroup) => {
        console.log(newGroup)
        let findPaymentIndex = (element) => element.id === newGroup.id
        let newGroupsArray = [...groups]
        newGroupsArray[newGroupsArray.findIndex(findPaymentIndex)] = newGroup
        return {
            groups: newGroupsArray
        }
    },
    // Recibe un id de grupo y lo elimina
    removeGroupFromState: (store, groupID) => {
        let newGroups = store.groups.filter(group => {
            return group.id !== groupID
        })
        
        let newPayments = store.payments.map(payment => {
            if(payment.group === groupID){
                payment.group = ''
            }
            return payment
        })

        console.log(store.groups, newGroups)
        return {
            groups: newGroups,
            payments: newPayments
        }
    },



    // -------- HISTORIES -------//

    setHistoriesToState: (store, histories) => {
        return {
            histories
        }
    },

    addHistoryToState: (store, history) => {
        return {
            histories: [
                ...store.histories,
                history
            ]
        }
    },

    removeHistoryFromState: (store, id) => {
        let newHistoriesArray = store.histories.filter(history => {
            return history.id !== id
        })

        return {
            histories: newHistoriesArray
        }
    }
}


export { actions, store }
export default store