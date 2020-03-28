import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { createStore , applyMiddleware} from "redux";
import rootReducer from "./reducers";
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import './index.css'


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
const store = createStoreWithMiddleware(
  rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider
  store={store}
>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
