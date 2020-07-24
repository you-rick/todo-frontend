const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required field'
    }
    if (!values.status) {
        errors.status = 'Required field'
    }

    return errors
};

export default validate;
