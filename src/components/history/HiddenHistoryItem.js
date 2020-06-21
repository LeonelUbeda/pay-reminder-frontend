
import React from 'react'
import { monthToString } from '../../utils/dates'

import PropTypes from 'prop-types'



let HiddenHistoryItem = function({history}) {
    return (
        <div className="primary-color primary-bg rounded-md pb-3 w-100 shadow cursors-pointer flex flex-col cursor-pointer">
        <div className="px-3 pt-3 flex" >
            <span>📅 {monthToString(history.month, 'es')}, {history.year}</span>
            
            <span className="ml-auto">❗</span> 

        </div>
    </div>
    )
}


HiddenHistoryItem.propTypes = {
    history: PropTypes.shape({
        month: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired
    })
}

export default HiddenHistoryItem 