import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, TextField, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import CardActions from "@material-ui/core/CardActions";
import { Cancel, Edit, Save} from '@material-ui/icons';
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
    newImage: {
        width: 300,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "white"
        }
    },
    input: {
        color: "white"
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

class TeamLogo extends Component {

    state = {
        editImage: false,
        newImage: ''
    }

    componentDidMount() {
        this.getTeamDetails();
    }

    getTeamDetails() {
        this.props.dispatch({
            type: 'FETCH_TEAM_DETAILS'
        })
    }

    toggleImageEdit = () => {
        this.setState({
            editImage: !this.state.editImage
        })
    }

    handleChangeFor = propertyName => (event) => {
        this.setState({
        
                [propertyName]: event.target.value
            })
            console.log('the state is', this.state.newImage)
        };

    handleImageSave = () => {
        this.props.dispatch({
            type: 'UPDATE_IMAGE',
            payload: this.state
        })
        this.setState({
            editImage: !this.state.editImage
        })
    }

    render() {

        const { classes } = this.props

        return (

            <>
                <Grid item sm={6} align="center">
                    <Card style={{ backgroundColor: "#494A49" }}>
                        <CardContent>
                            <Typography color="primary" style={{fontSize: 20}}>
                                {!this.props.team.logo_url ? 'Upload a Logo' : this.props.team.name}
                                <br /><br />
                                {!this.props.team.logo_url ? <img src="https://mk0nationaltodayijln.kinstacdn.com/wp-content/uploads/2019/01/national-trivia-day-640x514.jpg"/>
                                    : <img src={this.props.team.logo_url}/>}
                                
                                {this.state.editImage && 
                                <div>
                                    <TextField
                                        align="left"
                                        id="outlined-name"
                                        label="enter image url"
                                        className={classes.newImage}
                                        value={this.state.newImage}
                                        onChange={this.handleChangeFor('newImage')}
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
                                </div>}

                                {/* {this.state.editImage && <Button color="primary" onClick={this.handleImageSave}>Save</Button>} */}
                            </Typography>
                        </CardContent >
                        <CardActions>
                            {(!this.state.editImage) && (this.props.user.clearance_id > 1) &&
                                <Button color="secondary" onClick={this.toggleImageEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                                    <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                            {this.state.editImage && (this.props.user.clearance_id > 1) &&
                                <Button color="secondary" onClick={this.toggleImageEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                                    <Cancel style={{ marginRight: 3 }} />Cancel
                         </Button>}
                            {this.state.editImage && (this.props.user.clearance_id > 1) &&
                                <Button color="primary" onClick={this.handleImageSave} style={{ marginLeft: "auto", marginRight: 0 }}>
                                    <Save style={{ marginRight: 3 }} />Save
                            </Button>}
                        </CardActions>
                    </Card >
                </Grid >
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(TeamLogo)));