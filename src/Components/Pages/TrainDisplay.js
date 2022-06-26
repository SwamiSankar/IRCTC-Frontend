import React, { useContext, useEffect, useState } from 'react';
import { axiosRequest } from '../../apis/apis';
import { AppContext } from '../../App';

const TrainDisplay = ({ train, stations }) => {
  const { dispatch } = useContext(AppContext);
  const [schedule, setSchedule] = useState({
    departure: null,
    arrival: null,
  });

  const [avlFlag, setavlFlag] = useState(false);

  useEffect(() => {
    if (train !== undefined && stations !== undefined) {
      const assignSchedule = async () => {
        const departure = await getSchedule(train.id, stations.sourceId);
        const arrival = await getSchedule(train.id, stations.destinationId);

        setSchedule({
          departure: departure.data.data.departureTime,
          arrival: arrival.data.data.arrivalTime,
        });
      };

      assignSchedule();
    }
  }, [train, stations]);

  const getSchedule = async (trainId, stationId) => {
    console.log(trainId);

    const schedule = await axiosRequest.get(
      `/irctc/v1/trains/${trainId}/schedule/${stationId}`
    );

    return schedule;
  };

  const getAvailability = () => {
    setavlFlag(true);
  };

  const showBookingForm = () => {
    dispatch({
      type: 'TRAIN_DETAILS',
      data: {
        trainId: train.id,
        trainNumber: train.number,
        trainName: train.name,
        sourceId: stations.sourceId,
        source: stations.source,
        destinationId: stations.destinationId,
        destination: stations.destination,
        departureTime: schedule.departure,
        arrivalTime: schedule.arrival,
        avl: train.availability.seats,
        date: train.date,
        bookingEnabled: true,
      },
    });
  };

  console.log(schedule);

  return (
    <div className="train-details-card">
      <div className="train-heading">
        <div className="train-number">{train.number}</div>
        <strong className="train-name">{train.name}</strong>
      </div>
      <div className="train-timings">
        <section className="source-section">
          <div className="train-departure">{schedule.departure}</div>
          <div className="train-source">{stations.source}</div>
        </section>
        <section className="destination-section">
          <div className="train-arrival">{schedule.arrival}</div>
          <div className="train-destination">{stations.destination}</div>
        </section>
        {!avlFlag ? (
          <button className="train-avl-request" onClick={getAvailability}>
            Show Availability
          </button>
        ) : (
          <div className="train-booking-box">
            <div className="train-avl">Avl {train.availability.seats}</div>
            <button className="train-book" onClick={showBookingForm}>
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainDisplay;
