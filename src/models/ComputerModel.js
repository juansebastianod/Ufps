// src/models/ComputerModel.js

export class Computer {
    constructor(id, number, room_id, status) {
        this.id = id;
        this.number = number;
        this.room_id = room_id;
        this.status = status; // true = disponible, false = en uso
    }
}
