import React, { useReducer } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Homepage from './Components/Pages/Homepage';
import Login from './Components/Pages/Login';
import User from './Components/Pages/User';

export const AppContext = React.createContext();
const initialState = {
  trainData: [],
  trainDetails: {
    trainId: '',
    trainNumber: '',
    trainName: '',
    sourceId: '',
    source: '',
    destinationId: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    avl: '',
    date: '',
    bookingEnabled: false,
  },
  loginToken:
    sessionStorage.getItem('token') === null
      ? ''
      : sessionStorage.getItem('token'),
  passengerList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TRAIN_DATA':
      return { ...state, trainData: action.data };

    case 'TRAIN_DETAILS':
      return { ...state, trainDetails: action.data };

    case 'LOGIN_TOKEN':
      return { ...state, loginToken: action.data };

    case 'PAX_LIST':
      return { ...state, passengerList: action.data };
    default:
      return initialState;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
