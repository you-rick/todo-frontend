import React, {FC} from "react";
import {Redirect} from "react-router-dom";
import {reduxForm} from "redux-form";
import validate from "./validate";
import {connect, ConnectedProps} from "react-redux";
import {register} from "../../../store/profileReducer";
import {RootStateInterface} from "../../../shared/interfaces/root-state.intefrace";
import RegisterForm from "./RegisterForm";

// Redux Form
const RegisterReduxForm = reduxForm<{}, {}>({form: 'register', validate})(RegisterForm);

// Types
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}


// HOC
const Register: FC<Props> = ({register, isAuth}) => {
    const onSubmit = (data: any) => (register(data));
    if (isAuth)  return <Redirect to={"/"}/>;

    return <RegisterReduxForm onSubmit={onSubmit}/>;
};


// React-Redux settings
const mapStateToProps = (state: RootStateInterface) => ({
    isAuth: state.profile.isAuth
});
const mapDispatchToProps = {register};
const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(Register);


