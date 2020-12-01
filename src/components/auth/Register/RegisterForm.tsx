import {createTextMask} from "redux-form-input-masks";
import React, {FC} from "react";
import {Field, InjectedFormProps} from "redux-form";
import {Box, Button, Container, Grid, Link, Typography} from "@material-ui/core";
import {renderTextField} from "../../shared/FormControls/FormControls";
import {NavLink} from "react-router-dom";

const phoneMask:any = createTextMask({
    pattern: '(999) 999-9999',
});

const RegisterForm:FC<InjectedFormProps> = ({handleSubmit}) => {

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

export default RegisterForm;
