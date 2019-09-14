import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Paper as Card, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AccessCode from './AccessCode/AccessCode';
import ProfileDetails from './ProfileDetails';
import NewContest from './NewContest';
import CurrentContest from './CurrentContest';
import ChangeTeamName from './ChangeTeamName';
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
});

class Profile extends Component {

    render() {

        const { classes } = this.props

        return (
            <div className={classes.root} style={{ marginTop: 80, padding: 30 }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card className={classes.card}><AccessCode /></Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={classes.card}><ProfileDetails /></Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.card}><CurrentContest/></Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.card}><NewContest /></Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.card}><ChangeTeamName/></Card>
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