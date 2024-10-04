// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
createRoot(document.getElementById('root')!).render(
  
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
)
