import { connect } from "unistore/react";
import {Link} from 'react-router-dom'
import React from 'react'
import {actions} from '../store'
import {logoutUser} from '../utils/login'



export default connect(['isLoggedIn'], actions)(({isLoggedIn}) => {

    let content;

    if(isLoggedIn){
        content = (
            <div className="">
                <ul className="flex">
                    <li className="ml-3">
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className="ml-3">
                        <Link to="/payments">Pagos</Link>
                    </li>
                    <li className="ml-3">
                        <Link to="/configuracion">Configuracion</Link>
                    </li>
                    <li className="ml-3" onClick={logoutUser}>
                        Cerrar sesion
                    </li>
                </ul>
            </div>
        )
    }else{
        content = (
            <div>
                <ul className="flex">
                    <li className="ml-3">
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className="ml-3">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="ml-3">
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </div>
        )
    }

    return(
        <div className="top-menu-color top-menu-bg font-semibold text-white text-ms py-2 px-3 inset-x-0 fixed flex justify-center z-10">
            <div className="max-w-screen-sm">
                <div className="w-full">
                    {content}
                </div>
            </div>
        </div>
    )

    
})