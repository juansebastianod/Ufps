// src/models/HistoryModel.js

export class History {
    constructor(id, user_id, computer_id, room_id, floor_id, usage_date) {
        this.id = id;
        this.user_id = user_id;  // User ID who used the computer
        this.computer_id = computer_id;  // Computer ID that was used
        this.room_id = room_id;  // Room ID where the computer was
        this.floor_id = floor_id;  // Floor ID where the room is
        this.usage_date = usage_date;  // Date and time of computer usage
    }
}
