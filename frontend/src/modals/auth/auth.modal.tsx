import { FC, Fragment, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import { loginUserThunk, registerUserThunk } from '../../redux/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { showAlert } from '../../redux/slices/alert.slice';
import { validator, validatorLogin } from './validator';

import Loader from '../../components/loader/loader.component';

import './auth.styles.css'

type AuthModalProps = {
    show: boolean,
    onHide: () => void,
}

type FormValues = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

type FormLoginValue = {
    email: string,
    password: string,
}

const AuthModal: FC<AuthModalProps> = ({ show, onHide }) => {
    const [currentTab, setCurrentTab] = useState('login')
    const isLoading = useAppSelector((state) => state.auth.isLoading)
    const error = useAppSelector((state) => state.auth.error)

    const dispatch = useAppDispatch()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(validator) });

    const { register: registerLogin, handleSubmit: handleSubmitLogin, reset: resetLogin, formState: { errors: errorsLogin } } = useForm<FormLoginValue>({ resolver: yupResolver(validatorLogin) });

    const changeTabToLogin = () => {
        setCurrentTab('login')
    }

    const changeTabToRegister = () => {
        setCurrentTab('register')
    }

    const onSubmit = async (data: FormValues) => {
        dispatch(registerUserThunk(data))
        if (!isLoading && !error) {
            reset()
            onHide()
            dispatch(showAlert({ text: 'User successfully created, you can login now!', type: 'success' }))
        }
    }

    const onSubmitLogin = (data: FormLoginValue) => {
        console.log(data)
        dispatch(loginUserThunk(data))
        if (!isLoading && !error) {
            resetLogin()
            onHide()
        }
    }

    return (
        <Modal centered show={show} onHide={onHide}>
            <Modal.Header className='border-0' closeButton>
                <Modal.Title>{currentTab === 'login' ? 'SIGN IN' : 'SIGN UP'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    isLoading ? (
                        <Loader />
                    ) : currentTab === 'login' ? (
                        <Fragment>
                            <form noValidate className='form' onSubmit={handleSubmitLogin(onSubmitLogin)}>
                                <div className='input-block'>
                                    <label className='input-label' htmlFor="">Email</label>
                                    <input type='text' className='input' {...registerLogin('email')} />
                                    {errorsLogin.email && <p className='input-error'>{errorsLogin.email.message}</p>}
                                </div>
                                <div className='input-block'>
                                    <label className='input-label' htmlFor="">Password</label>
                                    <input type='password' className='input' {...registerLogin('password')} />
                                    {errorsLogin.password && <p className='input-error'>{errorsLogin.password.message}</p>}
                                </div>
                                <div className='input-block align-items-end'>
                                    <button className='button-default'>Sign in</button>
                                </div>
                            </form>
                            <div className='have-account-block'>
                                Don`t have an account? <span onClick={changeTabToRegister} className='blue-link'>Sign up</span>
                            </div>
                        </Fragment>
                    ) :
                        (
                            <Fragment>
                                <form noValidate className='form' onSubmit={handleSubmit(onSubmit)}>
                                    <div className='input-block'>
                                        <label className='input-label' htmlFor="">Username</label>
                                        <input type='text' className='input' {...register('username')} />
                                        {errors.username && <p className='input-error'>{errors.username.message}</p>}
                                    </div>
                                    <div className='input-block'>
                                        <label className='input-label' htmlFor="">Email</label>
                                        <input type='text' className='input' {...register('email')} />
                                        {errors.email && <p className='input-error'>{errors.email.message}</p>}
                                    </div>
                                    <div className='input-block'>
                                        <label className='input-label' htmlFor="">Password</label>
                                        <input type='password' className='input' {...register('password')} />
                                        {errors.password && <p className='input-error'>{errors.password.message}</p>}
                                    </div>
                                    <div className='input-block'>
                                        <label className='input-label' htmlFor="">Confirm password</label>
                                        <input type='password' className='input' {...register('confirmPassword')} />
                                        {errors.confirmPassword && <p className='input-error'>{errors.confirmPassword.message}</p>}
                                    </div>
                                    <div className='input-block align-items-end'>
                                        <button className='button-default'>Sign up</button>
                                    </div>
                                </form>
                                <div className='have-account-block'>
                                    Already have an account? <span onClick={changeTabToLogin} className='blue-link'>Sign in</span>
                                </div>
                            </Fragment>
                        )
                }
            </Modal.Body>
        </Modal>
    )
}

export default AuthModal