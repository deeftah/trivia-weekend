import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography } from "@material-ui/core";
import CountDown from '../CountDown/CountDown'
import { Cancel, Edit, Save } from '@material-ui/icons';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TeamLogo from './TeamLogo';
import MuiTextArea from './MuiTextArea';

class Home extends Component {

    state = {
        editBoilerplate: false,
        boilerplate: ''
    }

    componentDidMount() {
        this.getTeamDetails();
    }

    getTeamDetails() {
        this.props.dispatch({
            type: 'FETCH_TEAM_DETAILS'
        })
    }

    toggleBoilerplateEdit = () => {
        this.setState({
            editBoilerplate: !this.state.editBoilerplate
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({

            [propertyName]: event.target.value

        });
        console.log('the handle change for is being called!', event.target.value)
    }

    handleBoilerplateSave = () => {
        this.props.dispatch({
            type: 'UPDATE_BOILERPLATE',
            payload: this.state
        })
        this.toggleBoilerplateEdit()
    }

    render() {

        return (
            <div style={{ marginTop: 80, padding: 30 }}>
                {/* Establish spacing between cards */}
                <br /><br />
                <CountDown />
                <Grid container spacing={2} justify="center" style={{marginTop: 6}}>
                    <TeamLogo />
                    <Grid item sm={6}>
                        <Card style={{ backgroundColor: "#494A49" }}>
                            <CardContent>
                                <Typography color="primary" align="center" style={{ fontSize: 20 }}>
                                    Team News
                                </Typography>
                                <br /><br />
                                <Typography color="secondary">
                                    <p>{this.props.team.boilerplate}</p>
                                    {this.state.editBoilerplate && <textarea style={{ width: "95%" }} onChange={this.handleChangeFor('boilerplate')}
                                    placeholder="What do you want your team to know?" defaultValue={this.props.team.boilerplate} />}
                                </Typography>
                            </CardContent >
                            <CardActions>
                                {!this.state.editBoilerplate &&
                                    <Button color="secondary" onClick={this.toggleBoilerplateEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                                        <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                                {this.state.editBoilerplate &&
                                    <Button color="secondary" onClick={this.toggleBoilerplateEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                                        <Cancel style={{ marginRight: 3 }} />Cancel
                         </Button>}
                                {this.state.editBoilerplate &&
                                    <Button color="primary" onClick={this.handleBoilerplateSave} style={{ marginLeft: "auto", marginRight: 0 }}>
                                        <Save style={{ marginRight: 3 }} />Save
                            </Button>}
                            </CardActions>
                        </Card >
                    </Grid >
                </Grid>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});
export default withRouter(connect(mapStateToProps)(Home));