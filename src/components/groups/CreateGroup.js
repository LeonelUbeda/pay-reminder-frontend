import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { CreateLocalGroup } from '../../Local'
import { connect } from 'unistore/react'
import {actions} from '../../store'








function DisplayGroups(props){

    return(
        <div>
            {props.groups.map(chale => {
                return (
                    <span key={chale.id}>{chale.name}</span>
                )
            })}
        </div>
    )
}



export default connect('groups', actions)(({groups, addGroupToState, removeGroupFromState, toggleIsCreatingGroup}) => {
    const [state, setState] = useState({
        name: '',
    })

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function send(){
        let {name} = state
        if(name === ''){
            return 
        }
        CreateLocalGroup({name})
        .then(response => {
            addGroupToState(response)
            toggleIsCreatingGroup()
        })
    }

    return (
        <div className="flex flex-col">
            <div className="mb-3">
                <span className="text-lg mb-2">
                    Nombre del grupo 	&nbsp;
                    <span className="text-xs">
                        Ejemplo: 	&nbsp;
                        <span className="text-red-600">Entretenimiento</span>
                    </span>
                </span>
                <input value={state.name} onChange={handleChange} name="name" type="text"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
            </div>
            
            <div className="w-full py-3 flex top-menu-bg mt-3" onClick={send}>
                <span className="mx-auto font-semibold text-xl text-white">Enviar</span>
            </div>
        </div>
    )
})