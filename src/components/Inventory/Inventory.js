import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Inventory = () => {
    const [orders,setOrders] = useState([]);
    const {user} = useAuth();
    useEffect(()=>{
        fetch('http://localhost:5000/orders',{
            headers:{
                'authorization':`Bearer ${localStorage.getItem('idToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setOrders(data))
    },[])
    return (
        <div>
            <h2 style={{textAlign:'center'}}>All Orders Here : {orders.length} 
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

export default Inventory;