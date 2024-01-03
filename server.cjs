const { createServer: createViteServer } = require('vite')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { BrowserRouter: Router } = require('react-router-dom')
const { HelmetProvider } = require('react-helmet-async')
const App = require('./lib/bundle.cjs')

async function createServer() {
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  })
  return require('express')()
    .use(vite.middlewares)
    .use('*', async (req, res) => {
      const url = req.originalUrl

      let appHtml, helmetContext = {}
      try {
        const route = React.createElement(
          HelmetProvider,
          { context: helmetContext },
          React.createElement(
            Router,
            { location: url },
            React.createElement(App)
          )
        )
        appHtml = renderToString(route)
      } catch (error) {
        console.log(error)
        vite.ssrFixStacktrace(error)
        res.status(500).end(error.message)
        return
      }

      const { helmet } = helmetContext // Get helmet data
      const indexHtml = await vite.transformIndexHtml(url, (await vite.ssrLoadModule('/src/index.html')).default)

      const html = indexHtml
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--helmet-html-attributes-->`, helmet.htmlAttributes.toString())
        .replace(`<!--helmet-body-attributes-->`, helmet.bodyAttributes.toString())
        .replace(`<!--helmet-head-->`, `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    })
}

createServer().then(server => server.listen(3000))