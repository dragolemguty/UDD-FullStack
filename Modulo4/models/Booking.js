class Booking {
    constructor(id_guest, id_booking, id_room_array, booking_date, arrival_date, departure_date, nights_qty, guests_qty, is_modified, is_paid, is_cancelled, last_update_datetime) {
        this.id_guest = id_guest;
        this.id_booking = id_booking;
        this.id_room_array = id_room_array;
        this.booking_date = booking_date;
        this.arrival_date = arrival_date;
        this.departure_date = departure_date;
        this.nights_qty = nights_qty;
        this.guests_qty = guests_qty;
        this.is_modified = is_modified;
        this.is_paid = is_paid;
        this.is_cancelled = is_cancelled;
        this.last_update_datetime = last_update_datetime;
    }
    set setModif(is_modified){
        this.is_modified = is_modified;
    }
    set setPaid(is_paid){
        this.is_paid = is_paid;
    }
    set setCancel(is_cancelled){
        this.is_cancelled = is_cancelled;
    }
    set setLastUpdate(last_update_datetime){
        this.last_update_datetime = last_update_datetime;
    }
}

module.exports = { Booking };