import React, { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import 'moment/min/locales'
import SlideDown from 'react-slidedown'
import ExtraInfo from './ExtraInfo'
function PaidHistoryDetails({payment, history, createHistory}){

    const [state, setState] = useState({
        paidAmountIfAmountChanges: '',
        error: false,
        errorMsg: '',
        userWantsToPay: false
    })

    function handleInputChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function hideHistory(){
        createHistory({hidden: true})
    }

    function validate(){
        let error = false
        let newHistory = {}
        if(state.userWantsToPay){
            if(payment.paymentAmountChanges){
                if(state.paidAmountIfAmountChanges == ''){
                    error = true
                    setState({
                        ...state,
                        error: true,
                        errorMsg: 'Por favor ingrese la cantidad pagada'
                    })
                }else{
                    newHistory.paidAmount = state.paidAmountIfAmountChanges
                }
            }
            if(!error){
                createHistory(newHistory)
            }
        }else{
            setState({
                ...state,
                userWantsToPay: true
            })
        }
        
    }

    useEffect(() => {
        
    }, [])

    return(
        <div>
            <div className="flex pt-3 flex-col">
                <SlideDown>
                    {state.error ? 
                        <div className="bad-messages py-1 px-1 rounded-md my-2">
                            <span>{state.errorMsg}</span>
                        </div>
                    :null}
                </SlideDown>
                <SlideDown>
                    {state.userWantsToPay ? 
                
                            <Fragment>
                                
                            {payment.paymentAmountChanges ? 
                                <div> 
                                    <label htmlFor="paidAmountIfAmountChanges">Amount paid: </label>
                                    <input value={state.paidAmountIfAmountChanges} type="number" onChange={handleInputChange} 
                                    name="paidAmountIfAmountChanges" id="paidAmountIfAmountChanges" className="default-input"/>
                                </div>                    
                            : null}



                        </Fragment>
                    : null}
                </SlideDown>
                
                <div className="flex pt-3 whitespace-no-wrap flex-wrap justify-end">
                    {!state.userWantsToPay ? <span onClick={hideHistory}>😔 Hide month</span> : null}
                    <span className="ml-auto mr-2" onClick={validate}>{!state.userWantsToPay ? '✔️ I want to pay' : '✔️ Confirm' }</span> 
                </div>
            </div>

        </div>
    )
}


export default PaidHistoryDetails