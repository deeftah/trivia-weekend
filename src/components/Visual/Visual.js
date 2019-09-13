import React, { Component } from 'react';
import VisualItems from './VisualItems.js';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import { Add, AddCircle, Remove, Save } from '@material-ui/icons';
import Axios from 'axios';

class Visual extends Component {

    state = {
        toggleAdd: false,
        addVisual: {
            visualNumber:'',
            url: '',
            contestId: 0
        }
    }

    componentDidMount() {
        this.getVisual();
        this.getTeamDetails();
    }

    getVisual() {
        this.props.dispatch({
            type: 'FETCH_VISUAL',
        })
    }

    getTeamDetails() {
        this.props.dispatch({
            type: 'FETCH_TEAM_DETAILS'
        })
    }

    handleAddClick = (id) => {
        this.setState({
            toggleAdd: !this.state.toggleAdd,
            addVisual: {
                ...this.state.addVisual,
                contestId: id
            }
        })
        console.log('contestId testing:', this.state.addVisual.contestId)
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            addVisual: {
                ...this.state.addVisual,
                [propertyName]: event.target.value
            }
        });
        console.log('add visual url:', this.state.addVisual.url)
    }

    handleVisualAdd = (url) => {
        this.props.dispatch({
            type: 'ADD_VISUAL',
            payload: this.state.addVisual
        })
    }

    render() {

        return (

            <div style={{ marginTop: 70, padding: 30 }}>
                {!this.state.toggleAdd ? <Fab color="primary" aria-label="add" onClick={() => this.handleAddClick(this.props.team.current_contest)}>
                    <Add />
                </Fab> :
                    <Fab color="secondary" aria-label="remove" onClick={this.handleAddClick}>
                        <Remove />
                    </Fab>
                }
                {this.state.toggleAdd && <input onChange={this.handleChangeFor('visualNumber')} type="number" placeholder="enter image number" style={{ marginLeft: 15 }} />}
                {this.state.toggleAdd && <input onChange={this.handleChangeFor('url')} type="text" placeholder="enter image url" style={{ marginLeft: 15 }} />}
                {this.state.toggleAdd &&
                    <Button color="primary" onClick={this.handleVisualAdd}>
                        <AddCircle style={{ marginRight: 3 }} />Add To Gallery
                         </Button>}

                <Grid container spacing={6} justify="center" style={{ marginTop: 5 }}>
                    {this.props.visual.map((visual, i) => (<VisualItems key={i} visual={visual} />))}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team,
    visual: state.visual
});

export default withRouter(connect(mapStateToProps)(Visual));