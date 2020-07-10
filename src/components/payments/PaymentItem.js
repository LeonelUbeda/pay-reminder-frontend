import React, { useState, useEffect } from 'react'
import {daysUntil, transformHistory} from '../../utils/dates'

//Slider animation
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'


//Moment
import moment from 'moment'
import 'moment/min/locales'

//Components
import EditPaymentItem from './EditPaymentItem'

//Icons
import ARROW_ICON from '../../assets/img/arrow-icon.svg'
import CALENDAR_ICON from '../../assets/img/calendario.svg'
import TIMER_ICON from '../../assets/img/interfaz.svg'
import DONE_ICON from '../../assets/img/done.svg'
import EDIT_ICON from '../../assets/img/edit.svg'
import { Link } from 'react-router-dom'

function ItemHistory({item}){
    function renderHistory(){
        let history = transformHistory(item)
        return (
            <div className="">
                {history.map((element, index )=> {

                    let {year, month, paid_date, paid} = element
                    let dateText = moment(`${year}-${month+1}`, 'YYYY/M').locale('es').format('MMMM [del] YYYY')

                    return (
                        <div key={index} className="pb-5 ">
                            <div className="secondary-bg py-3 pl-2 flex">
                                <span>{dateText}</span>
                                
                                <span className="ml-auto mr-3">{paid ? <img  src={DONE_ICON} className="w-6"/> : ''}</span>
                            </div>    
                        </div>
                    )
                })}
        </div>
        )
    }

    return (renderHistory())
}



function PaymentItemDetails({description, clientIdentifier, paymentAmountChanges, amountToPay}){

 
    return(
        <div className="pt-1">
            { typeof description !== 'undefined' && description !== '' ?
                <div className="my-4 ">
                    <h3 className="mb-1 font-semibold underline">Description</h3>
                    <p>{description}</p>
                </div>
            : null}
            { typeof clientIdentifier !== 'undefined' && clientIdentifier !== '' ?
                <div className="my-4">
                    <h3 className="mb-1 font-semibold underline">Identifier when paying</h3>
                    <p>{clientIdentifier}</p>
                </div>
            : null}

            { paymentAmountChanges === false ?
                <div className="my-4">
                    <h3 className="mb-1 font-semibold underline">Amount to pay</h3>
                    <h4>{amountToPay}</h4>
                </div>
            : null}
        </div>
    )
}







export default function PaymentItem({item}){
    const [state, setState] = useState({
        showDetails: false,
        editMode: false
    })


    function toggleShow(){
        setState({
            ...state,
            showDetails: !state.showDetails
        })
    }
    function toggleEditMode(){
        setState({
            ...state,
            showDetails: false,
            editMode: !state.editMode
        })
    }
 

    if(state.editMode){
        return (
            <div className="primary-color primary-bg rounded-md px-3 mb-3 w-100 shadow cursors-pointer">
                <EditPaymentItem item={item} toggleEditMode={toggleEditMode} />
            </div>
        )
    }

    return (
        <div className="primary-color primary-bg rounded-md pb-3 w-100 shadow cursors-pointer">
            <div className="pt-5 cursor-pointer px-3" onClick={toggleShow}>
                <div className="flex">
                    <h1 className="mb-3 font-semibold">{item.name}</h1>
                    <div className="ml-auto flex" >
                        <img src={ARROW_ICON} className={`${!state.showDetails ? 'arrow-rotate' : null} arrow w-4 h-6 mr-2`}/>
                    </div>
                </div>
                <div className="flex flex-row px-3">
                    <div className="flex flex-col">
                        <span role="img" aria-label="Timer">⏳</span>
                        <span> 
                            <span className="text-xs"></span>
                            <span className="font-semibold">{daysUntil(item.paymentDay)}</span>
                            
                            <span className="text-xs"> days left</span>
                        </span>
                    </div>
                    <div className="ml-auto flex flex-col">
                        <span role="img" aria-label="Calendar">📅</span>
                        <span className="mr-3">
                            <span className="font-semibold">{item.paymentDay}</span>
                            <span className="text-xs">th of every month</span>
                        </span>
                    </div>
                    
                </div>
            </div>
            
            <div className="mt-3 px-3">
                <SlideDown>
                    {state.showDetails ? 
                    <div className="flex flex-col py-3">
                        
                        <PaymentItemDetails {...item}/>
                        
                        <div className="flex">
                            <Link to={`/payments/${item.id}/history`}><h1 className="mr-auto cursor-pointer" onClick={toggleEditMode}>⌚See history</h1></Link>
                            <h1 className="ml-auto cursor-pointer" onClick={toggleEditMode}>✏️Edit</h1>
                        </div>
                    </div>: ''}
                </SlideDown>
            </div>
        </div>
        
    )
}