const app = document.getElementById('stats')

const container = document.createElement('div')
container.setAttribute('class', 'flex_container')

app.appendChild(container)

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()
 
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://128.220.221.36:3999/api/v1/stats/?state=ga&election_dt=01-04-2021', true)


request.onload = function () {
    var stats_data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      stats = [
        ['Total accepted', stats_data.total_accepted],
        ['Total rejected', stats_data.total_rejected],
        ['Total cured', stats_data.total_cured],
        ['Dummy', stats_data.total_cured],
        ['Dummy', stats_data.total_cured],
        ['Dummy', stats_data.total_cured],
        ['Dummy', stats_data.total_cured],

      ]

      stats.forEach((stat) => {
        const card = document.createElement('div')
        card.setAttribute('class', 'stats_card')
        container.appendChild(card)
        create_stat(card, stat[0], stat[1])
      })

    } else {
      console.log('error')
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



  
