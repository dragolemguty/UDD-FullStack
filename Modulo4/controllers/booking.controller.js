const { Booking } = requiere('../models/Booking')

let bookingInstances = [];

for (let i = 0; i < bookings.id_guest.length; i++) {
    let booking = new Booking(
        bookings.id_guest[i],
        bookings.id_booking[i],
        bookings.id_room_array[i],
        bookings.booking_date[i],
        bookings.arrival_date[i],
        bookings.departure_date[i],
        bookings.nights_qty[i],
        bookings.guests_qty[i],
        bookings.is_modified[i],
        bookings.is_paid[i],
        bookings.is_cancelled[i],
        bookings.last_update_date[i]
    );
    bookingInstances.push(booking);
}
