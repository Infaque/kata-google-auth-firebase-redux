

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMessage, changeUser, setSignedIntatus, setLoadingStatus } from './redux/base/base.actions';
import MainApp from './MainApp';
import Login from './Login';
import { auth, signInWithSAMLRedirectResult } from './firebase/firebase.utils';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  let params = useParams();


  useEffect(() => {


    signInWithSAMLRedirectResult().then((r) => {
      console.log('Redirect from saml login. Result:', r);

    });

  }, []);

  useEffect(() => {

    console.log('Params:', params);
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log('User is logged in:', userAuth.displayName);

        const userInfo = {
          email: userAuth.email,
          displayName: userAuth.displayName,
          uid: userAuth.uid
        }

        dispatch(changeUser(userInfo));
        dispatch(setSignedIntatus(true));
        dispatch(setLoadingStatus(false));


      }
      else {
        dispatch(changeUser(null));
        dispatch(setSignedIntatus(false));
        console.log('no one is logged in');
        dispatch(setLoadingStatus(false));
      }


    });


  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="hello" element={<h1>Hello World</h1>} />
          <Route path="login" element={<Login />} />
          <Route path="signedin" element={<h1>Signed In</h1>} />
          <Route path="redirectsaml" element={<h1>Redirecting to SAML Provider</h1>} />



        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
