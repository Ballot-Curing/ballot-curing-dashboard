const app = document.getElementById('stats')
const container = document.createElement('div')
container.setAttribute('class', 'flex_container')
app.appendChild(container)

const quick_stats_app = document.getElementById('quick_stats')
const quick_stats_container = document.createElement('div')
quick_stats_container.setAttribute('class', 'flex_container')
quick_stats_app.appendChild(quick_stats_container)

function create_stat(card, stat_name, stat_value) {
  const name = document.createElement('div')
  name.textContent = stat_name
  const stats_value = document.createElement('div')
  stats_value.setAttribute('class', 'stats_value')
  stats_value.textContent = stat_value
  card.appendChild(name)
  card.appendChild(stats_value)
}


$(document).ready(function () {
  $.ajax({
      type: "GET",
      url: "http://128.220.221.36:5500/api/v1/stats/?state=nc&election_dt=11-03-2020",
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

        // create pie chart for ballot issues
        make_donut_chart(stats_data.ballot_issue_count, "ballot_issue", "ballot_issue_count", "Ballot Issues Breakdown")

        // create pie chart for rejected age group
        make_donut_chart(stats_data.rejected_age_group, "age", "age_count", "Rejections by Age")

        // create pie chart for rejected by race
        make_donut_chart(stats_data.rejected_race, "race", "race_count", "Rejected by Race")

        // create pie chart for cured by race
        make_donut_chart(stats_data.cured_race, "race", "race_count", "Cured by Race")

        // create pie chart for total race
        make_donut_chart(stats_data.total_race, "race", "race_count", "Total Ballots by Race")

        // create pie chart for rejected by gender
        make_donut_chart(stats_data.rejected_gender, "gender", "gender_count", "Rejected by Gender")

        // create pie chart for cured by gender
        make_donut_chart(stats_data.cured_gender, "gender", "gender_count", "Cured by Gender")

        // create pie chart for total gender
        make_donut_chart(stats_data.total_gender, "gender", "gender_count", "Total Ballots by Gender")
        make_line_chart(stats_data.total_gender, "Cured Ballots over time")
        make_line_chart(stats_data.total_gender, "Rejected Ballots over time")
        // make_bar_chart(stats_data.total_race, stats_data.rejected_race, stats_data.cured_race)

      },
      error: function (xhr, status, error) {
        console.log("Getting stats failed")
      }
    });
});