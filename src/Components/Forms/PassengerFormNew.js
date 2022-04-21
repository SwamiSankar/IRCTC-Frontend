import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import { Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Login from '../Pages/Login';

const PassengerForm = ({ data }) => {
  const [show, setShow] = useState(true);
  const { state } = useContext(AppContext);

  let token = sessionStorage.getItem('token');

  const initialValues = {
    passengerList: [
      {
        name: '',
        age: '',
        gender: '',
        berth: '',
      },
    ],
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .matches(
        /^[a-zA-Z]*$/,
        'Source Location must not contain numbers or special Characters'
      ),
    age: Yup.string()
      .required('Age is Required')
      .matches(/^[0-9]{2}$/),
    gender: Yup.string().required('Gender is Required'),
  });

  return token === undefined ? (
    <Login onClose={() => setShow(false)} show={show} />
  ) : (
    <>
      <div className="passenger-form-container">
        <Formik initialValues={initialValues}>
          {({ touched, errors, isValid }) => {
            return (
              <Form className="passenger-form" autoComplete="off">
                <label>Passenger List</label>

                <FieldArray name="passengerList">
                  {(fieldArrayProps) => {
                    console.log(fieldArrayProps);
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { passengerList } = values;
                    console.log(passengerList);

                    passengerList && passengerList.length > 0 ? (
                      [1, 2, 3].map((passenger, index) => {
                        return <div>HI</div>;
                        // <div key={index}>
                        //   <div className="passenger-name">
                        //     <label htmlFor="name">Passenger Name</label>
                        //     <Field name={`passengerList[${index}].name`} />
                        //   </div>
                        //   <div className="passenger-age">
                        //     <label htmlFor="name">Age</label>
                        //     <Field name={`passengerList[${index}].age`} />
                        //   </div>
                        //   <div className="passenger-gender">
                        //     <label htmlFor="name">Gender</label>
                        //     <Field name={`passengerList[${index}].gender`} />
                        //   </div>
                        //   <div className="passenger-berth">
                        //     <label htmlFor="name">Berth</label>
                        //     <Field name={`passengerList[${index}].berth`} />
                        //   </div>
                        // </div>
                      })
                    ) : (
                      <button
                        type="button"
                        onClick={() => passengerList.push('')}
                      >
                        Add Passenger
                      </button>
                    );
                  }}
                </FieldArray>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default PassengerForm;
