import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import {Box, Container, Typography} from "@material-ui/core";
import TodosForm from "./TodosForm/TodosForm";
import Todo from "./Todo/Todo";
import {requestTodos} from "../../../store/todoReducer";


const Todos = (props) => {
    useEffect(() => {
        props.isAuth && props.requestTodos();
    }, [props.isAuth]);


    if (!props.isAuth) {
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
                    {props.todos.map(todo => <Todo key={todo._id} {...todo} />)}
                </Box>
            </Container>
        </Box>
    )
};

const mapStateToProps = (state) => ({
    isAuth: state.profile.isAuth,
    name: state.profile.name,
    todos: state.todos.list
});

export default connect(mapStateToProps, {requestTodos})(Todos);
