import React, { useCallback } from 'react'
import { connect } from 'unistore/react'
import { actions } from '../store'
import app from '../base'
import { Link } from 'react-router-dom'


function SignUp (){
    const handleSignUp = async event => {
        event.preventDefault()
        const { email, password } = event.target.elements
        try {
            let response = await app.auth().createUserWithEmailAndPassword(email.value, password.value);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSignUp}>
                <input name="email" type="email" placeholder="Email..." className="default-input"/>
                <input name="password" type="password" placeholder="Password..." className="default-input"/>
                <button type="submit">Enviar</button>
            
            </form>
            <h2>Ya tienes cuenta? <Link to="/login"><span className="text-red-600">Iniciar sesion</span></Link></h2>
        </div>
    )
}



export default connect('',actions)(SignUp)