var $ = require('jquery'),
    guid = require('./guid.js'),
    select2 = require('select2'),
    HighCharts = require('highcharts-browserify'),
    Chromath = require('chromath'),
    state = require('./config.js'),
    Handlebars = require('handlebars'),
    Calculator = require('./calculator.js'),
    serialize = require('./form-to-json.js');

function to_fixed(value, precision, strip_trailing_zeros) {
  strip_trailing_zeros = strip_trailing_zeros != undefined ? false : strip_trailing_zeros;
  value = value.toFixed(precision);
  return strip_trailing_zeros ? value.replace(/\.?0*$/g, '') : value;
}

function commafy(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

Handlebars.registerHelper('to_fixed', to_fixed);
Handlebars.registerHelper('commafy', commafy);

Handlebars.registerHelper('weekly_kwh', function(kwh) {
  return kwh ? commafy(to_fixed(kwh*7, 2)) : 0;
});

Handlebars.registerHelper('weekly_cost', function(cost) {
  return cost ? commafy(to_fixed(cost*7, 2, true)) : 0;
});

Handlebars.registerHelper('daily_to_monthly', function(value) {
  return value * 30;
});

Handlebars.registerHelper('daily_to_yearly', function(value) {
  return value * 365;
});

Handlebars.registerHelper('to_id', function(value) {
  return value.replace(/\s+/g, '-').toLowerCase();
});

var App = function($el, $mainContentEl, $customerUsageEl, $roomsEl, $scenarioForm, state) {
  this.$el = $el;
  this.$mainContentEl = $mainContentEl;
  this.$customerUsageEl = $customerUsageEl;
  this.$roomsEl = $roomsEl;
  this.$scenarioForm = $scenarioForm;
  this.state = state;
};

App.prototype = {
  templates: {
    room: 'room-tpl',
    room_totals: 'room-totals-tpl',
    room_sink: 'room-sink-tpl',
    add_room_sink_form: 'add-room-sink-form-tpl',
    scenario_totals: 'scenario-totals-tpl',
    customer_totals: 'customer-totals-tpl'
  },
  compiledTemplates: {},
  state: {},
  init: function() {
    this.setupEvents();
    this.calculator = new Calculator(
      this.state.sinks,
      this.state.average_kwh_cost
    );
    this.updateCustomerData();
    this.showWeeklyCustomerKwh();
    window.state = this.state;
  },
  $roomEls: {},
  roomColors:[],
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
                  hours_per_week: 5
                }
              ]
          }
        ]
      }
    };
  },
  reset: function() {
    this.roomColors = [];

  },
  setupEvents: function() {
    var _this = this;
    this.$scenarioForm.on('submit', function(e) {
      e.preventDefault();

      _this.reset();

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
    });
    this.$roomsEl.on('click', '.btn-add-room-sink', function(e) {
      e.preventDefault();
      var $form = $(this).parents('form'),
          data = serialize($form),
          room_sink = _this.createRoomSink(guid(), data.sink_id, data.wattage, data.hours_per_week),
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
  createRoomSink: function(id, sink_id, wattage, hours_per_week) {
    return {
      id: id,
      sink_id: sink_id,
      wattage: Number(wattage),
      hours_per_week: Number(hours_per_week)
    };
  },
  createRoom: function(id, name) {
    var color = this.findAvailableRoomColor(id);
    return {
      id: id,
      name: name,
      sinks: []
    };
  },
  getRoomColor: function(room) {
    for (var j = 0; j < this.roomColors.length; j++) {
      if (this.roomColors[j].room_id == room.id) {
        return this.roomColors[j].color;
      }
    }
  },
  findAvailableRoomColor: function(room_id) {
    if (this.roomColors.length == 0) {
      this.roomColors.push({ room_id: room_id, color: this.state.colors[0] });
      return this.state.colors[0];
    }
    for (var i = 0; i < this.state.colors.length; i++) {
      var found = false,
          color = this.state.colors[i];
      for (var j = 0; j < this.roomColors.length; j++) {
        if (this.roomColors[j].color == color) {
          found = true;
        }
      }
      if (!found) {
        this.roomColors.push({ room_id: room_id, color: color });
        return color;
      }
    }
  },
  removeSinkFromRoomById: function(id, room) {
    room.sinks = room.sinks.filter(function(sink) {
      return sink.id != id;
    });
    this.updateRoomTotals(room);
  },
  addSinkToRoom: function(room_sink, room) {
    var $el = this.getRoomEl(room);
    room.sinks.push(room_sink);
    $el.find('.sink-list').append(
      this.renderTemplate('room_sink', {
        room_sink: room_sink,
        sink: this.getSink(room_sink.sink_id),
        room: room,
        daily_usage: this.calculator.getDailyUsageForSink(room_sink)
      })
    );
    this.updateRoomTotals(room);
  },
  updateRoomTotals: function(room) {
    var roomTotal = this.calculator.getDailyUsageForCollection(room.sinks),
        $roomEl = this.getRoomEl(room);
    $roomEl.find('.room-totals').html(
      roomTotal.wattage ? this.renderTemplate('room_totals', this.calculator.getDailyUsageForCollection(room.sinks)) : ''
    );
    this.updateScenarioTotals();
  },
  showWeeklyCustomerKwh: function() {
    var weekDates = [],
        weekKwh = [],
        weeks = this.state.customer_data.weekly.slice(0, 12);
    for (var i = 0; i < weeks.length; i++) {
      var week = weeks[i],
          weekDate = new Date(Number(week['week']));
      weekDates.push(
        [weekDate.getMonth()+1, weekDate.getDate(), weekDate.getFullYear()].join('-')
      );
      weekKwh.push(week.kwh);
    }
    this.$customerUsageEl.slideDown();
    $('<div>').appendTo(this.$customerUsageEl).highcharts({
            title: null,
            // title: {
            //     text: 'Actual Energy Consumption (kWh/Week)',
            //     x: -20 //center
            // },
            // subtitle: {
            //     text: 'Source: GreenMountainPower.com',
            //     x: -20
            // },
            xAxis: {
                categories: weekDates
            },
            yAxis: {
                title: {
                    text: 'Energy Consumption (kWh)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'kWh'
            },
            series: [{
                name: 'kWh per Week',
                data: weekKwh
            }]
        });
    this.$customerUsageEl.data('initialized', true);
  },
  updateCustomerData: function() {
      var $totalsEl = this.$el.find('.customer-totals');
      $totalsEl.html(
        this.renderTemplate('customer_totals', {
          kwh: this.state.customer_data.stats.mean / 7,
          cost: (this.state.customer_data.stats.mean * this.state.average_kwh_cost) / 7
        })
      );
  },
  updateScenarioTotals: function() {
    var totals = this.calculator.getDailyUsageForScenario(this.state.scenario),
        $totalsEl = this.$el.find('.scenario-totals');

    this.state.scenario.totals = totals;
    $totalsEl.html(
      this.renderTemplate('scenario_totals', totals)
    );
    this.updateGraphs();
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
  getSink: function(sink_id) {
    return this.state.sinks[sink_id];
  },
  showAddSinkToRoomForm: function(room) {
    var $el = this.getRoomEl(room),
        $form = this.buildAddSinkToRoomForm(room);
    $el.find('.sink-list').append($form);
    $form.find('select').select2().select2('open');
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
    this.updateScenarioTotals();
  },
  buildRoomGraphData: function() {
    var data = {
        chart: {
            type: 'column',
            spacingRight: 0
        },
        title: {
            text: 'Rooms'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            labels: {
              enabled: false
            }
        },
        yAxis: {
            //allowDecimals: false,
            min: 0,
            title: {
                text: 'Total Energy Consumption'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
              stacking: 'percent',
              dataLabels: {
                enabled: true,
                color: '#000000',
                formatter: function(){
                  return this.point.name;
                },
                style: {
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 8px #ffffff'
                }
              }
            },
            series: {
              pointPadding: 0
            }
        }
    };

    var rooms = this.state.scenario.rooms;
    data.series = [];
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i],
          total = this.calculator.getDailyUsageForCollection(room.sinks),
          percent = (total.kwh ? (total.kwh / this.state.scenario.totals.kwh) : 0) * 100;

      if (percent == 0) {
        continue;
      }

      data.series.push({
          name: room.name,
          color: this.getRoomColor(room),
          data: [{
            name: room.name,
            y: (total.kwh ? (total.kwh / this.state.scenario.totals.kwh) : 0) * 100
          }]
      });
    }
    // data.series = [{
    //         name: 'Kitchen',
    //         color: '#1E5799',
    //         data: [{
    //           name: 'My Rooms',
    //           y: 6,
    //           drilldown: 'kitchen'
    //         }]
    //     }, {
    //       name: 'Master Bedroom',
    //       color: '#961E1E',
    //       data: [{
    //         name: 'My Rooms',
    //         y: 4,
    //         drilldown: 'master bedroom'
    //       }]
    //     }, {
    //       name: 'Bathroom',
    //       color: '#1E961E',
    //       data: [{
    //         name: 'My Rooms',
    //         y: 2,
    //         drilldown: 'bathroom'
    //       }]
    //     }];
    data.drilldown = {
          series: [{
            stacking: 'normal',
            id: 'kitchen',
            name: 'Kitchen',
            data: [
              ['Stove', 3],
              ['Microwave', 2],
              ['Toaster', 1]
            ]
          }, {
            stacking: 'normal',
            id: 'master bedroom',
            name: 'Master Bedroom',
            data: [
              ['Television', 2],
              ['Lamp', 1],
              ['Lamp', 1]
            ]
          }, {
            stacking: 'normal',
            id: 'bathroom',
            name: 'Bathroom',
            data: [
              ['Lamp', 1],
              ['Lamp', 1]
            ]
          }]
        };
        return data;
  },
  buildApplianceGraphData: function() {
    var data = {
        chart: {
            type: 'column',
            spacingLeft: 0
        },
        title: {
            text: 'Appliances'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            labels: {
              enabled: false
            }
        },
        yAxis: {
            labels: {
              enabled: false
            },
            title: {
              text: null
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            },
            series: {
              dataLabels: {
                enabled: true,
                color: '#000000',
                formatter: function(){
                  return this.series.name;
                },
                style: {
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 8px #ffffff'
                }
              },
              pointPadding: 0
            }
        }
    };

    var rooms = this.state.scenario.rooms;
    data.series = [];
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i],
          room_sinks = room.sinks,
          color = this.getRoomColor(room),
          tint_increment = room_sinks.length ? (1 / (room_sinks.length * 1.75)) : null,
          tint = new Chromath(color);

      for (var j = 0; j < room_sinks.length; j++) {
        var room_sink = room_sinks[j],
            sink = this.getSink(room_sink.sink_id),
            total = this.calculator.getDailyUsageForSink(room_sink),
            percent = (total.kwh ? (total.kwh / this.state.scenario.totals.kwh) : 0) * 100;

        tint = tint.towards('white', tint_increment);
        data.series.push({
            name: sink.name,
            color: tint.toString(),
            data: [{
              name: room.name + ' ' + sink.name,
              y: percent
            }]
        });
      }

    }

    // data.series = [{
    //         name: 'Kitchen - Stove',
    //         color: '#1E5799',
    //         data: [{
    //           name: 'My Sinks',
    //           y: 3
    //         }]
    //     }, {
    //       name: 'Kitchen - Microwave',
    //       color: '#1E5799',
    //       data: [{
    //         name: 'My Sinks',
    //         y: 2
    //       }]
    //     }, {
    //       name: 'Kitchen - Toaster',
    //       color: '#1E5799',
    //       data: [{
    //         name: 'My Sinks',
    //         y: 1
    //       }]
    //     }, {
    //       name: 'Master Bedroom - Television',
    //       color: '#961E1E',
    //       data: [{
    //         name: 'My Sinks',
    //         y: 2
    //       }]
    //     }, {
    //       name: 'Master Bedroom - Lamp',
    //       color: '#961E1E',
    //       data: [{
    //         name: 'My Sinks',
    //         y: 1
    //       }]
    //     }, {
    //       name: 'Master Bedroom - Lamp',
    //       color: '#961E1E',
    //       data: [{
    //         name: 'My Sinks',
    //         y: 1
    //       }]
    //     }, {
    //       name: 'Bedroom - Lamp',
    //       color: '#1E961E',
    //       data: [{
    //         name: 'My Sinks',
    //         y: 1
    //       }]
    //     }, {
    //       name: 'Bedroom - Lamp',
    //       color: '#1E961E',
    //       data: [{
    //         name: 'My Sinks',
    //         y: 1
    //       }]
    //     }];
    return data;
  },
  updateGraphs: function() {
    if (!this.state.scenario.totals.wattage) {
      $('#graph1').hide();
      $('#graph2').hide();
      $('#no-graph-message').show();
      return false;
    }
    $('#no-graph-message').hide();
    $('#graph1').show().highcharts(this.buildRoomGraphData());
    $('#graph2').show().highcharts(this.buildApplianceGraphData());
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
            this.createRoom(guid(), 'Bathroom '+j)
          );
      };

      return rooms;
  },
  renderRooms: function(rooms) {
    this.$roomsEl.html('');
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      var $el = $(this.renderTemplate('room', {
        room: room,
        background_color: this.getRoomColor(room)
      }));
      this.$roomsEl.append($el);
      this.$roomEls[room.id] = $el;
    }
  },
  renderTemplate: function(id, view) {
    if (!this.compiledTemplates[id]) {
      this.compiledTemplates[id] = Handlebars.compile(
        $('#'+this.templates[id]).html()
      );
    }
    return this.compiledTemplates[id](view);
  }
};

var app = new App(
  $('#app'),
  $('#main-content'),
  $('#customer-usage'),
  $('#rooms'),
  $('#scenario-form'),
  state
);
app.init();
