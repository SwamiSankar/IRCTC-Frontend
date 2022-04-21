import React from 'react';
import TrainDisplay from '../Pages/TrainDisplay';

const TrainDisplayList = ({ data }) => {
  const stations = data.pop();

  return (
    <div className="train-display-list-container">
      <ol>
        {data.map((train) => (
          <li className="train-list">
            <TrainDisplay train={train} stations={stations} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TrainDisplayList;
