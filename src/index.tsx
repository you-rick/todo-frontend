import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/index.scss';
import {Provider} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ConnectedRouter} from "connected-react-router";
import store, {history} from './store/store';
import ScrollToTop from "./components/shared/ScrollToTop/ScrollToTop";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <CssBaseline/>
            <App/>
            <ScrollToTop/>
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);

