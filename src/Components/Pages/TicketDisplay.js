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
      <div className="ticket-details">
        <div className="ticket-pnr">PNR : {ticketDetails.pnr}</div>
        <div className="train-name">Train Name : {trainDetails.trainName}</div>
      </div>
      <div className="passenger-list">
        {ticketDetails.passengers.map((passenger, index) => {
          return (
            <>
              <div className="passenger-data">
                <label className="passenger">Passenger {index + 1}</label>
                <div className="passenger-name">
                  <label>Name</label>
                  {passenger.name}
                </div>
                <div className="passenger-age">
                  <label>Age</label>
                  {passenger.age}
                </div>
                <div className="passenger-seat">
                  <label>Seat</label>
                  {passenger.seatNumber}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default TicketDisplay;
