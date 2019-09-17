import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Grid, Paper as Card, Typography } from '@material-ui/core';

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
    fab: {
        margin: theme.spacing(1)
    },
    fabRed: {
        backgroundColor: '#f56c64',
        "&:hover": { backgroundColor: '#b05145' },
        margin: theme.spacing(1)
    },
    fabYellow: {
        backgroundColor: '#f7f78d',
        "&:hover": { backgroundColor: '#abab61' },
        margin: theme.spacing(1)
    },
    fabGreen: {
        backgroundColor: '#55d685',
        "&:hover": { backgroundColor: '#3fa163' },
        margin: theme.spacing(1)
    }
});

class Questions extends Component {

    state = {
        currentHourContestData: {
            contestId: 0,
            currentHour: 0
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.contest !== prevProps.contest) {
            let contest = {
                contestId: this.props.contest,
                currentHour: this.props.slider
            }
            let queryString = Object.keys(contest).map(key => key + '=' + contest[key]).join('&');
            this.getCurrentHourQuestions(queryString)
        }
        if (this.props.slider !== prevProps.slider) {
            console.log('this is triggering')
            let contest = {
                contestId: this.props.contest,
                currentHour: this.props.slider
            }
            console.log('FINAL CONTEST ID:', contest.contestId)
            console.log('FINAL CURRENT HOUR:', contest.currentHour)
            let queryString = Object.keys(contest).map(key => key + '=' + contest[key]).join('&');
            this.getCurrentHourQuestions(queryString)
        }
    }

    getCurrentHourQuestions(contest) {
        this.props.dispatch({
            type: 'FETCH_CURRENT_HOUR_QUESTIONS',
            payload: contest
        })
    }

    render() {

        const { classes } = this.props

        let numberOfQuestions = this.props.currentContest.number_of_questions

        let currentHour = this.props.slider

        console.log('number of questions is', numberOfQuestions)
        console.log('current hour is', currentHour)

        let listOfQuestions = [];

        // for (let i = 1; i <= numberOfQuestions; i++) {
        //     listOfQuestions.push(i);
        // }

        console.log('the contest being sent to Axios:', this.props.contest)

        console.log('the list of questions is', listOfQuestions)

        console.log('the question details', this.props.question.question_description)

        // let questionFabs = this.props.question.map(question => {
        //     if (question.question_number === undefined)
        // })

        return (
            <div>
                {JSON.stringify(this.props.question)}
                <br/><br/>
                
                <br/><br/>
                The Questions will display here!
                <br />
                {this.props.slider}
            </div>
        )

    }

}

const mapStateToProps = state => ({
    currentContest: state.currentContest,
    user: state.user,
    team: state.team,
    question: state.question
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Questions)));