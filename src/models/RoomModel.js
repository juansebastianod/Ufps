// src/models/RoomModel.js

export class Room {
    constructor(id, name, status, floor_id) {
        this.id = id;
        this.name = name;
        this.status = status;  // Status of the room (if it is available or not)
        this.floor_id = floor_id; // Floor ID where the room is located
    }
}
