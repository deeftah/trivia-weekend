import React, { Component } from 'react';
import VisualItems from './VisualItems.js';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from "@material-ui/core";
import { connect } from 'react-redux';

class Visual extends Component {

    componentDidMount() {
        this.getVisual();
    }

    getVisual() {
        this.props.dispatch({
            type: 'FETCH_VISUAL'
        })
    }

    render() {

        return (

            <div style={{ marginTop: 20, padding: 30 }}>
                <Grid container spacing={4} justify="center">
                    {this.props.visual.map((visual, i) => (<VisualItems key={i} visual={visual} />))}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    visual: state.visual
});

export default withRouter(connect(mapStateToProps)(Visual));