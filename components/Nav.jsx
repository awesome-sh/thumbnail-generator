import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { AppContext } from '../contexts/context'

import M_Size_Icon from '../public/assets/icons/m-size.png'
import M_Text_Icon from '../public/assets/icons/m-text.png'
import M_Fill_Icon from '../public/assets/icons/m-fill.png'
import M_Sticker_Icon from '../public/assets/icons/m-sticker.png'

function Nav() {
    const { data, setData } = useContext(AppContext)
    const [selectedMenu, setSelectedMenu] = useState('')
    const { size } = data

    const handleDrag = (e) => {
        e.target.style.top = `${e.clientY}px`;
        e.target.style.left = `${e.clientX}px`;
        e.target.style.transform = ''
        e.preventDefault()
    }

    const handleDragOver = (e) => {
        e.preventDefault()
     }

    const handleSelectMenu = ( menu ) => {
        console.log('>> Change Menu', menu)
        if(menu === 'text') {
            setData({
                ...data,
                textControl: true
            })
        } else {
            setData({
                ...data,
                textControl: false
            })
        }
        setSelectedMenu(state => menu)
    }

    const [sizeInputs, setSizeInputs] = useState({ width: size.width, height: size.height })

    const handleChangeSize = (e) => {
        const { name, value } = e.target
        setSizeInputs({
            ...sizeInputs,
            [name]: parseInt(value)
        })
    }

    const handleApplySize = () => {
        console.log('>> Apply Change Size!', sizeInputs)
        setData({
            ...data,
            size: {...sizeInputs}
        })
        setSelectedMenu('')
    }
    
    const [backgroundType, setBackgroundType] = useState('color')

    const hanelBackgroundType = (type) => {
        setBackgroundType(type)
    }

    const [fillTab, setFillTab] = useState('color')
    const [fillColor, setFillColor] = useState('')
    const [fillGradient, setFillGradient] = useState({
        start: '#000000',
        end: '#ffffff'
    })

    const handleApplyFill = () => {
        console.log('>> Apply Change Fill!', fillColor)

        if(backgroundType === 'color') {
            setData({
                ...data,
                backgroundType,
                background: fillColor
            })
        } else {
            setData({
                ...data,
                backgroundType,
                gradient: fillGradient
            })
            console.log({
                ...data,
                backgroundType,
                gradient: fillGradient
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
                    className={selectedMenu === 'size' ? 'selected' : null} 
                >
                    <MenuWrap onClick={() => handleSelectMenu('size')}>
                        <ItemIcon>
                            <Image src={M_Size_Icon} width={24} height={24} />
                        </ItemIcon>
                        <ItemLabel>Size</ItemLabel>
                    </MenuWrap>

                    <SizePanel selectedMenu={selectedMenu}>
                        <h3>썸네일 사이즈 설정</h3>

                        <div className="frm">
                            <div className="frm-desc">단위, 픽셀(Pixel)</div>

                            <div className="frm-item">
                                <div className="frm-label">가로<br/><p>Width</p></div>
                                <div className="frm-input">
                                    <input 
                                        type="number" 
                                        name="width" 
                                        onChange={handleChangeSize} 
                                        defaultValue={size.width}
                                    />px</div>
                            </div>

                            <div className="frm-item">
                                <div className="frm-label">세로<br/><p>Height</p></div>
                                <div className="frm-input">
                                    <input 
                                        type="number" 
                                        name="height" 
                                        onChange={handleChangeSize} 
                                        defaultValue={size.height}
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
                    className={selectedMenu === 'text' ? 'selected' : null}
                >
                    <MenuWrap onClick={() => handleSelectMenu('text')}>
                        <ItemIcon>
                            <Image src={M_Text_Icon} width={24} height={24} />
                        </ItemIcon>
                        <ItemLabel>Text</ItemLabel>
                    </MenuWrap>
                </MenuItem>

                <MenuItem 
                    className={selectedMenu === 'fill' ? 'selected' : null}
                >
                    <MenuWrap onClick={() => handleSelectMenu('fill')}>
                        <ItemIcon>
                            <Image src={M_Fill_Icon} width={24} height={24} />
                        </ItemIcon>
                        <ItemLabel>Fill</ItemLabel>
                    </MenuWrap>

                    <FillPanel selectedMenu={selectedMenu}>
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
                        </div>

                        <div className="options">
                            {
                                fillTab === 'color' ?
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
                                :
                                <div className='color-items'>
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
                            }
                        </div>

                        <div className="btn-group">
                            <button className='cancleBtn' onClick={() => handleSelectMenu('')}>취소</button>
                            <button onClick={handleApplyFill}>적용</button>
                        </div>
                    </FillPanel>
                </MenuItem>

                <MenuItem 
                    className={selectedMenu === 'icon' ? 'selected' : null}
                >
                    <MenuWrap onClick={() => handleSelectMenu('icon')}>
                        <ItemIcon>
                            <Image src={M_Sticker_Icon} width={24} height={24} />
                        </ItemIcon>
                        <ItemLabel>Icon</ItemLabel>
                        <IconPanel selectedMenu={selectedMenu}>
                            <h3>아이콘 설정</h3>
                        </IconPanel>
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
    width: 250px;
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


