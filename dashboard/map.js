var data = [

];
var request = new XMLHttpRequest()
 
request.open('GET', 'http://128.220.221.36:5500/api/v1/stats/county_stats/?state=ga&election_dt=01-04-2021', true)

// TODO: Modify this to also work for NC
request.onload = function () {
    var stats_data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      
      county_data = stats_data.county_data
      // cured_data = stats_data.county_cured

      // Create the rejected chart
      Highcharts.mapChart('rejected', {
        chart: {
            map: 'countries/us/us-ga-all'
        },

        title: {
            text: 'Rejected by County'
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
          name: 'Rejected',
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

      // Create the cured chart
      Highcharts.mapChart('cured', {
        chart: {
            map: 'countries/us/us-ga-all'
        },

        title: {
            text: 'Cured by County'
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
          name: 'Cured',
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

    } else {
      console.log('error: ' + request.status + " " + request.responseText)

      Highcharts.mapChart('rejected', {
        chart: {
            map: 'countries/us/us-ga-all'
        },

        title: {
            text: 'Rejected by County'
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
          name: 'Rejected',
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

      // Create the cured chart
      Highcharts.mapChart('cured', {
        chart: {
            map: 'countries/us/us-ga-all'
        },

        title: {
            text: 'Cured by County'
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
          name: 'Cured',
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
    }
}

// Send request
request.send()