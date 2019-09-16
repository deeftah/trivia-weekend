import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { AddCircle, Delete, RemoveCircle } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    main: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        color: theme.palette.secondary.main
    },
});

class TeamMembers extends Component {

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails() {
        this.props.dispatch({
            type: 'FETCH_TEAM_USERS'
        })
    }

    handleCaptainChange = (id, clearanceId) => {
        this.props.dispatch({
            type: 'UPDATE_CAPTAIN',
            payload: {id, clearanceId}
        })
    }

    handleDeleteTeamMember = (id) => {
        this.props.dispatch({
            type: 'DELETE_TEAM_MEMBER',
            payload: id
        })
    }

    render() {


        let teamList = this.props.teamUsers.map(member => {

            let captain = false;

            if (this.props.user.id === member.id) {
                captain = null;
            } else if (member.clearance_id == 2) {
                captain = true;
            }

            return (
                <tr>
                    <td>{member.first_name}</td>
                    <td>{member.last_name}</td>
                    <td>{member.username}</td>
                    {captain == true && <td><Button variant="contained" color="secondary" onClick={() => this.handleCaptainChange(member.id, member.clearance_id)}><RemoveCircle style={{ marginRight: 3}}/>Revoke</Button></td>}
                    {captain == false && <td><Button variant="contained" color="primary" onClick={() => this.handleCaptainChange(member.id, member.clearance_id)}><AddCircle style={{ marginRight: 3 }} />Add</Button></td>}
                    {captain == null && <td>Team Captain</td>}
                    {captain == true && <td><Button variant="contained" color="primary" onClick={() => this.handleDeleteTeamMember(member.id)}><Delete style={{ marginRight: 3 }} />Delete</Button></td>}
                    {captain == false && <td><Button variant="contained" color="primary" onClick={() => this.handleDeleteTeamMember(member.id)}><Delete style={{ marginRight: 3 }} />Delete</Button></td>}
                    {captain == null && <td></td>}
                </tr>


            )
        })

        const { classes } = this.props

        return (
            <CardContent>
                <div className={classes.main}>
                    <h2>Your Team</h2>
                    <br />
                    <table className="center">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Admin Access</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamList}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team,
    teamUsers: state.teamUsers
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(TeamMembers)));