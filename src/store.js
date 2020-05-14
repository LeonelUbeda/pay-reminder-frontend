import createStore from 'unistore'


let store = createStore({ 
    isLoggedIn: false,
    userInfo: {},
    tokenUser: '',
    isLoadingApp: true,
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
    }
}


export { actions, store }
export default store