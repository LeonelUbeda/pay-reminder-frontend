import createStore from 'unistore'
import { getAllStoredGroups } from './localStorage/groups'

let store = createStore({ 
    isLoggedIn: true,
    userInfo: {},
    tokenUser: '',
    isLoadingApp: true,
    payments: [],
    groups: []
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

    removeGroupFromState: (store, groupID) => {
        let newGroups = store.groups.filter(group => {
            return group.id !== groupID
        })
        return {
            groups: newGroups
        }
    }
}


export { actions, store }
export default store