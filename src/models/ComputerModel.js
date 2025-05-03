// src/models/ComputerModel.js

export class Computer {
    constructor(id, number, room_id, status) {
        this.id = id;
        this.number = number;  // Computer number
        this.room_id = room_id;  // Room ID where the computer is located
        this.status = status;  // Status of the computer (if it is available or not)
    }
}
