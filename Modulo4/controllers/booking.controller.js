const moment = require("moment");
const { Booking } = require('../models/Booking')
const { createEvent } = require("./guestEvent.controller");
const { roomInstances } = require("./room.controller");
const { bookings } = require("../databases/tables");


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

const createBooking = (req, res) => {
    const id_guest = parseInt(req.body.id_guest);
    const id_booking = Math.max(...bookingInstances.map(booking => booking.id_booking))+1
    const id_room_array = req.body.id_room_array;
    const booking_date = moment().format('YYYY-MM-DD');
    const arrival_date = moment(req.body.arrival_date).format('YYYY-MM-DD');
    const departure_date = moment(req.body.departure_date).format('YYYY-MM-DD');
    const nights_qty = moment(req.body.departure_date).diff(moment(req.body.arrival_date), 'days');
    const guests_qty = req.body.guests_qty;
    const is_modified = 0;
    const is_paid = 0;
    const is_cancelled = 0;
    const last_update_datetime = moment().format('YYYY-MM-DD  hh:mm:ss');

    const book = new Booking(id_guest,id_booking,id_room_array,booking_date,arrival_date,departure_date,nights_qty,guests_qty,is_modified,is_paid,is_cancelled,last_update_datetime);
    console.log(book)
    bookingInstances.push(book)
    res.send({ ok: true, description: 'Reserva generada correctamente' });
  };

const findToday = (req, res) => {
    let today = moment().format('YYYY-MM-DD');
    let matchingBookings = bookingInstances.filter(booking => booking.arrival_date === today).map(booking => booking.id_booking);
    if (matchingBookings.length > 0) {
        res.send(matchingBookings);     
    }
    else{
        res.status(404).send({ ok: false, description: 'No se encontraron reservas para hoy' });
    }   

}

const bookDetails =(req,res) => {
    
    let booking = bookingInstances.find(b => b.id_booking ===  parseInt(req.params.id));
    if (booking) {
        res.send(booking);        
    }
    else{
        res.status(404).send({ ok: false, description: 'No se encontró ID de reserva' });
    }    
}

const updateRoom =(req,res) => {
    let booking = bookingInstances.find(b => b.id_booking ===  parseInt(req.body.id));
    if (booking) {
        booking.is_modified=1;     
        res.send(createEvent(req,res));        
    }
    else{
        res.status(404).send({ ok: false, description: 'No se encontró ID de reserva para actualizar datos' });
    }    
}

const deleteBook =(req,res) => {
    let booking = bookingInstances.find(b => b.id_booking ===  parseInt(req.params.id));
    if (booking) {
        booking.is_cancelled=1;
        console.log(booking)
        res.send({ ok: true, description: 'Reserva cancelada correctamente' }); 
    }
    else{
        res.status(404).send({ ok: false, description: 'No se encontró ID de reserva a eliminar' });
    }    
}

const hotelFilter=(req,res) =>{
    const hotel = req.query.hotel;
    const today = moment().format('YYYY-MM-DD');
    const futureDate = moment().add(30, 'days').format('YYYY-MM-DD');
    
    const hotelRooms = roomInstances.filter(room => room.hotel_name === hotel).map(room => room.id_room);

    const filteredBookings = bookingInstances.filter(booking => {
        return booking.id_room_array.some(id => hotelRooms.includes(id)) && moment(booking.arrival_date).isBetween(today, futureDate, 'day', '[]');
    });

    if (filteredBookings.length > 0) {
        res.send(filteredBookings);
    } else {
        res.status(404).send({ ok: false, description: `No se encontraron reservas para el ${hotel} en los próximos 30 días` });
    }

}

const datesFilter =(req,res) => {
    const { fecha_inicio, fecha_fin } = req.query;
    const filteredReservas = bookingInstances.filter(reserva => {
        return reserva.arrival_date >= fecha_inicio && reserva.departure_date <= fecha_fin;
    });

    if (filteredReservas.length > 0) {
        res.send(filteredReservas);
    } else {
        res.status(404).send({ ok: false, description: 'No se encontraron reservas en el rango de fechas proporcionado' });
    }
};

const roomClassFilter=(req,res) =>{
    const room_class = req.query.tipo_habitacion;
    const today = moment().format('YYYY-MM-DD');
    const futureDate = moment().add(30, 'days').format('YYYY-MM-DD');
    
    const hotelRooms = roomInstances.filter(room => room.room_class === room_class).map(room => room.id_room);

    const filteredBookings = bookingInstances.filter(booking => {
        return booking.id_room_array.some(id => hotelRooms.includes(id)) && moment(booking.arrival_date).isBetween(today, futureDate, 'day', '[]');
    });

    if (filteredBookings.length > 0) {
        res.send(filteredBookings);
    } else {
        res.status(404).send({ ok: false, description: `No se encontraron reservas asociadas a la clase ${room_class} en los próximos 30 días` });
    }

}

const paidStatus =(req,res) => {
    const { estado } = req.query;
    let booking = bookingInstances.filter(booking => booking.is_paid === parseInt(estado))
    if (booking) {
        res.send(booking);      
    }
    else{
        res.status(404).send({ ok: false, description: 'No se encontró reservas con ese estado de pago' });
    }    
}

const qtySearch =(req,res) => {
    const { num_huespedes } = req.query;
    let booking = bookingInstances.find(b => b.guests_qty >=  parseInt(num_huespedes));
    if (booking) {
        res.send(booking);        
    }
    else{
        res.status(404).send({ ok: false, description: `No se encontraron reservas con al menos ${parseInt(num_huespedes)} huespedes` });
    }    
}
  


module.exports = { createBooking, findToday, bookDetails, updateRoom , deleteBook , hotelFilter , datesFilter , roomClassFilter , paidStatus , qtySearch };