import { Formik, Form, Field } from 'formik';

import moment from 'moment';
import { axiosRequest } from '../../apis/apis';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import debounce from 'lodash.debounce';
import * as Yup from 'yup';
import DatePickerComponent from '../utils/DatePickerComponent';
import { AppContext } from '../../App';
import SearchResults from '../utils/SearchResults';

const TrainSearchForm = () => {
  const { dispatch } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [stationList, setStationList] = useState([]);
  //   const buttonStyle = {
  //     height: '32px',
  //     width: '140px',
  //     borderRadius: '6px 6px 6px 6px',
  //     marginLeft: '10px',
  //     marginTop: '1.5rem',
  //   };

  const debouncedSave = useMemo(
    () => debounce((value) => setSearchTerm(value), 1000),
    []
  );

  console.log(searchTerm);

  // const debouncedResults = useMemo(() => {
  //   return debounce(handleChange, 300);
  // }, []);

  const getStationList = async (query) => {
    return await axiosRequest.get(`/irctc/v1/station?name=${query}`);
  };

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  });

  useEffect(() => {
    const getList = async () => {
      const response = await getStationList(searchTerm);
      const stationList = response.data.data;
      setStationList(stationList);
    };
    if (searchTerm !== '') {
      getList();
    } else {
      setStationList([]);
    }
  }, [searchTerm]);

  console.log(stationList);

  const getTrainDetails = async (arr, source, destination) => {
    const sourceId = await axiosRequest.post('/irctc/v1/station/search', {
      name: source,
    });
    const destinationId = await axiosRequest.post('/irctc/v1/station/search', {
      name: destination,
    });
    let stationObject = {};
    stationObject.source = source;
    stationObject.destination = destination;
    stationObject.sourceId = sourceId.data.data;
    stationObject.destinationId = destinationId.data.data;

    arr.push(stationObject);
    dispatch({ type: 'TRAIN_DATA', data: arr });
  };

  const initialValues = {
    source: '',
    destination: '',
    date: '',
  };

  const validationSchema = Yup.object({
    source: Yup.string()
      .required('Source City is Required')
      .matches(
        /^[a-zA-Z ]*$/,
        'Source Location must not contain numbers or special Characters'
      ),
    destination: Yup.string()
      .required('Destination City is Required')
      .matches(
        /^[a-zA-Z ]*$/,
        'Destination Location must not contain numbers or special Characters'
      ),
  });

  const onSubmit = async (values) => {
    let { source, destination, date } = values;

    date = moment(date).format('L');
    date = date.replace(/(..).(..).(....)/, '$3-$1-$2');
    values.date = date;

    try {
      const response = await axiosRequest.post(
        '/irctc/v1/trains/search',
        values
      );
      getTrainDetails(response.data.data, source, destination);
    } catch (error) {
      console.log(error);
    }
  };

  // const customChange = useCallback(
  //   (e) => {
  //     const value = e.target.value;
  //     setFieldValue(e.target.name, value);
  //     debouncedSave(value);
  //   },
  //   [setFieldValue]
  // );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onChange={(values, actions) => {
        console.log('On Change');
      }}
    >
      {({ touched, isValid, errors, handleChange, setFieldValue }) => {
        return (
          <div className="edit-form-container">
            <div className="edit-form-wrapper">
              <Form className="form-container" autoComplete="off">
                <div className="search-train form-group source">
                  <label htmlFor="source">Source</label>
                  <Field
                    type="search"
                    className={'form-control'}
                    name="source"
                    list="stationList"
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue(e.target.name, value);
                      debouncedSave(value);
                    }}
                  />
                  {touched.source && errors.source && (
                    <div className="login-form-error">{errors.source}</div>
                  )}
                  {stationList.length > 0 ? (
                    <datalist id="stationList">
                      <SearchResults data={stationList} />
                    </datalist>
                  ) : null}
                </div>
                <div className="search-train form-group destination">
                  <label htmlFor="destination">Destination</label>
                  <Field
                    type="search"
                    className={'form-control'}
                    name="destination"
                    list="stationList"
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue(e.target.name, value);
                      debouncedSave(value);
                    }}
                  />
                  {touched.destination && errors.destination && (
                    <div className="login-form-error">{errors.destination}</div>
                  )}
                  {stationList.length > 0 ? (
                    <datalist id="stationList">
                      <SearchResults data={stationList} />
                    </datalist>
                  ) : null}
                </div>
                <div className="search-train form-group date">
                  <label htmlFor="date">Date</label>
                  <DatePickerComponent name="date" className={'form-control'} />
                </div>
                <button
                  className="btn-submit"
                  type="submit"
                  disabled={!isValid}
                  //style={buttonStyle}
                >
                  {' '}
                  Search{' '}
                </button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default TrainSearchForm;
