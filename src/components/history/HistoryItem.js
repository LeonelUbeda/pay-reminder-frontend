import React from 'react'
import { connect } from 'unistore/react'
import { actions } from '../../store'
import {createLocalHistory, findAndDeleteHistory} from '../../localStorage/history'
import { monthToString } from '../../utils/dates'
import SlideDown from 'react-slidedown'
import moment from 'moment'
import PaidHistoryDetails from './PaidHistoryDetails'
import NoPaidHistoryDetails from './NoPaidHistoryDetails'
import PropTypes from 'prop-types'
// Histories viene del store
//{history, histories, payment, addHistoryToState}

class HistoryItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            paymentAmountIfChanges: 0,
            showDetails: false,
            historyExists: false,
            paid: false,
            month: '',
            year: '',
            id: ''
        }
        this.removeHistory = this.removeHistory.bind(this)
        this.createHistory = this.createHistory.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggleShowDetails = this.toggleShowDetails.bind(this)
    }

    toggleShowDetails(){
        this.setState({
            ...this.state,
            showDetails: !this.state.showDetails
        })
    }

    handleChange(e){
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){

    }
    // TO-DO: Añadir un validador, si ya existe un historial con el mismo payment, year y month, que no lo cree
    createHistory(detailsHIstory){

        createLocalHistory({
            payment: this.props.payment.id, 
            year: this.props.history.year, 
            month: this.props.history.month, 
            createdAt: moment(),
            ...detailsHIstory
        })
        .then(createdPayment => {
            this.setState({
                ...this.state,
                showDetails: false
            })
            this.props.addHistoryToState(createdPayment)
            
        })
        
    }

    removeHistory(){
        if(typeof this.props.payment.id === 'undefined'){
            return 
        }
        findAndDeleteHistory(this.props.history.id)
        .then(() => {
            this.setState({
                ...this.state,
                showDetails: false
            })
            this.props.removeHistoryFromState(this.props.history.id)
        })
    }
    render(){

        return (
            <div className="primary-color primary-bg rounded-md pb-3 w-100 shadow cursors-pointer flex flex-col cursor-pointer">
                <div className="px-3 pt-3 flex" onClick={this.toggleShowDetails}>
                    <span>📅 {monthToString(this.props.history.month, 'es')}, {this.props.history.year}</span>
                    
                    <span className="ml-auto">{this.props.history.paid ? '✔️': '❌' }</span> 
                    
                </div>
                <SlideDown>
                    {this.state.showDetails ? 
                        <div className="pt-3 flex flex-col px-3 pt-3">

                            {this.props.history.paid && this.state.showDetails ? 
                                <PaidHistoryDetails history={this.props.history} payment={this.props.payment} 
                                removeHistory={this.removeHistory}/> 
                            : 
                                <NoPaidHistoryDetails history={this.props.history} payment={this.props.payment} 
                                createHistory={this.createHistory}/>
                            }

                        </div>

                    : null}
                </SlideDown>
            </div>
            
        )
    }
}

HistoryItem.propTypes = {
    payment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        // Poner mas aqui
    }),
    history: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
    addHistoryToState: PropTypes.func.isRequired,
    removeHistoryFromState: PropTypes.func.isRequired
}



export default connect(['histories'], actions)(HistoryItem)