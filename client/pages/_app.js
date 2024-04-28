import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import buildClient from '../api/build-client';
import Header from '../components/header';
import axios from 'axios';
import { useRouter } from 'next/router';

const useRouteChangeEffect = (callback) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      callback();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [callback, router]);
};

const MyApp = ({ Component, pageProps }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const client = buildClient();
      const { data } = await client.get('/api/users/currentuser');
      setCurrentUser(data.currentUser);
      console.log(data.currentUser);
    } catch (error) {
      setCurrentUser('');
      console.error('Error fetching current user:', error);
    }
  };

  // Trigger fetchCurrentUser on route change
  useRouteChangeEffect(fetchCurrentUser);

  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

export default MyApp;
