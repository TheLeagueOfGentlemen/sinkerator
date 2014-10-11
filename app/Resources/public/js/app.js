var $ = require('jquery'),
    Room = require('./room.js'),
    serialize = require('./form-to-json.js');

window.$ = $;

var App = function($el, $scenarioForm) {
  this.$el = $el;
  this.$scenarioForm = $scenarioForm;
};

App.prototype = {
  state: {},
  init: function() {
    this.state = this.getInitialState();
    this.$roomsEl = $('<div id="rooms"></div>').appendTo(this.$el);
    this.setupEvents();
  },
  getInitialState: function() {
    return {
      categories: {
        'entertainment': {
          name: 'Home Entertainment'
        }
      },
      sinks: {
          'boom_box': {
            name: 'Boom Box',
            wattage: 5000,
            standby_wattage: 5000,
            is_scenario_wide: false,
            categories: ['entertainment']
          },
          'central_air': {
            name: 'Boom Box',
            wattage: 5000,
            standby_wattage: 5000,
            is_scenario_wide: true,
            categories: ['entertainment']
          }
      },
      scenario: {
        sinks: [
          {
            sink_id: 'central_air',
            wattage_override: 5000
          }
        ],
        rooms: [
          {
              name: 'Kitchen',
              sinks: [
                {
                  sink_id: 'boom_box',
                  wattage_override: 5000,
                  hours_per_day: 5
                }
              ]
          }
        ]
      }
    };
  },
  setupEvents: function() {
    var _this = this;
    $scenarioForm.on('submit', function(e) {
      e.preventDefault();

      var rooms =_this.buildRoomsFromScenario(
        serialize(_this.$scenarioForm)
      );

      _this.updateRooms(rooms);
    });
    this.$roomsEl.on('click', '.btn-add-room-appliance', function(e) {
      e.preventDefault();
      _this.addDeviceToRoom(
        _this.getRoom(this.getAttribute('data-room-id'))
      );
    })
  },
  getRoom: function(id) {
    return this.state.scenario.rooms[id];
  },
  addDeviceToRoom: function(room) {
    console.log(room);
  },
  updateRooms: function(rooms) {
    this.state.scenario.rooms = rooms;
    this.renderRooms(rooms);
  },
  buildRoomsFromScenario: function(scenario) {
      var rooms = [],
          room_names = ['kitchen_name', 'basement_name', 'living_room_name', 'office_name'],
          num_bedrooms = Number(scenario.num_bedrooms),
          num_bathrooms = Number(scenario.num_bathrooms);

      for (var i = 0; i < room_names.length; i++) {
        var room_name = room_names[i];
        if (scenario[room_name]) {
          rooms.push(new Room(scenario[room_name]));
        }
      }

      for (var k = 1; k <= num_bedrooms; k++) {
          rooms.push(new Room('Bedroom '+k));
      };

      for (var j = 1; j <= num_bathrooms; j++) {
          rooms.push(new Room('Bathroom '+j));
      };

      return rooms;
  },
  renderRooms: function(rooms) {
    this.$roomsEl.html('');
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      this.$roomsEl.append(
        [
          '<div class="room">',
            '<h2>', room.name, '</h2>',
            '<ul class="sink-list"></ul>',
            '<a href="#" class="btn-add-room-appliance" data-room-id="', i,'">Add Appliance</a>',
          '</div>'
        ].join('')
      );
    }
  }
};

var app = new App(
  $app = $('#app'),
  $scenarioForm = $('#scenario-form')
);
app.init();
