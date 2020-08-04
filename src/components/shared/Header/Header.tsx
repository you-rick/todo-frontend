import React, {FC} from "react";
import {AppBar, Toolbar, Typography, Link, Container, Grid} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {logout} from "../../../store/profileReducer";
import {RootStateInterface} from "../../../shared/interfaces/root-state.intefrace";

// Types
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

// Material UI styling
const useStyles = makeStyles(() => ({
    link: {
        marginLeft: '20px',
    },
}));

// Component
const Header: FC<Props> = ({logout, isAuth}) => {
    const classes = useStyles();
    const logoutHandler = () => {
        logout();
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
                            {!isAuth &&
                            <>
                                <Link color="inherit" component={NavLink} className={classes.link} to="/login">Login</Link>
                                <Link color="inherit" component={NavLink} className={classes.link} to="/register">Sign Up</Link>
                            </>
                            }
                            {isAuth && <Link color="inherit" className={classes.link} onClick={logoutHandler}>Log Out</Link>}
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    )
};


// React-Redux settings
const mapStateToProps = (state:RootStateInterface) => ({
    isAuth: state.profile.isAuth
});
const mapDispatchToProps = {
    logout: logout
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Header);
