import React from "react";
import {AppBar, Toolbar, Typography, Link, Container, Grid} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {logout} from "../../../store/profileReducer";

const useStyles = makeStyles(() => ({
    link: {
        marginLeft: '20px',
    },
}));

const Header = (props) => {
    const classes = useStyles();
    const logout = () => {
        props.logout();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="lg">
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h6">Todo App</Typography>
                        </Grid>
                        <Grid item>
                            {!props.isAuth &&
                            <>
                                <Link color="inherit" component={NavLink} className={classes.link} to="/login">Login</Link>
                                <Link color="inherit" component={NavLink} className={classes.link} to="/register">Sign Up</Link>
                            </>
                            }
                            {props.isAuth && <Link color="inherit" className={classes.link} onClick={logout}>Log Out</Link>}
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    )
};

const mapStateToProps = (state) => ({
    isAuth: state.profile.isAuth
});
export default connect(mapStateToProps, {logout})(Header);
