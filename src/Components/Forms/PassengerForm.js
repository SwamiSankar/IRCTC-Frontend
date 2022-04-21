import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Login from '../Pages/Login';

const PassengerForm = ({ data }) => {
  const [show, setShow] = useState(true);
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  let token = sessionStorage.getItem('token');

  const validationSchema = Yup.object({
    passengerList: Yup.array().of(
      Yup.object({
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
      })
    ),
  });

  return token === undefined ? (
    <Login onClose={() => setShow(false)} show={show} />
  ) : (
    <>
      <div className="passenger-form-container">
        <Formik
          initialValues={{
            passengerList: [
              {
                name: '',
                age: '',
                gender: '',
                berth: '',
              },
            ],
          }}
          validationSchema={validationSchema}
          onSubmit={(values) =>
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 500)
          }
          render={({ values, touched, errors, isValid }) => (
            <Form>
              <label>Passenger Form</label>
              <FieldArray
                name="passengerList"
                render={(arrayHelpers) => (
                  <div className="passenger-list">
                    {values.passengerList && values.passengerList.length > 0 ? (
                      values.passengerList.map((friend, index) => (
                        <div key={index} className="passenger-field">
                          <div className="passenger-entry">
                            <Field
                              name={`passengerList.${index}.name`}
                              placeholder="Passenger Name"
                              className="passenger-name"
                            />

                            <Field
                              name={`passengerList.${index}.age`}
                              placeholder="Age"
                              className="passenger-age"
                            />

                            <Field
                              name={`passengerList.${index}.gender`}
                              placeholder="Gender"
                              as="select"
                              className="passenger-gender"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </Field>

                            <Field
                              name={`passengerList.${index}.berth`}
                              placeholder="Berth Preference"
                              className="passenger-berth"
                              as="select"
                            >
                              <option value="lb">Lower</option>
                              <option value="mb">Middle</option>
                              <option value="ub">Upper</option>
                              <option value="sl">Side Lower</option>
                              <option value="su">Side Upper</option>
                            </Field>
                          </div>

                          {values.passengerList.length > 1 ? (
                            <button
                              type="button"
                              className="btn remove-passenger"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              Remove
                            </button>
                          ) : null}

                          {index === values.passengerList.length - 1 &&
                          values.passengerList.length < 6 ? (
                            <button
                              type="button"
                              className="btn add-passenger"
                              onClick={() =>
                                arrayHelpers.insert({
                                  name: '',
                                  age: '',
                                  gender: '',
                                  berth: '',
                                })
                              } // insert an empty passenger data at a position
                            >
                              Add Passenger
                            </button>
                          ) : null}
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        className="btn add-passenger"
                        onClick={() =>
                          arrayHelpers.push({
                            name: '',
                            age: '',
                            gender: '',
                            berth: '',
                          })
                        }
                      >
                        {/* show this when user has removed all friends from the list */}
                        Add Passenger
                      </button>
                    )}
                    <div>
                      <button type="submit" className="btn submit-passengers">
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.history.state &&
                            window.history.state.idx > 0
                          ) {
                            navigate(-1);
                          } else {
                            navigate('/', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
                          }
                        }}
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                )}
              />
            </Form>
          )}
        />
      </div>
    </>
  );
};

export default PassengerForm;
