import React from 'react';
import s from './Footer.module.scss';
import {Container, Grid, Typography} from "@material-ui/core";


const Footer = () => {
    return (
        <footer className={s.mainFooter}>
            <Container maxWidth="lg">
                <Grid container spacing={5} justify="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="body2" component="p">&copy; Todo App 2020</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" component="p">All rights reserved</Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};


export default Footer;
