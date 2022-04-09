import jsonServer from 'json-server';
import auth from 'json-server-auth';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000

server.db = router.db

server.use(middlewares);

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/products': '/664/products/',
    '/products/:id': '/664/products/:id',
    '/users': '/400/users',
    '/users/:id': '/640/users/:id',
}))

server.use(auth);

server.get('/login', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/login.html'));
});

server.get('/produtos', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/produtos.html'));
});

server.get('/produto', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/produto.html'))
});

server.get('/admin', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/admin.html'))
});

server.get('/novo-produto', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/novo-produto.html'))
});

server.use(router);

server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
})