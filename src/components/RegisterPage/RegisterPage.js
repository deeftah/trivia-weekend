import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  registerTeam = (event) => {

    event.preventDefault();

    if (this.state.clearanceId === '2') {

      this.generateAccessId();

      this.props.dispatch({
        type: 'TEAM_REGISTER',
        payload: {
          teamName: this.state.teamName,
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          clearanceId: this.state.clearanceId,
          accessId: this.state.accessId,
        }
      })
    } else if (this.state.clearanceId === '1') {
      this.props.dispatch({
        type: 'USER_REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          clearanceId: this.state.clearanceId,
          accessId: this.state.accessId,
        }
      })
    }
  } // end register

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  generateAccessId() {
    this.state.accessId = Math.floor(Math.random() * 90000000) + 10000000;
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

        <form onSubmit={this.registerTeam}>
          <h1>Register</h1>
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
            {this.state.clearanceId == 1 && <label htmlFor="teamName">
              Enter your team's Access ID:
              <input
                type="text"
                name="accessid"
                value={this.state.accessId}
                onChange={this.handleInputChangeFor('accessId')}
              />
            </label>}
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register Team"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
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
  user: state.user,
});

export default connect(mapStateToProps)(RegisterPage);

