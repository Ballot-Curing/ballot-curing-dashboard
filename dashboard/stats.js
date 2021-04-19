const app = document.getElementById('stats')
const container = document.createElement('div')
container.setAttribute('class', 'flex_container')
app.appendChild(container)

const quick_stats_app = document.getElementById('quick_stats')
const quick_stats_container = document.createElement('div')
quick_stats_container.setAttribute('class', 'flex_container')
quick_stats_app.appendChild(quick_stats_container)



// Create a request variable and assign a new XMLHttpRequest object to it.
// TODO: Change this from raw to use ajax
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
// request.open('GET', 'http://128.220.221.36:5500/api/v1/stats/?state=ga&election_dt=01-04-2021', true)
request.open('GET', 'http://128.220.221.36:5500/api/v1/stats/?state=nc&election_dt=11-03-2020', true)


request.onload = function () {
    var stats_data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
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
        card.setAttribute('class', 'stats_card')
        quick_stats_container.appendChild(card)
        create_stat(card, stat[0], stat[1])
      })

      stats.forEach((stat) => {
        const card = document.createElement('div')
        card.setAttribute('class', 'stats_card')
        container.appendChild(card)
        create_stat(card, stat[0], stat[1])
      })

      // create pie chart for ballot issues
      make_chart(stats_data.ballot_issue_count, "ballot_issue", "ballot_issue_count", "Ballot Issues Breakdown")

      // create pie chart for rejected age group
      make_chart(stats_data.rejected_age_group, "age", "age_count", "Rejections by Age")

      // create pie chart for rejected by race
      make_chart(stats_data.rejected_race, "race", "race_count", "Rejected by Race")

      // create pie chart for cured by race
      make_chart(stats_data.cured_race, "race", "race_count", "Cured by Race")

      // create pie chart for total race
      make_chart(stats_data.total_race, "race", "race_count", "Total Ballots by Race")

      // create pie chart for rejected by gender
      make_chart(stats_data.rejected_gender, "gender", "gender_count", "Rejected by Gender")

      // create pie chart for cured by gender
      make_chart(stats_data.cured_gender, "gender", "gender_count", "Cured by Gender")

      // create pie chart for total gender
      make_chart(stats_data.total_gender, "gender", "gender_count", "Total Ballots by Gender")




    } else {
      console.log('error: ' + request.status + " " + request.responseText)
      dummy_stats = [
        ['Total processed', 123],
        ['Total rejected', 123],
        ['Total cured', 123],
        ['Total gender', 123],
        ['Total race', 123],
        ['Total age group', 123],
      ]

      dummy_stats.forEach((stat) => {
        const card = document.createElement('div')
        card.setAttribute('class', 'stats_card')
        container.appendChild(card)
        create_stat(card, stat[0], stat[1])
      })
    }
}

function create_stat(card, stat_name, stat_value) {
  const name = document.createElement('div')
  name.textContent = stat_name
  const stats_value = document.createElement('div')
  stats_value.setAttribute('class', 'stats_value')
  stats_value.textContent = stat_value
  card.appendChild(name)
  card.appendChild(stats_value)
}


// Send request
request.send()
