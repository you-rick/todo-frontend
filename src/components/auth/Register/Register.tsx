import React, {FC} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {createTextMask} from "redux-form-input-masks";
import {Box, Container, Button, Grid, Link, Typography} from "@material-ui/core";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import validate from "./validate";
import {renderTextField} from "../../shared/FormControls/FormControls";
import {connect, ConnectedProps} from "react-redux";
import {register} from "../../../store/profileReducer";
import {RootStateInterface} from "../../../shared/interfaces/root-state.intefrace";

const phoneMask:any = createTextMask({
    pattern: '(999) 999-9999',
});

const RegisterForm:FC<InjectedFormProps> = (props) => {
    const {handleSubmit} = props;

    return (
        <Box p="4rem 0">
            <Container maxWidth="xs">
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="name"
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        component={renderTextField}
                    />
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
                    <Field
                        name="repeatPassword"
                        label="Repeat Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        component={renderTextField}
                    />
                    <Field
                        name="birthday"
                        label="Date of Birth (MM/DD/YYYY)"
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        component={renderTextField}
                    />
                    <Field
                        name="phone"
                        label="Phone number"
                        variant="outlined"
                        margin="normal"
                        type="tel"
                        fullWidth={true}
                        component={renderTextField}
                        {...phoneMask}
                    />
                    <Field
                        name="address"
                        label="Address"
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        component={renderTextField}
                    />
                    <Box m="1rem 0 0">
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Register
                        </Button>
                    </Box>
                    <Box m="2rem 0 0">
                        <Grid container justify="center">
                            <Grid item>
                                <Link component={NavLink} to="/login"
                                      variant="body2">{"Already have account? Sign In"}</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Container>
        </Box>
    )
};

const RegisterReduxForm = reduxForm<{}, {}>({form: 'register', validate})(RegisterForm);

// Types
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}


// HOC
const Register:FC<Props> = (props) => {
    const onSubmit = (data:any) => {
        props.register(data);
    };

    if (props.isAuth) {
        return <Redirect to={"/"}/>
    }

    return <RegisterReduxForm onSubmit={onSubmit}/>;
};


// React-Redux settings
const mapStateToProps = (state:RootStateInterface) => ({
    isAuth: state.profile.isAuth
});
const mapDispatchToProps = {register};
const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(Register);


