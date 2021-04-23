// main file for user actions


elections = {
  "NC General Election (11/3/20)" : {
    "state": "nc",
    "election_dt": "11-03-2020"
  },
  "GA Senate Runoff (1/5/21)" : {
    "state": "ga",
    "election_dt": "01-04-2021"
  }
}

// Default
$(document).ready(function () {
  render_election_data("ga", "01-04-2021");
});

function pressButton() {
  // clear contents of old stuff
  $("#quick_stats").empty();
  $("#stats").empty();
  $("#donut").empty();
  $("#line").empty();

  const e = document.getElementById("election-btn");
  const title = document.getElementById('election-title')
  const header = document.createElement('h2')
  header.setAttribute('class', 'h2')
  header.setAttribute('id', 'election')
  header.textContent = e.value
  title.replaceChild(header, document.getElementById('election'))

  render_election_data(elections[e.value].state, elections[e.value].election_dt)
}


function render_election_data(state, election_dt) {
  // const e = document.getElementById("election-btn");
  // const title = document.getElementById('election-title')
  // const header = document.createElement('h2')
  // header.setAttribute('class', 'h2')
  // header.setAttribute('id', 'election')
  // header.textContent = e.value
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
            "value": 100 * stats_data.total_cured[index]["value"] / stats_data.total_processed[index]["value"]
          }
          cured_percent.push(percent)
        }

        make_map("rejected", "countries/us/us-" + state + "-all", "Percentage Rejected by County", rej_percent)
        make_map("cured", "countries/us/us-" + state + "-all", "Percentage Cured by County", cured_percent)
        make_map("processed", "countries/us/us-" + state + "-all", "Processed by County", stats_data.total_processed)
        
      },
      error: function (xhr, status, error) {
        document.getElementById("loading").style.visibility='hidden';
        console.log("Fail")
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

      // create pie charts
      make_donut_chart(stats_data.ballot_issue_count, "ballot_issue", "ballot_issue_count", "Ballot Issues Breakdown")
      make_donut_chart(stats_data.rejected_age_group, "age", "age_count", "Rejections by Age")
      make_donut_chart(stats_data.rejected_race, "race", "race_count", "Rejected by Race")
      make_donut_chart(stats_data.cured_race, "race", "race_count", "Cured by Race")
      make_donut_chart(stats_data.total_race, "race", "race_count", "Total Ballots by Race")
      make_donut_chart(stats_data.rejected_gender, "gender", "gender_count", "Rejected by Gender")
      make_donut_chart(stats_data.cured_gender, "gender", "gender_count", "Cured by Gender")
      make_donut_chart(stats_data.total_gender, "gender", "gender_count", "Total Ballots by Gender")
      
      // create line charts
      make_line_chart(stats_data.total_gender, "Cured Ballots over time")
      make_line_chart(stats_data.total_gender, "Rejected Ballots over time")
      // make_bar_chart(stats_data.total_race, stats_data.rejected_race, stats_data.cured_race)

    },
    error: function (xhr, status, error) {
      console.log("Getting stats failed")
    }
  });
}
