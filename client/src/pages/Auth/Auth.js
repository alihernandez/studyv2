import React from 'react';
import Login from '../../components/Login';
import Signup from '../../components/Signup';


const Auth = (props) => {
  return (
    <div className="authBox">
      {props.action === 'login' ? <Login /> : <Signup />}
    </div>
  );
};

export default Auth;
