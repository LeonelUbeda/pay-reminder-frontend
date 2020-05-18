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



function PaymentItemDetails(props){
    function renderDate(date){
        let newDate = moment(date).locale('es')
        if(newDate.isValid()){
            return newDate.format("dddd, D [de] MMMM YYYY");
        }
        return ''
    }

    function emptyDetails(){
        if(props.item.history.length === 0){
            return (
                <div className="messages-bg py-2 flex justify-center">
                    <span>No hay pagos registrados!</span>
                </div>
            )
        }
    }

    return(
        <div className="pt-5">
            <h2 className="font-semibold">Historial de pagos</h2>
            {emptyDetails()}
            {props.item.history.map((detail, index) => {
                return (
                    <div key={index} className="mt-4 secondary-bg py-3 pl-2 flex">
                        <div className="">
                            {renderDate(detail.paid_date)}
                        </div>
                    </div>
                )
            })}
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
        <div className="primary-color primary-bg rounded-md px-3 mb-3 pb-3 w-100 shadow cursors-pointer">
            <div className="pt-5 cursor-pointer" onClick={toggleShow}>
                <div className="flex">
                    <h1 className="mb-3 font-semibold">{item.name}</h1>
                    
                    <div className="ml-auto flex" >
                        <img src={ARROW_ICON} className={`${!state.showDetails ? 'transform rotate-180' : null} w-4`}/>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="">
                        <img className="w-5" src={TIMER_ICON}/>
                        <span> 
                            <span className="text-xs">Quedan </span>
                            <span className="font-semibold">{daysUntil(item.paymentDay)}</span>
                            
                            <span className="text-xs"> dias</span>
                        </span>
                    </div>
                    <div className="ml-auto">
                        <img className="w-5" src={CALENDAR_ICON}/>
                        <span className="mr-3">
                            <span className="font-semibold">{item.paymentDay}</span>
                            <span className="text-xs"> de cada mes</span>
                        </span>
                    </div>
                    
                </div>
            </div>
            
            <div className="mt-4">
                <SlideDown>
                    {state.showDetails ? 
                    <div className="flex">
                        <h1 className="ml-auto cursor-pointer" onClick={toggleEditMode}>Editar</h1>


                    </div>: ''}
                </SlideDown>
            </div>
        </div>
        
    )
}