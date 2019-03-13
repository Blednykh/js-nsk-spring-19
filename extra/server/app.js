const fs = require('fs');
const express = require('express');

let userName = 'User';

let userSpeed = 0;
const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.post('/', jsonParser, (request, response) => {
  console.log(request.body);
  if (!request.body) { return response.sendStatus(400); }
  console.log(request.body);
  userName = request.body.userName;
  userSpeed = request.body.userSpeed;


  fs.readFile('info.json', (err, buffer) => {
    const data = JSON.parse(buffer.toString());

    data.userName.push(userName);
    data.userSpeed.push(userSpeed);
    console.log(data);

    fs.writeFileSync('info.json', JSON.stringify(data));
    response.json(data);
  });
});

app.get('/', (request, response) => {
  fs.readFile('info.json', (err, buffer) => {
    const data = JSON.parse(buffer.toString());

    response.json(data);
  });
});

app.listen(3000);
