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
            fontFamily: '',
            spacing: 0
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
                autoComplete="off"
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
                                autoComplete="off"
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
                                newTexts = newTexts.filter(item => item.id !== v.id && item.text !== v.text)

                                setData({
                                    ...data,
                                    texts: newTexts
                                })
                            }}>삭제</button>
                        </div>

                        <div className="text-option">
                            <span className="label">크기</span>
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

                            <span className="label">자간</span>
                            <input 
                                type="number" 
                                step={0.1}
                                defaultValue={v.spacing}
                                onChange={(e) => {
                                    const { value } = e.target

                                    let newTexts = data.texts
                                    newTexts[i].spacing = value

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

                        </div>

                        <div className="text-option">
                            <span className="label">색상</span>
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
                            
                            <span className="label">글꼴</span>
                            <select 
                                onChange={(e) => {
                                    const { value } = e.target

                                    let newTexts = data.texts
                                    newTexts[i].fontFamily = value

                                    setData({
                                        ...data,
                                        texts: newTexts
                                    })
                                }}
                                defaultValue={'Pretendard-ExtraLight'}
                            >
                                <option value='Pretendard-ExtraLight'>Pretendard (Default)</option>
                                <option value='Raleway'>Raleway</option>
                                <option value='paybooc-Bold'>페이북</option>
                                <option value='GowunBatang-Regular'>고운바탕 Regular</option>
                                <option value='InkLipquid'>잉크립퀴드체</option>
                                <option value='GongGothicMedium'>이사만루</option>
                                <option value='Vitro_core'>비트로 코어체</option>
                                <option value='Y_Spotlight'>Y 너만을 비춤체</option>
                                <option value='Cafe24Ssurround'>카페24 써라운드</option>
                                <option value='SBAggroB'>어그로체B</option>
                                <option value='GangwonEdu_OTFBoldA'>강원교육모두체 Bold</option>
                                <option value='SANJUGotgam'>상주곶감체</option>
                            </select>
                        </div>

                        <div className="text-option">
                            <span className="label">Z 속성</span>
                            <input 
                                type="number" 
                                defaultValue={v.zIndex}
                                onChange={(e) => {
                                    const { value } = e.target

                                    let newTexts = data.texts
                                    newTexts[i].zIndex = value

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
    width: ${({ data }) => data.textControl ? '280px' : '0'};
    height: ${({ data }) => data.textControl ? '100%' : '0'};
    transform: ${({ data }) => data.textControl ? 'translateX(0)' : 'translateX(-250px)'};
    background: rgba(255, 255, 255, 0.959);
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
        border: 1px solid #eee;
        border-top: none;

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
            display: flex;
            align-items: center;

            input {
                width:80%;
                height: 35px;
                border-right: 0px;
            }

            button {
                border: none;
                width: 20%;
                height: 35px;
                color: #fff;
                background: #e04747;
                transition: all 0.2s ease-out;

                &:hover {
                    background: #c43232;
                }
            }
        }

        .text-option {
            margin-top: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;

            .label {
                padding: 4px 6px;
                background: var(--borderSubColor);
                border-radius: 5px;
            }

            .selected {
                background: var(--borderSubColor);
            }


            input[type=number] {
                margin-left: 5px;
                padding-left: 3px;
                width: 50px;
                height: 35px;
            }
            input[type=color] {
                padding: 0px;
                width: 35px;
                height: 35px;
                margin-left: 4px;
                margin-right: 6px;
            }

            input[type=number] {
                border: none;
                border-bottom: 2px solid #fff;

                &:focus {
                    border-bottom: 2px solid var(--primary);
                }
            }

            select {
                width: 100px;
                font-size: 12px;
                border: none;
                border-bottom: 2px solid #fff;

                &:focus {
                    border-bottom: 2px solid var(--primary);
                }
            }

            .img-box {
                margin-left: 5px;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid var(--borderSubColor);
                transition: all 0.2s ease-out;

                &:hover {
                    background: var(--borderSubColor);
                }
            }
        }
    }
`