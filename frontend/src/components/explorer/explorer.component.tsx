import { useEffect, useState } from 'react'

import folderSvg from '../../assets/folder.svg'
import fileSvg from '../../assets/file.svg'

import './explorer.styles.css'

const structure = [
    {
        path: '../',
        type: 'folder',
        name: 'folder1',
        folder_path: 'folder1',
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
    },
    {
        path: '../folder1',
        type: 'file_in_folder',
        name: 'text2',
    }
]

type File = {
    path: string,
    type: string,
    name: string,
    folder_path?: string,
}

type Folder = {
    path: string,
    type: string,
    name: string,
    folder_path: string,
}

const Explorer = () => {
    const [path, setPath] = useState<string[]>(['../'])
    const [explorer, setExplorer] = useState<(Folder|File)[]>(structure)

    useEffect(() => {
        const filteredExplorer: (Folder|File)[] = structure.filter((el) => el.path === path.join(''))
        setExplorer(filteredExplorer)
    }, [path])

    const handleFolderClick = (folderPath: string | undefined) => {
        if (folderPath) {
            const newPath = [...path, folderPath]
            setPath(newPath)
        }
    }

    const handlePathClick = (clickedPath: string) => {
        const indexOfClickedPath = path.indexOf(clickedPath)
        const newPath = path.slice(0, indexOfClickedPath + 1)
        setPath(newPath)
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
                        <span key={el + idx} onClick={() => handlePathClick(el)} className='explorer-path-item'>{el}</span>
                    ))
                }
            </div>
            <div className='folders-structure'>
                {
                    explorer && explorer.map((el, idx) => {
                        if (el.type === 'folder') {
                            return (
                                <div key={el.name + idx} className='folder-item-block' onDoubleClick={() => handleFolderClick(el.folder_path)}>
                                    <img className='folder-item-icon' src={folderSvg} alt="" />
                                    <span className='folder-item-name'>{el.name}</span>
                                </div>
                            )
                        } else {
                            return (
                                <div key={el.name + idx} className='folder-item-block' onDoubleClick={handleFileClick}>
                                    <img className='folder-item-icon' src={fileSvg} alt="" />
                                    <span className='folder-item-name'>{el.name}</span>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Explorer