const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let messages = [];

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>{
    res.render('index.html');
});

io.on('connection', socket =>{
console.log(`Socket Conectado: ${socket.id}`)

    /*Garantindo que quando houver um reload na pagina não perder as mensagem enviadas, então ele envia todas mensagens para o array chamado messages*/
    socket.emit('armazendoMensagens', messages)


    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('recebendoMenssagem', data);
    });
});

server.listen(3000);