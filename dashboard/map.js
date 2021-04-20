var data = [

];

// Get the default map
$(document).ready(function () {
  $.ajax({
      type: "GET",
      url: "http://128.220.221.36:5500/api/v1/stats/county_stats/?state=ga&election_dt=01-04-2021",
      dataType: "json",
      success: function (result, status, xhr) {
          var stats_data = result
          rej_percent = []
          for (index in stats_data.total_rejected) {
            if (stats_data.total_processed[index]["value"] == 0) {
              continue;
            }
            percent = {
              "name": stats_data.total_rejected[index]["name"],
              "value": 100 * stats_data.total_rejected[index]["value"] / stats_data.total_processed[index]["value"]
            }
            rej_percent.push(percent)
          }

          cured_percent = []
          for (index in stats_data.total_cured) {
            if (stats_data.total_rejected[index]["value"] == 0) {
              continue;
            }

            percent = {
              "name": stats_data.total_cured[index]["name"],
              "value": 100 * stats_data.total_cured[index]["value"] / stats_data.total_rejected[index]["value"]
            }
            cured_percent.push(percent)
          }

          // for each key of rej_data, divide by the value of each proc_data


          // Create the rejected chart
          Highcharts.mapChart('rejected', {
            chart: {
                map: 'countries/us/us-ga-all'
            },

            title: {
                text: 'Percentage Rejected by County'
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
              data: rej_percent,
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
                text: 'Percentage Cured by County'
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
              data: cured_percent,
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

          Highcharts.mapChart('accepted', {
            chart: {
                map: 'countries/us/us-ga-all'
            },

            title: {
                text: 'Processed by County'
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
              data: stats_data.total_processed,
              name: 'Processed',
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

      },
      error: function (xhr, status, error) {
          console.log("Fail")
      }
    });
});