import { renderToString } from 'react-dom/server'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

export async function render(url) {
  const router = (
    <Router location={url}>
      <App />
    </Router>
  )
  return renderToString(router)
}