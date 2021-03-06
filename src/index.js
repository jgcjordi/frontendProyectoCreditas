import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './assets/styles/theme.js';
import { ThemeProvider } from '@material-ui/core/styles';


//Redux for React
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
//Reducers from index.js
import RootReducers from './reducers';
//Store from Reducers
const store = createStore(RootReducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
