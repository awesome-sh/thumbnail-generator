import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../contexts/context'

function Layer() {
    const {data, setData} = useContext(AppContext)
    const [text, setText] = useState('')

    const handleAddText = (e) => {
        const textObject = {
            text: text,
            align: 'center',
            posX: 0,
            posY: 0,
            size: 18,
            color: '#eeeeee',
            zIndex: 0,
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
            <input type="text" name="text" onChange={(e) => setText(e.target.value)} placeholder='이곳에 텍스트를 입력하세요.' />
            <button className='btn add' onClick={handleAddText}>+ 텍스트 추가</button>

            <div className="text-list">
                { data.texts && data.texts.map((v, i) => 
                    <div className="text-item">
                        <div className="text-label">{v.text}</div>
                        <div className="text-option"></div>
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
        width: 90%;
    }

    button.add {
        width: 90%;
    }

    .text-list {
        margin-top: 30px;
        width: 90%;
    }

    .text-item {
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--borderSubColor);

        & > div {
            width: 50%;
        }

        .text-label {
            padding-left: 10px;
            text-align: left;
            font-size: 13px;
            font-weight: 600;
        }

        .text-option {

        }
    }
`