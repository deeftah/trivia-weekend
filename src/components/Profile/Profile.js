import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Paper as Card, Typography } from '@material-ui/core';
import { LaptopMac, People } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AccessCode from './AccessCode/AccessCode';
import ProfileDetails from './ProfileDetails';
import NewContest from './NewContest';
import CurrentContest from './CurrentContest';
import TeamMembers from './TeamMembers';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {

        textAlign: 'center',
        background: '#494A49',
        color: 'white',

    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        marginBottom: -8,
    },
    h1: {
        textAlign: 'right'
    }
});

class Profile extends Component {

    render() {

        const { classes } = this.props

        return (
            <div className={classes.root} style={{ marginTop: 80, padding: 30 }}>
                <h1 className={classes.h1}>Profile</h1>
                <span><h2>Team Settings<People className={classes.icon} /></h2></span>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card className={classes.card}><AccessCode /></Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={classes.card}><ProfileDetails /></Card>
                    </Grid>
                </Grid>
                <br/>
                <h2>Contest Settings<LaptopMac className={classes.icon}/></h2>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card className={classes.card}><CurrentContest/></Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={classes.card}><NewContest /></Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}><TeamMembers/></Card>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});

// export default withRouter(connect(mapStateToProps)(withStyles(styles)(Profile)));
export default withStyles(styles)(Profile);