import React, { Component } from 'react';
import VisualItems from './VisualItems.js';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import { Add, AddCircle, Remove, Save } from '@material-ui/icons';
import Axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

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
    visualNumber: {
        width: 100,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white",
        },
        marginLeft: 20,
    },
    visualUrl: {
        width: 300,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white",
        },
        marginLeft: 20,
    },
    input: {
        color: "white"
    },
    muiFields: {
        marginBottom: 20,
    },
    cssLabel: {
        '&$cssFocused': {
            color: "white",
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: "white",
        },
    },
    cssFocused: {},
    notchedOutline: { borderColor: "white" },
    h1: {
        color: "#55d685"
    }
});

class Visual extends Component {

    state = {
        toggleAdd: false,
        addVisual: {
            visualNumber: '',
            url: '',
            contestId: 0
        }
    }

    componentDidMount() {
        this.getVisual();
        this.getTeamDetails();
        this.getContestDetails();
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

    getContestDetails() {
        this.props.dispatch({
            type: 'FETCH_CURRENT_CONTEST',
            payload: this.props.user
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
        this.setState({
            addVisual: {
                visualNumber: '',
                url: '',
            }
        })
    }

    render() {

        const { classes } = this.props

        return (
            <div style={{ marginTop: 70, padding: 30 }}>
                <h1>Visual Trivia</h1>
                <h3><i>{this.props.currentContest.contest_name}</i></h3>
                {!this.props.visual.id && <h3>Let's upload this contest's visual trivia.  Click + to get started.</h3>}
                {!this.state.toggleAdd ? <Fab color="primary" aria-label="add" style={{ marginTop: 15 }} onClick={() => this.handleAddClick(this.props.team.current_contest)}>
                    <Add />
                </Fab> :
                    <Fab color="secondary" aria-label="remove" style={{ marginTop: 15 }} onClick={this.handleAddClick}>
                        <Remove />
                    </Fab>
                }
                {this.state.toggleAdd &&
                    <span className="classes.muiFields">
                        <TextField
                            align="left"
                            type="number"
                            id="outlined-name"
                            label="number"
                            className={classes.visualNumber}
                            value={this.state.addVisual.visualNumber}
                            onChange={this.handleChangeFor('visualNumber')}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                className: classes.input,
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                }
                            }}
                            InputLabelProps={{
                                className: classes.input,
                                shrink: true
                            }}
                        />
                    </span>
                }
                {this.state.toggleAdd &&
                    <span className="classes.muiFields">
                        <TextField
                            align="left"
                            id="outlined-name"
                            label="image url"
                            className={classes.visualUrl}
                            value={this.state.addVisual.url}
                            onChange={this.handleChangeFor('url')}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                className: classes.input,
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                }
                            }}
                            InputLabelProps={{
                                className: classes.input,
                                shrink: true
                            }}
                        />
                    </span>
                }
                {this.state.toggleAdd &&
                    <Button color="primary" onClick={this.handleVisualAdd} style={{ marginTop: 15, marginLeft: 10 }}>
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
    visual: state.visual,
    currentContest: state.currentContest
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Visual)));