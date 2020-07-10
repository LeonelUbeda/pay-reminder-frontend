import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'unistore/react'
import { actions } from '../store'
import HistoryItem from '../components/history/HistoryItem'
import moment from 'moment'
import 'moment/min/locales'
import {generateDates} from '../utils/dates'
import {} from '../Options'
import HiddenHistoryItem from '../components/history/HiddenHistoryItem'
import SlideDown from 'react-slidedown'


function findPayment(payments, id){
    for (let payment of payments){
        if (payment.id === id){
            return payment
        }
    }
}

class History extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            paymentId: '',
            payment: {},
            histories: [],
            hiddenHistories: [],
            showHiddenHistories: false,
            dates: []
        }
        this.buildHistories = this.buildHistories.bind(this)
        this.toggleShowHiddenHistories = this.toggleShowHiddenHistories.bind(this)
    }
    //Recibe un arreglo de Historiales y revisa si existew 
    findHistoryMatch(date, payment, Allhistories){
        let returnIfMatch = {}
        let matchFound = false
        let matchIsHidden = false
        for(let element of Allhistories){
            if (element.year == date.year && element.month == date.month && 
                element.payment == payment.id){
                
                matchFound = true
                if(typeof element.hidden !== 'undefined' && typeof element.hidden === 'boolean'){
                    matchIsHidden = element.hidden
                } 
 
                returnIfMatch = {
                    ...element,
                    paid: true,
                    id: element.id
                }

            }
        }
    
        return [matchFound, matchIsHidden, returnIfMatch]


    }
    toggleShowHiddenHistories(){
        this.setState({
            ...this.state,
            showHiddenHistories: !this.state.showHiddenHistories
        })
    }
    buildHistories(dates, Allhistories, payment){
        let histories = []
        let hiddenHistories = []
        for(let date of dates){
            let temp = {
                ...date
            }
            let [matchFound, matchIsHidden, matchInfo] = this.findHistoryMatch(date, payment, Allhistories)
            if(matchFound){
                if(matchIsHidden){
                    hiddenHistories.push({...temp, ...matchInfo})
                }else{
                    histories.push({...temp, ...matchInfo})
                }
            }else{
                histories.push(temp)
            }
        }
        return [histories, hiddenHistories]
    }
    componentDidMount(){
        let {paymentId} = this.props.match.params
        let payment = findPayment(this.props.payments, paymentId)
        let dates = generateDates(payment)
        let [histories, hiddenHistories] = this.buildHistories(dates, this.props.histories, payment)
        this.setState({
            ...this.state,
            payment,
            dates,
            histories,
            hiddenHistories
        })
        
        
        
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.histories !== this.props.histories){
            let [histories, hiddenHistories] = this.buildHistories(this.state.dates, this.props.histories, this.state.payment) 
            this.setState({
                ...this.state,
                histories,
                hiddenHistories
            })
        }
    }
    render(){
        return (
            <div className="px-4 pt-5">
                <div className="title-primary-bg rounded-md px-3 py-3 w-100 text-lg mb-3 title-primary-color flex flex-col">
                    <h1 className="font-semibold text-xl underline" onClick={this.generateDates}>{this.state.payment.name}</h1>
                    <div className="ml-auto">
                       
                    </div>
                </div>
                <div className="ml-2 my-3 flex flex-wrap justify-around">
                    <h1>📅 {this.state.payment.paymentDay}th of each month</h1>
                    {!this.state.payment.paymentAmountChanges ? 
                        <h1 className="ml-3">💰{this.state.payment.amountToPay}USD</h1>
                    : 
                        <h1>💰 USD (variable)</h1>
                    }

                </div>
  
                <div className="px-4">
                    {this.state.histories.map((history, index) => {
                        return <div className="my-3" key={index}><HistoryItem history={history}  key={index} payment={this.state.payment}/></div>
                    })}
                </div>



                { this.state.hiddenHistories.length > 0 ? 
                    <div className="px-4 mt-20">
                        <h2 onClick={this.toggleShowHiddenHistories} className="p-2 cursor-pointer">Show hidden</h2>
                        <SlideDown>
                            {this.state.showHiddenHistories ? 
                                <Fragment>
                                    {this.state.hiddenHistories.map((history, index) => {
                                        return <div className="my-3" key={index}><HiddenHistoryItem history={history}  key={index} payment={this.state.payment}/></div>
                                    })}
                                </Fragment>
                        
                            : null}
                        </SlideDown>
                    </div>
                : null }
                
            </div>

        )
    }
    
}


export default connect(['payments', 'histories'], actions)(History)