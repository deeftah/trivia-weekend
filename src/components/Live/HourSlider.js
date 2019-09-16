import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper as Card, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Moment from 'react-moment';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {

        textAlign: 'center',
        background: '#494A49',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h2: {
        textAlign: 'left'
    },
});

class HourSlider extends Component {

    state = {
        slider: 16
    };

    handleSliderChange = (value) => {
        this.setState({
            slider: value
        });
        console.log('the slider label value is:', this.state.sliders);
    };

    render() {

        const { classes } = this.props

        let moment = require('moment');

        //Grab the current date
        let currentDate = Date.now();

        //Determine if the contest start date is during Daylight Saving Time

        let contestStartDate = this.props.currentContest.start_date
        let convertedDate = moment(contestStartDate).valueOf();

        let contestStartTime = (this.props.currentContest.start_time) * 3600000

        let contestStartDateAndTime = convertedDate + contestStartTime;

        

        return (

            <div className={classes.root}>
                {JSON.stringify(this.props.currentContest)}
                <h2 className={classes.h2}>Hour {this.state.slider}</h2>
                <Slider
                    defaultValue={1}
                    min={1}
                    max={50}
                    step={1}
                    marks
                    value={this.state.slider}
                    aria-labelledby="label"
                    valueLabelDisplay="auto"
                    onChange={(event, value) => this.handleSliderChange(value)}
                />
                viewing hour: {this.state.slider}
                <br/><br/>
                Testing (current date):  {currentDate}
                <br/><br/>
                Computer Contest Start Date/Time: {contestStartDateAndTime}
                <br/>
                Human Contest Start Date/Time: <Moment format="MM/DD/YYYY h:mm:ss a" date={contestStartDateAndTime} />
            </div >
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team,
    currentContest: state.currentContest
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(HourSlider)));