import React, {useEffect, FC, ComponentType} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {compose} from "redux";
import {connect} from "react-redux";
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
import {RootStateInterface} from "./store/reducers";
import {NotificationStateInterface} from "./shared/interfaces/notification.interface";

type Props = {
    initialized: boolean,
    initializeApp: () => void,
    hideNote: () => void,
    notification: NotificationStateInterface,
}

const AppContainer:FC<Props> = (props) => {
    useEffect(() => {
        props.initializeApp();
    }, []);


    if (!props.initialized) {
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
            <Notification
                type={props.notification.type}
                msg={props.notification.msg}
                hideNote={props.hideNote}
            />
        </div>
    );
};

const mapStateToProps = (state: RootStateInterface) => ({
    notification: state.notification,
    initialized: state.app.initialized,
    isDataFetching: state.app.isDataFetching
});

const App = compose<ComponentType>(withRouter, connect(mapStateToProps, {hideNote, initializeApp}))(AppContainer);

export default App;
