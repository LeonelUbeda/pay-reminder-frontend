import { connect } from "unistore/react";
import { actions } from "../../store";
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import {formatGroupsToSelectInput} from '../../utils/transforms'
import {findAndEditPayment, findAndDeletePayment} from '../../localStorage/payments'


export default connect(['groups'], actions)((props) => {
    const [state, setState] = useState({
        id: '',
        name: '',
        paymentDay: '',
        group: ''
    })
    useEffect(() => {
        let {name , paymentDay, group, id} = props.item
        setState({
            id,
            name,
            paymentDay,
            group
        })
    }, [])

    function save(){
        let newItem = {
            ...props.item,
            name: state.name,
            paymentDay: state.paymentDay,
            group: state.group
        }
        findAndEditPayment(newItem).then(updatedPayment => {
            props.updatePaymentFromState(updatedPayment)
            props.toggleEditMode()
        })
    }

    function handleChangeSelect(e){
        setState({
            ...state,
            group: e.value
        })
    }
    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    function deletePayment(){
        findAndDeletePayment(state.id)
        .then(() => {
            props.removePaymentFromState(state.id)
            props.toggleEditMode()
        })
        
    }
    return (
        <div className="pt-2 pb-4 flex flex-col">
            <div className="flex flex-col">
                <div className="flex">
                    <span onClick={props.toggleEditMode} className="mb-3 cursor-pointer pr-3 py-1 rounded-md ">Back</span>
                    <span onClick={deletePayment} className="mb-3 ml-auto px-3 py-1 rounded-md cursor-pointer">🗑️Delete</span>
                </div>
                <span className="text-lg mb-2">
                    Payment name 	&nbsp;
                    <span className="text-xs">
                        Example: 	&nbsp;
                        <span className="text-red-600">Spotify</span>
                    </span>
                </span>
            </div>
            
            <input value={state.name} onChange={handleChange} name="name" type="text"
            className="mb-3 default-input"/>
            <Select value={formatGroupsToSelectInput(props.groups).filter(option => option.value === state.group)} 
            onChange={handleChangeSelect} options={formatGroupsToSelectInput(props.groups)} />
            
            <button onClick={save} className="px-3 py-1 rounded-md mt-3 ml-auto">💾Save</button>
        </div>
    )
})