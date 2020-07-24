const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required field'
    }

    if (!values.name) {
        errors.name = 'Required field'
    }

    if (!values.password) {
        errors.password = 'Required field'
    } else if (values.password.length < 5) {
        errors.password = 'Password should be at least 4 digits'
    }

    if (!values.repeatPassword) {
        errors.repeatPassword = 'Required field'
    } else if (values.password !== values.repeatPassword) {
        errors.repeatPassword = 'Passwords should match'
    }

    if (!values.phone || !values.phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
        errors.phone = 'Wrong phone format'
    }

    return errors
};

export default validate;
