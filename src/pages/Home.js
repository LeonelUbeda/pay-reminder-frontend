import React from 'react'
import createGroup from '../assets/img/tutorial/create-group.gif'
import editGroup from '../assets/img/tutorial/edit-group.gif'
import createPayment from '../assets/img/tutorial/create-payment.gif'
function Home(){
    return (
        <div className="flex flex-col items-center">
                <h2 className="text-3xl mt-5 font-semibold">Crear grupo</h2>
                <img src={createGroup}  className="shadow-xl mb-5 max-w-xs w-3/4"/>


                <h2 className="text-3xl mt-5 font-semibold">Editar grupo</h2>
                <img src={editGroup}  className="shadow-xl mb-5 max-w-xs w-3/4"/>

                <h2 className="text-3xl mt-5 font-semibold">Crear un pago</h2>
                <img src={createPayment}  className="shadow-xl mb-5 max-w-xs w-3/4"/>
        </div>
    )
}


export default Home