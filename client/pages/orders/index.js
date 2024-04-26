import axios from "axios";
import { useState,useEffect } from "react";

const OrderIndex = () => {
  const [orders, setOrder] = useState([]);

      useEffect(() => {
        const fetchCurrentOrder = async () => {
          try {
            const { data }  = await axios.get('/api/orders');
            console.log(data);
            setOrder(data);
          } catch (error) {
            console.error('Error fetching current orders:', error);
          }
        };

        fetchCurrentOrder();
      }, []);

    return (
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id}>
              {order.ticket.title} - {order.status}
            </li>
          );
        })}
      </ul>
    );
};

  

export default OrderIndex;
  