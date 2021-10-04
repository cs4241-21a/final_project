// Using JSSoup as it's similar to BeautifulSoup, which is what the original
// scraper was coded in.
const htmlparser = require('node-html-parser')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const parse = htmlparser.parse

const AVAILABLE_MODES = ["MachineReadyMode", "MachineDoorOpenReadyMode"]
const READY_MODES = ["MachineStartMode", "MachinePartialVendMode", "MachineDoorOpenStartMode", "MachineDoorOpenPartialVendMode"]
const IN_USE_MODES = ["MachineRunMode", "MachineAdditionalVendMode", "MachineDoorOpenRunMode", "MachineDoorOpenAdditionalVendMode"]
const ALMOST_DONE_MODES = ["MachineRunModeAlmostDone"]
const END_OF_CYCLE_MODES = ["MachineEndOfCycleMode", "MachineDoorOpenEndOfCycleMode"]
const OFFLINE_MODES = ["MachineDropOffMode", "MachineLockoutMode", "MachineDoorOpenDropOffMode", "MachineDoorOpenLockoutMode", "MachineUnableToConnectToMachine",
                       "MachineLuckyCycle", "MachineDoorOpenLuckyCycle", "MachineErrorModeFatal", "MachineUnknown", "MachineLowPowerMode", "MachineShutDownMode",
                       "MachinePowerUpMode", "MachineDoorOpenErrorModeFatal", "MachineDoorOpenLowPowerMode", "MachineDoorOpenShutDownMode", "MachineDoorOpenPowerUpMode"]

const FREE_MODES = [AVAILABLE_MODES]
const BUSY_MODES = [READY_MODES, IN_USE_MODES, ALMOST_DONE_MODES, END_OF_CYCLE_MODES, OFFLINE_MODES]

const VALID_MODES = [FREE_MODES, BUSY_MODES]

const rooms = {
    "daniels": {
        "name": "Daniels Hall",
        "url": "https://laundryconnect.net/wpidaniels.aspx"
    },
    "east": {
        "name": "East Hall",
        "url": "https://laundryconnect.net/wpieasthall.aspx"
    },
    "ellsworth": {
        "name": "Ellsworth Apartments",
        "url": "https://laundryconnect.net/wpiellsworth.aspx"
    },
    "faraday": {
        "name": "Faraday Hall",
        "url": "https://laundryconnect.net/wpifarraday.aspx"
    },
    "founders": {
        "name": "Founders Hall",
        "url": "https://laundryconnect.net/wpifounders.aspx"
    },
    "hackfeld": {
        "name": "Hackfeld House",
        "url": "https://laundryconnect.net/wpi26hackfeld.aspx"
    },
    "institute": {
        "name": "Institute Hall",
        "url": "https://laundryconnect.net/wpi_institute.aspx"
    },
    "messenger": {
        "name": "Messenger Hall",
        "url": "https://laundryconnect.net/wpimessenger.aspx"
    },
    "schussler": {
        "name": "Schussler House",
        "url": "https://laundryconnect.net/wpi22schussler.aspx"
    },
    "trowbridge": {
        "name": "Trowbridge House",
        "url": "https://laundryconnect.net/wpi25trowbridge.aspx"
    }
} 


async function fetchRooms() {
    for (var key in rooms) {
        const response = await fetch(rooms[key]['url'])
        const data = await response.text()
        console.log("In " + key)
        const dbdata = await parseData(data)
    }
}

async function parseData(sitedata) {
    const root = parse(sitedata)
    const trs = root.querySelectorAll("tr")
    for (tr in trs) {
        //console.log(trs[tr].getAttribute("class"))
        if (JSON.stringify(VALID_MODES).includes(trs[tr].getAttribute("class"))) {
            //console.log("Found a valid machine!")
            //console.log(trs[tr].querySelector(".name"))
            //console.log(trs[tr].querySelector(".type"))
            //console.log(trs[tr].querySelector(".status"))
            var machinenum = trs[tr].querySelector(".name").childNodes[1]
            var machinetime = trs[tr].querySelector(".time").childNodes[1]
            var machinetype = trs[tr].querySelector(".type").childNodes[0]._rawText
            //console.log(trs[tr].querySelector(".type"))
            if (machinetime != undefined) {
                console.log("Machine number " + machinenum + ", which is a " + machinetype + ", has " + trs[tr].querySelector(".time").childNodes[1] + " minutes to go.")
            } else {
                console.log("Machine number " + machinenum + ", which is a " + machinetype + ", has no laundry load.")
            }
            //console.log(trs[tr].querySelector(".time"))
        }
    }
    return "poo"
}

fetchRooms()