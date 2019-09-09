import React, { Component } from 'react';
import {connect} from 'react-redux';

class RegisterPage extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    clearanceId: '',
    teamName: '',
    accessId: ''
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.firstName && this.state.lastName && this.state.username && this.state.password) {

      generateAccessId();

      this.props.dispatch({
        type: 'TEAM_REGISTER',
        payload: {
          teamName: this.state.teamName,
          accessId: this.state.accessId
        }
      })

      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
    console.log('clearance id:', this.state.clearanceId);
    
  }

  generateAccessId() {
    this.state.accessId = Math.floor(Math.random() * 90000000) + 10000000;
    console.log('the access id is:', this.state.accessId);
  }

  render() {

    return (
      
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="firstname">
              First Name:
              <input
                type="text"
                name="firstname"
                value={this.state.firstName}
                onChange={this.handleInputChangeFor('firstName')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="lastname">
              Last Name:
              <input
                type="text"
                name="lastname"
                value={this.state.lastName}
                onChange={this.handleInputChangeFor('lastName')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="username">
              Email Address:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="newteam">
              Are you creating a new team?
              <input
                type="radio"
                name="newteam"
                value="2"
                onChange={this.handleInputChangeFor('clearanceId')}
              />
              <label for="newteam">Yes</label>
              <input
                type="radio"
                name="newteam"
                value="1"
                onChange={this.handleInputChangeFor('clearanceId')}
              />
              <label for="newteam">No</label>
            </label>
          </div>
          <div>
            {this.state.clearanceId == 1 && <span className="span-toggle span-joinTeam">You are joining an existing team!</span>}
            {this.state.clearanceId == 2 && <span className="span-toggle span-joinTeam">You are creating a new team!</span>}
          </div>
          <div>
            {this.state.clearanceId == 2 && <label htmlFor="teamName">
              Enter your Team Name:
              <input
                type="text"
                name="teamname"
                value={this.state.teamName}
                onChange={this.handleInputChangeFor('teamName')}
              />
            </label>}
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

