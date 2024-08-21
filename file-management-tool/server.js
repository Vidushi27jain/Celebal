const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const requestHandler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST' && pathname === '/create') {
        const filePath = path.join(__dirname, query.filename);
        fs.writeFile(filePath, query.content || '', (err) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Error creating file', error: err.message }));
            } else {
                res.writeHead(201);
                res.end(JSON.stringify({ message: 'File created successfully' }));
            }
        });
    } else if (req.method === 'GET' && pathname === '/read') {
        const filePath = path.join(__dirname, query.filename);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'File not found', error: err.message }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify({ content: data }));
            }
        });
    } else if (req.method === 'DELETE' && pathname === '/delete') {
        const filePath = path.join(__dirname, query.filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'File not found', error: err.message }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'File deleted successfully' }));
            }
        });
    } else {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid request' }));
    }
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
