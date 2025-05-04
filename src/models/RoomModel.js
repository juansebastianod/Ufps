// src/models/RoomModel.js

export class Room {
    constructor(id, building_name, floor_number, room_number, laptop_count, status) {
        this.id = id;
        this.building_name = building_name;
        this.floor_number = floor_number;
        this.room_number = room_number;
        this.laptop_count = laptop_count;
        this.status = status; // true = disponible, false = ocupada
    }
}
