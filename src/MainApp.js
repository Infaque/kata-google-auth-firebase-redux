
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth0 from 'auth0-js';
import { updateMessage, changeUser } from './redux/base/base.actions';
import { auth, signInWithGoogle, signInWithSAML, signInWithSAMLRedirect, signInWithOIDC } from './firebase/firebase.utils';
import { useSelector, useDispatch } from "react-redux";

const MainApp = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userInfo = useSelector(state => state.base.user);
  const signedInStatus = useSelector(state => state.base.signedIn);

  useEffect(() => {
    console.log('Login Page UserInfo', userInfo);
    console.log('Login Page signedInStatus', signedInStatus);
  }, [userInfo])

  const signOutHandler = () => {
    console.log('trying auth0 logout');
    var webAuth = new auth0.WebAuth({
      domain: 'dev-trjkd41g.us.auth0.com',
      clientID: 'es7JryUU06luqfk4YGUWQB8NsYfY98Mz'
    });

    webAuth.logout({
      returnTo: 'https://test-saml-sso-1d88c.web.app',
      client_id: 'es7JryUU06luqfk4YGUWQB8NsYfY98Mz'
    });
    console.log('done auth0 logout');
    auth.signOut();
    console.log('Done Log out 4')
  }

  const signedInSection =
    <div>
      <h2>SignedIn Section</h2>
      <p>Display Name: {userInfo?.displayName}</p>
      <p>Email: {userInfo?.email}</p>
      <p>UID: {userInfo?.uid}</p>
      <button onClick={() => window.location.href = "https://test-pubsub-fq.web.app/login"}>Go to Test Pub Sub </button>
      <button onClick={signOutHandler}>Sign Out</button>
    </div>
  const notSignedInSection =
    <div>
      <h2>Not SignedIn Section</h2>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={signInWithSAML}>Sign In with SAML Popup</button>
      <button onClick={signInWithSAMLRedirect}>Sign In with SAML Redirect</button>
      <button onClick={signInWithOIDC}>Sign In with OIDC Popup</button>
    </div>
  return (
    <div>
      <h1>TEST-SAML-SSO App V2:01pm</h1>
      {signedInStatus ? signedInSection : notSignedInSection}
    </div>
  )
}

export default MainApp
