// main file for user actions

elections = {
  "NC General Election (11/3/20)" : {
    "state": "nc",
    "election_dt": "11-03-2020"
  },
  "GA Senate Runoff (1/5/21)" : {
    "state": "ga",
    "election_dt": "01-05-2021"
  }
}

// Default
$(document).ready(function () {
  render_election_data(elections["GA Senate Runoff (1/5/21)"]["state"], elections["GA Senate Runoff (1/5/21)"]["election_dt"]);
});

function pressButton() {
  // clear contents of old stuff
  $("#quick_stats").empty();
  $("#stats").empty();
  $("#race_group").empty();
  $("#gender_group").empty();
  $("#age_group").empty();
  $("#ballot_issues").empty();
  $("#line").empty();
  $("#last-processed").empty();

  const e = document.getElementById("election-btn");
  const title = document.getElementById('election-title')
  const header = document.createElement('h2')
  header.setAttribute('class', 'h2')
  header.setAttribute('id', 'election')
  header.textContent = e.value
  title.replaceChild(header, document.getElementById('election'))

  render_election_data(elections[e.value].state, elections[e.value].election_dt)
}