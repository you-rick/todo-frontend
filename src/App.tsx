import React, {useEffect, FC, ComponentType} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {compose} from "redux";
import {connect, ConnectedProps} from "react-redux";
import {hideNote} from "./store/notificationReducer";
import {initializeApp} from "./store/appReducer";
import Preloader from "./components/shared/Preloader/Preloader";
import Header from "./components/shared/Header/Header";
import Footer from "./components/shared/Footer/Footer";
import Notification from "./components/shared/Notification/Notification";
import Todos from "./components/dashboard/Todos/Todos";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import NotFound from "./components/public/NotFound/NotFound";
import {RootStateInterface} from "./shared/interfaces/root-state.intefrace";

// Types
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

// Component
const AppContainer:FC<Props> = ({initializeApp, initialized, isDataFetching, notification, hideNote}) => {
    useEffect(() => {
        initializeApp();
    }, [initializeApp]);


    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className="appWrapper">
            <Header/>
            <div className="mainContainer">
                <Switch>
                    <Route exact path="/" render={() => <Todos/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                    <Route path="/register" render={() => <Register/>}/>
                    <Route path="/404" render={() => <NotFound/>}/>
                    <Redirect to="/404"/>
                </Switch>
            </div>
            <Footer/>
            <Notification type={notification.type} msg={notification.msg} hideNote={hideNote}/>
            {isDataFetching && <Preloader/>}
        </div>
    );
};

// React-Redux settings
const mapStateToProps = (state: RootStateInterface) => ({
    notification: state.notification,
    initialized: state.app.initialized,
    isDataFetching: state.app.isDataFetching
});

const mapDispatchToProps = {
    hideNote: hideNote,
    initializeApp: initializeApp
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const App = compose<ComponentType>(withRouter, connector)(AppContainer);

export default App;
