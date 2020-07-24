import React from 'react';
import "./FormControls.scss";
import {TextField} from "@material-ui/core";


export const renderTextField = ({label, input, meta: {touched, invalid, error}, ...custom}) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);


export const renderSelectField = ({input, label, meta: {touched, error, invalid}, children, ...custom}) => (
    <TextField select
               label={label}
               placeholder={label}
               error={touched && invalid}
               helperText={touched && error}
               {...input}
               {...custom}

    >
        {children}
    </TextField>
);
