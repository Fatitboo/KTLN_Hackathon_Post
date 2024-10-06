import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './redux/store/store.js'
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
