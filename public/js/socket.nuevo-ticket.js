//Comando para establecer la conexion 
var socket = io();

//Usando jquery buscamos el id donde queremos mostrar el siguente ticket
var label = $('#lblNuevoTicket');

// =====================================
//  On conect y On disconect
// =====================================
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});
//======================================

//Recibe el primer reset
socket.on('estadoActual', function(estado) {
    label.text(estado.actual);
});

//jquery Todos los botones al hacer click  en esta pantalla va a disparar esta funcion
$('button').on('click', function() {

    socket.emit('siguenteTicket', null, function(siguenteTicket) {

        label.text(siguenteTicket);
    });

});