// Contains helper functions to create stats

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


function pressButton() {
  const e = document.getElementById("election-btn");
  const title = document.getElementById('election-title')
  const header = document.createElement('h2')
  header.setAttribute('class', 'h2')
  header.setAttribute('id', 'election')
  header.textContent = e.value

  title.replaceChild(header, document.getElementById('election'))
}