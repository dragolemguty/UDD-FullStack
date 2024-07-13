class Room {
    constructor(id_room, hotel_name, floor_number, room_number, capacity, orientation, room_class, amenities) {
        this.id_room = id_room;
        this.hotel_name = hotel_name;
        this.floor_number = floor_number;
        this.room_number = room_number;
        this.capacity = capacity;
        this.orientation = orientation;
        this.room_class = room_class;
        this.amenities = amenities;
    }
}

module.exports = { Room };