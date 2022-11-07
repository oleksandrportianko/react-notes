import Explorer from "../../components/explorer/explorer.component"
import Header from "../../components/header/header.component"

import './main.styles.css'

const MainPage = () => {
    return (
        <div className="main-page-wrapper">
            <Header />
            <Explorer />
        </div>
    )
}

export default MainPage