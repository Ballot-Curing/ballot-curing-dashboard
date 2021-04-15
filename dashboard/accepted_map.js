// This data will be given by API
var data = [
  {'name': "Walker", "value": 1},
  {'name': "Fulton", "value": 2},
  {'name': "Taylor", "value": 3},
];

// Create the chart
Highcharts.mapChart('accepted', {
  chart: {
      map: 'countries/us/us-ga-all'
  },

  title: {
      text: 'Accepted by County'
  },

  subtitle: {
      text: ''
  },

  mapNavigation: {
      enabled: true,
      buttonOptions: {
          verticalAlign: 'bottom'
      }
  },

  colorAxis: {
      min: 0
  },

  series: [{
      data: data,
      name: 'Accepted',
      joinBy: ['name', 'name'],
      states: {
          hover: {
              color: '#BADA55'
          }
      },
      dataLabels: {
          enabled: true,
          format: '{point.name}'
      },
  }]
});
