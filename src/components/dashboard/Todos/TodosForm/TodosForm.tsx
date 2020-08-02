import React, {useState, useEffect, FC, ChangeEvent} from 'react';
import {Box, MenuItem, Button, Grid} from "@material-ui/core";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {renderTextField, renderSelectField} from "../../../shared/FormControls/FormControls";
import {postTodo, updateTodo, resetCurrentTodo} from "../../../../store/todoReducer";
import {connect} from "react-redux";
import validate from "./validate";
import s from "./TodosForm.module.scss";
import {statusList} from "../statusList";
import {Todo, TodoStateInterface, FormTodoInterface} from "../../../../shared/interfaces/todo.interface";
import {RootStateInterface} from "../../../../store/reducers";

interface Props {
    currentTodo: Todo,
    todos: TodoStateInterface['list'],
    resetCurrentTodo: () => void
}

interface ExtendedProps extends Props {
    authorId: Todo['_id']
    updateTodo: (data: Todo) => void,
    postTodo: (data: Todo) => void,
}

type FormProps = Props & InjectedFormProps<{}, Props>;

const TodosFormBox: FC<FormProps> = (props) => {
    const {handleSubmit, currentTodo, resetCurrentTodo, todos} = props;
    const [status, setStatus] = useState(0);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        handleReset();
    }, [todos]);

    useEffect(() => {
        if (currentTodo._id) {
            props.initialize({
                _id: currentTodo._id,
                title: currentTodo.title,
                status: currentTodo.status
            });
            setStatus(currentTodo.status);
            setEditMode(true);
        }
    }, [currentTodo]);

    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setStatus(parseInt(event.target.value));
    };
    const handleReset = () => {
        resetCurrentTodo();
        setStatus(currentTodo.status);
        setEditMode(false);
        setStatus(0);
        props.initialize({});
    };

    return (
        <Box p="1rem 0 0">
            <form onSubmit={handleSubmit}>
                <Grid container justify="space-between" alignItems="flex-start">
                    <Field
                        name="title"
                        label="To do"
                        variant="outlined"
                        margin="normal"
                        className={s.fieldBox}
                        component={renderTextField}
                    />
                    <Field
                        name="status"
                        label="select status"
                        variant="outlined"
                        margin="normal"
                        inputProps={{value: status}}
                        className={s.fieldBox}
                        onChange={handleStatusChange}
                        component={renderSelectField}
                    >
                        {statusList.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.title}
                            </MenuItem>
                        ))}
                    </Field>
                    <Button type="submit" className={s.submit} variant="contained" color="primary">
                        {editMode ? 'Update' : 'Add'}
                    </Button>
                    {editMode &&
                    <Button type="button" className={s.submit} variant="outlined" color="primary" onClick={handleReset}>
                        Cancel
                    </Button>
                    }
                </Grid>
            </form>
        </Box>
    )
};


const TodoReduxForm = reduxForm<{}, Props>({form: 'todos', validate})(TodosFormBox);

const TodosForm: FC<ExtendedProps> = (props) => {
    const onSubmit = (data: any) => {
        data.author = props.authorId;

        if (props.currentTodo._id) {
            props.updateTodo(data);
        } else {
            props.postTodo(data);
        }
    };

    return <TodoReduxForm
        onSubmit={onSubmit}
        currentTodo={props.currentTodo}
        todos={props.todos}
        resetCurrentTodo={props.resetCurrentTodo}
    />
};

const mapStateToProps = (state: RootStateInterface) => ({
    authorId: state.profile._id,
    currentTodo: state.todos.currentTodo,
    todos: state.todos.list
});


export default connect(mapStateToProps, {postTodo, updateTodo, resetCurrentTodo})(TodosForm);
