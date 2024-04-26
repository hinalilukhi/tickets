import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';
import axios from 'axios';

const OrderShow = ({ currentUser }) => {
  const [order, setOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();
  const { orderId } = router.query;

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order?.id,
    },
    onSuccess: () => router.push('/orders'),
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`);
        console.log(data);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  useEffect(() => {
    if (order) {
      const findTimeLeft = () => {
        const msLeft = new Date(order.expiresAt) - new Date();
        setTimeLeft(Math.round(msLeft / 1000));
      };

      findTimeLeft();
      const timerId = setInterval(findTimeLeft, 1000);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [order]);

  if (!order) {
    return <div>Loading...</div>;
  }

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51LiDc3AOpRUkXsjYIIAaOopXohc1lh7HMHx3AvGaGxUmj0btb9P2Kw9MmXqF8sFBcSnfX64BlELf8ksKcqgUslYi00OukplSkM"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

export default OrderShow;
