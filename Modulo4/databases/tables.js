let rooms = {
    'id_room': [1,2,3,4,5],
    'hotel_name': ['Hotel Paraíso','Hotel Paraíso','Hotel Paraíso','Hotel Shoebill','Hotel Shoebill'],
    'floor_number': [1,2,3,2,3],
    'room_number': [101,201,301,201,301],
    'capacity': [2,3,4,3,5],
    'orientation': ['P','O','S','N','NO'],
    'room_class': ['Simple','Doble','Suit Familiar','Suit Deluxe','Suit Presidencial'],
    'amenities': ['1 cama','2 camas, AC','3 camas','3 camas', '4 camas']
};

let guests = {    
    'id_guest': [1,2,3],
    'guest_name': ['JuanJo','Daniela','Constanza'],
    'guest_lastname': ['Gutierrez','Lopez','Ferreyra'],
    'gender': ['M','F','NB'],
    'birth_date': ['1995-10-27','1991-10-24','2003-04-21'],
    'contact_number': [null,null,null],
    'DNI_number': [null,null,null],
    'guest_adress': [null,null,null],
    'register_date': ['2024-07-12','2024-07-12','2024-07-12'],
    'guest_rank': ['Standard','VIP','Aspiracional'],
    'guest_details': [null,null,null]    
};

let guest_ranks ={
    'guest_ranks':['Standard','Premium','VIP','Aspiracional','Multado'],
    'descuentos':[0,0.2,0.35,0.1,1.1],
    'beneficios':[null,'breakfast,pool','breakfast,pool,helicopter','breakfast',null]
};

let bookings ={
    'id_guest':[1,1,2,1,3,1],
    'id_booking':[12345,2,3,4,5,6],
    'id_room_array':[[3,5],[5],[2],[1],[2],[4,5]],
    'booking_date':['2024-07-12','2024-07-12','2024-07-12','2024-07-12','2024-07-12','2024-07-12'],
    'arrival_date':['2024-07-14','2024-08-14','2024-08-24','2024-08-29','2024-12-23','2024-12-27'],
    'departure_date':['2024-07-15','2024-08-17','2024-08-26','2024-08-30','2024-12-28','2024-12-29'],
    'nights_qty':[1,3,2,1,4,2],
    'guests_qty':[4,2,2,1,2,5],
    'is_modified':[0,0,0,0,0,0],
    'is_paid':[1,1,0,1,0,0],
    'is_cancelled':[0,0,0,0,0,0],
    'last_update_datetime':['2024-07-12 00:00:00','2024-07-12 00:00:00','2024-07-12 00:00:00','2024-07-12 00:00:00','2024-07-12 00:00:00','2024-07-12 00:00:00']
};

let guest_events ={
    'id_booking':[],
    'id_event':[],
    'event_date':[],
    'is_type_room_change':[],
    'is_qty_guest_change':[],
    'is_qty_room_change':[],
    'is_dates_change':[],
    'new_type_room':[],
    'deleted_rooms':[],
    'adds_rooms':[],
    'new_arrival_date':[],
    'new_departure_date':[],
    'new_guests_qty':[],
    'new_nights_qty':[]
};


module.exports = { rooms, guests, guest_ranks, bookings , guest_events };