export class ComputerUsageHistory {
    constructor(id, user_id, computer_id, room_id, start_time, end_time) {
        this.id = id;
        this.user_id = user_id;
        this.computer_id = computer_id;
        this.room_id = room_id;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}