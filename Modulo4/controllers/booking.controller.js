const moment = require("moment");
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
        bookings.last_update_datetime[i]
    );
    bookingInstances.push(booking);
};

const create = (req, res) => {
    const id_guest = req.params.id_guest;
    const id_booking = Math.max(...bookingInstances.map(booking => booking.id_booking))+1
    const id_room_array = req.params.id_room_array;
    const booking_date = moment().format('YYYY-MM-DD');
    const arrival_date = moment(req.params.arrival_date).format('YYYY-MM-DD');
    const departure_date = moment(req.params.departure_date).format('YYYY-MM-DD');
    const nights_qty = departure_date.diff(arrival_date, 'days');
    const guests_qty = req.params.guests_qty;
    const is_modified = 0;
    const is_paid = 0;
    const is_cancelled = 0;
    const last_update_datetime = moment().format('YYYY-MM-DD  hh:mm:ss');

    const book = new Booking(id_guest,id_booking,id_room_array,booking_date,arrival_date,departure_date,nights_qty,guests_qty,is_modified,is_paid,is_cancelled,last_update_datetime);

    bookingInstances.push(book)
    res.send({ ok: true, description: 'Reserva generada correctamente' });
  };

const findToday = (req, res) => {
    let today = moment().format('YYYY-MM-DD');
    let matchingBookings = bookingInstances.filter(booking => booking.arrival_date === today).map(booking => booking.id_booking);
    res.send(matchingBookings);

}

const bookDetails =(req,res) => {
    let booking = bookingInstances.find(b => b.id_booking ===  req.params.id_booking);
    if (booking) {
        res.send(booking);
        
    }
    else{
        res.status(404).send({ ok: false, description: 'No encontré' });

    }
    
    
}
  


module.exports = { create, findToday, bookDetails };