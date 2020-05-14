import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { postData } from '../utils/fetch'
import BASE_URI from '../urls'


function formatGroupsToSelectInput(groups){
    let newGroup = []
    for(let group of groups){
        newGroup.push({
            value: group.id,
            label: group.name
        })
    }

    return newGroup
}



export default function CreatePayment(props){
    const [state, setState] = useState({
        name: '',
        payment_day: '',
        group: '',
        frequency: 1,
        statePayment: 1,
        groupsOption: []
    })

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    function handleChangeSelect(e){
        setState({
            ...state,
            group: e.value
        })
    }
    function send(){
        let {name, payment_day, group,  statePayment ,frequency} = state
        postData(BASE_URI+'payments/', {
            name,
            payment_day,
            group,
            frequency,
            state: statePayment
        })
        .then(response => {
            console.log(response)
        })
    }
    return (
        <div key={props} className="flex flex-col">
            <div className="mb-3">
                <span className="text-lg mb-2">
                    Nombre del pago 	&nbsp;
                    <span className="text-xs">
                        Ejemplo: 	&nbsp;
                        <span className="text-red-600">Spotify</span>
                    </span>
                </span>
                <input value={state.name} onChange={handleChange} name="name" type="text"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                
            </div>
            <div className="mb-3">
                <span className="text-lg mb-2">Dia del pago <span className="text-xs">(1-31)</span></span>
                <input value={state.payment_day} onChange={handleChange} name="payment_day" type="number" max="31" min="1"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>     
            </div>
            {state.group}
            <Select onChange={handleChangeSelect} options={formatGroupsToSelectInput(props.groups)} />
            <h1 onClick={send}>Enviar</h1>
        </div>
    )
}