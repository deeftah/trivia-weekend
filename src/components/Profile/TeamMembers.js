import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { AddCircle, Delete, RemoveCircle } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
    firstName: {
        width: 100
    },
    lastName: {
        width: 200
    },
    email: {
        width: 250
    },
    admin: {
        width: 150
    },
    delete: {
        width: 150
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
            payload: { id, clearanceId }
        })
    }

    handleDeleteTeamMember = (id, name) => {

        MySwal.fire({
            title: `Delete ${name} from your team?`,
            text: `${name} can register again with a valid Team Access Code.`,
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_TEAM_MEMBER',
                    payload: id
                })
                Swal.fire(
                    'Deleted!',
                    `${name} has been deleted from your team.`,
                    'success'
                )
            }
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
                    <td style={{paddingBottom: 10}}>{member.first_name}</td>
                    <td style={{ paddingBottom: 10 }}>{member.last_name}</td>
                    <td style={{ paddingBottom: 10 }}>{member.username}</td>
                    {captain == true && <td style={{ paddingBottom: 10 }}><Button variant="contained" color="secondary" onClick={() => this.handleCaptainChange(member.id, member.clearance_id)}><RemoveCircle style={{ marginRight: 3 }} />Revoke</Button></td>}
                    {captain == false && <td style={{ paddingBottom: 10 }}><Button variant="contained" color="primary" style={{backgroundColor: this.props.user.color}} onClick={() => this.handleCaptainChange(member.id, member.clearance_id)}><AddCircle style={{ marginRight: 3 }} />Add</Button></td>}
                    {captain == null && <td style={{ paddingBottom: 10 }}>Team Captain</td>}
                    {captain == true && <td style={{ paddingBottom: 10 }}><Button variant="contained" color="primary" style={{ backgroundColor: this.props.user.color }} onClick={() => this.handleDeleteTeamMember(member.id, member.first_name)}><Delete style={{ marginRight: 3 }} />Delete</Button></td>}
                    {captain == false && <td style={{ paddingBottom: 10 }}><Button variant="contained" color="primary" style={{ backgroundColor: this.props.user.color }} onClick={() => this.handleDeleteTeamMember(member.id, member.first_name)}><Delete style={{ marginRight: 3 }} />Delete</Button></td>}
                    {captain == null && <td style={{ paddingBottom: 10 }}></td>}
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
                                <th className={classes.firstName}>First Name</th>
                                <th className={classes.lastName}>Last Name</th>
                                <th className={classes.email}>Email</th>
                                <th className={classes.admin}>Admin Access</th>
                                <th className={classes.delete}>Delete</th>
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