import React, {useState, useEffect} from 'react'
import ARROW_ICON from '../../assets/img/arrow-icon.svg'
import SlideDown from 'react-slidedown'

export default function GroupItem(props) {
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

    return(
        <div className="primary-color primary-bg rounded-md px-3 mb-3 py-4 w-100 shadow cursors-pointer">
            <div className="cursor-pointer" onClick={toggleShow}>
                <div className="flex items-center">
                    <h1 className="font-semibold">{props.group.name}</h1>
                    
                    <div className="ml-auto" >
                        <img src={ARROW_ICON} className={`${!state.showDetails ? 'transform rotate-180' : null} w-4`}/>
                    </div>
                </div>
                <div className="flex flex-row">
                    
                </div>
            </div>
            
            <div className="">
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