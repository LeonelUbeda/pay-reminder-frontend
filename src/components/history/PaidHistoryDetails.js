import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/min/locales'

function PaidHistoryDetails({payment, history, removeHistory}){

    const [state, setState] = useState({

    })

    useEffect(() => {
        
    }, [])

    return(
        <div>
            <div className="flex flex-col pt-3">
                <div className="flex flex-col">
                    <span>🧾 {moment(history.createdAt, 'YYYY-MM-DD').locale('en').format('MMMM DD[, ] YYYY')}</span>
                    {payment.paymentAmountChanges ? 
                        <span className="mt-2">💸 {history.paidAmount} USD </span>
                    : null}
                </div>
            
                <h2 className="ml-auto mr-2 pt-3" onClick={removeHistory}>❌Undo payment</h2>
            </div>



        </div>
    )
}


export default PaidHistoryDetails