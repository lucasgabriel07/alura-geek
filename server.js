const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = 3000

server.use(middlewares)

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/products/:category': '/products?category=:category',
    '/products/:category/:limit': '/products?category=:category&_limit=:limit'
}))

server.use(router)
server.listen(port)