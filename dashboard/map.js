var request = new XMLHttpRequest()
 
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://128.220.221.36:3999/api/v1/stats/?state=ga&election_dt=01-04-2021', true)

request.onload = function () {
    var stats_data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      
      rej_data = stats_data.county_rejected
      cured_data = stats_data.county_cured

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
          data: rej_data,
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
          data: cured_data,
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
      console.log('error')
    }
}

// Send request
request.send()