export class Computadora {
    constructor(id, nombre, sala_id, estado = true) {
        this.id = id;
        this.nombre = nombre;
        this.sala_id = sala_id;
        this.estado = estado;
    }
}
