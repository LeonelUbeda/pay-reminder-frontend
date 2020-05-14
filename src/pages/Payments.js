import { connect } from "unistore/react";
import React, { useEffect, useState } from 'react'
import {actions} from '../store'
import { getData } from "../utils/fetch";
import { PAYMENTS_URL, GROUPS_URL } from '../urls' 
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import CreatePayment from '../components/CreatePayment'

import {daysUntil} from '../utils/dates'

import PaymentItem from '../components/PaymentItem'


async function fetchPayments(){
    return getData(PAYMENTS_URL, true)
}

async function fetchGroups(){
    return getData(GROUPS_URL, true)
}





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
        <div>
            <div className="title-primary-bg rounded-md px-3 py-3 w-100 mb-3 text-lg cursor-pointer" onClick={toggle}>
                <h2 className="title-primary-color font-semibold">{group.name}</h2>
            </div>
            <SlideDown>
                {
                    state.show ? 
                    <div className="px-4">
                    {group.items.map((item,index) => (
                        <PaymentItem item={item} key={index}/>
                    ))}
                </div> : null
                }
            </SlideDown>
        </div>
    )
}


class Payments extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            payments: [],
            groups: []
        }
        this.getData = getData.bind(this)
        this.groupByGroups = this.groupByGroups.bind(this)
        this.buildByGroups = this.buildByGroups.bind(this)

    }


    groupByGroups(){
        /*groups = [
            {
                name: 'Compras',
                id: 1
                'items': [{}],
            }
        ]*/
        
        let groups = []
        for(let group of this.state.groups){
            let {id, name} = group
            let item = {
                name,
                id,
                items: []
            }
            for(let payment of this.state.payments){
                if (payment.group !== null){
                    if(payment.group === id){
                        item.items.push(payment)
                    }
    
                }
            }
            groups.push(item)
        }
        return groups
    }

    buildByGroups(){
        let groups = this.groupByGroups()
        return(
            <div>
                {groups.map((group, index) => (
                    <GroupItem group={group} key={index}/>
                ))}
            </div>
        )
    }

    componentDidMount(){
        if(this.props.isLoggedIn){
            let stateGroups, statePayments;

            // Obtengo los grupos
            fetchGroups()
            .then(groups => {
                // Almaceno el resultado en una variable temporal
                stateGroups = groups
            })
            .then(() => {
                //Luego obtengo los payments
                fetchPayments()
                .then(payments => {
                    //Almaceno el resultado en una variable temporal
                    statePayments = payments
                })
                .then(() => {
                    
                    console.log(statePayments, stateGroups)
            
                    this.setState({
                        ...this.state,
                        groups: stateGroups,
                        payments: statePayments
                    })
                })

            })
            
            
        }
    }
    render(props, state){
        return(
            <div className="pt-20 px-3">
          
                <CreatePayment groups={this.state.groups}/>
                {this.buildByGroups()}
            </div>
        )
    }
}





export default connect(['isLoggedIn'], actions)(Payments)

