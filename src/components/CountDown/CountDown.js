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
            type: 'FETCH_CONTEST_DETAILS',
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

        let a = '2020-02-14T06:00:00-06:00';
        let b = '17:00:00-06:00';

        let c = this.props.contest[0]
        let d = this.props.contest

        console.log ('c and d are', c, d)

        let timeToConvert = '';

        for (let i = 0; i < 11; i++) {
            timeToConvert = timeToConvert + a[i];
        }

        timeToConvert = timeToConvert + b

        let finalTime = moment().valueOf(timeToConvert)

        console.log('the final display time is', finalTime)

        // console.log('this is the b.value of', moment().valueOf(timeToConvert))

        const futureDate = 1581717600000;

        let currentDate = Date.now();

        let dateDifference = futureDate - currentDate;

        // Random component
        const Completionist = () => <span>Trivia 2020 has started!  Good luck, trivia players!</span>;

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

            if (completed) {
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
    contest: state.contest
});

export default withRouter(connect(mapStateToProps)(CountDown));
