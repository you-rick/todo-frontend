import React, {FC} from "react";
import {Redirect} from "react-router-dom";
import {reduxForm} from "redux-form";
import validate from "./validate";
import {connect, ConnectedProps} from "react-redux";
import {login} from "../../../store/profileReducer";
import {RootStateInterface} from "../../../shared/interfaces/root-state.intefrace";
import LoginForm from "./LoginForm";


// Redux Form
const LoginReduxForm = reduxForm<{}, {}>({form: 'login', validate})(LoginForm);

// Types
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

// HOC
const Login: FC<Props> = ({login, isAuth}) => {
    const onSubmit = (data: any) => (login(data));
    if (isAuth) return <Redirect to={"/"}/>;

    return <LoginReduxForm onSubmit={onSubmit}/>;
};

// React-Redux settings
const mapStateToProps = (state: RootStateInterface) => ({
    isFetching: state.app.isDataFetching,
    isAuth: state.profile.isAuth
});
const mapDispatchToProps = {login};
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connect(mapStateToProps, {login})(Login);


