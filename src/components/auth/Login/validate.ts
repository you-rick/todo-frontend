import {LoginFormInterface} from "../../../shared/interfaces/login.interface";
import {FormErrors} from "redux-form";

const validate = (values:LoginFormInterface):FormErrors<LoginFormInterface> => {
    const errors:FormErrors<LoginFormInterface> = {};
    if (!values.username) {
        errors.username = 'Required field'
    }

    if (!values.password) {
        errors.password = 'Required field'
    }

    return errors
};

export default validate;
