import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from "@material-ui/core";
import { Cancel, Delete, Edit, Save } from '@material-ui/icons';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class VisualItems extends Component {

    state = {
        userEdits: {
            newVisualComment: this.props.visual.comment,
            newMatchLevel: this.props.visual.match_level,
            newVisualId: 0
        },
        editVisual: false,
        defaultComment: this.props.visual.comment,
        defaultMatchLevel: this.props.visual.match_level

    }

    toggleVisualEdit = () => {
        this.setState({
            editVisual: !this.state.editVisual
        })
    }

    handleVisualSave = () => {
        this.props.dispatch({
            type: 'UPDATE_VISUAL',
            payload: this.state.userEdits
        })
        this.setState({
            editVisual: !this.state.editVisual,
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            userEdits: {
                ...this.state.userEdits,
                [propertyName]: event.target.value
            }
        });
        console.log('user edits:', propertyName)
    }

    handleEditVisual = (id) => {
        this.setState({
            editVisual: !this.state.editVisual,
            userEdits: {
                ...this.state.userEdits,
                newVisualId: id
            }
        })
    }

    handleDeleteVisual = (id) => {
        this.props.dispatch({
            type: 'DELETE_VISUAL',
            payload: id
        })
    }

    render() {

        return (
            <Grid item sm={4} align="center" >
                <Card style={{ backgroundColor: "#494A49" }}>
                    <CardContent>
                        <CardActionArea>
                            <ExpansionPanel style={{ backgroundColor: "#777877" }}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon color="secondary" />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography color="secondary">
                                        <b>Visual #{this.props.visual.image_number}</b> ({this.props.visual.match_level})
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography color="secondary">
                                        <p>{this.props.visual.comment}</p>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </CardActionArea>
                    </CardContent>
                    <CardMedia
                        component="img"
                        alt={this.props.visual.comment}
                        style={{ width: '90%', marginTop: 10 }}
                        image={this.props.visual.url}
                        title={this.props.visual.comment}
                    />
                    <CardContent>
                        <Typography color="secondary">
                            {this.state.editVisual && <select name="match_level" onChange={this.handleChangeFor('newMatchLevel')}
                                value={this.state.value} defaultValue={this.state.defaultMatchLevel}>
                                <option value="Found">Found</option>
                                <option value="Maybe Found">Maybe Found</option>
                                <option value="Not Found">Not Found</option>
                            </select>}
                            {this.state.editVisual && <br />}
                            {this.state.editVisual && <br />}
                            {this.state.editVisual &&
                                <textarea style={{ width: "95%" }} onChange={this.handleChangeFor('newVisualComment')} placeholder="enter any ideas or sources"
                                    defaultValue={this.state.defaultComment} />}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {!this.state.editVisual &&
                            <Button color="secondary" onClick={() => this.handleEditVisual(this.props.visual.id)} style={{ marginRight: 20, marginLeft: 0 }}>
                                <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                        {!this.state.editVisual &&
                            <Button color="primary" onClick={() => this.handleDeleteVisual(this.props.visual.id)} style={{ marginLeft: "auto", marginRight: 0 }}>
                                <Delete style={{ marginRight: 3 }} />Delete
                         </Button>}
                        {this.state.editVisual &&
                            <Button color="secondary" onClick={this.toggleVisualEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                                <Cancel style={{ marginRight: 3 }} />Cancel
                         </Button>}
                        {this.state.editVisual &&
                            <Button color="primary" onClick={this.handleVisualSave} style={{ marginLeft: "auto", marginRight: 0 }}>
                                <Save style={{ marginRight: 3 }} />Save
                         </Button>}
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default withRouter(connect()(VisualItems));