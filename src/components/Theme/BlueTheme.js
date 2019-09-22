import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Custom Theme for Trivia Weekend

const blueTheme = createMuiTheme({
    overrides: {
        MuiFormLabel: {
            root: {
                "&$focused": {
                    color: '#0fefff'
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#0fefff',
        },
        secondary: {
            main: '#fff',
        },
        success: {
            main: '#0fefff',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#2f2929',
        },
        text: {
            default: '#fff',
        },
    },
});

export default blueTheme;