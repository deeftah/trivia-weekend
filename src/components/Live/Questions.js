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
        margin: theme.spacing(2),
        fontSize: 22,
        textAlign: 'center'
    },
    fabRed: {
        backgroundColor: '#f56c64',
        "&:hover": { backgroundColor: '#b05145' },
        margin: theme.spacing(2),
        fontSize: 22,
        textAlign: 'center',
    },
    fabYellow: {
        backgroundColor: '#f7f78d',
        "&:hover": { backgroundColor: '#abab61' },
        margin: theme.spacing(2),
        fontSize: 22,
        textAlign: 'center'
    },
    fabGreen: {
        backgroundColor: '#55d685',
        "&:hover": { backgroundColor: '#3fa163' },
        margin: theme.spacing(2),
        fontSize: 22,
        textAlign: 'center'
    }
});

class Questions extends Component {

    state = {
        currentHourContestData: {
            contestId: 0,
            currentHour: 0
        },
        ready: false
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
            this.setState({
                ready: true
            })
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

        for (let i = 1; i <= numberOfQuestions; i++) {
            listOfQuestions.push(i);
        }

        console.log('the contest being sent to Axios:', this.props.contest)

        console.log('the list of questions is', listOfQuestions)

        console.log('the question details', this.props.question.question_description)

        // let questionFabs = this.props.question.map(question => {
        //     if (question.question_number === undefined)
        // })

        let fabClasses = []
        let button = {}

        if (this.props.question[0]) {
            for (let i = 0; i < listOfQuestions.length; i++) {
                /**
                 * listOfQuestions, 0-8
                 * this.props.question[0] = question 1
                 * this.props.question[1] = question 2
                 * this.props.question[2] = question 3
                 * this.props.question[3] = question 4
                 * this.props.question[4] = question 5
                 * this.props.question[5] = question 6
                 * this.props.question[6] = question 7
                 * this.props.question[7] = question 9
                 * 
                 */

                // find the question that is number "i+1"
                let questionMatch = null;
                for (let each of this.props.question) {
                    if (each.question_number == i + 1) {
                        questionMatch = each;
                        break;
                    }
                }
                if (questionMatch) {
                    // found my question, set its color appropriately                    
                    if (questionMatch.correct == null || questionMatch.correct == 'NULL') {
                        fabClasses.push(button = { number: i + 1, color: classes.fabYellow })
                        console.log('pushing yellow')
                    } else if (questionMatch.correct == 'true') {
                        fabClasses.push(button = { number: i + 1, color: classes.fabGreen })
                        console.log('pushing green')
                    } else if (questionMatch.correct == 'false') {
                        fabClasses.push(button = { number: i + 1, color: classes.fabRed })
                        console.log('pushing red')
                    }
                } else {
                    // no question in the DB for i+1, so use default color
                    fabClasses.push(button = { number: i + 1, color: classes.fab })
                }
            }
        } else {
            for (let each of listOfQuestions) {
                fabClasses.push(button = { number: each, color: classes.fab })
            }
        }

        let fabDisplay;

        fabDisplay = (fabClasses.map((fab) => {
            return <Fab key={fab.number} value={fab.number} className={fab.color}>{fab.number}</Fab>
        }))
        if (fabClasses.length > 0) {
            console.log('and SERIOUSLY the fab classes are', fabClasses)
        }

        return (
            <div>
                {fabDisplay}
                <br /><br />
                {JSON.stringify(this.props.question)}
                
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