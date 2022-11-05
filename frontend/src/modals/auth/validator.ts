import * as yup from 'yup';

export const validator = yup.object().shape({
  username: yup.string().required('123'),
  email: yup.string().email().required('123'),
  password: yup.string().min(5).required('123'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], '123')
})