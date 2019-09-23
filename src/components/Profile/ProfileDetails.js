import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardActions, CardContent, Grid, TextField, Typography, } from '@material-ui/core';
import { Cancel, Edit, Save } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    teamName: {
        textAlign: 'center',
        fontSize: 36,
        color: theme.palette.primary.main
    },
    teamText: {
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

class ProfileDetails extends Component {

    state = {
        teamNameEdit: false,
        teamName: ''
    }
    
    componentDidMount() {
        this.getTeamDetails();
    }

    getTeamDetails() {
        this.props.dispatch({
            type: 'FETCH_TEAM_DETAILS'
        })
    }

    toggleTeamNameEdit = () => {
        this.setState({
            teamName: this.props.team.name
        })
        this.setState({
            teamNameEdit: !this.state.teamNameEdit
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    }

    handleTeamNameSave = () => {
        this.props.dispatch({
            type: 'UPDATE_TEAM_NAME',
            payload: this.state
        })
        this.toggleTeamNameEdit()
    }

    render() {

        const { classes } = this.props

        return (

            <div>
                <CardContent>
                <h2>Team Name</h2>
                <span className={classes.teamName}>{this.props.team.name}</span>
                    <Typography color="secondary">
                        {this.state.teamNameEdit && 
                        
                            <TextField
                                align="left"
                                id="outlined-name"
                                label="team name"
                                className={classes.teamText}
                                value={this.state.teamName}
                                onChange={this.handleChangeFor('teamName')}
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
                            />
                        
                        // <input type="text" style={{ width: "95%" }} onChange={this.handleChangeFor('teamName')}
                        //     defaultValue={this.props.team.name} />
                            }
                    </Typography>
                </CardContent>
                <CardActions>
                    {!this.state.teamNameEdit && (this.props.user.clearance_id > 1) &&
                        <Button color="secondary" onClick={this.toggleTeamNameEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                            <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                    {this.state.teamNameEdit && (this.props.user.clearance_id > 1) &&
                        <Button color="secondary" onClick={this.toggleTeamNameEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                            <Cancel style={{ marginRight: 3 }} />Cancel
                         </Button>}
                    {this.state.teamNameEdit && (this.props.user.clearance_id > 1) &&
                        <Button onClick={this.handleTeamNameSave} style={{ marginLeft: "auto", marginRight: 0, color: this.props.user.color }}>
                            <Save style={{ marginRight: 3 }} />Save
                            </Button>}
                </CardActions>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ProfileDetails)));