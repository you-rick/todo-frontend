import React, {useEffect, FC} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {Redirect} from 'react-router-dom';
import {Box, Container, Typography} from "@material-ui/core";
import TodosForm from "./TodosForm/TodosForm";
import Todo from "./Todo/Todo";
import {requestTodos} from "../../../store/todoReducer";
import {RootStateInterface} from "../../../shared/interfaces/root-state.intefrace";

// Types
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

// Component
const Todos:FC<Props> = (props) => {
    useEffect(() => {
        props.isAuth && props.requestTodos();
    }, [props.isAuth]);


    if (!localStorage.getItem('token')) {
        return <Redirect to='/login'/>
    }

    return (
        <Box p="4rem 0">
            <Container maxWidth="md">
                <Typography variant="h5" component="h1" gutterBottom>
                    Hello <strong>{props.name}</strong>, here is your Todos list
                </Typography>
                <TodosForm/>

                <Box p="2rem 0 0">
                    {props.todos.map((todo, index) => <Todo key={index} {...todo} />)}
                </Box>
            </Container>
        </Box>
    )
};

// React-Redux settings
const mapStateToProps = (state:RootStateInterface) => ({
    isAuth: state.profile.isAuth,
    name: state.profile.name,
    todos: state.todos.list
});
const mapDispatchToProps = {requestTodos};
const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(Todos);
