import React, { useEffect, useState } from 'react';
import { axiosTokenRequest } from '../../apis/apis';

const UserDetailsCard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    axiosTokenRequest
      .get('/irctc/v1/auth/me')
      .then((response) => setUsername(response.data.data.name))
      .catch((error) => console.log(error));
  }, []);

  console.log(username);

  return <div className="welcome-user-message">Welcome {username}</div>;
};

export default UserDetailsCard;
