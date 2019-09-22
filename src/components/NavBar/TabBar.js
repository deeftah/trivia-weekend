import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Home, Photo, Schedule, Settings, Radio } from '@material-ui/icons';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

// function TabContainer(props) {
//     return (
//         <Typography component="div" style={{ padding: 8 * 3 }}>
//             {props.children}
//         </Typography>
//     );
// }

// TabContainer.propTypes = {
//     children: PropTypes.node.isRequired,
// };

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
        backgroundColor: theme.palette.primary.main,
    },
});

class ScrollableTabsButtonForce extends React.Component {

    state = {
        value: false,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    componentDidMount() {
        this.handleSetDefaultValue();
    }

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

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="secondary"
                        textColor="secondary"
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

export default withStyles(styles)(ScrollableTabsButtonForce);