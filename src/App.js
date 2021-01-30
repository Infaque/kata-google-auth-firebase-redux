import './App.css';
import React from 'react';
import { connect } from 'react-redux'; 
import {updateMessage } from './redux/base/base.actions'

class App extends React.Component {

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
      <h1>Message:{this.props.msgToDisplay}</h1>
      <h3>Last Message:{this.props.lastMessage}</h3>
      <form onSubmit={this.mySubmitHandler}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.messageToAdd} onChange={this.myChangeHandler} placeholder="text"/>
        </label>
        <input type="submit" value="Submit" />
      </form>



    </div>
  );
}
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    updateMessage: new_message => dispatch(updateMessage(new_message))
  }
}


const mapStateToProps = state => ({
  msgToDisplay: state.base.currentMesage,
  lastMessage: state.base.lastMessage
  
});

export default connect(mapStateToProps,mapDispatchToProps)(App);


