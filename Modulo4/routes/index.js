const express = require("express");
const router = express.Router();

const bookingRouter = require("./booking.router");

router.use("/reservas", bookingRouter);

module.exports = router;