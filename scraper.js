const htmlparser = require('node-html-parser'),
      parse = htmlparser.parse,
      mongoose = require('mongoose'),
      laundryRoom = require('./models/LaundryRoom.js'),
      timestamp = require('./models/Timestamp.js')

require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Schema } = mongoose;
mongoose.connect(process.env.DB_URL)

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

const VALID_MODES = [FREE_MODES, BUSY_MODES, OFFLINE_MODES]

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
        const dbdata = await parseData(key, rooms[key]['name'], data)

        // Upload to the goose (mongoose)
        const filter = {name: key}
        let laundry = await laundryRoom.model.findOneAndUpdate(filter, dbdata, {
            new: true,
            upsert: true
        })

        console.log("yeehaw")

    }

    var ts = Math.floor(Date.now() / 1000)
    const ts_filter = {name: "timestamp"}
    const ts_data = {"timestamp": ts}
    let ts_push = await timestamp.model.findOneAndUpdate(ts_filter, ts_data, {
        new: true,
        upsert: true
    })

    mongoose.connection.close()
    return
}

async function parseData(name, humanname, sitedata) {
    const root = parse(sitedata)
    const trs = root.querySelectorAll("tr")

    let data = {
        "humanname": humanname,
        "washermachines": 0,
        "dryermachines": 0,
        "washeravailable": 0,
        "dryeravailable": 0,
        "washeravailable_percent": 0,
        "dryeravailable_percent": 0,
        "washers": [],
        "dryers": []
    }

    for (tr in trs) {
        if (JSON.stringify(VALID_MODES).includes(trs[tr].getAttribute("class"))) {
            let machineclass = trs[tr].getAttribute("class")
            let machinenum = trs[tr].querySelector(".name").childNodes[1]._rawText
            let machinetime = undefined;
            if (trs[tr].querySelector(".time").childNodes[1] != undefined) {
                machinetime = trs[tr].querySelector(".time").childNodes[1]._rawText
            }
            let machinetype = trs[tr].querySelector(".type").childNodes[0]._rawText
            let machinerawstatus = trs[tr].querySelector(".status").childNodes[0]._rawText

            // Add to total machines
            if (machinetype == "Washer") {
                data["washermachines"]++
            } else if (machinetype == "Dryer") {
                data["dryermachines"]++
            }

            // Add to total free machines
            if (JSON.stringify(FREE_MODES).includes(trs[tr].getAttribute("class"))) {
                if (machinetype == "Washer") {
                    data["washeravailable"]++
                } else if (machinetype == "Dryer") {
                    data["dryeravailable"]++
                }
            }

            let machinedata = {}
            machinedata['machinenumber'] = machinenum
            machinedata['rawstatus'] = machinerawstatus
            
            // Enum the statuses
            if (AVAILABLE_MODES.includes(machineclass)) {
                machinedata['status'] = 'Available'
            } else if (READY_MODES.includes(machineclass)) {
                machinedata['status'] = 'Ready To Start'
            } else if (IN_USE_MODES.includes(machineclass)) {
                machinedata['status'] = 'In Use'
            } else if (ALMOST_DONE_MODES.includes(machineclass)) {
                machinedata['status'] = 'Almost Done'
            } else if (END_OF_CYCLE_MODES.includes(machineclass)) {
                machinedata['status'] = 'Ready For Pickup'
            } else if (OFFLINE_MODES.includes(machineclass)) {
                machinedata['status'] = 'Offline'
            } else {
                machinedata['status'] = 'Available'
            }

            if (machinetime != undefined) {
                machinedata['minutes_left'] = parseInt(machinetime.split(" ")[0])
            } else {
                machinedata['minutes_left'] = null
            }

            if (machinetype == "Washer") {
                data["washers"].push(machinedata)
            } else if (machinetype == "Dryer") {
                data["dryers"].push(machinedata)
            }
        }
    }
    data["washeravailable_percent"] = Math.round((data['washeravailable'] / data['washermachines']) * 100)
    data["dryeravailable_percent"] = Math.round((data["dryeravailable"] / data["dryermachines"]) * 100)

    //data["washeravailable_percent"] = parseFloat(((data["washeravailable"] / data["washermachines"]) * 100).toFixed(2))
    //data["dryeravailable_percent"] = parseFloat(((data["dryeravailable"] / data["dryermachines"]) * 100).toFixed(2))

    //console.log(data)
    return data
}

fetchRooms()