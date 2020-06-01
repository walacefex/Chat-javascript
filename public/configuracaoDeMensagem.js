let socket = io('http://localhost:3000');
/*Renderizando a mensagem para o front*/
function renderizarMensagem(message){
    $('.messages').append(`
    <div class="message"><strong>${message.autor}</strong>: ${message.message}</div>`
    );
}

socket.on('armazendoMensagens', function(messages){
    for (message of messages) {
        renderizarMensagem(message)
    }
});

/*Recebendo a função do broadcast com emit para enviar para todos os que e*/ 
socket.on('recebendoMenssagem', function(message){
    renderizarMensagem(message);
})

$('#chat').submit(function(event) {
    event.preventDefault();

    let autor = $('input[name=username]').val();
    let message = $('input[name=message]').val();
    
    if(autor.length && message.length){
        let messageObject = {
            autor: autor,
            message: message
        };
        renderizarMensagem(messageObject)
        socket.emit('sendMessage', messageObject);
    }

})
