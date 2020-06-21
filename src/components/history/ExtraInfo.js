import React, { useState } from 'react'
import SlideDown from 'react-slidedown'
import PropTypes from 'prop-types'


let ExtraInfo = function(){
    const [state, setState] = useState({
        showInputs: false
    })

    function toggleShowInputs(){
        setState({
            ...state,
            showInputs: !state.showInputs
        })
    }
    return (
        <div>
            <h2 onClick={toggleShowInputs}>Detalles adicionales!</h2>
            <SlideDown>
                {state.showInputs ?
                    <input className="default-input"/> 
                : null}
            </SlideDown>
        </div>
    )
}


ExtraInfo.propTypes = {
    
}

export default ExtraInfo