import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardActions, CardContent, Grid, Typography, } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    main: {
        textAlign: 'center',
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
                    {captain == true && <td><Button variant="contained" color="secondary" onClick={() => this.handleCaptainChange(member.id, member.clearance_id)}>Remove Captain</Button></td>}
                    {captain == false && <td><Button variant="contained" color="primary" onClick={() => this.handleCaptainChange(member.id, member.clearance_id)}>Make Captain</Button></td>}
                    {captain == null && <td>Team Captain</td>}
                    {captain == true && <td><Button variant="contained" color="primary">Delete</Button></td>}
                    {captain == false && <td><Button variant="contained" color="primary">Delete</Button></td>}
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
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Captain</th>
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