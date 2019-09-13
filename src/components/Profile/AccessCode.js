import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {

        textAlign: 'center',

    },
});

class AccessCode extends Component {

    render() {

        return (

            <div>
                This is the Access Code.
            </div>
        )

    }

}
const classes = withStyles();

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});

// export default withRouter(connect(mapStateToProps)(AccessCode));

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AccessCode)));