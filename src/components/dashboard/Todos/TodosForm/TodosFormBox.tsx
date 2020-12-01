import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {Box, Button, Grid, MenuItem} from "@material-ui/core";
import {Field, InjectedFormProps} from "redux-form";
import s from "./TodosForm.module.scss";
import {renderSelectField, renderTextField} from "../../../shared/FormControls/FormControls";
import {statusList} from "../statusList";
import {Todo, TodoStateInterface} from "../../../../shared/interfaces/todo.interface";

interface Props {
    currentTodo: Todo,
    todos: TodoStateInterface['list'],
    resetCurrentTodo: () => void
}

type FormProps = Props & InjectedFormProps<{}, Props>;

const TodosFormBox: FC<FormProps> = (props) => {
    const {handleSubmit, currentTodo, resetCurrentTodo, todos, initialize} = props;
    const [status, setStatus] = useState(0);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        handleReset();
    }, [todos]);

    useEffect(() => {
        if (currentTodo._id) {
            initialize({
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
        initialize({});
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

export default TodosFormBox;
