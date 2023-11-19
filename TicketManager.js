class Evento {
    static contadorEventos = 0;
    static precioBaseDeGanancia = 0.15;

    constructor({ nombre, localidad, precio = 50, capacidad = 50, fecha = Date.now, participantes = [] }) {
        this.nombre = nombre;
        this.localidad = localidad;
        this.precio = precio * (1 + Evento.precioBaseDeGanancia); 
        this.capacidad = capacidad;
        this.fecha = fecha;
        this.participantes = participantes;
        this.id = ++Evento.contadorEventos;
    }
}

class TicketManager {
    constructor() {
        this.eventos = [];
    }

    getEventos = () => {
        return this.eventos;
    };

    addEvento = (nombre, localidad, precio, capacidad, fecha = Date.now) => {
        const evento = new Evento({ nombre, localidad, precio, capacidad, fecha }); 

        this.eventos.push(evento);
        return evento.id; 
    };

    addUsuario = (idEvento, idUsuario) => {

        const evento = this.eventos.find((evento) => evento.id === idEvento);
        if (!evento) {
            console.log("El evento no existe!");
            return;
        }

        const usuarioYaEstaEnEvento = evento.participantes.includes(idUsuario);
        if (usuarioYaEstaEnEvento) {
            console.log("El usuario ya se encuentra en ese evento!");
            return;
        }
        evento.participantes.push(idUsuario);
    };

    setEventoEnGira = (idEvento, localidad, fecha = Date.now) => {

        const evento = this.eventos.find((evento) => evento.id === idEvento);
        if (!evento) {
            console.log("El evento no existe!");
            return;
        }

        const newEventoEnGira = new Evento({ ...evento, localidad, fecha });
        this.eventos.push(newEventoEnGira);

        return evento.id; 
    };
}


const ticketManager = new TicketManager();


const evento1 = ticketManager.addEvento("treking de montaña", "los gigantes", 25.000, 50, "2021-10-10");
const evento2 = ticketManager.addEvento("paseo a caballo", "calamuchita", 10.000, 50, "2021-11-10");
const evento3 = ticketManager.addEvento("escala de montaña", "cueva de los pajaritos", 20.000, 50, "2021-12-10");


ticketManager.addUsuario(evento1, "Agus");
ticketManager.addUsuario(evento1, "Facu");
ticketManager.addUsuario(evento2, "Jose");
ticketManager.addUsuario(evento2, "Tony");
ticketManager.addUsuario(evento3, "Orion");


const evento4 = ticketManager.setEventoEnGira(evento1, "los gigantes", "2021-10-11");

ticketManager.addUsuario(evento4, "Agus");

console.log(ticketManager.getEventos());