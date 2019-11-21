import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#D7CCC8',
            main: '#795548',
            dark: '#5D4037',
            contrastText: '#fff',
        },
        secondary: {
            main: '#64dd17',
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
//#795548
//#03A9F4