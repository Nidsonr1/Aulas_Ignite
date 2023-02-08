import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if(method === 'GET' && url === '/users') {
    return res  
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users));
  }

  if(method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: "JohDoe",
      email: "Johdoe@example.com"
    }); 
    return res.writeHead(201).end('Usuário cadastrado com sucesso');
  }

  return res.writeHead(404).end()
});

server.listen(3333);

