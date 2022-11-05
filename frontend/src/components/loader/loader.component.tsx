import loader from '../../assets/loader.gif'

import './loader.styles.css'

const Loader = () => {
    return (
        <div className='loader-container'>
            <img className='img-loader' src={loader} alt="" />
        </div>
    )
}

export default Loader