import moment from 'moment'

export function daysUntil(day){
    let now = moment()
    let paymentDay = moment().set('date', day)
    let daysUntilPayment = paymentDay.diff(now, 'days')
    if(daysUntilPayment < 0){
        paymentDay.add(1, 'month')
        daysUntilPayment = paymentDay.diff(now, 'days')
    }
    return daysUntilPayment
}