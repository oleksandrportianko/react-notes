import { useState } from 'react'

import folderSvg from '../../assets/folder.svg'
import fileSvg from '../../assets/file.svg'

import './explorer.styles.css'

const Explorer = () => {
    const [path, setPath] = useState<string[]>(['../'])
    const structure = [
        {
            path: '../',
            type: 'file',
            name: 'text',
        },
        {
            path: '../',
            type: 'folder',
            name: 'folder1',
            folder_path: 'folder1',
            children: [
                {
                    path: 'folder1',
                    type: 'file',
                    name: 'textNew',
                }
            ]
        },
        {
            path: '../',
            type: 'file',
            name: 'folder2',
        },
        {
            path: '../',
            type: 'file',
            name: 'text2',
        }
    ]

    const handleFolderClick = (folderPath: string | undefined) => {
        if (folderPath) {
            const newPath = [...path, folderPath]
            setPath(newPath)
        }
    }

    const handleFileClick = () => {
        console.log('file click')
    }

    return (
        <div className='explorer-container'>
            <h4 className='explorer-title'>My files</h4>
            <div className='explorer-path-block'>
                {
                    path.map((el, idx) => (
                        <span key={el + idx} onClick={handle} className='explorer-path-item'>{el}</span>
                    ))
                }
            </div>
            <div className='folders-structure'>
                {
                    structure.map((file) => {
                        if (file.path === path.slice(-1)[0]) {
                            if (file.type === 'folder') {
                                return (
                                    <div className='folder-item-block' onDoubleClick={() => handleFolderClick(file.folder_path)}>
                                        <img className='folder-item-icon' src={folderSvg} alt="" />
                                        <span className='folder-item-name'>{file.name}</span>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className='folder-item-block' onDoubleClick={handleFileClick}>
                                        <img className='folder-item-icon' src={fileSvg} alt="" />
                                        <span className='folder-item-name'>{file.name}</span>
                                    </div>
                                )
                            }
                        } else {
                            return <></>
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Explorer