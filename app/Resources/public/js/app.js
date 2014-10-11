var $ = require('jquery'),
    guid = require('./guid.js'),
    state = require('./config.js'),
    Mustache = require('mustache'),
    Calculator = require('./calculator.js'),
    serialize = require('./form-to-json.js');

var App = function($el, $roomsEl, $scenarioForm, state) {
  this.$el = $el;
  this.$roomsEl = $roomsEl;
  this.$scenarioForm = $scenarioForm;
  this.state = state;
};

App.prototype = {
  templates: {
    room: 'room-tpl',
    room_sink: 'room-sink-tpl',
    add_room_sink_form: 'add-room-sink-form-tpl'
  },
  compiledTemplates: {},
  state: {},
  init: function() {
    this.setupEvents();
    this.calculator = new Calculator(
      this.state.sinks,
      this.state.average_kwh_cost
    );
    window.state = this.state;
  },
  $roomEls: {},
  getInitialState: function() {
    return {
      average_kwh_cost: 0.15, // TODO: Allow update
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
    this.$scenarioForm.on('submit', function(e) {
      e.preventDefault();

      var rooms =_this.buildRoomsFromScenario(
        serialize(_this.$scenarioForm)
      );

      _this.updateRooms(rooms);
    });
    this.$roomsEl.on('click', '.btn-add-room-appliance', function(e) {
      e.preventDefault();
      _this.showAddSinkToRoomForm(
        _this.getRoom(this.getAttribute('data-room-id'))
      );
    })
    this.$roomsEl.on('click', '.btn-add-room-sink', function(e) {
      e.preventDefault();
      var $form = $(this).parents('form'),
          data = serialize($form),
          room_sink = _this.createRoomSink(guid(), data.sink_id, data.wattage, data.hours_per_day),
          room = _this.getRoom(data.room_id);
      $form.remove();
      _this.addSinkToRoom(room_sink, room);
    });
    this.$roomsEl.on('click', '.btn-remove-room-sink', function(e) {
      e.preventDefault();
      var id = this.getAttribute('data-sink-id'),
          room = _this.getRoom(this.getAttribute('data-room-id'));
      _this.removeSinkFromRoomById(id, room);
      $(this).parent().remove();
    });
    this.$el.on('click', '.btn-remove', function(e) {
      e.preventDefault();
      $($(this).attr('href')).remove();
    });
    this.$el.on('change', '.sink-form', function(e) {
      var wattage =this.options[this.selectedIndex].getAttribute('data-wattage');
      $(this).parents('form').find('[name="wattage"]').val(wattage);
    });
  },
  createRoomSink: function(id, sink_id, wattage, hours_per_day) {
    return {
      id: id,
      sink_id: sink_id,
      wattage: Number(wattage),
      hours_per_day: Number(hours_per_day)
    };
  },
  createRoom: function(id, name) {
    return {
      id: id,
      name: name,
      sinks: []
    };
  },
  removeSinkFromRoomById: function(id, room) {
    room.sinks = room.sinks.filter(function(sink) {
      return sink.id != id;
    });
  },
  addSinkToRoom: function(sink, room) {
    var $el = this.getRoomEl(room);
    room.sinks.push(sink);
    $el.find('.sink-list').append(
      this.renderTemplate('room_sink', {
        room_sink: sink,
        room: room,
        daily_usage: this.calculator.getDailyUsageForSink(sink)
      })
    );
  },
  getRoom: function(id) {
    for (var i = 0; i < this.state.scenario.rooms.length; i++) {
      var room = this.state.scenario.rooms[i];
      if (room.id == id) {
        return room;
      }
    }
    throw new Error('Couldnt find room with id'+id);
  },
  getRoomEl: function(room) {
    return this.$roomEls[room.id];
  },
  showAddSinkToRoomForm: function(room) {
    var $el = this.getRoomEl(room),
        $form = this.buildAddSinkToRoomForm(room);
    $el.find('.sink-list').append($form);
  },
  buildAddSinkToRoomForm: function(room) {
    return $(this.renderTemplate('add_room_sink_form', {
      form_id: guid(),
      room: room,
      sinks: this.sinksToArray()
    }));
  },
  sinksToArray: function() {
    var sinks = [];
    for (x in this.state.sinks) {
      sinks.push({
        id: x,
        name: this.state.sinks[x].name,
        wattage: this.state.sinks[x].wattage
      });
    }
    return sinks;
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
          rooms.push(
            this.createRoom(guid(), scenario[room_name])
          );
        }
      }

      for (var k = 1; k <= num_bedrooms; k++) {
          rooms.push(
            this.createRoom(guid(), 'Bedroom '+k)
          );
      };

      for (var j = 1; j <= num_bathrooms; j++) {
          rooms.push(
            this.createRoom(guid(), 'Bathroom '+k)
          );
      };

      return rooms;
  },
  renderRooms: function(rooms) {
    this.$roomsEl.html('');
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      var $el = $(this.renderTemplate('room', room));
      this.$roomsEl.append($el);
      this.$roomEls[room.id] = $el;
    }
  },
  renderTemplate: function(id, view) {
    var tpl = $('#'+this.templates[id]).text();
    return Mustache.render(
      tpl,
      view
    );
  }
};

var app = new App(
  $('#app'),
  $('#rooms'),
  $('#scenario-form'),
  state
);
app.init();
