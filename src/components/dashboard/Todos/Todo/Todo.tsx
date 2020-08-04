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
    const status = statusList.filter(el => el.id === props.status);

    const handleDelete = ():void => {
        props.deleteTodo(props._id);
    };

    const handleEdit = ():void => {
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

// React-Redux settings
const connector = connect(null, {deleteTodo, setCurrentTodo});

export default connector(Todo);
