// main file for user actions

var state = "nc"
// var state = "ga"

var election_dt = "11-03-2020"
// var election_dt = "01-04-2021"

$(document).ready(function () {
  document.getElementById("loading").style.visibility='visible';

  $.ajax({
      type: "GET",
      url: "http://128.220.221.36:5500/api/v1/stats/county_stats/?state=" + state + "&election_dt=" + election_dt,
      dataType: "json",
      success: function (result, status, xhr) {
        document.getElementById("loading").style.visibility='hidden';
        var stats_data = result
        rej_percent = []

        console.log(stats_data.total_rejected)
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
});