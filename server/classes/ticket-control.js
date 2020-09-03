const fs = require('fs');

//Clase para manejar los tikes que no han sido antendidos
class Ticket {

    //numero de tickete y escritorio que va atender ese numero
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        //Este arreglo va contener todos los tickets pendientes por ser atendidos
        this.tickets = [];
        this.ultimos4 = [];

        //Para leer el archivo json, se puede hacer directamente asi:
        let data = require('../data/data.json');

        //Para reiniciar cada dia
        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarConteo();
        }

    }

    //lleva el conteo desde el ultimo ticket
    siguente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;

    }

    getUltimoticket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    //====== Atender ticket ==============
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        //Para obtener el numero del primer ticket pendiente
        let numeroTicket = this.tickets[0].numero;
        //eliminamos el primer elemto del arreglo
        this.tickets.shift();
        //ticket listo para ser atendido
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //ponemos el ticket al inicio del arreglo usando "unshift"
        this.ultimos4.unshift(atenderTicket);

        //Si hay mas de 4 tenemos que ir borrando los que ya van saliendo 5,6,..
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemnto
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        //grabamos en esto en la bd en este caso el archivo json
        this.grabarArchivo();

        //retornamos el ticket que tengo que atender
        return atenderTicket;

    }

    //======== Actualizar json =====================
    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        //lo convierto en string
        let jsonDataString = JSON.stringify(jsonData);

        //Lo guardo en el archivo data.json
        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }

}

module.exports = {
    TicketControl
}