import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class CountDown extends Component {

    render() {
        let daysWord = 'days'

        let hoursWord = 'hours'

        let minutesWord = 'minutes'

        let secondsWord = 'seconds'

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


export default CountDown;
