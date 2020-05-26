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
                <ul className="flex justify-around">
                    <li>
                        <Link to="/">🏠Inicio</Link>
                    </li>
                    <li>
                        <Link to="/payments">📚Pagos</Link>
                    </li>
                    <li>
                        <Link to="/groups">📂Grupos</Link>
                    </li>
                    
                    <li >
                        <Link to="/configuracion">🛠️Ajustes</Link>
                    </li>
                    <li className="" onClick={logoutUser}>
                    
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
        <div className="top-menu-color top-menu-bg font-semibold text-white text-ms py-2 px-2 inset-x-0 fixed flex justify-center z-10">
            <div className="max-w-screen-sm w-full">
                <div className="w-full">
                    {content}
                </div>
            </div>
        </div>
    )
})