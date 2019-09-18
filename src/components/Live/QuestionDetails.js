import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Fab, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { Cancel, Delete, Edit, Save } from '@material-ui/icons';

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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    input: {
        color: "white"
    },

    cssLabel: {
        '&$cssFocused': {
            color: "white",
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: "white",
        },
    },
    cssFocused: {},
    notchedOutline: { borderColor: "white" },
    score: {
        width: 100,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white"
        }
    },
    status: {
        width: 200,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white"
        }
    },
    question: {
        width: 900,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white"
        }
    },
    answer: {
        width: 800,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white"
        }
    },
});

class QuestionDetails extends Component {

    state = {
        questionIsValid: false,
        questionDetail: {
            pointValue: null,
            questionDescription: null,
            answer: null,
            correct: null,
        }
    }

    componentDidMount() {
        this.getCurrentHourQuestions();
    }

    getCurrentHourQuestions(contest) {
        this.props.dispatch({
            type: 'FETCH_CURRENT_HOUR_QUESTIONS',
            payload: contest
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            questionDetail: {
                ...this.state.questionDetail,
                [propertyName]: event.target.value
            }
        });
        console.log('user edits:', propertyName)
    }

    render() {

        const { classes } = this.props

        // if (this.props.selection == null || undefined) {
        //     this.setState({
        //         questionIsValid: false
        //     })
        // } else {
        //     this.setState({
        //         questionIsValid: true
        //     })
        // }

        return (
            <div>
                {/* {JSON.stringify(this.props.selection)} */}
                {/* <h2>{this.props.question[0]}</h2> */}
                {/* {this.props.selection && this.props.question[this.props.selection - 1].correct} */}

                {/* {!this.props.question[this.props.selection - 1] && <div>Sorry, no question exists.</div>}
                {this.props.question[this.props.selection - 1] && <div>Yes, a question exists!</div>} */}

                <Grid container spacing={3} justify="center" style={{ marginTop: 5 }}>
                    <Grid item sm={5} align="left" >
                        <Button color="secondary" style={{ marginRight: 20, marginLeft: 0 }}>
                            <Edit style={{ marginRight: 3 }} />Edit
                         </Button>
                    </Grid>
                    <Grid item sm={2} align="center" >
                        Correct/Incorrect
                    </Grid>
                    <Grid item sm={5} align="right" >
                        <Button color="secondary" style={{ marginRight: 20, marginLeft: 0 }}>
                            Speed Round
                         </Button>
                    </Grid>

                    <Grid item sm={2} align="right" >
                        <Card className={classes.card}>
                            <CardContent>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="points"
                                    className={classes.score}
                                    value={this.state.questionDetail.pointValue}
                                    onChange={this.handleChangeFor('pointValue')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={10} align="center" >
                        <Card className={classes.card}>
                            <CardContent>
                                <TextField
                                    align="left"
                                    id="outlined-multiline-flexible"
                                    label="question"
                                    color="white"
                                    multiline
                                    rowsMax="10"
                                    value={this.state.questionDetail.questionDescription}
                                    onChange={this.handleChangeFor('questionDescription')}
                                    className={classes.question}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={3} align="left" >
                        <Card className={classes.card}>
                            <CardContent>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    select
                                    label="status"
                                    className={classes.status}
                                    value={this.state.questionDetail.correct}
                                    onChange={this.handleChangeFor('correct')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.status,
                                        },
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                    }}
                                >
                                    <MenuItem key={'null'} value={null} className={classes.status}>
                                        n/a
                                    </MenuItem>
                                    <MenuItem key={'correct'} value={true} className={classes.status}>
                                        correct
                                    </MenuItem>
                                    <MenuItem key={'incorrect'} value={false} className={classes.status}>
                                        incorrect
                                    </MenuItem>

                                </TextField>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={9} align="left">
                        <Card className={classes.card}>
                            <CardContent>
                                <TextField
                                    align="left"
                                    id="outlined-multiline-flexible"
                                    label="answer"
                                    color="white"
                                    multiline
                                    rowsMax="10"
                                    value={this.state.questionDetail.answer}
                                    onChange={this.handleChangeFor('answer')}
                                    className={classes.answer}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </div >
        )

    }

}

const mapStateToProps = state => ({
    currentContest: state.currentContest,
    user: state.user,
    team: state.team,
    question: state.question
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(QuestionDetails)));