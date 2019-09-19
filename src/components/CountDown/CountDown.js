import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';
import moment from 'react-moment';
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class CountDown extends Component {

    componentDidMount() {
        this.getContestDetails();
    }

    getContestDetails() {
        this.props.dispatch({
            type: 'FETCH_CURRENT_CONTEST',
            payload: this.props.user
        })
    }

    render() {

        let daysWord = 'days'

        let hoursWord = 'hours'

        let minutesWord = 'minutes'

        let secondsWord = 'seconds'

        //START OF COUNTDOWN LOGIC
        let moment = require('moment');

        // let a = '2020-02-14T06:00:00-06:00';
        // let b = '17:00:00-06:00';

        let daylightSavingCheckContest = moment(this.props.currentContest.start_date).isDST()
        let daylightSavingCheckNow = moment().isDST();

        let originalDate = this.props.currentContest.start_date
        let convertedDate = moment(originalDate).valueOf();

        //one hour is 3600000 milliseconds

        let contestStartTime = (this.props.currentContest.start_time - 1) * 3600000

        if (daylightSavingCheckNow === true && daylightSavingCheckContest === false) {
            contestStartTime += 3600000
        } else if (daylightSavingCheckNow === false && daylightSavingCheckContest === true) {
            contestStartTime -= 3600000
        }

            //when creating contest:  midnight is -3600000 (to fix Eastern Time to Central), 1 am is 0, 2 am is 3600000, 3 am is 7200000, etc.
            //THEN, we can do this: let d = this.props.currentContest.start_time
            //FOR NOW: 61200000 milliseconds is 5 p.m.

        let finalTime = convertedDate + contestStartTime;

        console.log('the final display time is', finalTime)

        // console.log('this is the b.value of', moment().valueOf(timeToConvert))

        // const futureDate = 1581717600000;

        let futureDate = finalTime

        let currentDate = Date.now();

        let dateDifference = futureDate - currentDate;

        // End countdown message
        const Completionist = () => <span><h2>{this.props.currentContest.contest_name} has started!  Good luck, trivia players!</h2></span>;

        // Renderer callback with condition
        const renderer = ({ days, hours, minutes, seconds, completed }) => {
            if (days === 1) {
                daysWord = 'day'
            } else {
                daysWord = 'days'
            }

            if (hours === 1) {
                hoursWord = 'hour'
            } else {
                hoursWord = 'hours'
            }

            if (minutes === 1) {
                minutesWord = 'minute'
            } else {
                minutesWord = 'minutes'
            }

            if (seconds === 1) {
                secondsWord = 'second'
            } else {
                secondsWord = 'seconds'
            }

            if(this.props.currentContest.id == null) {
                return `Visit the Admin page and create your first contest.  Then come back here for a countdown to the contest!`
            }
            else if (completed) {
                // Render a completed state
                return <Completionist />
            } else {
                // Render a countdown
                return (
                    <Grid container spacing={2} justify="center">
                        <Grid item sm={3}>
                            <Card style={{ backgroundColor: "#494A49"}}>
                                <CardContent>
                                    <Typography color="secondary" align="center" style={{fontSize: 80}}>
                                        {days}
                                </Typography>
                                    <Typography color="secondary" align="center" style={{ fontSize: 20 }}>
                                        {daysWord}
                                </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card style={{ backgroundColor: "#494A49" }}>
                                <CardContent>
                                    <Typography color="secondary" align="center" style={{ fontSize: 80 }}>
                                        {hours}
                                </Typography>
                                    <Typography color="secondary" align="center" style={{ fontSize: 20 }}>
                                        {hoursWord}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card style={{ backgroundColor: "#494A49" }}>
                                <CardContent>
                                    <Typography color="secondary" align="center" style={{ fontSize: 80 }}>
                                        {minutes}
                                </Typography>
                                    <Typography color="secondary" align="center" style={{ fontSize: 20 }}>
                                        {minutesWord}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card style={{ backgroundColor: "#494A49" }}>
                                <CardContent>
                                    <Typography color="secondary" align="center" style={{ fontSize: 80 }}>
                                        {seconds}
                                </Typography>
                                    <Typography color="secondary" align="center" style={{ fontSize: 20 }}>
                                        {secondsWord}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>)
            }
        };

        return (

            <Countdown
                date={Date.now() + dateDifference}
                renderer={renderer}
            />)
    }
}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team,
    currentContest: state.currentContest
});

export default withRouter(connect(mapStateToProps)(CountDown));
