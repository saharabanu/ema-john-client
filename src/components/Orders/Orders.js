import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Orders = () => {
    const [orders,setOrders] = useState([]);
    const {user} = useAuth();
    useEffect(()=>{
        fetch(`http://localhost:5000/orders?email=${user.email}`)
        .then(res=>res.json())
        .then(data=>setOrders(data))
    },[])
    return (
        <div>
            <h2 style={{textAlign:'center'}}>My Orders Here : {orders.length} 
            </h2>
            
            <ul>
                {
                    orders?.map(order=><div className="text-center"
                    key={order._id}>
                        <h4>Name : {order.name}  Email : {order.email}</h4>
                        
                        

                    </div>)
                }
            </ul>
        </div>
    );
};

export default Orders;