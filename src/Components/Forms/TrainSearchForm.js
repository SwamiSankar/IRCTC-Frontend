import { Formik, Form, Field } from 'formik';
import { parse, isDate } from 'date-fns';
import moment from 'moment';
import { axiosRequest } from '../../apis/apis';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import DatePickerComponent from '../utils/DatePickerComponent';
import { AppContext } from '../../App';

const TrainSearchForm = () => {
  const { dispatch } = useContext(AppContext);
  //   const buttonStyle = {
  //     height: '32px',
  //     width: '140px',
  //     borderRadius: '6px 6px 6px 6px',
  //     marginLeft: '10px',
  //     marginTop: '1.5rem',
  //   };

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
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ touched, isValid, errors }) => {
        return (
          <div className="edit-form-container">
            <div className="edit-form-wrapper">
              <Form className="form-container" autoComplete="off">
                <div className="search-train form-group source">
                  <label htmlFor="source">Source</label>
                  <Field type="text" className={'form-control'} name="source" />
                  {touched.source && errors.source && (
                    <div className="login-form-error">{errors.source}</div>
                  )}
                </div>
                <div className="search-train form-group destination">
                  <label htmlFor="destination">Destination</label>
                  <Field
                    type="text"
                    className={'form-control'}
                    name="destination"
                  />
                  {touched.destination && errors.destination && (
                    <div className="login-form-error">{errors.destination}</div>
                  )}
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
