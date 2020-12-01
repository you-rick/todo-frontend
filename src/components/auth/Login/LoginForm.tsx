import React, {FC} from "react";
import {Field, InjectedFormProps} from "redux-form";
import {Box, Button, Container, Grid, Link, Typography} from "@material-ui/core";
import {renderTextField} from "../../shared/FormControls/FormControls";
import {NavLink} from "react-router-dom";

const LoginForm: FC<InjectedFormProps> = ({handleSubmit}) => {

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

export default LoginForm;
