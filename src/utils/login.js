import { postData, getData } from '../utils/fetch'
import {LOGIN_URL, IS_USER_LOGGED_IN_URL, LOGOUT_URL} from '../urls'
import Cookie from 'js-cookie'


function loginUser({email, password}){
    return postData(LOGIN_URL, {
        email, password
    }, false)
}

function storeTokenUserInCookie(token){
    let finalToken = `Token ${token}`
    Cookie.set('Authorization', finalToken)
}



async function isTokenValid(){
    return new Promise((resolve, reject) => { 
        getData(IS_USER_LOGGED_IN_URL, false)
        .then(async response => {
            console.log(response)
            if(!response.ok){
                reject(response.json())
            }else{

                return response.json()
            }
        })
        .then(data => resolve(data))
    })
}


async function isUserIsLoggedIn(){
    return new Promise((resolve, reject) => {
        let token = Cookie.get('Authorization')

        if(typeof token === 'undefined'){
            reject(false)
        }
        isTokenValid()
            .then((data) => {
                console.log('Token valid')
                resolve(token)
            })
            .catch(error => {
                console.log('Token not valid')
                reject(false)
            })
        
    })
}

async function logoutUser(){
    Cookie.remove('Authorization')
    postData(LOGOUT_URL, {})
    .then(response => {
        console.log(response)
    })
}


export {loginUser, storeTokenUserInCookie, isUserIsLoggedIn, logoutUser}