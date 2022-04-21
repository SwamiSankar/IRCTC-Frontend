import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import TrainSearchCard from '../Cards/TrainSearchCard';
import TrainDisplayList from '../Lists/TrainDisplayList';
import PassengerForm from '../Forms/PassengerForm';
import Login from './Login';
import UserDetailsCard from '../Cards/UserDetailsCard';

const Homepage = () => {
  const [bookingEnable, setBookingEnable] = useState(false);
  const [show, setShow] = useState(false);
  const { state } = useContext(AppContext);

  const trainData = state.trainData;
  let trainDetails = state.trainDetails;
  let token = state.loginToken;

  console.log(token);

  if (token === undefined) {
    token = sessionStorage.getItem('token');
  }

  useEffect(() => {
    if (trainDetails !== undefined) {
      setBookingEnable(trainDetails.bookingEnabled);
    }
  }, [trainDetails]);

  useEffect(() => {}, [token]);

  console.log(bookingEnable);

  return (
    <>
      <div className="homepage-container">
        {!bookingEnable ? (
          trainData?.length > 0 ? (
            <TrainDisplayList data={trainData} />
          ) : (
            <TrainSearchCard />
          )
        ) : (
          <PassengerForm data={trainDetails} />
        )}

        {token === '' ? (
          <>
            <button
              className="btn btn-submit login-modal"
              onClick={() => setShow(true)}
            >
              Login
            </button>
            <Login onClose={() => setShow(false)} show={show} />
          </>
        ) : (
          <UserDetailsCard />
        )}
      </div>
    </>
  );
};

export default Homepage;
