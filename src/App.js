import React, { useReducer } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Homepage from './Components/Pages/Homepage';
import Login from './Components/Pages/Login';
import User from './Components/Pages/User';

export const AppContext = React.createContext();
const initialState = {
  trainData: [],
  trainDetails: {
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    avl: '',
    bookingEnabled: false,
  },
  loginToken:
    sessionStorage.getItem('token') === null
      ? ''
      : sessionStorage.getItem('token'),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TRAIN_DATA':
      return {
        trainData: action.data,
      };
    case 'TRAIN_DETAILS':
      return {
        trainDetails: action.data,
      };

    case 'LOGIN_TOKEN':
      return {
        loginToken: action.data,
      };
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
