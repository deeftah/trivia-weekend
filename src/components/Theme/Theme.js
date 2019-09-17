import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/styles';

// Custom Theme for Trivia Weekend
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#55d685',
        },
        secondary: {
            main: '#fff',
        },
        success: {
            main: '#f7f78d',
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

export default theme;