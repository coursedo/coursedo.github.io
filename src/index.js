import { ConfigProvider } from 'antd'
import viVN from 'antd/es/locale/vi_VN'
import GlobalModal, { ModalProvider } from 'components/GlobalModal'
import { persistor, store } from 'core/store'
import React from 'react'
import ReactDOM from 'react-dom'
import { IconContext } from 'react-icons'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={viVN}>
        <PersistGate loading={null} persistor={persistor}>
          <IconContext.Provider
            value={{
              className: 'react-icon-clasname',
              style: { verticalAlign: 'middle' }
            }}
          >
            <App />
            <GlobalModal />
          </IconContext.Provider>
        </PersistGate>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
