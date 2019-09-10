import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import CountDown from '../CountDown/CountDown'
import { Schedule } from '@material-ui/icons';

class Home extends Component {

    render() {

        return (
                <div style={{ marginTop: 20, padding: 30 }}>
                    {/* Establish spacing between cards */}
                    <Grid container spacing={2} justify="center">

                        <Schedule/> <CountDown/>
                    </Grid>
                </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});
export default withRouter(connect(mapStateToProps)(Home));