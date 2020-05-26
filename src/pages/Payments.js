import { connect } from "unistore/react";
import React, { useEffect, useState } from 'react'
import {actions} from '../store'
import { getData } from "../utils/fetch";
import { PAYMENTS_URL, GROUPS_URL } from '../urls' 
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import CreatePayment from '../components/payments/CreatePayment'

import {daysUntil} from '../utils/dates'
import {orderPaymentsByGroups} from '../utils/groupBy'

import PaymentItem from '../components/payments/PaymentItem'
import { getPaymentsInfo, getGroups } from "../Local";

/*
async function fetchPayments(){
    return getData(PAYMENTS_URL, true)
}*/



function GroupItem({group}){
    const [state, setState] = useState({
        show: true
    })
    function toggle(){
        setState({
            show: !state.show
        })
    }

    return (
   
        <div className="">
            <div className="title-primary-bg rounded-md px-3 py-3 w-100 text-lg cursor-pointer mb-3" onClick={toggle}>
                <h2 className="title-primary-color font-semibold">{group.name}</h2>
            </div>
            

                <SlideDown>
                    {state.show ? 
                        <div className="px-4">
                            {group.items.map((item,index) => (
                                <div className="mb-3">
                                    <PaymentItem item={item} key={item.id}/>
                                </div>
                            ))}
                        </div> 
                        : null
                    }
                </SlideDown>
       
        </div>
         

    )
}



function BuildByGroups(props){
    let groups = orderPaymentsByGroups(props.groups, props.payments)
    return(
        <div>
            {groups.map((group, index) => (
                <GroupItem group={group} key={group.id}/>
            ))}
        </div>
    )
}







class Payments extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isCreatingPayment: false,
            payments: [],
            groups: []
        }
        this.getData = getData.bind(this)
        this.orderPaymentsByGroups = orderPaymentsByGroups
        this.toggleIsCreatingPayment = this.toggleIsCreatingPayment.bind(this)

    }
    toggleIsCreatingPayment(){

        this.setState({
            ...this.state,
            isCreatingPayment: !this.state.isCreatingPayment
        })
    }

    


    

    componentDidMount(){
        
    }
    render(props, state){
        return(
            <div className="pt-5 px-4">
                    {this.state.isCreatingPayment ?( 
                        <div>
                            <div className="messages-bg rounded-md px-3 py-3 w-100 mb-3 text-lg cursor-pointer flex justify-center" onClick={this.toggleIsCreatingPayment}>
                                <h2 className="title-primary-color font-semibold">Regresar</h2> 
                            </div>
                            <CreatePayment groups={this.props.groups} paymentCreated={this.toggleIsCreatingPayment}/>
                        </div>
                    ) : null}
            
                    {!this.state.isCreatingPayment ? 
                        (<div className="messages-bg rounded-md px-3 py-3 w-100 mb-3 text-lg cursor-pointer flex justify-around"  onClick={this.toggleIsCreatingPayment}>
                            
                            <h2 className="title-primary-color font-semibold mx-auto text-center" >Crear Pago</h2> 
                            
                        </div> ): null
                    }
                    
                    {(this.props.payments.length === 0 && !this.state.isCreatingPayment) ? 
                        <div className="bad-messages py-3 flex items-center flex-col font-semibold text-lg my-3 rounded-md shadow">
                            <h2>No hay pagos registrados!</h2>
                            <h5 className="text-xs">Intenta registrar uno dando clic en el boton superior</h5>
                        </div>
                    
                    : '' }

                    {!this.state.isCreatingPayment ? <BuildByGroups groups={this.props.groups} payments={this.props.payments} /> : null}
        
            </div>
        )
    }
}





export default connect(['isLoggedIn', 'groups', 'payments'], actions)(Payments)

