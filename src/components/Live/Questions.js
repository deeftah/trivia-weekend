import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Fab, FormControlLabel, Grid, Paper as Card, Switch, Typography } from '@material-ui/core';
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
        textAlign: 'center',
    },
    fabSelected: {
        margin: theme.spacing(2),
        fontSize: 28,
        textAlign: 'center',
        width: 70,
        height: 70
    },
    fabGreenSelected: {
        backgroundColor: '#55d685',
        "&:hover": { backgroundColor: '#3fa163' },
        margin: theme.spacing(2),
        fontSize: 28,
        textAlign: 'center',
        width: 70,
        height: 70
    },
    fabRedSelected: {
        backgroundColor: '#f56c64',
        "&:hover": { backgroundColor: '#b05145' },
        margin: theme.spacing(2),
        fontSize: 28,
        textAlign: 'center',
        width: 70,
        height: 70
    },
    fabYellowSelected: {
        backgroundColor: '#f7f78d',
        "&:hover": { backgroundColor: '#abab61' },
        margin: theme.spacing(2),
        fontSize: 28,
        textAlign: 'center',
        width: 70,
        height: 70
    },
    selectQuestion: {
        fontSize: 22
    },
    speedRound: {
        textAlign: "left"
    }
});

class Questions extends Component {

    state = {
        selectedQuestion: 1,
        speedRound: this.props.speedRound.speed_round
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let contest = {
                contestId: this.props.contest,
                currentHour: this.props.slider
            }
            console.log('the current hour stands at', contest.currentHour)
            let queryString = Object.keys(contest).map(key => key + '=' + contest[key]).join('&');
            this.getCurrentHourQuestions(queryString)
        }, 3000);
        this.getSpeedRoundInfo();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
            let contest = {
                contestId: this.props.contest,
                currentHour: this.props.slider
            }
            let queryString = Object.keys(contest).map(key => key + '=' + contest[key]).join('&');
            this.getCurrentHourQuestions(queryString);
            this.getSpeedRoundInfo();
        }
    }

    getCurrentHourQuestions(contest) {
        this.props.dispatch({
            type: 'FETCH_CURRENT_HOUR_QUESTIONS',
            payload: contest
        })
    }

    getSpeedRoundInfo() {
        this.props.dispatch({
            type: 'FETCH_SPEED_ROUND',
            payload: this.props.slider
        })
        console.log('the speed round is getting collected', this.props.slider);
    }


    handleFabClick = (value) => {
        console.log('the fab value is', value)
        this.setState({
            selectedQuestion: value
        })
        console.log('the SELECTED QUESTION STATE', this.state.selectedQuestion)
    }

    speedRoundResponse() {
        if (!this.state.speedRound) {
            console.log('this is actually a speed round');
            this.setState({
                ...this.state,
                speedRound: !this.state.speedRound
            });
            let speedRoundInfo = {
                currentContest: this.props.contest,
                contestHour: this.props.slider
            }
            this.props.dispatch({
                type: 'ADD_SPEED_ROUND',
                payload: speedRoundInfo
            })
        } else if (this.state.speedRound) {
            this.setState({
                ...this.state,
                speedRound: !this.state.speedRound
            });
            console.log('this is no longer a speed round');
        }
    }

    render() {

        const { classes } = this.props

        let currentHourContestData = {
            contestId: this.props.currentContest.id,
            currentHour: this.props.slider
        }

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
            if (fab.number == this.state.selectedQuestion) {
                if (fab.color.includes('fabGreen')) {
                    return <Fab key={fab.number} value={fab.number} className={classes.fabGreenSelected} onClick={() => this.handleFabClick(fab.number)}>{fab.number}</Fab>
                } else if (fab.color.includes('fabRed')) {
                    return <Fab key={fab.number} value={fab.number} className={classes.fabRedSelected} onClick={() => this.handleFabClick(fab.number)}>{fab.number}</Fab>
                } else if (fab.color.includes('fabYellow')) {
                    return <Fab key={fab.number} value={fab.number} className={classes.fabYellowSelected} onClick={() => this.handleFabClick(fab.number)}>{fab.number}</Fab>
                } else {
                    return <Fab key={fab.number} value={fab.number} className={classes.fabSelected} onClick={() => this.handleFabClick(fab.number)}>{fab.number}</Fab>
                }
            } else
                return <Fab key={fab.number} value={fab.number} className={fab.color} onClick={() => this.handleFabClick(fab.number)}>{fab.number}</Fab>
        }))
        // console.log('the fab display is', fabDisplay)
        // fabDiplay[2].key

        let speedRoundSelector;

        if (this.props.speedRound.speed_round) {
            speedRoundSelector = <FormControlLabel control={
                <Switch
                    checked={true}
                    onChange={() => this.speedRoundResponse()}
                    value="speedRound"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    color="primary"
                />
            }
                label="Speed Round"
            />
        } else {
            speedRoundSelector = <FormControlLabel control={
                <Switch
                    checked={false}
                    onChange={() => this.speedRoundResponse()}
                    value="speedRound"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    color="primary"
                />
            }
                label="Speed Round"
            />
        }

        return (
            <>
                {this.props.user.clearance_id > 1 &&
                    <div className={classes.speedRound}>
                        {speedRoundSelector}
                    </div>}
                <span className={classes.selectQuestion}>Select a Question</span>
                <br />
                {fabDisplay}
                <QuestionDetails contest={currentHourContestData} selection={this.state.selectedQuestion} />
            </>
        )

    }

}

const mapStateToProps = state => ({
    currentContest: state.currentContest,
    user: state.user,
    team: state.team,
    question: state.question,
    speedRound: state.speedRound
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Questions)));