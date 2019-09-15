import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Card, CardActions, CardContent, Grid, Typography, } from '@material-ui/core';
import { Cancel, Edit, Save } from '@material-ui/icons';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    newContest: {
        textAlign: 'center',
        fontSize: 36,
        color: theme.palette.primary.main
    },
});

class NewContest extends Component {

    state = {
        newContest: {
            contestName: '',
            startDate: '',
            startTime: '',
            numberOfHours: 0,
            numberOfQuestions: 0
        },
        contestFormDisplay: false
    }

    handleInputChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    }

    handleNewContest = () => {
        this.setState({
            contestFormDisplay: !this.state.contestFormDisplay
        })
        console.log('contest form display', this.state.contestFormDisplay)
    }

    render() {

        const { classes } = this.props

        return (

            <div>
                <CardContent>
                    <h2>Create a New Contest</h2>
                    {!this.state.contestFormDisplay && <Button variant="contained" color="primary" onClick={this.handleNewContest}>
                        New Contest
                    </Button>}
                    {this.state.contestFormDisplay && <form onSubmit={this.registerTeam}>
                        <h3>Enter Contest Details</h3>
                        <div>
                            <label htmlFor="contestName">
                                Name Your Contest:
                                <input
                                    type="text"
                                    name="contestName"
                                    onChange={this.handleInputChangeFor('contestName')}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="startDate">
                                Contest Start Date:
                                <input
                                    type="date"
                                    name="startDate"
                                    onChange={this.handleInputChangeFor('startDate')}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="startTime">
                                Contest Start Time:
                                <select
                                    name="startTime"
                                    onChange={this.handleInputChangeFor('startTime')}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="numberOfHours">
                                Number of Hours:
                                <input
                                    type="number"
                                    name="numberOfHours"
                                    onChange={this.handleInputChangeFor('numberOfHours')}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="numberOfQuestions">
                                Questions per Hour:
                                <input
                                    type="text"
                                    name="numberOfQuestions"
                                    onChange={this.handleInputChangeFor('numberOfQuestions')}
                                />
                            </label>
                        </div>
                    </form>}
                </CardContent>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NewContest)));