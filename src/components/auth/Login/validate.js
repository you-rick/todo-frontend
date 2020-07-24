const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required field'
    }

    if (!values.password) {
        errors.password = 'Required field'
    }

    return errors
};

export default validate;
