// Contains helper functions to create stats



function create_stat(card, stat_name, stat_value) {
  const name = document.createElement('div')
  name.textContent = stat_name
  const stats_value = document.createElement('div')
  stats_value.setAttribute('class', 'stats_value')
  stats_value.textContent = stat_value
  card.appendChild(name)
  card.appendChild(stats_value)
}
