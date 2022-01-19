import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Nav from '../components/Nav'
import { useSelector } from 'react-redux'
import { AppContext } from '../contexts/context'
import Layer from '../components/Layer'

export default function Home() {
  const {data, setData} = useContext(AppContext)

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

  {/*}
  useEffect(() => {
    const getWheelPosition = (e) => {
      const { deltaY } = e
      let tempScale = data.scale

      if(deltaY > 0) {
        // Down
        setData({
          ...data,
          scale: tempScale - 0.05
        })
      } else {
        // Up
        setData({
          ...data,
          scale: tempScale + 0.05
        })
      }
    }

    window.addEventListener('wheel', getWheelPosition)

    return () => window.removeEventListener('wheel', getWheelPosition)
  }, [])
  */}

  return (
    <Wrap 
      clientSize={clientSize}
    >
      <Head>
        <title>Awesome Thumbnail Generator - Blog Post, Etc.</title>
        <meta name="description" content="Awesome Thumbnail Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main>
        <Canvas data={data} />
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
    gradient: {
      start: '#000000',
      end: '#ffffff'
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
`

const Canvas = styled.div`
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: ${({ data }) => `scale(${data.scale}) translate(-50%, -50%)`};
  background: ${({ data }) => data.backgroundType === 'color' ? `${data.background}` : `linear-gradient(${data.gradient.start}, ${data.gradient.end})`};
  width: ${({ data }) => `${data.size.width}px`};
  height: ${({ data }) => `${data.size.height}px`};
  box-shadow: var(--boxShadow);
  transition: var(--transition);
`