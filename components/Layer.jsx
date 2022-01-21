import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../contexts/context'

// Text Editer Icon
import AlignLeft from '../public/assets/icons/align-left.png'
import AlignRight from '../public/assets/icons/align-right.png'
import AlignCenter from '../public/assets/icons/align-center.png'
import Bold from '../public/assets/icons/bold.png'
import Paragraph from '../public/assets/icons/paragraph.png'
import Image from 'next/image'

function Layer() {
    const {data, setData} = useContext(AppContext)
    const [text, setText] = useState('')

    const handleAddText = (e) => {
        const textObject = {
            id: data.texts.length + 1,
            text: text,
            align: 'center',
            posX: 0,
            posY: 0,
            size: 18,
            color: '#000000',
            zIndex: 1,
            weight: 'normal',
        }

        let newTexts = data.texts || []
        newTexts.push( textObject )

        setData({
            ...data,
            texts: newTexts
        })

        setText('')
    }

    return (
        <LayerWrap data={data}>
            <h3>텍스트 설정</h3>
            <input 
                type="text" 
                name="text" 
                onChange={(e) => setText(e.target.value)} 
                placeholder='이곳에 텍스트를 입력하세요.' 
                value={text}
            />
            <button className='btn add' onClick={handleAddText}>+ 텍스트 추가</button>

            <div className="text-list">
                { data.texts && data.texts.map((v, i) => 
                    <div 
                        key={i}
                        className="text-item"
                    >
                        <div className="text-label">
                            <input 
                                type="text" 
                                defaultValue={v.text}
                                onChange={(e) => {
                                    const { value } = e.target

                                    let newTexts = data.texts
                                    newTexts[i].text = value

                                    setData({
                                        ...data,
                                        texts: newTexts
                                    })
                                }}
                            />
                            <button onClick={() => {
                                let newTexts = data.texts
                                newTexts = newTexts.filter(item => item.id !== v.id)

                                setData({
                                    ...data,
                                    texts: newTexts
                                })
                            }}>삭제</button>
                        </div>
                        <div className="text-option">
                            크기
                            <input 
                                type="number" 
                                defaultValue={v.size}
                                onChange={(e) => {
                                    const { value } = e.target

                                    let newTexts = data.texts
                                    newTexts[i].size = value

                                    setData({
                                        ...data,
                                        texts: newTexts
                                    })
                                }}
                            />

                            <div className={data.texts[i].weight === 'bold' ? 'selected img-box' : 'img-box'}>
                                <Image 
                                    src={Bold} 
                                    width={18} 
                                    height={18} 
                                    onClick={() => {
                                        let newTexts = data.texts

                                        if(newTexts[i].weight === 'normal') {
                                            newTexts[i].weight = 'bold'
                                        } else {
                                            newTexts[i].weight = 'normal'
                                        }

                                        setData({
                                            ...data,
                                            texts: newTexts
                                        })
                                    }}
                                />
                            </div>

                            <div className="img-box">
                                <Image src={AlignLeft} width={18} height={18} />
                            </div>

                            <div className="img-box" onClick={() => {
                                let newTexts = data.texts

                                newTexts[i].posX = 50
                                newTexts[i].posY = 50

                                setData({
                                    ...data,
                                    texts: newTexts
                                })
                            }}>
                                <Image src={AlignCenter} width={18} height={18} />
                            </div>
                            
                            <div className="img-box">
                                <Image src={AlignRight} width={18} height={18} />
                            </div>

                            <input 
                                type="color" 
                                defaultValue={v.color}
                                onChange={(e) => {
                                    const { value } = e.target

                                    let newTexts = data.texts
                                    newTexts[i].color = value

                                    setData({
                                        ...data,
                                        texts: newTexts
                                    })
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </LayerWrap>
    )
}

export default Layer

const LayerWrap = styled.div`
    position: absolute;
    z-index: 9999;
    top: 0;
    right: 0;
    opacity: ${({ data }) => data.textControl ? '1' : '0'};
    visibility: ${({ data }) => data.textControl ? 'visible' : 'hidden'};
    width: ${({ data }) => data.textControl ? '250px' : '0'};
    height: ${({ data }) => data.textControl ? '100%' : '0'};
    transform: ${({ data }) => data.textControl ? 'translateX(0)' : 'translateX(-250px)'};
    background: #fff;
    box-shadow: var(--boxShadow);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    h3 {
        padding-left: 15px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        border-bottom: 1px solid var(--borderSubColor);
        margin-bottom: 20px;
    }

    input {
        width: 85%;
    }

    button.add {
        width: 85%;
    }

    .text-list {
        margin-top: 30px;
        width: 85%;
    }

    .text-item {
        width: 100%;
        margin-bottom: 15px;

        &:nth-last-child(1) { 
            margin-bottom: 0px;
        }

        & > div {
            width: 100%;
        }

        .text-label {
            text-align: left;
            font-size: 13px;
            font-weight: 600;

            input {
                width:80%;
            }

            button {
                width: 20%;
            }
        }

        .text-option {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;

            .selected {
                background: var(--borderSubColor);
            }

            input[type=number] {
                width: 50px;
                border: none;
            }
            input[type=color] {
                padding: 0px;
                width: 40px;
                height: 25px;
            }

            .img-box {
                padding: 4px;
                border: 1px solid var(--borderSubColor);
            }
        }
    }
`