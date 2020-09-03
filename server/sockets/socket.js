const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguenteTicket', (data, callback) => {

        let siguiente = ticketControl.siguente();

        //console.log(siguiente);
        callback(siguiente)

    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoticket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar / notificar cambios en los ultimos 4
        //emitir ultimos4



    });

    client.broadcast.emit('ultimos4', {
        ultimos4: ticketControl.getUltimos4()
    });

});