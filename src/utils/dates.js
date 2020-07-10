import moment from 'moment'
import 'moment/min/locales'

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



let enumerateMonthsBetweenDates = function(startDate, endDate, includeStartDate = false, numberOfNextMonthsOfEndDate = 0) {
    let dates = [];
    let currDate = moment(startDate, 'YYYY-MM-DD').startOf('month');
    let lastDate = moment(endDate, 'YYYY-MM-DD').startOf('month');
    if(includeStartDate){
        dates.push(currDate.clone())
    }
    while((currDate.add(1, 'M').diff(lastDate, 'M') - numberOfNextMonthsOfEndDate) < 0) {
        dates.push(currDate.clone());
    }

    return dates;
};



/*

{
    month: String: (0-11),
    year: String: (???? - ????),
    paidAt: String: moment().format('YYYY-MM-DD'),
    state: Number: (Hidde, Active, Paid,  Etc...),
    paidAmount?: Integer
}
*/
export function generateDates(payment){
    let initialDate = moment(payment.createdAt).startOf('month')
    let maxDate = moment().add('2', 'M').startOf('month')
    let dates = [{
        month: initialDate.month(),
        year: initialDate.year(),
        monthText: 'cale'
    }]
    while(initialDate.add('1', 'M').diff(maxDate, 'M') <= 0){
        //console.log(initialDate.diff(maxDate,'M'))
        dates.push({
            month: initialDate.month(),
            year: initialDate.year()
        })
    }
    return dates

}








export function transformHistory({payment_day, history, created_at}){
    let actualDate = moment()
    let dates = enumerateMonthsBetweenDates(created_at, actualDate, true , 2)

    if(history.length > 0){
    
        let newDates = dates.map(dateItem => {
            let dateItemMoment = moment(dateItem, 'YYYY-MM-DD')
            let obj = {
                month: dateItemMoment.month(),
                year: dateItemMoment.year(),
                paid: false
            }
            
            for (let historyItem of history){
                if( moment(dateItem, 'YYYY-MM-DD').month() === historyItem.month && 
                    moment(dateItem, 'YYYY-MM-DD').year() === historyItem.year){

                    let {paid_date, id, payment} = historyItem

                    obj = {
                        ...obj,
                        paid_date,
                        id,
                        payment,
                        paid: true
                    }
                }
            }
            return obj
        })

        return newDates
    }else{

        let newDates = dates.map(dateItem => {
            let dateItemMoment = moment(dateItem, 'YYYY-MM-DD')
            let obj = {
                month: dateItemMoment.month(),
                year: dateItemMoment.year(),
                paid: false
            }
            return obj
        })

        return newDates


    }
}



export function isPaymentDue(payment_day, history, payment_created_date = null){
    console.log(payment_created_date)
    let nowPayment = moment().set('date', payment_day)
    let isDue, number, unit;
    if(history.length > 0 ){
        let dates = history.map(payment => moment(payment.paid_date, 'YYYY-MM-DD'))
        let maxDate = moment.max(dates)
        let monthDiff = maxDate.diff(nowPayment, 'month') 

        //Significa que son dias
        if(monthDiff === 0){

            // Da negativo si la fecha de ultimo pago es menor a la fecha pagada, osea, pago antes
            console.log(maxDate.diff(nowPayment, 'days'), 'dias de retraso', payment_day)

        }else if (monthDiff < 0){
            // Meses de retraso
            console.log(monthDiff, 'meses de retraso')
        }else{
            // Va sobrado? 
        }
    }else{
        let created_date = moment(payment_created_date, 'YYYY-MM-DD')
        let monthDiff = created_date.diff(nowPayment, 'month')

    }
    return ''
}




export function monthToString(monthNumber, language){
    let monthsSpanish = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ]

    let monthsEnglish = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    if(language === 'es'){
        return monthsSpanish[monthNumber]
    }else if(language === 'en'){
        return monthsEnglish[monthNumber]
    }
}