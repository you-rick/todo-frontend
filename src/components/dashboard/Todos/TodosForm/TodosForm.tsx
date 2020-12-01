import React, {FC} from 'react';
import { reduxForm} from "redux-form";
import {postTodo, updateTodo, resetCurrentTodo} from "../../../../store/todoReducer";
import {connect, ConnectedProps} from "react-redux";
import validate from "./validate";
import {Todo, TodoStateInterface} from "../../../../shared/interfaces/todo.interface";
import {RootStateInterface} from "../../../../shared/interfaces/root-state.intefrace";
import TodosFormBox from "./TodosFormBox";

// Types
interface Props {
    currentTodo: Todo,
    todos: TodoStateInterface['list'],
    resetCurrentTodo: () => void
}

type PropsFromRedux = ConnectedProps<typeof connector>;


// Redux Form
const TodoReduxForm = reduxForm<{}, Props>({form: 'todos', validate})(TodosFormBox);

// HOC
const TodosForm: FC<PropsFromRedux> = ({authorId, currentTodo, todos, updateTodo, postTodo, resetCurrentTodo}) => {
    const onSubmit = (data: any) => {
        data.author = authorId;

        if (currentTodo._id) {
            updateTodo(data);
        } else {
            postTodo(data);
        }
    };

    return <TodoReduxForm
        onSubmit={onSubmit}
        currentTodo={currentTodo}
        todos={todos}
        resetCurrentTodo={resetCurrentTodo}
    />
};

// React-Redux settings
const mapStateToProps = (state: RootStateInterface) => ({
    authorId: state.profile._id,
    currentTodo: state.todos.currentTodo,
    todos: state.todos.list
});
const mapDispatchToProps = {postTodo, updateTodo, resetCurrentTodo};
const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(TodosForm);
