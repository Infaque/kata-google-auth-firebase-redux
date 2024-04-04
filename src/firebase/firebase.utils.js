import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";


// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_CONFIG,
//   authDomain: "test-fcm-9a613.firebaseapp.com",
//   projectId: "test-fcm-9a613",
//   storageBucket: "test-fcm-9a613.appspot.com",
//   messagingSenderId: "628221241793",
//   appId: "1:628221241793:web:b0f13e967f624783e46740",
//   measurementId: "G-6KY4D562JT"
// };

const config = {
  apiKey: "AIzaSyDoNuPMfRLIcHn1aCe9yn9Sto3QaqtMYfQ",
  authDomain: "test-saml-sso-1d88c.firebaseapp.com",
  projectId: "test-saml-sso-1d88c",
  storageBucket: "test-saml-sso-1d88c.appspot.com",
  messagingSenderId: "853376503255",
  appId: "1:853376503255:web:f41cddc29e1f52ca6c0f92"
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
var samlProvider = new firebase.auth.SAMLAuthProvider('saml.fqsso123');
const oidcProvider = new firebase.auth.OAuthProvider('oidc.fq1');

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signInWithSAMLRedirect = () => auth.signInWithRedirect(samlProvider);


export const signInWithSAMLRedirectResult = () => auth.getRedirectResult();




// export const signInWithSAMLRedirectResult = () => auth.getRedirectResult().then((r) => {
//   console.log('saml login', r);

//   // console.log("going to home page...")
//   // navigate("/");

//   // console.log('additionalUserInfo', r.additionalUserInfo);
//   // console.log('additionalUserInfo.no', r.additionalUserInfo.no);
//   // console.log('additionalUserInfo.profile', r.additionalUserInfo.profile);
//   // console.log('additionalUserInfo.profile', r.additionalUserInfo.profile);
//   // console.log('Name:', r.additionalUserInfo.profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"])
//   // const displayName = r.additionalUserInfo.profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
//   //const userEmail = r.additionalUserInfo.profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
//   // auth.currentUser.updateProfile({
//   //   displayName: displayName
//   // })
// });

export const signInWithSAML = () => auth.signInWithPopup(samlProvider).then((r) => {
  console.log('saml login', r);

  console.log('additionalUserInfo', r.additionalUserInfo);
  console.log('additionalUserInfo.no', r.additionalUserInfo.no);
  console.log('additionalUserInfo.profile', r.additionalUserInfo.profile);
  console.log('additionalUserInfo.profile', r.additionalUserInfo.profile);
  console.log('Name:', r.additionalUserInfo.profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"])
  const displayName = r.additionalUserInfo.profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  //const userEmail = r.additionalUserInfo.profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
  auth.currentUser.updateProfile({
    displayName: displayName
  })
  //auth.currentUser.updateEmail(userEmail)

});

export const signInWithOIDC = () => firebase.auth().signInWithPopup(oidcProvider).then((result) => {
  console.log('OIDC Result:', result)
  // result.credential is a firebase.auth.OAuthCredential object.
  // result.credential.providerId is equal to 'oidc.myProvider'.
  // result.credential.idToken is the OIDC provider's ID token.
})
  .catch((error) => {
    // Handle error.
    console.log('Error')
  });



export default firebase;