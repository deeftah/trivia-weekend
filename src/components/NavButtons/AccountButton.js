import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const AccountButton = ({firstName}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    {/* <AccountCircle style={{ marginRight: 5 }}/>{this.props.user.first_name}</Button> */ }

    const example = (props) => <h1>Hello, {props.user}!</h1>

    return (
        <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AccountCircle style={{ marginRight: 5}}/>{firstName}
       </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to="/main">Logout</MenuItem>
            </Menu>
        </>
    );
}

export default AccountButton;