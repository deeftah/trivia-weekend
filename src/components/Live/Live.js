import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper as Card, Typography } from '@material-ui/core';
import { Radio } from '@material-ui/icons';
import HourSlider from './HourSlider';
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
    icon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        marginBottom: -4,
    },
    h1: {
        textAlign: 'right'
    },
    currentScore: {
        fontSize: 20
    }
});

class Live extends Component {

    state = {
        pointTotal: null
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.currentContest !== prevProps.currentContest) {
            this.getPointTotal(this.props.currentContest.id)
        }
    }

    getPointTotal = (value) => {
        this.props.dispatch({
            type: 'FETCH_POINT_TOTAL',
            payload: value
        })
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

    render() {

        const { classes } = this.props

        return (

            <div className={classes.root} style={{ marginTop: 80, padding: 30 }}>
                <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} align="right">
                        <h1 className={classes.h1}>Live<Radio className={classes.icon} /></h1>
                        <span className={classes.currentScore}>Current Score: {this.props.pointTotal.sum}</span>
                    </Grid>
                </Grid>
                </div>
                <Grid container spacing={3}>
                    <HourSlider getPointTotal={this.getPointTotal} />
                </Grid>
            </div >
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team,
    currentContest: state.currentContest,
    pointTotal: state.pointTotal
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Live)));