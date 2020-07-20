// primeiro é necessário importar as dependências
var http = require('http');
var express = require('express');
var piblaster = require('pi-blaster.js');

// Chame o express para criar um servidor de aplicações como objeto
var app = express();
//podia ser: var app = require('express')(); e não precisaria das linhas 3 e 7
//const server = http.createServer(app);

// Em seguida, configure o express para servir o arquivo index.html e quaisquer outras páginas estáticas 
// armazenadas no seu diretório inicial

app.use(express.static(__dirname));

app.get("/", function(req, res) { // quando o usuário enviar uma requisição para o diretório root do app, enviaremos uma resposta
    res.sendfile("index.html");
});

// Use a função GET para abrir e fechar a caixa. 
app.get('/lock.html', function(req, res) { // ao acessar pelo web client, irá fechar
    piblaster.setPwm(22, 0.14); //passa o valor do duty cycle pro servo através do pino 22
    res.end('O dispensador está fechado');
});

app.get('/unlock.html', function(req, res) { // ao acessar pelo web client, irá abrir
    piblaster.setPwm(22, 0.1);
    res.end('O dispensador está aberto');
});

// reportar os erros
app.get('*', function(req, res) {
    res.status(404).send('Chamada API não reconhecida');
});

app.use(function(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send('Algo deu errado!');
    } else {
        next(err);
    }
});
//para parar a execução use o comando CTRL+C 
process.on('SIGINT', function() {
    var i;
    console.log("\n Saindo do Aplicativo (Ctrl+C)");
    process.exit();
});
//código responsável pela leitura do LDR
const SerialPort = require("serialport");
const ReadLine = require("@serialport/parser-readline");

//2° passo: definir a porta serial
const porta = new SerialPort("/dev/ttyACM0", { baudRate: 9600 });

//3° passo definir o ReadLine parser... Definir o serial port parser
const Parser = new ReadLine();
porta.pipe(Parser);

//4°passo: Ler os dados da porta serial
Parser.on('data', function(dados) {
    console.log(dados);
});

// tornar o servidor acessível na porta 3000
app.listen(3000);
console.log('O servidor está rodando na porta 3000');

// chama o arquivo no terminal: AppServo.js e vê se funciona, se funcionar 
// vai no browser, aí será necessário saber o IP do rasp.
// Suponha que o IP do rasp seja: 192.168.0.11
// nesse caso, você poderia controlar o servo acessando
// ex: http://192.168.0.11:3000/lock       (é só um exemplo kkkk tenta descobrir e substituit)
// ex: http://192.168.0.11:3000/unlock
// ex: http: IP//lock
// ex: http: IP//unlock

// caso esse código rode, a gente pode adicionar um arquivo html e linkar 
// os endereços acima,  criar dois botões ou algo do tipo. Eu n fiz isso 
// pq n sei se vai funcionar.