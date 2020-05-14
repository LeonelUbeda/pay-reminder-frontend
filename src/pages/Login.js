import { connect } from "unistore/react";
import React, { useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom' 
import {actions} from '../store'
import {loginUser, storeTokenUserInCookie} from '../utils/login'
import {useHistory} from 'react-router-dom'



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


    function requesTokenUser(){
        loginUser({email: state.email, password: state.password})
        .then(response => {
            return response.json()
        })
        .then(response => {
            // Esto se puede mejorar pero bueno...
            if (typeof response.non_field_errors !== 'undefined'){
                setState({
                    ...state,
                    error: response.non_field_errors
                })
            }else if(typeof response.email !== 'undefined'){
                setState({
                    ...state,
                    error: response.email
                })
            }else{
                storeTokenUserInCookie(response.key)
                setTokenUser(response.key)
                setUserLoggedStatus(true)
                setState({
                    ...state,
                    redirect: '/'
                })
            }
        }) 
        .catch(error => {
            
        })
    }


    if(isLoggedIn){
     
        return(
            <Redirect to="/payments"/>
        )
    }

    return(
        <div className="pt-20 flex flex-col items-center">
            <div className="form-container w-4/5">
                {<DisplayError error={state.error}/>}
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input value={state.email} onChange={handleEmail} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
                type="email" placeholder="jane@example.com" id="email"/>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5" htmlFor="email">
                    Password
                </label>
                <input value={state.password} onChange={handlePassword} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
                type="password" placeholder="************" id="password"/>
                <button onClick={requesTokenUser} className="ml-auto mt-5 flex bg-teal-700 text-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Iniciar sesion
                </button>
            </div>
        </div>
    )
})