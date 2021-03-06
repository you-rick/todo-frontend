import React, {FC} from 'react';
import "./FormControls.scss";
import {TextField} from "@material-ui/core";
import {FormControlPropsType} from "../../../shared/interfaces/form-controls.interface";

export const renderTextField: FC<FormControlPropsType> = ({label, input, meta: {touched, invalid, error}, ...custom}) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);

export const renderSelectField: FC<FormControlPropsType> = ({label, input, meta: {touched, invalid, error}, children, ...custom}) => (
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
