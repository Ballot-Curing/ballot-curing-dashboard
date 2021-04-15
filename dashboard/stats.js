const app = document.getElementById('stats')

const container = document.createElement('div')
container.setAttribute('class', 'flex_container')

app.appendChild(container)

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://60663eecb8fbbd0017568315.mockapi.io/api/v1/BallotStats', true)

request.onload = function () {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.forEach((stats_data) => {
          stats = [
            ['Total accepted', stats_data.total_accepted],
            ['Total rejected', stats_data.total_rejected],
            ['Total cured', stats_data.total_cured],
            ['Total cured', stats_data.total_cured],
            ['Total cured', stats_data.total_cured],
            ['Total cured', stats_data.total_cured],
            ['Total cured', stats_data.total_cured],
            ['Total cured', stats_data.total_cured],
            ['Total cured', stats_data.total_cured],
            ['Total cured', stats_data.total_cured],
          ]
    
          stats.forEach((stat) => {
            const card = document.createElement('div')
            card.setAttribute('class', 'stats_card')
            container.appendChild(card)
            create_stat(card, stat[0], stat[1])
          })

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



  
