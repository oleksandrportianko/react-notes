import { FC, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import { registerUserThunk } from '../../redux/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { validator } from './validator';

import './auth.styles.css'
import Loader from '../../components/loader/loader.component';

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

const AuthModal: FC<AuthModalProps> = ({ show, onHide }) => {
    const [currentTab, setCurrentTab] = useState('register')
    const isLoading = useAppSelector((state) => state.auth.isLoading)

    const dispatch = useAppDispatch()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(validator) });

    const onSubmit = async (data: FormValues) => {
        dispatch(registerUserThunk(data))
        if (!isLoading) {
            reset()
        }
    }
    
    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <Modal centered show={show} onHide={onHide}>
            <Modal.Header className='border-0' closeButton>
                <Modal.Title>{ currentTab === 'login' ? 'Login' : 'Registration' }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                        <button className='button-default'>Register</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default AuthModal