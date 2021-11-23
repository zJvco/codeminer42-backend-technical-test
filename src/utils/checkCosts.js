// Origin -> Destinations -> Values
const journeyFuelRotes = {
    "andvari": {
        "andvari": null,
        "demeter": null,
        "aqua": 13,
        "calas": 23
    },
    "demeter": {
        "andvari": null,
        "demeter": null,
        "aqua": 22,
        "calas": 25
    },
    "aqua": {
        "andvari": null,
        "demeter": 30,
        "aqua": null,
        "calas": 12
    },
    "calas": {
        "andvari": 20,
        "demeter": 25,
        "aqua": 15,
        "calas": null
    }
}

function getFuelCosts(origin, destination) {
    // return null if the route is blocked/invalid or value if the pilot can travel
    return journeyFuelRotes[origin][destination];
}

module.exports = { getFuelCosts }