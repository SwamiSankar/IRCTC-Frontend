import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import TrainSearchCard from '../Cards/TrainSearchCard';
import TrainDisplayList from '../Lists/TrainDisplayList';
import PassengerForm from '../Forms/PassengerForm';
import Login from './Login';
import UserDetailsCard from '../Cards/UserDetailsCard';
import { axiosTokenRequest } from '../../apis/apis';
import TicketDisplay from './TicketDisplay';

const Homepage = () => {
  const [bookingEnable, setBookingEnable] = useState(false);
  const [show, setShow] = useState(false);
  const { state } = useContext(AppContext);
  const [ticketBooked, setTicketBooked] = useState(false);
  const [ticketDetails, setTicketDetails] = useState();

  const trainData = state.trainData;
  let trainDetails = state.trainDetails;
  let token = state.loginToken;

  const displayTicket = () => {
    setTicketBooked(true);
  };

  if (token === undefined) {
    token = sessionStorage.getItem('token');
  }

  useEffect(() => {
    if (ticketBooked) {
      setTicketDetails({
        train: trainDetails.trainId,
        from: trainDetails.sourceId,
        to: trainDetails.destinationId,
        date: trainDetails.date,
        passengers: state.passengerList,
      });
    }
  }, [ticketBooked]);

  useEffect(() => {
    if (trainDetails !== undefined) {
      setBookingEnable(trainDetails.bookingEnabled);
    }
  }, [trainDetails]);

  useEffect(() => {
    console.log('Token added');
  }, [token]);

  return (
    <>
      <div className="homepage-container">
        {!ticketBooked ? (
          <>
            {' '}
            {!bookingEnable ? (
              trainData?.length > 0 ? (
                <TrainDisplayList data={trainData} />
              ) : (
                <TrainSearchCard />
              )
            ) : (
              <PassengerForm
                data={trainDetails}
                displayTicket={displayTicket}
              />
            )}
          </>
        ) : (
          <TicketDisplay ticketData={ticketDetails} />
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
