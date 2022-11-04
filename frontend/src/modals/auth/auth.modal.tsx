import { FC, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import { registerUserThunk } from '../../redux/slices/auth.slice';
import { useAppDispatch } from '../../redux/hooks';
import { validator } from './validator';

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

const AuthModal: FC<AuthModalProps> = ({ show, onHide }) => {
    const [currentTab, setCurrentTab] = useState('register')

    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(validator) });

    const onSubmit = async (data: FormValues) => {
        console.log(data)
        dispatch(registerUserThunk(data))
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
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='button-default'>Register</button>
            </Modal.Footer>
        </Modal>
    )
}

export default AuthModal