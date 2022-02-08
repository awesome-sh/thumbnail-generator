import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Nav from '../components/Nav'
import { useSelector } from 'react-redux'
import { AppContext } from '../contexts/context'
import Layer from '../components/Layer'
import html2canvas from 'html2canvas'

import RotationIcon from '../public/assets/icons/rotation.png'

export default function Home() {
  const {data, setData} = useContext(AppContext)

  const printRef = useRef()

  const [resource, setResource] = useState(data)

  useEffect(() => {
    console.log(data)
    setResource(data)
  }, [data])

  const [clientSize, setClientSize] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const getClientSize = () => {
      console.log('>> Client Size Changed!')
      setClientSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', getClientSize)

    return () => window.removeEventListener('resize', getClientSize)
  }, [])

  console.log('>> Index Data :: ', data)

  const handleDrag = (e) => {
    
    console.log('>> 드래그 끝')

    const offsetX = e.target.offsetWidth
    const offsetY = e.target.offsetHeight

    console.group('>> Element Offset Check')
    console.log('- Offset X :: ', offsetX)
    console.log('- Offset Y :: ', offsetY)
    console.groupEnd()

    console.group('>> Client X, Y')
    console.log('- Client X :: ', e.clientX)
    console.log('- Client Y :: ', e.clientY)
    console.groupEnd()

    const x = ((e.clientX - offsetX) / window?.innerWidth) * 100
    const y = ((e.clientY - offsetY) / window?.innerHeight) * 100

    console.group('>> Top, Left Percentage X, Y')
    console.log('- X :: ', x)
    console.log('- Y :: ', y)
    console.groupEnd()

    e.target.style.left = `${x}%`
    e.target.style.top = `${y}%`
    e.preventDefault()
  }

  let onMouseMove;

  const handleMouseDown = (e) => {
    const { target } = e

    let shiftX = e.clientX - target.getBoundingClientRect().left;
    let shiftY = e.clientY - target.getBoundingClientRect().top;

    // 공을 pageX, pageY 좌표 중앙에 위치하게 합니다.
    function moveAt(pageX, pageY) {
      target.style.left = pageX - shiftX + 'px'
      target.style.top = pageY - shiftY + 'px'
    }

    // 포인터 아래로 공을 이동시킵니다.
    moveAt(e.pageX, e.pageY);

    onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    target.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      target.onmouseup = null;
    };
  }

  const handleDownloadImage = async () => {
    const $element = printRef.current
    const $canvas = await html2canvas($element)

    const data = $canvas.toDataURL('imgage/png')
    const link = document.createElement('a')

    if(typeof link.download === 'string') {
      link.href = data;
      link.download = 'thumbnail.png'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      window.open(data)
    }

  }

  return (
    <Wrap 
      clientSize={clientSize}
    >
      <Head>
        <title>Awesome Thumbnail Generator - Blog Post, Etc.</title>
        <meta name="description" content="Awesome Thumbnail Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav handleDownloadImage={handleDownloadImage} />

      <Main ref={printRef}>
        <Canvas 
          resource={resource}
        ></Canvas>
          { resource.texts.length > 0 && resource.texts.map((v, i) => 
              <div 
                key={i}
                onDragStart={(e) => e.preventDefault()}
                onMouseDown={handleMouseDown}
                className={`element text-${v}`}
                style={{
                  position: 'absolute',
                  cursor: 'default',
                  fontSize: `${v.size}px`,
                  fontWeight: `${v.weight}`,
                  fontFamily: `${v.fontFamily}`,
                  letterSpacing: `${v.spacing}px`,
                  color: v.color,
                  zIndex: v.zIndex,
                  left: v.posX === 0 ? '' : `50%`,
                }}
              >
                {v.text}
              </div>

            )
          }
      </Main>
      <Layer />
    </Wrap>
  )
}

export function getServerSideProps() {
  const data = {
    size: {
      width: 720,
      height: 480
    },
    backgroundType: 'color',
    background: '#ffffff',
    backgroundImg: '',
    gradient: {
      start: '#000000',
      end: '#ffffff',
      deg: 90
    },
    scale: 1,
    textControl: false,
    texts: []
  }

  return {
    props: {
      initialData: data,
    },
  };
}

const Wrap = styled.div`
  width: ${({ clientSize }) => clientSize.width === 0 ? '100vw' : `${clientSize.width}px`};
  height: ${({ clientSize }) => clientSize.height === 0 ? '100vh' : `${clientSize.height}px`};
  overflow: hidden;
  background: var(--backgroundColor);
`

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .element {
    position: absolute;
    width: fit-content;
    height: fit-content;
    padding: 10px;
    border: 2px dotted transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .rotate-icon {
      display: none;
      position: absolute;
      z-index:9999;
      top: -15px;
      right: -15px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 10px;
      font-weight: bold;
      background: #202020;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.281);
      border: 3px dotted rgba(32, 32, 32, 0.582);
    }

    &:hover .rotate-icon {
      display: flex;
    }


  }
`

const Canvas = styled.div`
  position: relative;
  z-index: 0;
  transform: ${({ resource }) => `scale(${resource.scale})`};
  background: ${({ resource }) => resource.backgroundType === 'color' ? `${resource.background}` : resource.backgroundType === 'gradient' ? `linear-gradient(${resource.gradient.deg}deg, ${resource.gradient.start}, ${resource.gradient.end})` : `url(${resource.backgroundImg}) fixed center`};
  width: ${({ resource }) => `${resource.size.width}px`};
  height: ${({ resource }) => `${resource.size.height}px`};
  box-shadow: var(--boxShadow);
  transition: var(--transition);
`