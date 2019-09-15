import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Card, CardActions, CardContent, Grid, Typography, } from '@material-ui/core';
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
        console.log('contest edits:', propertyName)
    }

    handleEditContest = (id) => {
        this.setState({
            editContest: !this.state.editContest,
            contestEdits: {
                ...this.state.contestEdits,
                newContestId: id
            }
        })
    }

    render() {

        const { classes } = this.props

        let moment = require('moment');

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
        

        return (

            <div>
                <CardContent>
                    <h2>{this.props.currentContest.contest_name}</h2>
                    <span className={classes.currentContest}>
                    {this.props.currentContest.number_of_hours} hours long, {this.props.currentContest.number_of_questions} questions per hour.
                    <br/>It begins <Moment format="MM/DD/YYYY" date={this.props.currentContest.start_date}/> at {contestTime}.</span>
                    <Typography color="secondary">
                        {this.state.editContest && <br/>}
                        {this.state.editContest && 
                        <div><input type="text" style={{ width: "50%" }} onChange={this.handleChangeFor('newContestName')}
                            defaultValue={this.props.currentContest.contest_name} /></div>}
                        {this.state.editContest &&
                            <div><input type="date" style={{ width: "50%" }} onChange={this.handleChangeFor('newStartDate')}
                            defaultValue={formattedDate}/></div>}
                        {this.state.editContest &&
                            <div><select
                                onChange={this.handleChangeFor('newStartTime')}
                                defaultValue={this.props.currentContest.start_time}
                                style={{ width: "50%"}}
                            >
                                {hourSelection.map((hour) =>
                                    <option key={hour.sqlValue} value={hour.sqlValue}>{hour.displayValue}</option>
                                )}
                            </select></div>}
                        {this.state.editContest &&
                            <div><input type="number" style={{ width: "50%" }} onChange={this.handleChangeFor('newNumberOfHours')}
                                defaultValue={this.props.currentContest.number_of_hours} /></div>}
                        {this.state.editContest &&
                            <div><input type="number" style={{ width: "50%" }} onChange={this.handleChangeFor('newNumberOfQuestions')}
                                defaultValue={this.props.currentContest.number_of_questions} /></div>}
                    </Typography>
                </CardContent>
                <CardActions>
                    {!this.state.editContest &&
                        <Button color="secondary" onClick={() => this.handleEditContest(this.props.currentContest.id)} style={{ marginRight: 20, marginLeft: 0 }}>
                            <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                    {this.state.editContest &&
                        <Button color="secondary" onClick={this.toggleContestEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                            <Cancel style={{ marginRight: 3 }} />Cancel
                         </Button>}
                    {this.state.editContest &&
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