import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Grid, Paper as Card, Typography } from '@material-ui/core';
import QuestionDetails from './QuestionDetails';

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
        selectedQuestion: 1
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
        this.setState({
            currentHourContestData: {
                contestId: this.props.contest,
                currentHour: this.props.slider
            }
        })
    }

    handleFabClick = (value) => {
        console.log('the fab value is', value)
        this.setState({
            selectedQuestion: value
        })
            console.log('the SELECTED QUESTION STATE', this.state.selectedQuestion)
        }

            render() {

                const { classes } = this.props

                let numberOfQuestions = this.props.currentContest.number_of_questions

                let currentHour = this.props.slider

                let listOfQuestions = [];

                for (let i = 1; i <= numberOfQuestions; i++) {
                    listOfQuestions.push(i);
                }

                let fabClasses = []
                let button = {}

                if (this.props.question[0]) {
                    for (let i = 0; i < listOfQuestions.length; i++) {
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
                            if (questionMatch.correct == null || questionMatch.correct == 'NULL' || questionMatch.correct == '') {
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
                    return <Fab key={fab.number} value={fab.number} className={fab.color} onClick={() => this.handleFabClick(fab.number)}>{fab.number}</Fab>
                }))

                return (
                    <div>
                        <h2>Select a Question</h2>
                        {fabDisplay}
                        <QuestionDetails contest={this.state.currentHourContestData} selection={this.state.selectedQuestion} />
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