//conexão de sockets
const socket = io();

socket.on('ldr', function(data) {
    console.log(data);
    let ldr = document.getElementById('LDR');
    var x = data;
    if (x >= 500) {
        ldr.innerHTML = `Ração Em Falta`;
    }
    if (x < 500) {
        ldr.innerHTML = `Nível de Ração: OK!`;
    }

});