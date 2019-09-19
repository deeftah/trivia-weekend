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
            questionId: null,
            questionNumber: null,
            pointValue: null,
            questionDescription: null,
            correct: null,
            answer: null,
        },
        toggleEdit: false
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.question !== prevProps.question || this.props.selection !== prevProps.selection) {
            let question = this.getQuestion(this.props.selection)
            if (question) {
                console.log('this is the props dot question', this.props.question)
                console.log('question', question)
                this.setState({
                    questionDetail: {
                        ...this.state.questionDetail,
                        questionId: question.id,
                        questionNumber: this.props.selection,
                        pointValue: question.point_value ? question.point_value : '',
                        questionDescription: question.question_description ? question.question_description : '',
                        correct: question.correct ? question.correct : '',
                        answer: question.answer ? question.answer : ''
                    }
                })
            } else {
                console.log('question does not exist', this.props.selection)
                this.setState({
                    questionDetail: {
                        ...this.state.questionDetail,
                        questionId: '',
                        questionNumber: this.props.selection,
                        pointValue: '',
                        questionDescription: '',
                        correct: '',
                        answer: ''
                    },
                    toggleEdit: false,
                })
            }
        } else {
            console.log('else the question still do not work')
        }
    }

    getQuestion(number) {
        for (let each of this.props.question) {
            if (each.question_number == number) {
                return each;
            }
        }
        return null;
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            questionDetail: {
                ...this.state.questionDetail,
                [propertyName]: event.target.value
            }
        });
        console.log('user edits:', event.target.value)
    }

    handleEdit = (id) => {
        if (id == null) {
            this.setState({
                toggleEdit: !this.state.toggleEdit,
                questionDetail: {
                    ...this.state.questionDetail,
                    questionId: id
                }
            })
        } else {
            this.setState({
                toggleEdit: !this.state.toggleEdit,
                questionDetail: {
                    ...this.state.questionDetail,
                    questionId: id.id
                }
            })
        }
        console.log('the handle edit process produced QUESTION ID:', this.state.questionDetail.questionId)
    }

    toggleEdit = () => {
        this.setState({
            toggleEdit: !this.state.toggleEdit
        })
    }

    render() {

        const { classes } = this.props

        return (
            <div>
                {/* {JSON.stringify(this.props.contest)} */}
                <Grid container spacing={3} justify="center" style={{ marginTop: 10 }}>
                    <Grid item sm={5} align="left" >
                        {!this.state.toggleEdit &&
                        <Button color="secondary" onClick={() => this.handleEdit(this.getQuestion(this.props.selection))} style={{ marginRight: 20, marginLeft: 0 }}>
                            <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                        {this.state.toggleEdit &&
                            <Button color="secondary" onClick={this.toggleEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                                <Cancel style={{ marginRight: 3 }} />Cancel
                         </Button>}
                    </Grid>
                    <Grid item sm={2} align="center" >
                        <h2>Question {this.state.questionDetail.questionNumber}</h2>
                    </Grid>
                    <Grid item sm={5} align="right" >
                        <Button color="secondary" style={{ marginRight: 20, marginLeft: 0 }}>
                            Speed Round
                         </Button>
                    </Grid>

                    <Grid item sm={2} align="right" >
                        <Card className={classes.card}>
                            <CardContent>
                                {!this.state.toggleEdit && <b>Points</b>}
                                {!this.state.toggleEdit && <br/>}
                                {!this.state.toggleEdit && this.state.questionDetail.pointValue}
                                {this.state.toggleEdit &&
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
                                            className: classes.input,
                                            shrink: true
                                        }}
                                    />}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={10} align="center" >
                        <Card className={classes.card}>
                            <CardContent>
                                {!this.state.toggleEdit && <b>Question</b>}
                                {!this.state.toggleEdit && <br />}
                                {!this.state.toggleEdit && this.state.questionDetail.questionDescription}
                                {this.state.toggleEdit &&
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
                                            className: classes.input,
                                            shrink: true,
                                        }}
                                    />}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={3} align="left" >
                        <Card className={classes.card}>
                            <CardContent>
                                {!this.state.toggleEdit && <b>Correct?</b>}
                                {!this.state.toggleEdit && <br />}
                                {!this.state.toggleEdit && this.state.questionDetail.correct}
                                {this.state.toggleEdit &&
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
                                            shrink: true
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

                                    </TextField>}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={9} align="left">
                        <Card className={classes.card}>
                            <CardContent>
                                {!this.state.toggleEdit && <b>Answer</b>}
                                {!this.state.toggleEdit && <br />}
                                {!this.state.toggleEdit && this.state.questionDetail.answer}
                                {this.state.toggleEdit &&
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
                                            className: classes.input,
                                            shrink: true
                                        }}
                                    />}
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