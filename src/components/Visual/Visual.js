import React, { Component } from 'react';
import VisualItems from './VisualItems.js';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from "@material-ui/core";
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import { Add, AddCircle, Remove, Save } from '@material-ui/icons';

class Visual extends Component {

    state = {
        toggleAdd: false
    }

    componentDidMount() {
        this.getVisual();
    }

    getVisual() {
        this.props.dispatch({
            type: 'FETCH_VISUAL',
        })
    }

    handleAddClick = () => {
        this.setState({
            toggleAdd: !this.state.toggleAdd
        })
        console.log('toggleAdd testing:', this.state.toggleAdd)
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            userEdits: {
                ...this.state.userEdits,
                [propertyName]: event.target.value
            }
        });
        console.log('add visual url:', propertyName)
    }

    handleVisualAdd = (url) => {

    }

    render() {

        return (

            <div style={{ marginTop: 70, padding: 30 }}>
                {!this.state.toggleAdd ? <Fab color="primary" aria-label="add" onClick={this.handleAddClick}>
                    <Add />
                </Fab> :
                    <Fab color="secondary" aria-label="remove" onClick={this.handleAddClick}>
                        <Remove />
                    </Fab>
                }
                {this.state.toggleAdd && <input onChange={this.handleChangeFor('newImage')} placeholder="enter image url" style={{marginLeft: 15}} />}
                {this.state.toggleAdd &&
                    <Button color="primary" onClick={this.handleVisualAdd}>
                        <AddCircle style={{ marginRight: 3 }} />Add Visual
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
    visual: state.visual
});

export default withRouter(connect(mapStateToProps)(Visual));