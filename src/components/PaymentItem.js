import React, { useState, useEffect } from 'react'
import {daysUntil} from '../utils/dates'
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import {PAYMENTS_URL} from '../urls'
import {getData} from '../utils/fetch'
import moment from 'moment'
import 'moment/min/locales'
import ARROW_ICON from '../assets/img/arrow-icon.svg'
import CALENDAR_ICON from '../assets/img/calendario.svg'
import TIMER_ICON from '../assets/img/interfaz.svg'
//const ARROW_ICON = <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1"viewBox="0 0 491.996 491.996"><path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848    L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128    c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084    c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224    C491.996,136.902,489.204,130.046,484.132,124.986z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#0E2A47"/> </svg>













async function getPaymentDetails(paymentId){
    let url = PAYMENTS_URL + paymentId + '/tracking'
    return getData(url)
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
        if(props.details.length === 0){
            return (
                <div class="messages-bg py-2 flex justify-center">
                    <span>No hay pagos registrados!</span>
                </div>
            )
        }
    }

    return(
        <div className="pt-5">
            
            <h2 className="font-semibold">Historial de pagos</h2>
            {emptyDetails()}
            {props.details.map((detail, index) => {
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
        details: null
    })


    function toggleShow(){
        if (state.details === null){
            getPaymentDetails(item.id)
            .then(data => {
                console.log(data)
                setState({
                    ...state,
                    details: data,
                    showDetails: true
                })
            })
        }else{
            setState({
                ...state,
                showDetails: !state.showDetails
            })
        }
    }

    return (
        <div className="primary-color primary-bg rounded-md px-3 py-5 w-100 mb-3 shadow" onClick={toggleShow}>
            <div className="flex">
                <h1 className="mb-3 font-semibold">{item.name}</h1>
                <div className="ml-auto w-4">
                    <img src={ARROW_ICON} className={!state.showDetails ? 'transform rotate-180' : null}/>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="">
                    <img className="w-5" src={TIMER_ICON}/>
                    <span> 
                        <span className="text-xs">Quedan </span>
                        <span className="font-semibold">{daysUntil(item.payment_day)}</span>
                        <span className="text-xs"> dias</span>
                    </span>
                </div>
                <div className="ml-auto">
                    <img className="w-5" src={CALENDAR_ICON}/>
                    <span className="mr-3">
                        <span className="font-semibold">{item.payment_day}</span>
                        <span className="text-xs"> de cada mes</span>
                    </span>
                </div>
                
            </div>
            <SlideDown>
                {state.showDetails && state.details !== null ? <PaymentItemDetails item={item} details={state.details}/> : null}
            </SlideDown>
        </div>
        
    )
}