
const { Guest } = require('../models/Guest');
const { guests } = require("../databases/tables");

let guestInstances = [];

for (let i = 0; i < guests.id_guest.length; i++) {
    let guest = new Guest(
        guests.id_guest[i],
        guests.guest_name[i],
        guests.guest_lastname[i],
        guests.gender[i],
        guests.birth_date[i],
        guests.contact_number[i],
        guests.DNI_number[i],
        guests.guest_adress[i],
        guests.register_date[i],
        guests.guest_rank[i],
        guests.guest_details[i]
    );
    guestInstances.push(guest);
};