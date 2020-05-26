import React, { useState, useEffect } from 'react'
import { connect } from 'unistore/react'
import { actions } from '../../store'
import { findAndUpdateGroup } from '../../localStorage/groups'
import SlideDown from 'react-slidedown'



class EditGroup extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            id: props.group.id,
            name: props.group.name
        }
        this.triggerDeleteGroup = this.triggerDeleteGroup.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateGroup = this.updateGroup.bind(this)
    }

    triggerDeleteGroup(){
        if(this._isMounted){
            this.props.deleteGroup(this.state.id)
        }
    }


    updateGroup(){
        findAndUpdateGroup({id: this.state.id, name: this.state.name})
        .then(updatedGroup => {
            this.props.updateGroupFromState(updatedGroup)
            this.props.toggleEditMode()
        }) 
    }

 
    handleChange(e){
        console.log('changing')
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        this._isMounted = true;
    }
    render(){
        return (
        
            <div className="pt-2 pb-4 flex flex-col">
                <div className="flex flex-col">
                    <div className="flex text-white">
                        <span onClick={this.props.toggleEditMode} className="mb-3 cursor-pointer px-3 py-1 rounded-md bg-green-400">Atras</span>
                        <span onClick={this.triggerDeleteGroup} className="mb-3 ml-auto bg-red-500 px-3 py-1 rounded-md cursor-pointer">Eliminar</span>
                    </div>
                    <span className="text-lg mb-2">
                        Nombre del grupo 	&nbsp;
                        <span className="text-xs">
                            Ejemplo: 	&nbsp;
                            <span className="text-red-600">Entretenimiento </span>
                        </span>
                    </span>
                </div>
                
                <input value={this.state.name} onChange={this.handleChange} name="name" type="text"
                className="default-input"/>
                
                <button onClick={this.updateGroup} className="bg-blue-900 px-3 py-1 text-white rounded-md mt-3 ml-auto">Guardar</button>
            </div>
    
        )
    }
}

export default connect(['groups'], actions)(EditGroup)//(({group, toggleEditMode, updateGroupFromState, deleteGroup}) => 