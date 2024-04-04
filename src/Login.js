
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithSAMLRedirect } from './firebase/firebase.utils';
import { useSelector, useDispatch } from "react-redux";
import { updateMessage, changeUser } from './redux/base/base.actions';
import firebase from 'firebase/app';

function Login() {
  let navigate = useNavigate();

  const userInfo = useSelector(state => state.base.user);
  const signedInStatus = useSelector(state => state.base.signedIn);
  const loading = useSelector(state => state.base.loading);



  useEffect(() => {

    console.log('Loading:', loading)
    console.log('Current User:', userInfo);
    if (!loading) {
      if (signedInStatus) {
        console.log('Redirect to home page')
        navigate("/")
      }
      else {
        console.log('Redirect to SAML Login');
        signInWithSAMLRedirect();
        console.log('Done Redirecting to SAML Login');
      }
    }

  }, [loading, signedInStatus]);





  return (
    <div>
      <h1>SAML Login Page</h1>
      {loading && <p>Loading...</p>}
      {!loading && (signedInStatus ? <p>Redirecting to home page</p> : <p>Redirecting to SAML Login page</p>)}

    </div>
  )
}

export default Login
