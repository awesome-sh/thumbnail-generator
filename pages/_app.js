import '../styles/globals.css'
import { createWrapper } from 'next-redux-wrapper'
import { createStore } from 'redux'
import defaultStore from '../store'
import { AppProvider } from '../contexts/context'

const store = () => createStore(defaultStore)
const wrapper = createWrapper(store, { debug: true })

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider initialData={pageProps?.initialData}>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default wrapper.withRedux(MyApp)