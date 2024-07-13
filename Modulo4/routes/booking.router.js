const express = require("express");
const router = express.Router();

const { createBooking, findToday, bookDetails, updateRoom , deleteBook , 
    hotelFilter , datesFilter , roomClassFilter , paidStatus , qtySearch } = require("../controllers/booking.controller");

const handleQueryParams = (req, res, next) => {
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;

    if (hotel) {
        return hotelFilter(req, res, next);
    } else if (fecha_inicio && fecha_fin) {
        return datesFilter(req, res, next);
    } else if (tipo_habitacion) {
        return roomClassFilter(req, res, next);
    } else if (estado) {
        return paidStatus(req, res, next);
    } else if (num_huespedes) {
        return qtySearch(req, res, next);
    } else {
        return findToday(req, res, next);
    }
};

router.post("/", createBooking);
router.get("/", handleQueryParams);
router.get("/:id", bookDetails);
router.put("/", updateRoom);
router.delete("/:id", deleteBook);

module.exports = router;