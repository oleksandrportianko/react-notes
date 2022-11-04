import { useState } from 'react'

import AuthModal from '../../modals/auth/auth.modal'

import './header.styles.css'

const Header = () => {
    const [authModal, setAuthModal] = useState<boolean>(false)

    const handleCloseAuthModal = () => {
        setAuthModal(false)
    }

    const handleShowAuthModal = () => {
        setAuthModal(true)
    }

    return (
        <div className='header-container'>
            <div className='header-logo'>
                NOTES APP
            </div>
            <div className='header-auth'>
                <button onClick={handleShowAuthModal} className='button-default'>SIGN IN / SIGN UP</button>
            </div>
            { authModal && <AuthModal show={authModal} onHide={handleCloseAuthModal} /> }
        </div>
    )
}

export default Header