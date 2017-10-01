import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './components/app'
import rootReducer from './reducers/root_reducer'

var store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const target = document.querySelector("#app")
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, target)
