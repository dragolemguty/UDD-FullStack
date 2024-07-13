const { GuestEvent } = requiere('../models/GuestEvent')

let guestEventInstances = [];

for (let i = 0; i < guest_events.id_booking.length; i++) {
    let guestEvent = new GuestEvent(
        guest_events.id_booking[i],
        guest_events.id_event[i],
        guest_events.event_date[i],
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
