import { registerRootComponent } from 'expo';

import App from './App';

import { ThemeProvider, createTheme } from '@rneui/themed';

const theme = createTheme({
    lightColors: {
        primary: '#e7e7e8',
    },
    darkColors: {
        primary: '#000',
    },
    mode: 'light',
});
const App2 = () => (
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App2);
