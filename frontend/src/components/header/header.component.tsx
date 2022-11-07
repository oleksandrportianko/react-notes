import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logoutUserThunk } from '../../redux/slices/auth.slice'

import AuthModal from '../../modals/auth/auth.modal'

import './header.styles.css'

const Header = () => {
    const [authModal, setAuthModal] = useState<boolean>(false)
    const user = useAppSelector((state) => state.auth.user)

    const dispatch = useAppDispatch()

    const handleCloseAuthModal = () => {
        setAuthModal(false)
    }

    const handleShowAuthModal = () => {
        setAuthModal(true)
    }

    const handleLogout = () => {
        dispatch(logoutUserThunk())
    }

    return (
        <div className='header-container'>
            <div className='header-logo'>
                NOTES APP
            </div>
            <div className='header-auth'>
                {
                    user ? (
                        <button onClick={handleLogout} className='button-default'>LOG OUT</button>
                    ) : (
                        <button onClick={handleShowAuthModal} className='button-default'>SIGN IN / SIGN UP</button>
                    ) 
                }
            </div>
            { authModal && <AuthModal show={authModal} onHide={handleCloseAuthModal} /> }
        </div>
    )
}

export default Header