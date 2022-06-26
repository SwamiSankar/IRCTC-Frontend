import React, { useContext, useEffect, useState } from 'react';
import { axiosTokenRequest } from '../../apis/apis';
import { AppContext } from '../../App';

const TicketDisplay = ({ ticketData }) => {
  const { state } = useContext(AppContext);
  const [ticketDetails, setTicketDetails] = useState();
  console.log(ticketData);
  const trainDetails = state.trainDetails;
  useEffect(() => {
    if (ticketData) {
      axiosTokenRequest
        .post('/irctc/v1/ticket', {
          train: ticketData.train,
          from: ticketData.from,
          to: ticketData.to,
          date: ticketData.date,
          passengers: ticketData.passengers.passengerList,
        })
        .then((response) => setTicketDetails(response.data.data));
    }
  }, [ticketData]);

  return ticketDetails ? (
    <div className="ticket-display-container">
      <div className="ticket-pnr">{ticketDetails.pnr}</div>
      <div className="train-name">{trainDetails.trainName}</div>
      <div className="passenger-list">
        {ticketDetails.passengers.map((passenger) => {
          return (
            <div className="passenger-data">
              <div className="passenger-name">{passenger.name}</div>
              <div className="passenger-age">{passenger.age}</div>
              <div className="passenger-seat">{passenger.seatNumber}</div>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default TicketDisplay;
