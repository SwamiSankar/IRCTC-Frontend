import React from 'react';

const SearchResults = ({ data }) => {
  return (
    <>
      {data.map((station) => {
        return <option value={`${station.name}`} />;
      })}
    </>
  );
};

export default SearchResults;
