import React, {FC} from 'react';
import {connect} from "react-redux";
import {Grid, Typography, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import s from './Todo.module.scss';
import {statusList} from "../statusList";
import {deleteTodo, setCurrentTodo} from "../../../../store/todoReducer";
import {Todo as TodoInterface} from "../../../../shared/interfaces/todo.interface";

type DispatchPropsType = {
    deleteTodo: (_id: string | null) => void,
    setCurrentTodo: (data: TodoInterface) => void
}

type Props = DispatchPropsType & TodoInterface;


const Todo:FC<Props> = (props) => {
    const status = statusList.filter(el => el.id === props.status);

    const handleDelete = () => {
        props.deleteTodo(props._id);
    };

    const handleEdit = () => {
      props.setCurrentTodo(props);
      window.scrollTo(0, 0);
    };

    return (
        <Grid container justify="space-between" alignItems="center" className={s.todoWrap} data-status={`todoLabel_${status[0].id}`}>
            <Typography className={s.task}>{props.title}</Typography>
            <Typography>{status[0].title}</Typography>
            <div>
                <IconButton aria-label="edit" color="primary" className={s.iconBtn} onClick={handleEdit}>
                    <EditIcon fontSize="small"/>
                </IconButton>
                <IconButton aria-label="delete" color="secondary" className={s.iconBtn} onClick={handleDelete}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </div>
        </Grid>
    )
};

export default connect(null, {deleteTodo, setCurrentTodo})(Todo);