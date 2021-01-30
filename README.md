# Simple app with google auth on firebase
1. Go to Firebase and register project
2. In Auth section, enable google auth
3. In project settings you will find this:
    ```javascript
  var firebaseConfig = {
    apiKey: "AAAA",
    authDomain: "BBB",
    projectId: "CCC",
    storageBucket: "DDD",
    messagingSenderId: "EEE",
    appId: "FFF",
    measurementId: "GGG"
  };
    ```
    You will need to include this in firebase.firebase.utils.js
4. This basic app has a redux store in the "hase" folder under redux.  The basic app shows how text on the page will update (based on the new store) when dispatched.
5. The DisplayName from teh authentitcaged user is also shown.
