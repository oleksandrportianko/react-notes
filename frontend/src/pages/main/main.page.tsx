import { useAppDispatch } from '../../redux/hooks'
import { registerUserThunk } from '../../redux/slices/auth.slice'

const MainPage = () => {
    const dispatch = useAppDispatch()

    const handleRegisterUser = () => {
        dispatch(registerUserThunk({ username: 'new', email: 'portianko@gmail.com', password: 'hello' }))
    }

    return (
        <div>
            <button onClick={handleRegisterUser}>Register</button>
        </div>
    )
}

export default MainPage