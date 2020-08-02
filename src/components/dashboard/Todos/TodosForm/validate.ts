import {FormErrors} from "redux-form";
import {FormTodoInterface} from "../../../../shared/interfaces/todo.interface";

const validate = (values:FormTodoInterface):FormErrors<FormTodoInterface> => {

    const errors:FormErrors<FormTodoInterface> = {};

    if (!values.title) {
        errors.title = 'Required field'
    }
    if (!values.status) {
        errors.status = 'Required field'
    }

    return errors
};


export default validate;
