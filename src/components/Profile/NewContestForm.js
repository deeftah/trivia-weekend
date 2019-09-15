
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
import { Button, Card, CardActions, CardContent, Grid, Typography, } from '@material-ui/core';

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
    }
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
                <Button variant="contained" color="primary" onClick={this.handleOpen}>
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

                        <h1 className={classes.h1}>Enter Contest Details</h1>
                        <form onSubmit={this.addContest}>
                            <div>
                                <label htmlFor="contestName">
                                    Name Your Contest:
                                <input
                                        type="text"
                                        name="contestName"
                                        onChange={this.handleInputChangeFor('contestName')}
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="startDate">
                                    Contest Start Date:
                                <input
                                        type="date"
                                        name="startDate"
                                        onChange={this.handleInputChangeFor('startDate')}
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="startTime">
                                    Contest Start Time:
                                <select
                                        name="startTime"
                                        onChange={this.handleInputChangeFor('startTime')}
                                    >
                                        {hourSelection.map((hour) =>
                                            <option key={hour.sqlValue} value={hour.sqlValue}>{hour.displayValue}</option>
                                        )}
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="numberOfHours">
                                    Number of Hours:
                                <input
                                        type="number"
                                        name="numberOfHours"
                                        onChange={this.handleInputChangeFor('numberOfHours')}
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="numberOfQuestions">
                                    Questions per Hour:
                                <input
                                        type="number"
                                        name="numberOfQuestions"
                                        onChange={this.handleInputChangeFor('numberOfQuestions')}
                                    />
                                </label>
                            </div>
                            <div>
                                <input
                                    className="contestAddButton"
                                    type="submit"
                                    name="submit"
                                    value="Add Contest"
                                />
                            </div>
                        </form>

                    </CardContent>

                    {/* <Fade in={this.state.open}>
                        <div className={classes.paper}>
                            <h2 id="spring-modal-title">Spring modal</h2>
                            <p id="spring-modal-description">react-spring animates me.</p>
                        </div>
                    </Fade> */}
                </Modal>
            </div>

        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NewContestForm)));