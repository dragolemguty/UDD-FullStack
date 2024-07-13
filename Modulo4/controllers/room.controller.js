const { Room } = require('../models/Room');
const { rooms } = require("../databases/tables");

let roomInstances = [];

for (let i = 0; i < rooms.id_room.length; i++) {
    let room = new Room(
        rooms.id_room[i],
        rooms.hotel_name[i],
        rooms.floor_number[i],
        rooms.room_number[i],
        rooms.capacity[i],
        rooms.orientation[i],
        rooms.room_class[i],
        rooms.amenities[i]
    );
    roomInstances.push(room);
};

module.exports = { roomInstances };