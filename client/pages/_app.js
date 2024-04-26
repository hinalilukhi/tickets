import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import buildClient from '../api/build-client';
import Header from '../components/header';

const MyApp = ({ Component, pageProps }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const client = buildClient();
        const { data } = await client.get('/api/users/currentuser');
        setCurrentUser(data.currentUser);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

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
