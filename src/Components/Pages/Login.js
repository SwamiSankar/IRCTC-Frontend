import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React, { useContext } from 'react';
import { axiosRequest } from '../../apis/apis';
import { AppContext } from '../../App';

const Login = ({ onClose, show }) => {
  const { dispatch } = useContext(AppContext);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email Required'),
    password: Yup.string().required('Password Required'),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axiosRequest.post('/irctc/v1/auth/login', values);
      dispatch({ type: 'LOGIN_TOKEN', data: response.data.token });
      sessionStorage.setItem('token', response.data.token);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  if (!show) return null;
  return (
    <div className="login-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors, isValid }) => {
          return (
            <div className="login-wrapper" onClick={onClose}>
              <div
                className="form-modal-box"
                onClick={(e) => e.stopPropagation()}
              >
                <button id="x" onClick={onClose}>
                  X
                </button>
                <h1>Please Login to Continue</h1>
                <Form className="form-modal" autoComplete="off">
                  <div className="login-form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      name="email"
                      className={'form-control'}
                    />
                    {touched.email && errors.email && (
                      <div className="login-form-error">{errors.email}</div>
                    )}
                  </div>
                  <div className="login-form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className={'form-control'}
                    />
                    {touched.password && errors.password && (
                      <div className="login-form-error">{errors.password}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn-submit login"
                    disabled={!isValid}
                  >
                    Login
                  </button>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
