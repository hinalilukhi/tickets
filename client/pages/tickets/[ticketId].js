import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TicketShow = () => {
  const router = useRouter();
  const {ticketId} = router.query;
  console.log(ticketId);
  const [ticket, setTickets] = useState({});

  useEffect(() => {
    const fetchCurrentTicket = async () => {
      try {
        const { data } = await axios.get(`/api/tickets/${ticketId}`);
        console.log(data);
        setTickets(data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentTicket();
  }, []);

  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      router.push('/orders/[orderId]', `/orders/${order.id}`),
  });
  return (
    <div>

      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

// TicketShow.getInitialProps = async (context, client) => {
//   const { ticketId } = context.query;
//   const { data } = await client.get(`/api/tickets/${ticketId}`);

//  return { ticket: data };
// };

export default TicketShow;
