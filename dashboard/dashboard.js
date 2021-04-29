// Contains helper file for generating dashboard data

function render_election_data(state, election_dt) {
  const app = document.getElementById('stats')
  const container = document.createElement('div')
  container.setAttribute('class', 'flex_container')
  app.appendChild(container)

  const quick_stats_app = document.getElementById('quick_stats')
  const quick_stats_container = document.createElement('div')
  quick_stats_container.setAttribute('class', 'flex_container')
  quick_stats_app.appendChild(quick_stats_container)

  
  document.getElementById("loading").style.visibility='visible';

  $.ajax({
      type: "GET",
      url: "http://128.220.221.36:5500/api/v1/stats/county_stats/?state=" + state + "&election_dt=" + election_dt,
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
            "value": 100 * stats_data.total_cured[index]["value"] / (stats_data.total_cured[index]["value"] + stats_data.total_rejected[index]["value"])
          }
          cured_percent.push(percent)
        }

        make_map("rejected", "countries/us/us-" + state + "-all", "Percentage Rejected by County", rej_percent)
        make_map("cured", "countries/us/us-" + state + "-all", "Percentage Cured by County", cured_percent)
        make_map("processed", "countries/us/us-" + state + "-all", "Processed by County", stats_data.total_processed)
        
      },
      error: function (xhr, status, error) {
        document.getElementById("loading").style.visibility='hidden';
        
      }
    });

    $.ajax({
      type: "GET",
      url: "http://128.220.221.36:5500/api/v1/lastProcessed/?state=" + state + "&election_dt=" + election_dt,
      dataType: "json",
      success: function (result, status, xhr) {

        const last_proc_app = document.getElementById('last-processed')
        const last_proc_container = document.createElement('div')
        last_proc_container.setAttribute('class', 'flex_container')
        last_proc_app.appendChild(last_proc_container)
        last_proc_container.textContent = "Last updated: " + result.last_proc

      },
      error: function (xhr, status, error) {
        console.log("Could not get last updated date: " + status + ", error: " + error)
      }
    });

    
  $.ajax({
    type: "GET",
    url: "http://128.220.221.36:5500/api/v1/stats/?state=" + state + "&election_dt=" + election_dt,
    dataType: "json",
    success: function (result, status, xhr) {
      stats_data = result

      quick_stats = [
        ['Total processed', stats_data.total_processed],
        ['Total rejected', stats_data.total_rejected],
        ['Total cured', stats_data.total_cured],
      ]

      stats = [
        ['Dummy', stats_data.total_cured],
        ['Dummy', stats_data.total_cured],
        ['Dummy', stats_data.total_cured],

      ]
      
      quick_stats.forEach((stat) => {
        const card = document.createElement('div')
        card.setAttribute('class', 'quick_card')
        quick_stats_container.appendChild(card)
        create_stat(card, stat[0], stat[1])
      })

      stats.forEach((stat) => {
        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        container.appendChild(card)
        create_stat(card, stat[0], stat[1])
      })

      // make a special pie chart for ballot issues
      make_donut_chart(stats_data.ballot_issue_count, "ballot_issue", "ballot_issue_count", "Ballot Issues Breakdown", "ballot_issues")
      
      // create line charts
      make_line_chart(stats_data.total_gender, "Rejected Ballots over time")
      
      // age section
      make_bar_chart(stats_data.rejected_age_group, stats_data.cured_age_group, "age_count", "age", "% Cured Ballots By Age Group", "age_group")
      make_donut_chart(stats_data.rejected_age_group, "age", "age_count", "Rejections by Age", "age_group")

      // race section
      make_bar_chart(stats_data.rejected_race, stats_data.cured_race, "race_count", "race", "% Cured Ballots By Race", "race_group")
      make_donut_chart(stats_data.total_race, "race", "race_count", "Total Ballots by Race", "race_group")

      // gender section
      make_bar_chart(stats_data.rejected_gender, stats_data.cured_gender, "gender_count", "gender", "% Cured Ballots By Gender", "gender_group")
      make_donut_chart(stats_data.total_gender, "gender", "gender_count", "Total Ballots by Gender", "gender_group")
    },
    error: function (xhr, status, error) {
      console.log("Getting stats failed")
    }
  });
}
