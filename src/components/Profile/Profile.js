import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Paper as Card, Typography } from '@material-ui/core';
import { LaptopMac, Palette, People, Settings, ThreeSixtyOutlined } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AccessCode from './AccessCode/AccessCode';
import ProfileDetails from './ProfileDetails';
import UpdateContest from './UpdateContest';
import CurrentContest from './CurrentContest';
import TeamMembers from './TeamMembers';
import NewContestForm from './NewContestForm';

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
    icon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        marginBottom: -8,
    },
    h1: {
        textAlign: 'right'
    },
    newContestButton: {
        textAlign: 'right'
    },
    colorDiv: {
        width: 75,
        height: 75,
        border: 0,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5
    }
});

class Profile extends Component {

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.user !== prevProps.user) {
    //         return;
    //     }
    // }

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails() {
        this.props.dispatch({
            type: 'FETCH_TEAM_USERS'
        })
    }

    handleColorChange = (color) => {
        let colorObject = {
            color: color
        }
        this.props.dispatch({
            type: 'UPDATE_USER_COLOR',
            payload: colorObject
        })
        window.location.reload(true)
    }

    render() {

        const { classes } = this.props

        return (
            <div className={classes.root} style={{ marginTop: 50, padding: 30 }}>
                <h1 className={classes.h1}>Settings<Settings className={classes.icon}/></h1>
                 {(this.props.user.clearance_id > 1) &&
                <div className={classes.newContestButton}><NewContestForm /></div>}
                <h2>Color<Palette className={classes.icon} /></h2>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                    <button className={classes.colorDiv} style={{ backgroundColor: "#ffb969" }} onClick={() => this.handleColorChange('#ffb969')}></button>
                    <button className={classes.colorDiv} style={{backgroundColor: "#55d685"}} onClick={() => this.handleColorChange('#55d685')}></button>
                    <button className={classes.colorDiv} style={{backgroundColor: "#0fefff"}} onClick={() => this.handleColorChange('#0fefff')}></button>
                    <button className={classes.colorDiv} style={{ backgroundColor: "#cb70ff" }} onClick={() => this.handleColorChange('#cb70ff')}></button>
                    <button className={classes.colorDiv} style={{backgroundColor: "#ff99f6"}} onClick={() => this.handleColorChange('#ff99f6')}></button>
                    <button className={classes.colorDiv} style={{ backgroundColor: "#ff6181" }} onClick={() => this.handleColorChange('#ff6181')}></button>

                    </Card>
                </Grid>
                <br/>
                <h2>Contest<LaptopMac className={classes.icon} /></h2>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card className={classes.card}><CurrentContest /></Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={classes.card}><UpdateContest /></Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}></Card>
                    </Grid>
                </Grid>
                <br/>
                <h2>Team<People className={classes.icon} /></h2>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card className={classes.card}><AccessCode /></Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={classes.card}><ProfileDetails /></Card>
                    </Grid>
                    <Grid item xs={1}> 
                    </Grid>
                     {(this.props.user.clearance_id > 1) &&
                    <Grid item xs={10}>
                        <Card className={classes.card}><TeamMembers/></Card>
                    </Grid>}
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team,
    teamUsers: state.teamUsers
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Profile)));