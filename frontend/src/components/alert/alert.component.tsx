import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { hideAlert } from '../../redux/slices/alert.slice'

import closeSvg from '../../assets/close.svg'

import './alert.styles.css'

const Alert = () => {
    const show = useAppSelector((state) => state.alert.show)
    const text = useAppSelector((state) => state.alert.text)

    const dispatch = useAppDispatch()

    const hideAllert = () => {
        dispatch(hideAlert())
    }

    if (!show) {
        return (
            <></>
        )
    }

    return (
        <div className='alert-container'>
            {text}
            <img onClick={hideAllert} className='close-image' src={closeSvg} alt="" />
        </div>
    )
}

export default Alert