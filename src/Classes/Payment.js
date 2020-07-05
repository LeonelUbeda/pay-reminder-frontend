






class Payment{

    static FREQUENCY = {
        MONTHLY: 0,
    }

    static STATE = {
        INACTIVE: 0,
        ACTIVE: 1
    }


    constructor({ 
        name, 
        paymentDay, 
        group,  
        description,
        state ,  
        frequency, 
        remindIsActivated, 
        remindMeBefore, 
        paymentAmountChanges, 
        amountToPay,
        clientIdentifier
    }){
        this.name = name
        this.paymentDay = paymentDay
        this.group = group
        this.description = description
        this.state = state
        this.frequency = frequency
        this.remindIsActivated = remindIsActivated
        this.remindMeBefore = remindMeBefore
        this.paymentAmountChanges = paymentAmountChanges
        this.amountToPay = amountToPay
        this.clientIdentifier = clientIdentifier
    }
}




export default Payment


