import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { AppContext } from '../contexts/context'

import M_Size_Icon from '../public/assets/icons/m-size.png'
import M_Text_Icon from '../public/assets/icons/m-text.png'
import M_Fill_Icon from '../public/assets/icons/m-fill.png'
import M_Sticker_Icon from '../public/assets/icons/m-sticker.png'
import M_Share_Icon from '../public/assets/icons/m-share.png'
import { createElement } from 'react'

function Nav({ handleDownloadImage }) {
    const { data, setData } = useContext(AppContext)
    const [selectedMenu, setSelectedMenu] = useState('')
    const { size } = data

    const handleSelectMenu = ( menu ) => {
        if(menu === 'text') {
            setData({
                ...data,
                menu,
                textControl: true
            })
        } else {
            setData({
                ...data,
                menu,
                textControl: false
            })
        }
    }

    const [sizeInputs, setSizeInputs] = useState({ width: size.width, height: size.height })

    const handleChangeSize = (e) => {
        const { name, value } = e.target
        setSizeInputs({
            ...sizeInputs,
            [name]: parseInt(value)
        })
    }

    const handleChangePresetSize = (e) => {
        const width = e.target.value

        let height;

        if(width === '320') {
            height = 240
        } else if(width === '640') {
            height = 480
        } else if(width === '1280') {
            height = 720
        } else if(width === '1920') {
            height = 1080
        } else {
            return
        }

        setSizeInputs({
            width,
            height
        })
    }

    const handleApplySize = () => {
        setData({
            ...data,
            size: {...sizeInputs}
        })
        setSelectedMenu('')
    }
    
    const [backgroundType, setBackgroundType] = useState('color')
    const [backgroundImage, setBackgroundImage] = useState()
    const [repeat, setRepeat] = useState(false)

    const hanelBackgroundType = (type) => {
        setBackgroundType(type)
    }

    const [fillTab, setFillTab] = useState('color')
    const [fillColor, setFillColor] = useState('')
    const [fillGradient, setFillGradient] = useState({
        start: '#000000',
        end: '#ffffff',
        deg: 90
    })

    const handleApplyFill = () => {
        console.log('>> Apply Change Fill!', fillColor)

        if(backgroundType === 'color') {
            setData({
                ...data,
                backgroundType,
                background: fillColor
            })
        } else if(backgroundType === 'gradient') {
            setData({
                ...data,
                backgroundType,
                gradient: fillGradient
            })
        } else {
            setData({
                ...data,
                backgroundType,
                backgroundImg: backgroundImage,
                repeat,
            })
        }
        setSelectedMenu('')
    }

    const handleSetGradient = (e) => {
        const { name, value } = e.target

        setFillGradient({
            ...fillGradient,
            [name]: value
        })
    }

    const handleImageUpload = () => {
        const fileElement = document.createElement('input')
        fileElement.setAttribute('type', 'file')
        fileElement.click()

        const fileChangeEvent = (e) => {
            const selectFile = e.target.files[0]
            reader.onloadend = () => {
                setBackgroundImage(reader.result)
            }

            reader.readAsDataURL(selectFile)
            fileElement.removeEventListener('change', fileChangeEvent)
        }

        let reader = new FileReader()
        fileElement.addEventListener('change', fileChangeEvent)
    }

    const handleImageDelete = () => {
        if(window.confirm('배경이미지를 삭제하시겠습니까?')) {
            setData({
                ...data,
                backgroundType: 'color',
                backgroundImg: ''
            })
        }
    }

    return (
        <NavWrap 
            /*
            draggable="true" 
            onDrag={handleDrag}
            onDrop={handleDrag}
            onDragOver={handleDragOver}
            */
        >
            <Logo>
                <span className='point'>Awesome</span>
                <h3>Thumbnail</h3>
                <p>Generator</p>
            </Logo>

            <Menu>
                <MenuItem 
                    className={data.menu === 'size' ? 'selected' : null} 
                >
                    <MenuWrap onClick={() => handleSelectMenu('size')}>
                        <ItemIcon>
                            <Image src={M_Size_Icon} width={24} height={24} />
                        </ItemIcon>
                        <ItemLabel>Size</ItemLabel>
                    </MenuWrap>

                    <SizePanel selectedMenu={data.menu}>
                        <h3>썸네일 사이즈 설정</h3>

                        <div className="frm">
                            <div className="frm-desc">단위, 픽셀(Pixel)</div>

                            <div className="frm-presets">
                                <div className="label">프리셋<br/><p>Presets</p></div>
                                <div className="select">
                                    <select defaultValue={""} onChange={handleChangePresetSize}>
                                        <option value="" disabled>선택</option>
                                        <option value={320}>SD (320x240)</option>
                                        <option value={640}>VGA (640x480)</option>
                                        <option value={1280}>HD (1280x720)</option>
                                        <option value={1920}>FULL HD (1920x1080)</option>
                                    </select>
                                </div>
                            </div>
                            
                            

                            <div className="frm-item">
                                <div className="frm-label">가로<br/><p>Width</p></div>
                                <div className="frm-input">
                                    <input 
                                        type="number" 
                                        name="width" 
                                        onChange={handleChangeSize} 
                                        defaultValue={sizeInputs.width}
                                    />px</div>
                            </div>

                            <div className="frm-item">
                                <div className="frm-label">세로<br/><p>Height</p></div>
                                <div className="frm-input">
                                    <input 
                                        type="number" 
                                        name="height" 
                                        onChange={handleChangeSize} 
                                        defaultValue={sizeInputs.height}
                                    />px</div>
                            </div>
                        </div>

                        <div className="btn-group">
                            <button className='cancleBtn' onClick={() => handleSelectMenu('')}>취소</button>
                            <button onClick={handleApplySize}>적용</button>
                        </div>
                    </SizePanel>
                </MenuItem>
                
                <MenuItem 
                    className={data.menu === 'text' ? 'selected' : null}
                >
                    <MenuWrap onClick={() => handleSelectMenu('text')}>
                        <ItemIcon>
                            <Image src={M_Text_Icon} width={24} height={24} />
                        </ItemIcon>
                        <ItemLabel>Text</ItemLabel>
                    </MenuWrap>
                </MenuItem>

                <MenuItem 
                    className={data.menu === 'fill' ? 'selected' : null}
                >
                    <MenuWrap onClick={() => handleSelectMenu('fill')}>
                        <ItemIcon>
                            <Image src={M_Fill_Icon} width={24} height={24} />
                        </ItemIcon>
                        <ItemLabel>Fill</ItemLabel>
                    </MenuWrap>

                    <FillPanel selectedMenu={data.menu}>
                        <h3>채우기 설정</h3>

                        <div className="type">
                            <div 
                                className={fillTab === 'color' ? 'color selected' : 'color'}
                                onClick={() => {
                                    setFillTab('color')
                                    hanelBackgroundType('color')
                                }}
                            >단색</div>
                            <div 
                                className={fillTab === 'gradient' ? 'gradient selected' : 'gradient'}
                                onClick={() => {
                                    setFillTab('gradient')
                                    hanelBackgroundType('gradient')
                                }}
                            >그라디언트</div>
                            <div 
                                className={fillTab === 'img' ? 'img selected' : 'img'}
                                onClick={() => {
                                    setFillTab('img')
                                    hanelBackgroundType('img')
                                }}
                            >이미지</div>
                        </div>

                        <div className="options">
                            { fillTab === 'color' &&
                                <div className='color-items single'>
                                    <div className="color-item">
                                        <div className="color-label">색상</div>
                                        <div className="color-input">
                                            <input 
                                                type="color" 
                                                onChange={(e) => setFillColor(e.target.value)}
                                                defaultValue={data.background}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }

                            { fillTab === 'gradient' &&
                                <>
                                    <div className='color-items single'>
                                        <div className="color-item">
                                            <div className="color-label">시작</div>
                                            <div className="color-input">
                                                <input 
                                                    type="color" 
                                                    name="start"
                                                    onChange={handleSetGradient}
                                                    defaultValue={data.gradient.start}
                                                />
                                            </div>
                                        </div>
                                        <div className="color-item">
                                            <div className="color-label">종료</div>
                                            <div className="color-input">
                                                <input 
                                                    type="color" 
                                                    name="end"
                                                    onChange={handleSetGradient}
                                                    defaultValue={data.gradient.end}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <br/>

                                    <div className='color-items single'>
                                        <div className="color-item">
                                            <div className="color-label">각</div>
                                            <div className="color-input">
                                                <input 
                                                    type="text"
                                                    name="deg"
                                                    defaultValue={data.gradient.deg}
                                                    onChange={handleSetGradient}
                                                />º
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                            { fillTab === 'img' &&
                                <>
                                    <div className="img-item">
                                        <div className="img-label">이미지</div>
                                        <div className="img-input" onClick={handleImageUpload}>
                                            { backgroundImage ? '선택 완료' : '찾아보기' }
                                        </div>
                                    </div>
                                    <div className="img-item">
                                        <div className="img-label">반복설정</div>
                                        <ul className="img-ul">
                                            <li className={repeat ? 'selected' : null} onClick={() => setRepeat(true)}>반복</li>
                                            <li className={!repeat ? 'selected' : null} onClick={() => setRepeat(false)}>반복하지않음</li>
                                        </ul>
                                    </div>

                                    {data.backgroundType === 'img' && 
                                        <>
                                            
                                            <p className='exist'>
                                                이미 업로드된 이미지가 존재합니다.
                                                <b onClick={handleImageDelete}>삭제</b>
                                            </p>
                                        </>
                                    }
                                </>
                            }
                        </div>

                        <div className="btn-group">
                            <button className='cancleBtn' onClick={() => handleSelectMenu('')}>취소</button>
                            <button onClick={handleApplyFill}>적용</button>
                        </div>
                    </FillPanel>
                </MenuItem>

                <MenuItem 
                    className={data.menu === 'share' ? 'selected' : null}
                >
                    <MenuWrap onClick={() => handleSelectMenu('share')}>
                        <ItemIcon>
                            <Image src={M_Share_Icon} width={24} height={24} />
                        </ItemIcon>
                        <ItemLabel>Share</ItemLabel>
                        <SharePanel selectedMenu={data.menu}>
                            <h3>공유</h3>

                            <ul>
                                <li onClick={handleDownloadImage}>다운로드 (.png)</li>
                            </ul>
                        </SharePanel>
                    </MenuWrap>
                </MenuItem>
            </Menu>
        </NavWrap>
    )
}

export default Nav

const NavWrap = styled.div`
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 10%;
    transform: translate(-50%, -50%);
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 30px;

    .point {
        font-family: var(--engFont);
        font-weight: 400;
        font-size: 12px;
        width: 100%;
        text-align: left;
    }

    h3 {
        width: 100%;
        text-align: left;
        color: var(--primary);
        font-family: var(--engFont);
        font-size: 21px;
        font-weight: 800;
    }

    p {
        width: 100%;
        text-align: left;
        font-family: var(--engFont);
        font-weight: 600;
        font-size: 16px;
        color: var(--primary);
        
    }
`

const Menu = styled.div`
    width: 90px;
    height: 100%;
    background: #fff;
    border-bottom: 1px solid var(--borderColor);
    box-shadow: var(--boxShadow);

    .selected {
        background: var(--backgroundHoverColor);
    }
`

const MenuItem = styled.div`
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 85px;
    border-bottom: 1px solid var(--borderSubColor);
    transition: var(--transition);

    &:hover {
        background: var(--backgroundHoverColor);
    }

    h3 {
        font-size: 14px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid var(--borderSubColor);
    }

    .frm-desc {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        text-align: right;
        font-size: 11px;
    }

    .frm-presets {
        width: 100%;
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #eee;

        .label {
            width: 30%;
            text-align: center;
            font-size: 13px;
            font-weight: bold;

            p {
                font-family: var(--engFont);
                font-size: 10px;
                color: var(--fontSubColor);
            }
        }

        .select {
            width: 70%;

            select {
                width: 100%;
                border-radius: 4px;
                padding-left: 6px;
                font-size: 12px;
            }
        }
    }

    .frm-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .frm-label {
            width: 30%;
            text-align: center;
            font-size: 13px;
            font-weight: bold;

            p {
                font-family: var(--engFont);
                font-size: 10px;
                color: var(--fontSubColor);
            }
        }

        .frm-input {
            width: 70%;
            display: flex;
            align-items: center;
            font-size: 12px;

            input {
                width: 90%;
                margin-right: 8px;
                border-radius: 4px;
            }
        }
    }

    .btn-group {
        margin-top: 20px;
        display: flex;
        width: 100%;

        button {
            width: 50%;
        }
    }
`

const MenuWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const ItemIcon = styled.div``

const ItemLabel = styled.div`
    margin-top: 2px;
    font-family: var(--engFont);
    font-weight: 600;
    font-size: 11px;
`

const SizePanel = styled.div`
    cursor: default;
    position: absolute;
    padding: 20px;
    top: 0;
    left: ${({ selectedMenu }) => selectedMenu !== 'size' ? '140px' : '90px'};
    opacity:  ${({ selectedMenu }) => selectedMenu !== 'size' ? '0' : '1'};
    visibility: ${({ selectedMenu }) => selectedMenu !== 'size' ? 'hidden' : 'visible'};
    width: 250px;
    background: #fff;
    border-bottom: 1px solid var(--borderColor);
    box-shadow: var(--boxShadow);
    transition: var(--transition);
`

const TextPanel = styled.div`
    cursor: default;
    position: absolute;
    padding: 20px;
    top: 0;
    left: ${({ selectedMenu }) => selectedMenu !== 'text' ? '140px' : '90px'};
    opacity:  ${({ selectedMenu }) => selectedMenu !== 'text' ? '0' : '1'};
    visibility: ${({ selectedMenu }) => selectedMenu !== 'text' ? 'hidden' : 'visible'};
    width: 250px;
    height: 200px;
    background: #fff;
    border-bottom: 1px solid var(--borderColor);
    box-shadow: var(--boxShadow);
    transition: var(--transition);
`

const FillPanel = styled.div`
    cursor: default;
    position: absolute;
    padding: 20px;
    top: 0;
    left: ${({ selectedMenu }) => selectedMenu !== 'fill' ? '140px' : '90px'};
    opacity:  ${({ selectedMenu }) => selectedMenu !== 'fill' ? '0' : '1'};
    visibility: ${({ selectedMenu }) => selectedMenu !== 'fill' ? 'hidden' : 'visible'};
    width: 350px;
    background: #fff;
    border-bottom: 1px solid var(--borderColor);
    box-shadow: var(--boxShadow);
    transition: var(--transition);

    .type {
        display: flex;

        & > div {
            width: 50%;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            border: 1px solid var(--borderColor);
        }
    }

    .selected {
        background: var(--backgroundColor);
    }

    .options {
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;

        .exist {
            width: 100%;
            font-size: 12px;
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;

            b { 
                cursor: pointer;
                margin-left: 15px;
                width: 50px;
                height: 30px;
                background: #e04747;
                font-weight: bold;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.2s ease-out;

                &:hover {
                    background: #c43232;
                }
            }
        }

        .color-items {
            width: 100%;
            display: flex;

            & > div {
                width: 50%;
            }

            .color-label {
                width: 50%;
                text-align: center;
                font-size: 13px;
                font-weight: bold;
            }
        }

        .color-item {
            width: 100%;
            display: flex;
            align-items: center;

            .color-input {
                input {
                    border-radius: 8px;
                    padding: 0px;
                    width: 28px;
                    height: 28px;
                }

                input[type=text] {
                    width: 40px;
                }
            }
        }

        .img-item {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            .img-label {
                width: 30%;
                font-size: 12px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .img-input {
                width: 70%;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                border: 1px solid #eee;
                background: #eee;
            }

            .img-ul {
                list-style: none;
                display: flex;
                width: 70%;

                li {
                    cursor: pointer;
                    width: 50%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    transition: all 0.2s ease-out;

                    &:hover {
                        background: #ebf0ff;
                    }
                }

                .selected {
                    background: #f2f5fd;
                }
            }
        }
    }
`

const IconPanel = styled.div`
    cursor: default;
    position: absolute;
    padding: 20px;
    bottom: 0;
    left: ${({ selectedMenu }) => selectedMenu !== 'icon' ? '140px' : '90px'};
    opacity:  ${({ selectedMenu }) => selectedMenu !== 'icon' ? '0' : '1'};
    visibility: ${({ selectedMenu }) => selectedMenu !== 'icon' ? 'hidden' : 'visible'};
    width: 250px;
    height: 200px;
    background: #fff;
    border-bottom: 1px solid var(--borderColor);
    box-shadow: var(--boxShadow);
    transition: var(--transition);
`

const SharePanel = styled.div`
    cursor: default;
    position: absolute;
    padding: 20px;
    bottom: 0;
    left: ${({ selectedMenu }) => selectedMenu !== 'share' ? '140px' : '90px'};
    opacity:  ${({ selectedMenu }) => selectedMenu !== 'share' ? '0' : '1'};
    visibility: ${({ selectedMenu }) => selectedMenu !== 'share' ? 'hidden' : 'visible'};
    width: 250px;
    background: #fff;
    border-bottom: 1px solid var(--borderColor);
    box-shadow: var(--boxShadow);
    transition: var(--transition);

    ul {
        list-style: none;
    }

    ul li {
        cursor: pointer;
        padding-left: 15px;
        font-size: 12px;
        font-weight: bold;
        height: 35px;
        line-height: 35px;
    }
`


