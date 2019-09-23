import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Home, Photo, Schedule, Settings, Radio } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

function TabContainer(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '80%',
        backgroundColor: theme.palette.primary.main
    },
    background: {
        backgroundColor: theme.palette.primary.main
    }
});

class ScrollableTabsButtonForce extends React.Component {

    state = {
        value: false,
        color: 'green',
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    componentDidMount() {
        this.handleSetDefaultValue();
    }

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.user.color !== prevProps.user.color) {
    //         this.setState({
    //             color: this.props.user.color
    //         })
    //     }
    //     console.log('the tab bar did update is hitting', this.props.user)
    // }

    handleSetDefaultValue() {
        console.log('the url is', window.location.href)
        if (window.location.href.includes('home')) {
            this.setState({
                value: 0
            })
        } else if (window.location.href.includes('visual')) {
            this.setState({
                value: 1
            })
        } else if (window.location.href.includes('live')) {
            this.setState({
                value: 2
            })
        } else if (window.location.href.includes('profile')) {
            this.setState({
                value: 3
            })
        } else {
            this.setState({
                value: false
            })
        }
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

    console.log('what is on tab bar', this.props.user)

        return (
            <div className={classes.root} style={{backgroundColor: this.props.user.color}}>
                <AppBar position="static" style={{ backgroundColor: this.props.user.color }}>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="secondary"
                        textColor="secondary"
                        className={classes.root}
                        style={{ backgroundColor: this.props.user.color }}
                    >
                        <Tab value={0} label="Home" component={Link} to="/home" icon={<Home />} />
                        <Tab value={1} label="Visual" component={Link} to="/visual" icon={<Photo />} />
                        <Tab value={2} label="Live" component={Link} to="/live" icon={<Radio />} />
                        <Tab value={3} label="Settings" component={Link} to="/profile" icon={<Settings />} />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

ScrollableTabsButtonForce.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(ScrollableTabsButtonForce));