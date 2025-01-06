import * as Yup from 'yup';

const signUpValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    firstName: Yup.string().required().min(3, 'Minimum of 3 characters'),
    lastName: Yup.string().required().min(3, 'Minimum of 3 characters'),
    password: Yup.string().required('Password is required').min(6, 'Minimum of 6 characters'),

})

export default signUpValidationSchema;