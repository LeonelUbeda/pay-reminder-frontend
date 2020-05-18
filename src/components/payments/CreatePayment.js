import React, { useState, useEffect, Fragment } from 'react'
import Select from 'react-select'
import { postData } from '../../utils/fetch'
import BASE_URI from '../../urls'
import { CreateLocalPayment } from '../../Local'
import { Frequency, State } from '../../Options'
import { connect } from 'unistore/react'
import { actions } from '../../store'
import {formatGroupsToSelectInput} from '../../utils/transforms'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import {transformCurrenciesToSelectInput} from '../../utils/transforms'
import SlideDown from 'react-slidedown'
import ARROW_ICON from '../../assets/img/arrow-icon.svg'

export default connect([''], actions) (function  CreatePayment(props){
    const [state, setState] = useState({
        showMoreOptions: false,
        name: '',
        paymentDay: '',
        group: '',
        frequency: 1,
        statePayment: 1,

        // Notifications
        remindIsActivated: false,
        remindMeBefore: 5,

        // Payments
        paymentAmountChanges: false,
        amountToPay: 10,
        accountID: ''
        
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

    function handleChangeToggle(event){
        setState({
            ...state,
            [event.target.name]: event.target.checked
        })
    }
    function toggleMoreOptions(){
        setState({
            ...state,
            showMoreOptions: !state.showMoreOptions
        })
    }
    function send(){
        let {name, paymentDay, group,  statePayment , frequency, remindMeBefore, remindIsActivated, paymentAmountChanges, amountToPay, accountID} = state
        CreateLocalPayment({name, paymentDay, frequency: Frequency.MONTHLY, state: State.ACTIVE, group})
        .then(response => {
            props.addPaymentToState(response)
            props.paymentCreated()
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
                className="default-input focus:outline-none"/>
                
            </div>
            <div className="mb-3">
                <span className="text-lg mb-2">Dia del pago <span className="text-xs">(1-31)</span></span>
                <input value={state.paymentDay} onChange={handleChange} name="paymentDay" type="number" max="31" min="1"
                className="default-input"/>     
            </div>
            {state.group}

            <span className="text-lg mb-2">Grupo</span>
            <Select onChange={handleChangeSelect} options={formatGroupsToSelectInput(props.groups)} placeholder="Buscar grupo..."/>

            <div className="flex cursor-pointer mt-8 mb-3" onClick={toggleMoreOptions}>
                <h2 className="mb-2 text-lg font-semibold ">Mostrar configuracion opcional</h2>
                <img src={ARROW_ICON} className={`${!state.showMoreOptions ? 'transform rotate-180' : null} w-4 ml-auto`}/>
            </div>

            <SlideDown>
                {state.showMoreOptions ? (
                <Fragment>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="remindIsActivated" className="text-lg mb-2">Notificar</label>

                        <Toggle onChange={handleChangeToggle} id="remindIsActivated"  name="remindIsActivated" defaultChecked={state.remindIsActivated}  className="ml-2"/>
                        
                        <SlideDown>
                            { state.remindIsActivated ? 
                            ( <div className="mb-3">
                                    <span className="text-lg mb-2">Recordarme antes de </span>
                                    <span className="text-xs"> (dias, min: 1, max: 10)</span>
                                    <input value={state.remindMeBefore} onChange={handleChange} name="remindMeBefore" type="number" max="10" min="1"
                                    className="default-input"/>
                                </div>)
                            : null }
                        </SlideDown>
                    
                    </div>
                
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="paymentAmountChanges" className="text-lg mb-2">El precio a pagar es variable</label>
                            
                        <Toggle id="paymentAmountChanges" onChange={handleChangeToggle}  name="paymentAmountChanges" defaultChecked={state.paymentAmountChanges} className="ml-2"/>
                        
                        <SlideDown>
                            { !state.paymentAmountChanges ?
                                (
                                    <div>
                                        <label htmlFor="amountToPay text-lg">Cantidad a pagar</label>
                                        <input id="amountToPay" value={state.amountToPay} onChange={handleChange} name="amountToPay" className="default-input"/>
                                    </div>

                                )
                            : null} 
                        </SlideDown>
                        
                    </div>
                    <div className="mb-3 flex flex-col">
                        <span className="text-lg">Identificador para pagar</span>
                        <span className="text-xs mb-2">Ejemplo: Numero de cliente</span>
                        <input value={state.paymentDay} onChange={handleChange} name="paymentDay" type="number" max="31" min="1"
                        className="default-input"/>     
                    </div>
                </Fragment> ) : null}    
            </SlideDown>


            <div className="w-full py-3 flex top-menu-bg mt-3 cursor-pointer" onClick={send}>
                <span className="mx-auto font-semibold text-xl text-white">Enviar</span>
            </div>
        </div>
    )
})