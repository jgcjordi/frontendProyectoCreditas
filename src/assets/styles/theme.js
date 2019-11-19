import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#B3E5FC',
            main: '#03A9F4',
            dark: '#0288D1',
            contrastText: '#fff',
        },
        secondary: {
            main: '#fff',
        },

        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;