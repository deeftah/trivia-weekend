import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Card, CardActions, CardContent, Grid, MenuItem, TextField, Typography, } from '@material-ui/core';
import { Cancel, Edit, Save } from '@material-ui/icons';
import NewContestForm from './NewContestForm';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    currentContest: {
        textAlign: 'center',
        fontSize: 18,
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

class UpdateContest extends Component {

    state = {
        contestEdits: {
            newContestName: this.props.currentContest.contest_name,
            newStartDate: this.props.currentContest.start_date,
            newStartTime: this.props.currentContest.start_time,
            newNumberOfHours: this.props.currentContest.number_of_hours,
            newNumberOfQuestions: this.props.currentContest.number_of_questions,
            newContestId: this.props.currentContest.id
        },
        editContest: false,
    }

    componentDidMount() {
        this.getContestDetails();
    }

    getContestDetails() {
        this.props.dispatch({
            type: 'FETCH_CURRENT_CONTEST',
            payload: this.props.user
        })
    }

    toggleContestEdit = () => {
        this.setState({
            editContest: !this.state.editContest
        })
    }

    handleContestSave = () => {
        this.props.dispatch({
            type: 'UPDATE_CURRENT_CONTEST_DETAILS',
            payload: this.state.contestEdits
        })
        this.setState({
            editContest: !this.state.editContest,
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            contestEdits: {
                ...this.state.contestEdits,
                [propertyName]: event.target.value
            }
        });
        console.log('contest edits:', this.state.contestEdits)
    }

    handleEditContest = (id) => {
        this.setState({
            editContest: !this.state.editContest,
            contestEdits: {
                ...this.state.contestEdits,
                newContestId: id,
                newContestName: this.props.currentContest.contest_name,
                newStartDate: this.props.currentContest.start_date,
                newStartTime: this.props.currentContest.start_time,
                newNumberOfHours: this.props.currentContest.number_of_hours,
                newNumberOfQuestions: this.props.currentContest.number_of_questions
            }
        })
    }

    render() {
        console.log('the state upon refresh is:', this.state.contestEdits)

        const { classes } = this.props

        let moment = require('moment');
        let converter = require('number-to-words');

        let contestTime = this.props.currentContest.start_time;
        let stringContestTime = '' + contestTime;

        if (this.props.currentContest.start_time == 0) {
            contestTime = '12 am'
        } else if
            (this.props.currentContest.start_time < 12) {
            contestTime = stringContestTime + ' am'
        } else if
            (this.props.currentContest.start_time == 12) {
            contestTime = '12 pm'
        } else if
            (this.props.currentContest.start_time < 24) {
            contestTime = (stringContestTime - 12) + ' pm'
        }

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

        let originalDate = this.props.currentContest.start_date;

        let formattedDate = String(originalDate).substring(0, 10);

        console.log('formatted date is', this.props.currentContest.start_date);

        let hours = this.props.currentContest.number_of_hours;

        let hoursAsWords = converter.toWords(hours ? hours : 0);

        let numberOfQuestions = this.props.currentContest.number_of_questions;

        let numberOfQuestionsAsWords = converter.toWords(numberOfQuestions ? numberOfQuestions : 0);

        let name = hoursAsWords
        let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)

        let capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }

        return (
            <div>
                <CardContent>
                    <h2>{this.props.currentContest.contest_name}</h2>
                    <span className={classes.currentContest}>
                        {nameCapitalized} hours long, {numberOfQuestionsAsWords} questions per hour.
                    <br />Beginning <Moment format="MM/DD/YYYY" date={this.props.currentContest.start_date} /> at {contestTime}.</span>
                    <Typography color="secondary">
                        {this.state.editContest && <br />}
                        {this.state.editContest &&
                            <div>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="name your contest"
                                    className={classes.contestText}
                                    value={this.state.contestEdits.newContestName}
                                    onChange={this.handleChangeFor('newContestName')}
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
                            </div>}
                        {this.state.editContest &&
                            <div>
                                <TextField
                                    align="left"
                                    type="date"
                                    id="outlined-name"
                                    label="contest start date"
                                    className={classes.contestDateTime}
                                    value={this.state.contestEdits.newStartDate}
                                    onChange={this.handleChangeFor('newStartDate')}
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
                                    value={this.state.contestEdits.newStartTime}
                                    onChange={this.handleChangeFor('newStartTime')}
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

                            </div>}
                        {this.state.editContest &&
                            <div>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    type="number"
                                    label="number of hours"
                                    className={classes.contestNumber}
                                    value={this.state.contestEdits.newNumberOfHours}
                                    onChange={this.handleChangeFor('newNumberOfHours')}
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
                                    value={this.state.contestEdits.newNumberOfQuestions}
                                    onChange={this.handleChangeFor('newNumberOfQuestions')}
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
                            </div>}
                    </Typography>
                </CardContent>
                <CardActions>
                    {!this.state.editContest && (this.props.user.clearance_id > 1) &&
                        <Button color="secondary" onClick={() => this.handleEditContest(this.props.currentContest.id)} style={{ marginRight: 20, marginLeft: 0 }}>
                            <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                    {this.state.editContest && (this.props.user.clearance_id > 1) &&
                        <Button color="secondary" onClick={this.toggleContestEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                            <Cancel style={{ marginRight: 3 }} />Cancel
                         </Button>}
                    {this.state.editContest && (this.props.user.clearance_id > 1) &&
                        <Button color="primary" onClick={this.handleContestSave} style={{ marginLeft: "auto", marginRight: 0 }}>
                            <Save style={{ marginRight: 3 }} />Save
                            </Button>}
                </CardActions>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    currentContest: state.currentContest
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(UpdateContest)));