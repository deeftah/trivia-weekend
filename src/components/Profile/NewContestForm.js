
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
import { Button, Card, CardActions, CardContent, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        backgroundColor: '#494A49',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: theme.palette.secondary.main,
        textAlign: 'center'
    },
    h1: {
        color: theme.palette.primary.main
    },
    contestText: {
        width: 450,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white"
        }
    },
    contestDateTime: {
        width: 215,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white"
        }
    },
    timeOptions: {
        width: 215,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white"
        }
    },
    contestNumber: {
        width: 150,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white"
        }
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
});

const Fade = (props, ref) => {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
};

class NewContestForm extends Component {

    state = {
        newContest: {
            contestName: '',
            startDate: '',
            startTime: '',
            numberOfHours: 0,
            numberOfQuestions: 0,
        },
        open: false,
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            newContest: {
                ...this.state.newContest,
                [propertyName]: event.target.value
            }
        });
    }

    addContest = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_CONTEST',
            payload: this.state.newContest

        })
        this.handleClose();
        this.setState({
            newContest: {
                contestName: '',
                startDate: '',
                startTime: '',
                numberOfHours: 0,
                numberOfQuestions: 0,
            }
        })
    }

    handleOpen = () => {
        this.setState({
            open: !this.state.open
        })
    };

    handleClose = () => {
        this.setState({
            open: !this.state.open
        })
    };

    //DEMO PURPOSES
    handleDemo = () => {
        this.setState({
            newContest: {
                ...this.state.newContest,
                contestName: 'Trivia Contest 2020',
                startDate: '2020-02-14',
                startTime: 17,
                numberOfHours: 50,
                numberOfQuestions: 9,
            }
        })
    }

    render() {

        const { classes } = this.props

        let hourSelection = []

        for (let i = 0; i < 24; i++) {
            let hourFormat = {
                displayValue: 0,
                sqlValue: 0
            }
            hourFormat.sqlValue = i;
            if (i == 0) {
                hourFormat.displayValue = '12 am'
                hourSelection.push(hourFormat);
            } else if (i < 12) {
                hourFormat.displayValue = i + ' am'
                hourSelection.push(hourFormat);
            } else if (i == 12) {
                hourFormat.displayValue = '12 pm'
                hourSelection.push(hourFormat)
            } else if (i <= 23) {
                let j = i;
                hourFormat.displayValue = j - 12 + ' pm'
                hourSelection.push(hourFormat);
            }
        }

        return (

            <div>
                <Button variant="contained" style={{ backgroundColor: this.props.user.color }} onClick={this.handleOpen}>
                    New Contest
                </Button>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <CardContent className={classes.form}>

                        <h1 className={classes.h1} style={{ color: this.props.user.color }} onClick={() => this.handleDemo()}>Enter Contest Details</h1>
                        <form onSubmit={this.addContest}>
                            <div>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="name your contest"
                                    className={classes.contestText}
                                    value={this.state.newContest.contestName}
                                    onChange={this.handleInputChangeFor('contestName')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
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
                                    type="date"
                                    id="outlined-name"
                                    label="contest start date"
                                    className={classes.contestDateTime}
                                    value={this.state.newContest.startDate}
                                    onChange={this.handleInputChangeFor('startDate')}
                                    margin="normal"
                                    variant="outlined"
                                    style={{ marginRight: 20 }}
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
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
                                    select
                                    label="contest start time"
                                    className={classes.contestDateTime}
                                    value={this.state.newContest.startTime}
                                    onChange={this.handleInputChangeFor('startTime')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.status,
                                        },
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                >
                                    {hourSelection.map((hour) =>
                                        <MenuItem key={hour.sqlValue} value={hour.sqlValue} className={classes.timeOptions}>
                                            {hour.displayValue}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    type="number"
                                    label="number of hours"
                                    className={classes.contestNumber}
                                    value={this.state.newContest.numberOfHours}
                                    onChange={this.handleInputChangeFor('numberOfHours')}
                                    margin="normal"
                                    style={{ marginRight: 20 }}
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
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
                                    type="number"
                                    label="questions per hour"
                                    className={classes.contestNumber}
                                    value={this.state.newContest.numberOfQuestions}
                                    onChange={this.handleInputChangeFor('numberOfQuestions')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    name="submit"
                                    className="contestAddButton"
                                    style={{ marginTop: 10, backgroundColor: this.props.user.color }}>
                                    <AddCircle style={{ marginRight: 3 }} />Add Contest
                         </Button>
                            </div>
                            {/* <div>
                                <input
                                    className="contestAddButton"
                                    type="submit"
                                    name="submit"
                                    value="Add Contest"
                                />
                            </div> */}
                        </form>

                    </CardContent>
                </Modal>
            </div>

        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NewContestForm)));