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
  }

  generateAccessId() {
    this.state.accessId = Math.floor(Math.random() * 90000000) + 10000000;
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

            <form onSubmit={this.registerTeam}>
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
              {/* <div>
              <label htmlFor="password">
                Password:
              <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div> */}
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
              <br /><br />
              <div>
                <FormControl
                  component="fieldset"
                  className={classes.radio}
                >
                  <FormLabel
                    component="legend"
                    style={{ color: "white" }}
                  >
                    Are you creating a new team?
                  </FormLabel>
                  <RadioGroup
                    aria-label="newTeam"
                    name="newTeam"
                    onChange={this.handleInputChangeFor("clearanceId")}
                  >
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/* <div>
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
              </div> */}
              <div>
                {this.state.clearanceId == 1 && <span className="span-toggle span-joinTeam">You are joining an existing team!</span>}
                {this.state.clearanceId == 2 && <span className="span-toggle span-joinTeam">You are creating a new team!</span>}
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

