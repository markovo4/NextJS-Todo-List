import * as Yup from 'yup';

const signUpValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Minimum of 6 characters'),

})

export default signUpValidationSchema;