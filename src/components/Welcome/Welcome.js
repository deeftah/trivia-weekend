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
    },
    h4: {
        color: "white"
    },
    h2: {
        color: "#55d685"
    }
}
)

class Welcome extends Component {

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
                    <h1 className={classes.h1}>Welcome to Trivia Weekend!</h1>
                    <h4 className={classes.h4}>Please use the links in the upper right to Register for a new team (or into an existing team) or Login to your account. </h4>
                    <br />
                    <h2 className={classes.h2}>About Trivia Weekend</h2>
                    <h4 className={classes.h4}>Trivia Weekend is a trivia team management system designed to support teams in KVSC's annual 50-hour trivia contest, as well as 90FM's 54-hour trivia contest.  However, it has been designed in a way that can support any trivia marathon event.  This platform is admittedly in a very nascent stage for 2020, and while you are welcome to sign up and use this, please expect many changes to come in contests for future years.  2020 is the very first time this platform will be used, and we anticipate many issues can arise.  Please send any feedback or bug reports to Max at <a target="_blank" href="mailto:triviaweekendapp@gmail.com?subject=Inquiry about Trivia Weekend&body=Hello Max"><span style={{ color: "aqua" }}>triviaweekendapp@gmail.com</span></a>.</h4>
                    <br />
                    <h2 className={classes.h2}>Trivia Weekend Demo</h2>
                    <br />
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/epKYc3GDALY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Welcome)));
