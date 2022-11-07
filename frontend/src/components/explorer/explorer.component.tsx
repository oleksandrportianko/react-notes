import { useState } from 'react'

import folderSvg from '../../assets/folder.svg'
import fileSvg from '../../assets/file.svg'

import './explorer.styles.css'

const Explorer = () => {
    const [path, setPath] = useState(['../', 'main'])

    return (
        <div className='explorer-container'>
            <h4 className='explorer-title'>My files</h4>
            <div className='explorer-path-block'>
                { 
                    path.map((el) => (
                        <span className='explorer-path-item'>{el}</span>
                    ))
                }
            </div>
            <div className='folders-structure'>
                <div className='folder-item-block'>
                    <img className='folder-item-icon' src={folderSvg} alt="" />
                    <span className='folder-item-name'>Folder name</span>
                </div>
                <div className='folder-item-block'>
                    <img className='folder-item-icon' src={fileSvg} alt="" />
                    <span className='folder-item-name'>File name</span>
                </div>
            </div>
        </div>
    )
}

export default Explorer