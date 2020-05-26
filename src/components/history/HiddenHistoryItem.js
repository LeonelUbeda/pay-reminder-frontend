
import React from 'react'

import { monthToString } from '../../utils/dates'

import SlideDown from 'react-slidedown'
import moment from 'moment'




export default function HiddenHistoryItem({history}) {
    return (
        <div className="primary-color primary-bg rounded-md pb-3 w-100 shadow cursors-pointer flex flex-col cursor-pointer">
        <div className="px-3 pt-3 flex" >
            <span>📅 {monthToString(history.month, 'es')}, {history.year}</span>
            
            <span className="ml-auto">❗</span> 

        </div>
    </div>
    )
}