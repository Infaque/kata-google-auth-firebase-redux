import './App.css';
import React from 'react';
import { connect } from 'react-redux'; 
import {updateMessage ,changeUser} from './redux/base/base.actions';
import { auth  , signInWithGoogle } from './firebase/firebase.utils';

class App extends React.Component {

  unsubscribeFromAuth = null;
     
  componentDidMount(){
         this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
              if (userAuth) {
                var user_jwt;
                await auth.currentUser.getIdToken(true).then(user=>{
                  user_jwt = user;
                  
                });
                
                
                this.props.changeUser({
                  email: userAuth.email,
                  displayName: userAuth.displayName,
                  token: user_jwt,
                  uid: userAuth.uid
                });
              }
              else {
                this.props.changeUser(null);
                console.log('no one is logged in');
              }
              
              
  });
  }

  constructor(props) {
    super(props);
    this.state = {
        messageToAdd: ''
    }
}

mySubmitHandler = (event) => {
    event.preventDefault();
    //alert("You are submitting " + this.state.numToAdd);
    this.props.updateMessage(this.state.messageToAdd);
    this.setState({messageToAdd: ''});
    
    
}

myChangeHandler = (event) => {
    this.setState({messageToAdd: event.target.value});
}




  render(){
  return (
    <div className="App">
      <h1>Hello! {this.props.user? this.props.user.displayName + ' You are Logged In':'You Are not logged in'}</h1>
      <h3>Message:{this.props.msgToDisplay}</h3>
      <h3>Last Message:{this.props.lastMessage}</h3>
      <form onSubmit={this.mySubmitHandler}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.messageToAdd} onChange={this.myChangeHandler} placeholder="text"/>
        </label>
        <input type="submit" value="Submit" />
      </form>

      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={() => auth.signOut()}>Sign Out</button>


    </div>
  );
}
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    updateMessage: new_message => dispatch(updateMessage(new_message)),
    changeUser: (user) => dispatch(changeUser(user))
  }
}


const mapStateToProps = state => ({
  msgToDisplay: state.base.currentMesage,
  lastMessage: state.base.lastMessage,
  user: state.base.user
  
});

export default connect(mapStateToProps,mapDispatchToProps)(App);


