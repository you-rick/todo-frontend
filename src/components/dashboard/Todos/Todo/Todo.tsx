import React, {FC} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {Grid, Typography, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import s from './Todo.module.scss';
import {statusList} from "../statusList";
import {deleteTodo, setCurrentTodo} from "../../../../store/todoReducer";
import {Todo as TodoInterface} from "../../../../shared/interfaces/todo.interface";

// Types
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & TodoInterface;

// Component
const Todo:FC<Props> = (props) => {
    const {_id, title, status, deleteTodo, setCurrentTodo} = props;
    const todoStatus = statusList.filter(el => el.id === status);

    const handleDelete = ():void => {
        deleteTodo(_id);
    };

    const handleEdit = ():void => {
      setCurrentTodo(props);
      window.scrollTo(0, 0);
    };

    return (
        <Grid container justify="space-between" alignItems="center" className={s.todoWrap} data-status={`todoLabel_${todoStatus[0].id}`}>
            <Typography className={s.task}>{title}</Typography>
            <Typography>{todoStatus[0].title}</Typography>
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

// React-Redux settings
const connector = connect(null, {deleteTodo, setCurrentTodo});

export default connector(Todo);
