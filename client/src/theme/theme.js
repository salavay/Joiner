import { createTheme } from '@mui/material/styles';

export const THEME = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
        simple: {
            main: '#000000',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FFFFFF'
        }
    },
});