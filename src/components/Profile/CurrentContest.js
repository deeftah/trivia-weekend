import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Card, CardActions, CardContent, Grid, MenuItem, TextField, Typography, } from '@material-ui/core';
import { Cancel, Edit, Save } from '@material-ui/icons';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    currentContest: {
        textAlign: 'center',
        fontSize: 36,
        color: theme.palette.primary.main
    },
    contestSelection: {
        width: 450,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white"
        }
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
});

class CurrentContest extends Component {

    state = {
        currentContestEdit: false,
        currentContest: 0
    }

    componentDidMount() {
        this.getContestDetails();
        this.getTeamDetails();
    }

    getContestDetails() {
        this.props.dispatch({
            type: 'FETCH_CURRENT_CONTEST',
            payload: this.props.user
        })
        this.props.dispatch({
            type: 'FETCH_ALL_CONTESTS',
            payload: this.props.user
        })
    }

    getTeamDetails() {
        this.props.dispatch({
            type: 'FETCH_TEAM_DETAILS'
        })
    }

    toggleCurrentContestEdit = () => {
        this.setState({
            currentContestEdit: !this.state.currentContestEdit
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    }

    handleCurrentContestSave = () => {
        this.props.dispatch({
            type: 'UPDATE_CURRENT_CONTEST',
            payload: this.state
        })
        this.toggleCurrentContestEdit()
    }

    render() {

        const { classes } = this.props

        return (

            <div>
                <CardContent>
                <h2>Current Contest</h2>
                <span className={classes.currentContest}>{this.props.currentContest.contest_name}</span>
                </CardContent>
                        {this.state.currentContestEdit && 
                        
                    <TextField
                        align="left"
                        id="outlined-name"
                        select
                        label="current contest"
                        defaultValue="-- Select a Contest --"
                        className={classes.contestSelection}
                        value={this.state.currentContest}
                        onChange={this.handleChangeFor('currentContest')}
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
                        {this.props.allContests.map((contest, i) => 
                            <MenuItem key={i} value={contest.id} className={classes.contestSelection}>
                            {contest.contest_name}
                            </MenuItem>
                            )}
                    </TextField>
                    }      
                <CardActions>
                    {!this.state.currentContestEdit &&
                        <Button color="secondary" onClick={this.toggleCurrentContestEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                            <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                    {this.state.currentContestEdit &&
                        <Button color="secondary" onClick={this.toggleCurrentContestEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                            <Cancel style={{ marginRight: 3 }} />Cancel
                         </Button>}
                    {this.state.currentContestEdit &&
                        <Button color="primary" onClick={this.handleCurrentContestSave} style={{ marginLeft: "auto", marginRight: 0 }}>
                            <Save style={{ marginRight: 3 }} />Save
                            </Button>}
                </CardActions>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    currentContest: state.currentContest,
    allContests: state.allContests,
    team: state.team
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CurrentContest)));