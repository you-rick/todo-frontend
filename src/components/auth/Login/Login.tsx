import React, {FC} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {Box, Container, Button, Grid, Link, Typography} from "@material-ui/core";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import validate from "./validate";
import {renderTextField} from "../../shared/FormControls/FormControls";
import {connect} from "react-redux";
import {login} from "../../../store/profileReducer";
import {RootStateInterface} from "../../../store/reducers";
import {LoginInterface} from "../../../shared/interfaces/login.interface";


const LoginForm:FC<InjectedFormProps> = (props) => {
    const {handleSubmit} = props;

    return (
        <Box p="4rem 0">
            <Container maxWidth="xs">
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        component={renderTextField}
                    />
                    <Field
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        component={renderTextField}
                    />
                    <Box m="1rem 0 0">
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Sign In
                        </Button>
                    </Box>
                    <Box m="2rem 0 0">
                        <Grid container justify="center">
                            <Grid item>
                                <Link component={NavLink} to="/register"
                                      variant="body2">{"Don't have an account? Sign Up"}</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Container>
        </Box>
    )
};

const LoginReduxForm = reduxForm<{}, {}>({form: 'login', validate})(LoginForm);

const Login:FC<LoginInterface> = (props) => {
    const onSubmit = (data:any) => {
        props.login(data);
    };

    if (props.isAuth) {return <Redirect to={"/"}/>}

    return <LoginReduxForm onSubmit={onSubmit}/>;
};

const mapStateToProps = (state:RootStateInterface) => ({
    isFetching: state.app.isDataFetching,
    isAuth: state.profile.isAuth
});

export default connect(mapStateToProps, {login})(Login);

