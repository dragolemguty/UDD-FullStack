const { GuestRank } = require('../models/GuestRank');
const { guest_ranks } = require("../databases/tables");

let guestRankInstances = [];

for (let i = 0; i < guest_ranks.guest_ranks.length; i++) {
    let guestRank = new GuestRank(
        guest_ranks.guest_ranks[i],
        guest_ranks.descuentos[i],
        guest_ranks.beneficios[i]
    );
    guestRankInstances.push(guestRank);
};
