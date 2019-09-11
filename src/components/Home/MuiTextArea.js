import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    input: {
        color: "white"
    }
}));

export default function MuiTextArea() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: 'Cat in the Hat',
        age: '',
        multiline: `What's new with the team?`,
        currency: 'EUR',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-multiline-flexible"
                label="Team Information"
                color="white"
                multiline
                rowsMax="10"
                value={values.multiline}
                onChange={handleChange('multiline')}
                className={classes.textField}
                margin="normal"
                helperText="share info with the team!"
                variant="outlined"
                InputProps={{
                    className: classes.input
                }}
                style={{ width: 500 }}
            />
        </form>
    );
}