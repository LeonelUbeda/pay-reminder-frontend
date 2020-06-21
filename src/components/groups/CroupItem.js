import React, {useState, useEffect, Fragment} from 'react'
import ARROW_ICON from '../../assets/img/arrow-icon.svg'
import SlideDown from 'react-slidedown'
import EditGroup from './EditGroup'
import { actions } from '../../store'
import {connect} from 'unistore/react'
import PropTypes, { instanceOf } from 'prop-types'



let GroupItem = connect([], actions)(({deleteGroup, group}) => {
    const [state, setState] = useState({
        showDetails: false,
        editMode: false,

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
        return( 
            <div className="primary-color primary-bg rounded-md px-3 mb-3 w-100 shadow">
                <EditGroup group={group} toggleEditMode={toggleEditMode} deleteGroup={deleteGroup}/>
            </div>
        )
    }
    return(
        <div>
            <div className="primary-color primary-bg rounded-md mb-3 w-100 shadow cursors-pointer">
                <div className="cursor-pointer py-4 px-3" onClick={toggleShow}>
                    <div className="flex items-center">
                        <h1 className="font-semibold">{group.name}</h1>
                        
                        <div className="ml-auto" >
                            <img src={ARROW_ICON} className={`${!state.showDetails ? 'arrow-rotate' : null} arrow w-4`}/>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        
                    </div>
                </div>
                
       
                    <SlideDown>
                        {state.showDetails ? 
                            <div className="flex py-4 px-3">
                                <h1 className="ml-auto cursor-pointer" onClick={toggleEditMode}>Editar</h1>
                            </div>
                        : ''}
                    </SlideDown>
            
            </div> 
            
        </div>
    )
})

GroupItem.propTypes = {
    deleteGroup: PropTypes.func.isRequired,
    group: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })
}

export default GroupItem