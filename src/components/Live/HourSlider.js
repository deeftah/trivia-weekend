import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Grid, Paper as Card, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Moment from 'react-moment';
import Questions from './Questions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {

        textAlign: 'center',
        background: '#494A49',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    h2: {
        textAlign: 'left'
    },
    hour: {
        color: 'white',
        background: theme.palette.background.default
    },
    jumpToCurrentHour: {
        textAlign: 'right'
    },
    fab: {
        margin: theme.spacing(1)
    },
    fabRed: {
        backgroundColor: '#f56c64',
        "&:hover": { backgroundColor: '#b05145'},
        margin: theme.spacing(1)
    },
    fabYellow: {
        backgroundColor: '#f7f78d',
        "&:hover": { backgroundColor: '#abab61'},
        margin: theme.spacing(1)
    },
    fabGreen: {
        backgroundColor: '#55d685',
        "&:hover": { backgroundColor: '#3fa163' },
        margin: theme.spacing(1)
    },
    sliderMinAndMaxNum: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

class HourSlider extends Component {

    state = {
        slider: {
            sliderStartingValue: 1,
            sliderCurrentHour: 1
        }
    };

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.currentContest !== prevProps.currentContest) {
            this.setState({
                slider: {
                    ...this.state.slider,
                    sliderStartingValue: this.getHour(),
                    sliderCurrentHour: this.getHour()
                }
            })
        }
    }

    handleSliderChange = (value) => {
        this.setState({
            slider: {
                ...this.state.slider,
                sliderCurrentHour: value
            }
        });
    };

    handleCurrent = () => {
        this.setState({
            slider: {
                ...this.state.slider,
                sliderCurrentHour: this.state.slider.sliderStartingValue
            }
        });
    }

    getHour() {

        let moment = require('moment');
        let currentDate = Date.now(); //Grab the current date
        let contestStartDate = this.props.currentContest.start_date;  //Grab start date in long date format
        let convertedDate = moment(contestStartDate).valueOf();  //Grab start date in Epoch/UNIX time format
        let contestStartTime = (this.props.currentContest.start_time) * 3600000  //Set start time in Epoch/UNIX time format
        let contestStartDateAndTime = convertedDate + contestStartTime; //Combine Start Date/Time in Epoch/UNIX time format
        let numberOfHours = this.props.currentContest.number_of_hours; //Set number of hours to common variable
        let contestLength = numberOfHours * 3600000; //Length of contest in Epoch/UNIX time format
        let contestEndDateAndTime = contestStartDateAndTime + contestLength
        let timeSinceContestStart = currentDate - contestStartDateAndTime; //How long since beginning of contest in Epoch/UNIX time
        let timeSinceContestStartInHours = timeSinceContestStart / 3600000 //How much time in hours since contest began
        let sliderDefaultHour = (Math.floor(timeSinceContestStartInHours) + 1)

        if (contestStartDateAndTime > currentDate) {
            return 1;
        }

        if (currentDate > contestEndDateAndTime) {
            return this.props.currentContest.number_of_hours
        }

        return sliderDefaultHour;
    }

    render() {

        const { classes } = this.props

        let currentHourButton;

        if (this.state.slider.sliderStartingValue !== this.state.slider.sliderCurrentHour) {

            currentHourButton = <Button color="primary" onClick={this.handleCurrent}>Jump to Current Hour</Button>
        }

        return (

            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <h2 className={classes.h2}>Hour {this.state.slider.sliderCurrentHour}</h2>
                    </Grid>
                    <Grid item xs={6} className={classes.jumpToCurrentHour} style={{ paddingTop: 34 }}>
                        {currentHourButton}
                    </Grid>
                    <Grid item xs={.5} className={classes.sliderMinAndMaxNum}>
                        1
                    </Grid>
                    <Grid item xs={11}>
                        <Slider
                            min={1}
                            max={this.props.currentContest.number_of_hours}
                            step={1}
                            marks
                            value={this.state.slider.sliderCurrentHour}
                            aria-labelledby="label"
                            valueLabelDisplay="auto"
                            onChange={(event, value) => this.handleSliderChange(value)}
                        />
                        the contest is currently in hour: {this.state.slider.sliderStartingValue}
                    </Grid>
                    <Grid item xs={.5} className={classes.sliderMinAndMaxNum}>
                        {this.props.currentContest.number_of_hours}
                    </Grid>
                </Grid>
                <br /><br />
                <div style={{ textAlign: 'center' }}>
                    <Fab color="primary" className={classes.fab}>1</Fab>
                    <Fab className={classes.fabRed}>2</Fab>
                    <Fab className={classes.fabGreen}>3</Fab>
                    <Fab className={classes.fabYellow}>4</Fab>
                    <Fab color="primary" className={classes.fab}>5</Fab>
                    <Fab color="primary" className={classes.fab}>6</Fab>
                    <Fab color="secondary" className={classes.fab}>7</Fab>
                    <Fab color="secondary" className={classes.fab}>8</Fab>
                    <Fab color="secondary" className={classes.fab}>9</Fab>
                    <br/><br/>
   
                    <Questions slider={this.state.slider.sliderCurrentHour} contest={this.props.currentContest.id} hourGetter={this.getHour()}/>
                </div>
                {/* Testing (current date):  {currentDate}
                <br/><br/>
                Computer Contest Start Date/Time: {contestStartDateAndTime}
                <br/>
                Human Contest Start Date/Time: <Moment format="MM/DD/YYYY h:mm:ss a" date={contestStartDateAndTime} />
                <br/>
                Human Contest End Date/Time: <Moment format="MM/DD/YYYY h:mm:ss a" date={contestEndDateAndTime}/>
                <br/><br/>
                Time since the contest began (in hours): {timeSinceContestStartInHours}
                <br/><br/>
                Slider default hour: {sliderDefaultHour} */}
            </div >
        )

    }

}

const mapStateToProps = state => ({
    currentContest: state.currentContest,
    user: state.user,
    team: state.team
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(HourSlider)));