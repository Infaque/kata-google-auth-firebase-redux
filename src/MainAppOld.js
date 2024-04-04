import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { updateMessage, changeUser } from './redux/base/base.actions';
import { auth, signInWithGoogle, signInWithSAML, signInWithOIDC } from './firebase/firebase.utils';

class MainApp extends React.Component {

  unsubscribeFromAuth = null;



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
    this.setState({ messageToAdd: '' });


  }

  myChangeHandler = (event) => {
    this.setState({ messageToAdd: event.target.value });
  }




  render() {
    return (
      <div className="App">
        <h1>Hello Show Params! {this.props.user ? this.props.user.displayName + ' You are Logged In' : 'You Are not logged in'}</h1>
        <h3>Message:{this.props.msgToDisplay}</h3>
        <h3>Last Message:{this.props.lastMessage}</h3>
        <form onSubmit={this.mySubmitHandler}>
          <label>
            Name:
          <input type="text" name="name" value={this.state.messageToAdd} onChange={this.myChangeHandler} placeholder="text" />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <button onClick={signInWithGoogle}>Sign In with Google</button>
        <button onClick={signInWithSAML}>Sign In with SAML</button>
        <button onClick={signInWithOIDC}>Sign In with OIDC</button>
        <button onClick={() => auth.signOut()}>Sign Out</button>

        <p>
          <a href="https://test-pubsub-fq.firebaseapp.com">Other site</a>
        </p>


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

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);


