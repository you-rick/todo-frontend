import React, {useState, useEffect, SyntheticEvent, FC} from "react";
import {Snackbar,} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {hideNote} from "../../../store/notificationReducer";
import {connect} from "react-redux";

type AlertTypes = {
    onClose: (event:SyntheticEvent, reason?:string) => void,
    severity: 'error' | 'info' | 'success' | 'warning',
    children: any
}

const Alert: FC<AlertTypes> = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
};

type NotificationType = {
    type: 'error' | 'info' | 'success' | 'warning',
    msg: any,
    hideNote: () => void
}

const Notification: FC<NotificationType> = ({type, msg, hideNote}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
        msg && setOpen(true);
    }, [msg]);


    const handleClose = (event:SyntheticEvent, reason?:string) => {
        if (reason === 'clickaway') {
            return;
        }

        hideNote();
        setOpen(false);
    };

    return (
        <>
            {(msg && type) &&
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={type} onClose={handleClose}>
                    {msg}
                </Alert>
            </Snackbar>
            }
        </>
    );
};


export default connect(null, {hideNote})(Notification);
