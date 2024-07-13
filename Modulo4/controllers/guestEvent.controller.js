const { GuestEvent } = require('../models/GuestEvent');
const { guest_events } = require("../databases/tables");
const moment = require("moment");

let guestEventInstances = [];

for (let i = 0; i < guest_events.id_booking.length; i++) {
    let guestEvent = new GuestEvent(
        guest_events.id_booking[i],
        guest_events.id_event[i],
        guest_events.event_datetime[i],
        guest_events.is_type_room_change[i],
        guest_events.is_qty_guest_change[i],
        guest_events.is_qty_room_change[i],
        guest_events.is_dates_change[i],
        guest_events.new_type_room[i],
        guest_events.deleted_rooms[i],
        guest_events.adds_rooms[i],
        guest_events.new_arrival_date[i],
        guest_events.new_departure_date[i],
        guest_events.new_guests_qty[i],
        guest_events.new_nights_qty[i]
    );
    guestEventInstances.push(guestEvent);
};

const createEvent = (req, res) => {
    const id_booking = req.body.id;
    const maxIdEvent = guestEventInstances.length > 0 ? Math.max(...guestEventInstances.map(event => event.id_event)) : 0;
    const id_event = maxIdEvent + 1;
    const event_datetime = moment().format('YYYY-MM-DD  hh:mm:ss');
    const is_type_room_change = req.body.is_type_room_change;
    const is_qty_guest_change = req.body.is_qty_guest_change;
    const is_qty_room_change = req.body.is_qty_room_change;
    const is_dates_change = req.body.is_dates_change;
    const new_type_room = req.body.new_type_room;
    const deleted_rooms = req.body.deleted_rooms;
    const adds_rooms = req.body.adds_rooms;
    const new_arrival_date = req.body.new_arrival_date;
    const new_departure_date = req.body.new_departure_date;
    const new_guests_qty = req.body.new_guests_qty;
    const new_nights_qty = req.body.new_nights_qty;

    const event = new GuestEvent(id_booking,id_event,event_datetime,is_type_room_change,is_qty_guest_change,is_qty_room_change,is_dates_change,new_type_room,deleted_rooms,adds_rooms,new_arrival_date,new_departure_date,new_guests_qty,new_nights_qty);

    guestEventInstances.push(event)
    console.log(guestEventInstances)
    res.send({ ok: true, description: 'Evento generado correctamente' });
  };

module.exports = { createEvent };