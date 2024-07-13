class Guest {
    constructor(id_guest, guest_name, guest_lastname, gender, birth_date, contact_number, DNI_number, guest_adress, register_date, guest_rank, guest_details) {
        this.id_guest = id_guest;
        this.guest_name = guest_name;
        this.guest_lastname = guest_lastname;
        this.gender = gender;
        this.birth_date = birth_date;
        this.contact_number = contact_number;
        this.DNI_number = DNI_number;
        this.guest_adress = guest_adress;
        this.register_date = register_date;
        this.guest_rank = guest_rank;
        this.guest_details = guest_details;
    }
}

module.exports = { Guest };