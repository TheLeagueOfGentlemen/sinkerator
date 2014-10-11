module.exports = {
    "average_kwh_cost": 0.15,
    "colors": ['#cc0000', '#cc6600', '#cbcc00', '#64cc00', '#00cc00', '#00cc66', '#00cbcc', '#0064cc', '#0000cc', '#6600cc', '#cc00cb', '#cc0064'],
    "customer_data": {
        weekly: [{"week":"1362700800000","kwh":87.04},{"week":"1363305600000","kwh":100.6},{"week":"1363910400000","kwh":82.03},{"week":"1364515200000","kwh":82.13},{"week":"1365120000000","kwh":74.87},{"week":"1365724800000","kwh":81.71},{"week":"1366329600000","kwh":74.92},{"week":"1366934400000","kwh":72.7},{"week":"1367539200000","kwh":74.18},{"week":"1368144000000","kwh":98.99},{"week":"1368748800000","kwh":103.61},{"week":"1369353600000","kwh":117.9},{"week":"1369958400000","kwh":94.03},{"week":"1370563200000","kwh":87.28},{"week":"1371168000000","kwh":69.51},{"week":"1371772800000","kwh":107.415},{"week":"1372377600000","kwh":133.09},{"week":"1372982400000","kwh":140.7},{"week":"1373587200000","kwh":149.29},{"week":"1374192000000","kwh":151.66},{"week":"1374796800000","kwh":113.85},{"week":"1375401600000","kwh":130},{"week":"1376006400000","kwh":124.44},{"week":"1376611200000","kwh":149.82},{"week":"1377216000000","kwh":43.05},{"week":"1377820800000","kwh":58.63},{"week":"1378425600000","kwh":60.17},{"week":"1379030400000","kwh":52.3},{"week":"1379635200000","kwh":61.34},{"week":"1380240000000","kwh":66.03},{"week":"1380844800000","kwh":79.63},{"week":"1381449600000","kwh":69.68},{"week":"1382054400000","kwh":66.09},{"week":"1382659200000","kwh":74.02},{"week":"1383264000000","kwh":81.69},{"week":"1383868800000","kwh":80.36},{"week":"1384473600000","kwh":74.35},{"week":"1385078400000","kwh":83.46},{"week":"1385683200000","kwh":74.33},{"week":"1386288000000","kwh":101.43},{"week":"1386892800000","kwh":113.48},{"week":"1387497600000","kwh":150.71},{"week":"1388102400000","kwh":126.16},{"week":"1388707200000","kwh":120},{"week":"1389312000000","kwh":107.16},{"week":"1389916800000","kwh":108.43},{"week":"1390521600000","kwh":101.89},{"week":"1391126400000","kwh":118.93},{"week":"1391731200000","kwh":103.85},{"week":"1392336000000","kwh":111.37},{"week":"1392940800000","kwh":102.69},{"week":"1393545600000","kwh":110.025},{"week":"1394150400000","kwh":104.67},{"week":"1394755200000","kwh":95.53},{"week":"1395360000000","kwh":98.13},{"week":"1395964800000","kwh":78.82},{"week":"1396569600000","kwh":89.36},{"week":"1397174400000","kwh":76.24},{"week":"1397779200000","kwh":79.13},{"week":"1398384000000","kwh":78.56},{"week":"1398988800000","kwh":55.64},{"week":"1399593600000","kwh":67.04},{"week":"1400198400000","kwh":65.48},{"week":"1400803200000","kwh":85.86},{"week":"1401408000000","kwh":82.85},{"week":"1402012800000","kwh":52.1},{"week":"1402617600000","kwh":44.91},{"week":"1403222400000","kwh":42.54},{"week":"1403827200000","kwh":88.37},{"week":"1404432000000","kwh":80.695},{"week":"1405036800000","kwh":93.89},{"week":"1405641600000","kwh":110.1},{"week":"1406246400000","kwh":96.76},{"week":"1406851200000","kwh":133.59},{"week":"1407456000000","kwh":80.78},{"week":"1408060800000","kwh":75.44},{"week":"1408665600000","kwh":74.37}],
        "stats": {
            "mean": 91.349026,
            "std": 26.146567,
            "min": 42.540000,
            "25%": 74.350000,
            "50%": 85.860000,
            "75%": 107.415000,
            "max": 151.660000
        }
    },
    "categories": {
        "home_entertainment": {
            "name": "Home Entertainment"
        },
        "home_office": {
            "name": "Home Office"
        },
        "hot_tub_pool_pumps": {
            "name": "Hot Tub, Pool and Pumps"
        },
        "other_miscellaneous": {
            "name": "Other Miscellaneous"
        },
        "kitchen": {
            "name": "Misc. Kitchen"
        }
    },
    "sinks": {
      "air_conditioner": {
          "wattage": 1000,
          "standby_wattage": 0,
          "name": "Air Conditioner",
          "categories": "other_miscellaneous"
      },
      "aquariums": {
          "wattage": 63,
          "standby_wattage": 0,
          "name": "Aquarium",
          "categories": "other_miscellaneous"
      },
      "auto_engine_heaters": {
          "wattage": 1500,
          "standby_wattage": 0,
          "name": "Auto Engine Heater",
          "categories": "other_miscellaneous"
      },
      "boom_box": {
          "wattage": 8,
          "standby_wattage": 5.2,
          "name": "Boom Box",
          "categories": "home_entertainment"
      },
      "broilers": {
          "wattage": 1400,
          "standby_wattage": 0,
          "name": "Broiler",
          "categories": "kitchen"
      },
      "cable_boxes_standby_losses": {
          "wattage": 140,
          "standby_wattage": 11.6,
          "name": "Cable Boxes (standby losses)",
          "categories": "home_entertainment"
      },
      "cd_player": {
          "wattage": 7,
          "standby_wattage": 3.7,
          "name": "CD Player",
          "categories": "home_entertainment"
      },
      "ceiling_fan": {
          "wattage": 100,
          "standby_wattage": 0,
          "name": "Ceiling Fan",
          "categories": "other_miscellaneous"
      },
      "chest_freezer": {
          "wattage": 600,
          "standby_wattage": 0,
          "name": "Chest Freezer",
          "categories": "kitchen"
      },
      "coffee_maker:_drip_brew": {
          "wattage": 1500,
          "standby_wattage": 1,
          "name": "Coffee Maker: Drip (Brew)",
          "categories": "kitchen"
      },
      "coffee_maker:_drip_warm": {
          "wattage": 70,
          "standby_wattage": 0,
          "name": "Coffee Maker: Drip (Warm)",
          "categories": "kitchen"
      },
      "coffee_maker:_percolater_brew": {
          "wattage": 600,
          "standby_wattage": 0,
          "name": "Coffee Maker: Percolater (Brew)",
          "categories": "kitchen"
      },
      "coffee_maker:_percolater_warm": {
          "wattage": 80,
          "standby_wattage": 0,
          "name": "Coffee Maker: Percolater (Warm)",
          "categories": "kitchen"
      },
      "compactors": {
          "wattage": 400,
          "standby_wattage": 0,
          "name": "Compactor",
          "categories": "kitchen"
      },
      "computer_laptop": {
          "wattage": 68,
          "standby_wattage": 1.2,
          "name": "Computer (Laptop)",
          "categories": "home_office"
      },
      "computer_workstation": {
          "wattage": 250,
          "standby_wattage": 5,
          "name": "Computer (Desktop Workstation)",
          "categories": "home_office"
      },
      "deep_fryer": {
          "wattage": 1000,
          "standby_wattage": 0,
          "name": "Deep Fryer",
          "categories": "kitchen"
      },
      "dehumidifier": {
          "wattage": 400,
          "standby_wattage": 0,
          "name": "Dehumidifier",
          "categories": "other_miscellaneous"
      },
      "dishwasher": {
          "wattage": 3600,
          "standby_wattage": 0,
          "name": "Dishwasher",
          "categories": "kitchen"
      },
      "dryer": {
          "wattage": 3400,
          "standby_wattage": 0,
          "name": "Clothes Dryer",
          "categories": "other_miscellaneous"
      },
      "dvd_player": {
          "wattage": 16,
          "standby_wattage": 5.5,
          "name": "DVD Player",
          "categories": "home_entertainment"
      },
      "electric_blankets": {
          "wattage": 400,
          "standby_wattage": 0,
          "name": "Electric Blanket",
          "categories": "other_miscellaneous"
      },
      "electric_grills": {
          "wattage": 1800,
          "standby_wattage": 0,
          "name": "Electric Grill",
          "categories": "other_miscellaneous"
      },
      "electronic_air_cleanerfilter": {
          "wattage": 50,
          "standby_wattage": 0,
          "name": "Electronic Air Cleaner/Filter",
          "categories": "other_miscellaneous"
      },
      "espresso_maker": {
          "wattage": 360,
          "standby_wattage": 0,
          "name": "Espresso Maker",
          "categories": "kitchen"
      },
      "garage_door_openers": {
          "wattage": 400,
          "standby_wattage": 2.8,
          "name": "Garage Door Opener",
          "categories": "other_miscellaneous"
      },
      "gas_grills": {
          "wattage": 0.33,
          "standby_wattage": 0,
          "name": "Gas Grill",
          "categories": "other_miscellaneous"
      },
      "gas_lighting": {
          "wattage": 0.24,
          "standby_wattage": 0,
          "name": "Gas Lighting",
          "categories": "other_miscellaneous"
      },
      "hair_dryers": {
          "wattage": 710,
          "standby_wattage": 0,
          "name": "Hair Dryer",
          "categories": "other_miscellaneous"
      },
      "heat_tape": {
          "wattage": 1000,
          "standby_wattage": 0,
          "name": "Heat Tape",
          "categories": "other_miscellaneous"
      },
      "home_copiers": {
          "wattage": 800,
          "standby_wattage": 5.1,
          "name": "Home Copier",
          "categories": "home_office"
      },
      "home_facsimile_machines_thermal": {
          "wattage": 175,
          "standby_wattage": 30,
          "name": "Home facsimile machines (thermal)",
          "categories": "home_office"
      },
      "home_faxmulti_function_device_inkjet": {
          "wattage": 18,
          "standby_wattage": 8,
          "name": "Home fax/Multi-function device (inkjet)",
          "categories": "home_office"
      },
      "humidifier": {
          "wattage": 11,
          "standby_wattage": 0,
          "name": "Humidifier",
          "categories": "other_miscellaneous"
      },
      "irons": {
          "wattage": 1100,
          "standby_wattage": 0,
          "name": "Iron",
          "categories": "other_miscellaneous"
      },
      "irrigationpondwaterfall_circulation_pump_[1]": {
          "wattage": 150,
          "standby_wattage": 0,
          "name": "Irrigation/pond/waterfall circulation pump [1]",
          "categories": "hot_tub_pool_pumps"
      },
      "lights": {
          "wattage": 60,
          "standby_wattage": 0,
          "name": "Light",
          "categories": "other_miscellaneous"
      },
      "microwaves": {
          "wattage": 1000,
          "standby_wattage": 2.8,
          "name": "Microwave",
          "categories": "kitchen"
      },
      "monitor": {
          "wattage": 84,
          "standby_wattage": 2,
          "name": "Monitor",
          "categories": "home_office"
      },
      "pipe_and_gutter_heaters": {
          "wattage": 500,
          "standby_wattage": 0,
          "name": "Pipe and Gutter Heater",
          "categories": "other_miscellaneous"
      },
      "pool_heater": {
          "wattage": 275,
          "standby_wattage": 0,
          "name": "Pool Heater",
          "categories": "hot_tub_pool_pumps"
      },
      "pool_pump": {
          "wattage": 2250,
          "standby_wattage": 0,
          "name": "Pool Pump",
          "categories": "hot_tub_pool_pumps"
      },
      "printers_inkjet": {
          "wattage": 13,
          "standby_wattage": 4.2,
          "name": "Printers (Inkjet)",
          "categories": "home_office"
      },
      "printers_laser": {
          "wattage": 250,
          "standby_wattage": 4.2,
          "name": "Printers (Laser)",
          "categories": "home_office"
      },
      "receiver": {
          "wattage": 28,
          "standby_wattage": 2.8,
          "name": "Receiver",
          "categories": "home_entertainment"
      },
      "refrigerator": {
          "wattage": 600,
          "standby_wattage": 0,
          "name": "Refrigerator",
          "categories": "kitchen"
      },
      "routerdslcable_modem": {
          "wattage": 6,
          "standby_wattage": 2,
          "name": "Router/DSL/Cable Modem",
          "categories": "home_office"
      },
      "satellite_stations_standby_losses": {
          "wattage": 25,
          "standby_wattage": 15,
          "name": "satellite stations (standby losses)",
          "categories": "home_entertainment"
      },
      "slow_cookers": {
          "wattage": 200,
          "standby_wattage": 0,
          "name": "Slow Cooker",
          "categories": "kitchen"
      },
      "spa_on_demand_elec": {
          "wattage": 5500,
          "standby_wattage": 0,
          "name": "Spa (on-demand elec)",
          "categories": "hot_tub_pool_pumps"
      },
      "spa_on_demand_gas": {
          "wattage": 1.5,
          "standby_wattage": 0,
          "name": "Spa (on-demand gas)",
          "categories": "hot_tub_pool_pumps"
      },
      "tape_player": {
          "wattage": 8,
          "standby_wattage": 1,
          "name": "Tape Player",
          "categories": "home_entertainment"
      },
      "telephone_answering_machine": {
          "wattage": 4.5,
          "standby_wattage": 2.2,
          "name": "Telephone Answering Machine",
          "categories": "home_entertainment"
      },
      "toaster": {
          "wattage": 1100,
          "standby_wattage": 0,
          "name": "Toaster",
          "categories": "kitchen"
      },
      "toaster_oven___oven": {
          "wattage": 1500,
          "standby_wattage": 0,
          "name": "Toaster Oven - Oven",
          "categories": "kitchen"
      },
      "toaster_oven__toasting": {
          "wattage": 460,
          "standby_wattage": 0,
          "name": "Toaster Oven -Toasting",
          "categories": "kitchen"
      },
      "tv_crt": {
          "wattage": 60,
          "standby_wattage": 6.4,
          "name": "TV (CRT)",
          "categories": "home_entertainment"
      },
      "tv_crt___projection": {
          "wattage": 225,
          "standby_wattage": 6.4,
          "name": "TV (CRT - Projection)",
          "categories": "home_entertainment"
      },
      "tv_dlp": {
          "wattage": 175,
          "standby_wattage": 6.4,
          "name": "TV (DLP)",
          "categories": "home_entertainment"
      },
      "tv_lcd": {
          "wattage": 150,
          "standby_wattage": 6.4,
          "name": "TV (LCD)",
          "categories": "home_entertainment"
      },
      "tv_plasma": {
          "wattage": 300,
          "standby_wattage": 6.4,
          "name": "TV (Plasma)",
          "categories": "home_entertainment"
      },
      "vacuum___canister": {
          "wattage": 818,
          "standby_wattage": 0,
          "name": "Vacuum - Canister",
          "categories": "other_miscellaneous"
      },
      "vacuum_upright": {
          "wattage": 297,
          "standby_wattage": 0,
          "name": "Vacuum-Upright",
          "categories": "other_miscellaneous"
      },
      "vcrs": {
          "wattage": 18,
          "standby_wattage": 5.3,
          "name": "VCR",
          "categories": "home_entertainment"
      },
      "video_games": {
          "wattage": 20,
          "standby_wattage": 0,
          "name": "Video Game",
          "categories": "home_entertainment"
      },
      "washing_machine": {
          "wattage": 750,
          "standby_wattage": 0,
          "name": "Washing Machine",
          "categories": "other_miscellaneous"
      }
    },
    "scenario": {
        "totals": {
          "wattage": 0,
          "kwh": 0,
          "cost": 0
        },
        "name": "Relaxo's House",
        "sinks": [
        ],
        "rooms": [
            {
                "name": "Kitchen",
                "sinks": [
                    {
                        "sink_id": "microwaves",
                        "wattage": 1200,
                        "hours_per_day": 0.5
                    },
                    {
                        "sink_id": "toaster_oven___oven",
                        "wattage": 1200,
                        "hours_per_day": 1
                    },
                    {
                        "sink_id": "instant_hot_water",
                        "wattage": 22419,
                        "hours_per_day": 0.5
                    },
                    {
                        "sink_id": "compactors",
                        "wattage": 26252,
                        "hours_per_day": 0.333
                    }
                ]
            },
            {
                "name": "Living Room",
                "sinks": [
                    {
                        "sink_id": "dvd_player",
                        "wattage": 14266,
                        "hours_per_day": 2
                    },
                    {
                        "sink_id": "video_games",
                        "wattage": 50,
                        "hours_per_day": 2
                    },
                    {
                        "sink_id": "receiver",
                        "wattage": 12967,
                        "hours_per_day": 4
                    },
                    {
                        "sink_id": "tv_lcd",
                        "wattage": 7982,
                        "hours_per_day": 4
                    }
                ]
            },
            {
                "name": "Bedroom #1",
                "sinks": [
                    {
                        "sink_id": "lights",
                        "wattage": 26079,
                        "hours_per_day": 4
                    },
                    {
                        "sink_id": "computer_laptop",
                        "wattage": 21977,
                        "hours_per_day": 4
                    },
                    {
                        "sink_id": "boom_box",
                        "wattage": 22971,
                        "hours_per_day": 4
                    }
                ]
            },
            {
                "name": "Bedroom #2",
                "sinks": [
                    {
                        "sink_id": "air_conditioner",
                        "wattage": 24701,
                        "hours_per_day": 4
                    },
                    {
                        "sink_id": "lights",
                        "wattage": 26988,
                        "hours_per_day": 4
                    },
                    {
                        "sink_id": "computer_workstation",
                        "wattage": 11770,
                        "hours_per_day": 4
                    },
                    {
                        "sink_id": "boom_box",
                        "wattage": 18226,
                        "hours_per_day": 4
                    }
                ]
            },
            {
                "name": "Bedroom #3",
                "sinks": [
                    {
                        "sink_id": "air_conditioner",
                        "wattage": 800,
                        "hours_per_day": 4
                    },
                    {
                        "sink_id": "lights",
                        "wattage": 28626,
                        "hours_per_day": 4
                    },
                    {
                        "sink_id": "computer_workstation",
                        "wattage": 31229,
                        "hours_per_day": 4
                    },
                    {
                        "sink_id": "boom_box",
                        "wattage": 7750,
                        "hours_per_day": 4
                    }
                ]
            }
        ]
    }
};
