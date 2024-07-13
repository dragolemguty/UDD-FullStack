class GuestEvent {
    constructor(id_booking, id_event, event_datetime, is_type_room_change, is_qty_guest_change, is_qty_room_change, is_dates_change, new_type_room, deleted_rooms, adds_rooms, new_arrival_date, new_departure_date, new_guests_qty, new_nights_qty) {
        this.id_booking = id_booking;
        this.id_event = id_event;
        this.event_datetime = event_datetime;
        this.is_type_room_change = is_type_room_change;
        this.is_qty_guest_change = is_qty_guest_change;
        this.is_qty_room_change = is_qty_room_change;
        this.is_dates_change = is_dates_change;
        this.new_type_room = new_type_room;
        this.deleted_rooms = deleted_rooms;
        this.adds_rooms = adds_rooms;
        this.new_arrival_date = new_arrival_date;
        this.new_departure_date = new_departure_date;
        this.new_guests_qty = new_guests_qty;
        this.new_nights_qty = new_nights_qty;
    }
}

module.exports= { GuestEvent }