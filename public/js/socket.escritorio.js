//Comando para establecer la conexion 
var socket = io();

//Para obtener los parametros que llegan por el Url
var searchParams = new URLSearchParams(window.location.search);

//has para preguntar si existe el escritorio. si no existe me salgo de la pantalla
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

//si viene un escritorio
var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);



$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket' + resp.numero);
    });



});