import jsonServer from 'json-server';
import auth from 'json-server-auth';
import path from 'path';
import fs from 'fs';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.db = router.db;

server.use(middlewares);

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/products': '/664/products/',
    '/products/:id': '/664/products/:id',
    '/products/upload-file': '/660/products/upload-file',
    '/users': '/400/users',
    '/users/:id': '/640/users/:id',
}));

server.use(auth);

server.post('/products/upload-file', (req, res) => {
    const { file, productId } = req.body;
    const type = file.substring("data:image/".length, file.indexOf(";base64"))
    const newPath = `assets/images/produto-${productId}.${type}`;

    let data = null;

    if (type === 'png') {
        data = file.replace(/^data:image\/png;base64,/, "");
    } else if (type === 'jpg') {
        data = file.replace(/^data:image\/jpg;base64,/, "");
    } else if (type === 'jpeg') {
        data = file.replace(/^data:image\/jpeg;base64,/, "");
    }

    if (data) {
        fs.writeFile(`public/${newPath}`, data, 'base64', (err) => {
            console.log(err);
        });
    }

    res.send(newPath);
});

server.get('/login', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/login.html'));
});

server.get('/produtos', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/produtos.html'));
});

server.get('/produto', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/produto.html'));
});

server.get('/admin', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/admin.html'));
});

server.get('/novo-produto', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/novo-produto.html'));
});

server.get('/editar-produto', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/public/editar-produto.html'));
});

server.use(router);

server.listen(port, () => {
    console.log(`🚀 Server running on PORT ${port}`);
});