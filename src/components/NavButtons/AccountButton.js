import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom'

export default function AccountButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    {/* <AccountCircle style={{ marginRight: 5 }}/>{this.props.user.first_name}</Button> */ }

    return (
        <>
            {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{maxWidth: '5px'}}> */}
                <AccountCircle aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ marginRight: 5, marginTop: 5}}/>
      {/* </Button> */}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/main">Logout</MenuItem>
            </Menu>
        </>
    );
}