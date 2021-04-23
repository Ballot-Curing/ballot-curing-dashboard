// Contains helper functions to generate maps

function make_map(div, map, title, data) {
  Highcharts.mapChart(div, {
    chart: {
        map: map
    },

    title: {
        text: title
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
      name: div,
      joinBy: ['name', 'name'],
      states: {
          hover: {
              color: '#BADA55'
          }
      },
      dataLabels: {
          enabled: true,
          format: '{point.name}'
      }
  }]
  });
}