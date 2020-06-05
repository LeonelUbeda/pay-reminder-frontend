import { connect } from "unistore/react";
import React, { useEffect, useState, useCallback } from 'react'
import {Redirect} from 'react-router-dom' 
import {actions} from '../store'
import {loginUser, storeTokenUserInCookie} from '../utils/login'
import app from '../base'
import {auth as firebaseAuth} from 'firebase'


function DisplayError({error}){
    const [state, setState] = useState({
        show: true
    })
    
    if(state.show && error !== ''){
        return(
            <div className="w-100 py-1 px-2 bg-red-400 text-white mb-3">
                <h5>{error}</h5>
            </div>
        )
    }else{
        return null
    }
}

export default connect(['isLoggedIn'], actions)(({setTokenUser, setUserLoggedStatus, isLoggedIn}) => {
    const [state, setState] = useState({
        error: '',
        email: '',
        password: '',
        redirect: null,
    })

    useEffect(() => {

    }, [])

    function handleEmail(e){
        setState({
            ...state,
            email: e.target.value
        })
    }

    function handlePassword(e){
        setState({
            ...state,
            password: e.target.value
        })
    }


    const handleLogin = async event => {
        event.preventDefault()
        const {email, password} = event.target.elements
        try {
            let response = app.auth().signInWithEmailAndPassword(email.value, password.value)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }


    const handleLoginGoogle = async event => {
        try {
            const provider = new firebaseAuth.GoogleAuthProvider()
            const credentials = await app.auth().signInWithPopup(provider)
            console.log(credentials.user.displayName, credentials)
        } catch (error) {
            console.log(error)
        }
   
    }


    if(isLoggedIn){
        return(
            <Redirect to="/payments"/>
        )
    }

    return(
        <div className="pt-20 flex flex-col items-center">
            <form className="form-container w-4/5" onSubmit={handleLogin}>
                {<DisplayError error={state.error}/>}
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input  className="default-input" 
                type="email" placeholder="jane@example.com" id="email"/>

                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5" htmlFor="password">
                    Password
                </label>
                <input className="default-input" 
                type="password" placeholder="Password" id="password"/>
                <button type="submit" className="ml-auto mt-5 flex bg-teal-700 text-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Iniciar sesion
                </button>
            </form>

            <h1 onClick={handleLoginGoogle} className="cursor-pointer">Login with Google</h1>
        </div>
    )
})