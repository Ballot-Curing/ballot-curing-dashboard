// Get the default map
$(document).ready(function () {
  document.getElementById("loading").style.visibility='visible';
  $.ajax({
      type: "GET",
      url: "http://128.220.221.36:5500/api/v1/stats/county_stats/?state=ga&election_dt=01-04-2021",
      dataType: "json",
      success: function (result, status, xhr) {
        document.getElementById("loading").style.visibility='hidden';
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

          make_map("rejected", "countries/us/us-ga-all", "Percentage Rejected by County", rej_percent)
          make_map("cured", "countries/us/us-ga-all", "Percentage Cured by County", cured_percent)
          make_map("processed", "countries/us/us-ga-all", "Processed by County", stats_data.total_processed)
        
      },
      error: function (xhr, status, error) {
          console.log("Fail")
      }
    });
});

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