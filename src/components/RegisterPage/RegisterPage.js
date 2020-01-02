import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Box, Card, CardContent, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    textAlign: 'center',
    background: '#494A49',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldMedium: {
    margin: 5,
    width: 240,
    '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
      borderColor: "white"
    }
  },
  fieldLarge: {
    margin: 5,
    width: 490,
    '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
      borderColor: "white"
    }
  },
  question: {
    fontSize: 20
  },
  radio: {
    margin: theme.spacing(3),
    color: "white",
  },
  input: {
    color: "white"
  },
  cssLabel: {
    '&$cssFocused': {
      color: "white",
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: "white",
    },
  },
  cssFocused: {},
  notchedOutline: { borderColor: "white" },
  h1: {
    color: "#55d685"
  }
}
)
class RegisterPage extends Component {

  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    clearanceId: '',
    teamName: '',
    accessId: ''
  };

  registerTeam() {

    if (this.state.clearanceId === '2') {

      this.generateAccessId();

      this.props.dispatch({
        type: 'TEAM_REGISTER',
        payload: {
          teamName: this.state.teamName,
          username: this.state.username,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
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
    this.props.history.push(`/main`);
  } // end register

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
    console.log('changing the first name:', this.state.firstName)
  }

  generateAccessId() {
    this.state.accessId = Math.floor(Math.random() * 90000000) + 10000000;
  }

  passwordValidation() {

    if (this.state.password.length < 8) {
      alert("Please ensure your password is at least eight characters.");
      return false;
    }
    if (this.state.password !== this.state.confirmPassword) {
      alert("The passwords do not match.  Please try again.");
      return false;
    }

    this.registerTeam();
  }

  fieldValidation = event => {
    event.preventDefault();

    if (!this.state.firstName) {
      alert("Please enter a value for First Name.");
      return false;
    }
    if (!this.state.lastName) {
      alert("Please enter a value for Last Name.");
      return false;
    }
    if (!this.state.username) {
      alert("Please enter a value for Email Address.");
      return false;
    }
    if (!this.state.password) {
      alert("Please enter a value for Password.");
      return false;
    }
    if (!this.state.confirmPassword) {
      alert("Please enter a value for Confirm Password.");
      return false;
    }
    if (this.state.clearanceId === '') {
      alert("Please select whether you are creating a new team or joining an existing team.");
      return false;
    }
    if (this.state.clearanceId === '2' && !this.state.teamName) {
      alert("Please enter a Team Name.");
      return false;
    }
    if (this.state.clearanceId === '1' && !this.state.accessId) {
      alert("Please enter your team's private Access Code.");
      return false;
    }

    this.passwordValidation();
    
  }

  render() {

    const { classes } = this.props;

    return (
      <div style={{ marginTop: 70, padding: 30 }}>
        <Box textAlign="center">
          <div>
            {this.props.errors.registrationMessage && (
              <h2
                className="alert"
                role="alert"
              >
                {this.props.errors.registrationMessage}
              </h2>
            )}

            <form onSubmit={this.fieldValidation}>
              <h1>Register</h1>
              <div>
                <TextField
                  align="left"
                  id="outlined-name"
                  label="first name"
                  className={classes.fieldMedium}
                  value={this.state.firstName}
                  onChange={this.handleInputChangeFor("firstName")}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    className: classes.input,
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  InputLabelProps={{
                    className: classes.input,
                    shrink: true
                  }}
                />
                <TextField
                  align="left"
                  id="outlined-name"
                  label="last name"
                  className={classes.fieldMedium}
                  value={this.state.lastName}
                  onChange={this.handleInputChangeFor("lastName")}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    className: classes.input,
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  InputLabelProps={{
                    className: classes.input,
                    shrink: true
                  }}
                />
              </div>
              <div>
                <TextField
                  align="left"
                  id="outlined-name"
                  label="email address"
                  className={classes.fieldLarge}
                  value={this.state.username}
                  onChange={this.handleInputChangeFor("username")}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    className: classes.input,
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  InputLabelProps={{
                    className: classes.input,
                    shrink: true
                  }}
                />
              </div>
              <div>
                <TextField
                  type="password"
                  align="left"
                  id="outlined-name"
                  label="password"
                  className={classes.fieldMedium}
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    className: classes.input,
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  InputLabelProps={{
                    className: classes.input,
                    shrink: true
                  }}
                />
                <TextField
                  type="password"
                  align="left"
                  id="outlined-name"
                  label="confirm password"
                  className={classes.fieldMedium}
                  value={this.state.confirmPassword}
                  onChange={this.handleInputChangeFor("confirmPassword")}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    className: classes.input,
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  InputLabelProps={{
                    className: classes.input,
                    shrink: true
                  }}
                />
              </div>
              <br />
              <div>
                <FormControl
                  component="fieldset"
                  className={classes.radio}
                >
                  <FormLabel
                    component="legend"
                    style={{ color: "white" }}
                  >
                  </FormLabel>
                  <RadioGroup
                    aria-label="newTeam"
                    name="newTeam"
                    onChange={this.handleInputChangeFor("clearanceId")}
                  >
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Create a new team"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Join an existing team"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div>
                {this.state.clearanceId == 1 && <span className="span-toggle span-joinTeam"><b>Enter your team's private access code!</b></span>}
                {this.state.clearanceId == 2 && <span className="span-toggle span-joinTeam"><b>Enter a name for your new team!</b></span>}
              </div>
              <br />
              <div>
                {this.state.clearanceId == 2 &&
                  <TextField
                    align="left"
                    id="outlined-name"
                    label="enter a new team name"
                    className={classes.fieldLarge}
                    value={this.state.teamName}
                    onChange={this.handleInputChangeFor("teamName")}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      className: classes.input,
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                    InputLabelProps={{
                      className: classes.input,
                      shrink: true
                    }}
                  />
                }
              </div>
              <div>
                {this.state.clearanceId == 1 && 
                  <TextField
                    align="left"
                    id="outlined-name"
                    label="enter team access code"
                    className={classes.fieldMedium}
                    value={this.state.accessId}
                    onChange={this.handleInputChangeFor("accessId")}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      className: classes.input,
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                    InputLabelProps={{
                      className: classes.input,
                      shrink: true
                    }}
                  />
                }
              </div>
              <br/>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  name="submit"
                  value="Register"
                >
                  Register
                        </Button>
              </div>
            </form>
          </div>
        </Box>
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(RegisterPage)));

