// Contains helper file for generating dashboard data

function render_election_data(state, election_dt) {

  // Generate stats cards
  const app = document.getElementById('stats')
  const container = document.createElement('div')
  container.setAttribute('class', 'flex_container')
  // app.appendChild(container)

  const quick_stats_app = document.getElementById('quick_stats')
  const quick_stats_container = document.createElement('div')
  quick_stats_container.setAttribute('class', 'flex_container')
  quick_stats_app.appendChild(quick_stats_container)

  
  document.getElementById("loading").style.visibility='visible';

  // Get county data
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

        // County data
        result = []
        for (i in stats_data.total_cured) {
          entry = {
            "name": stats_data.total_cured[i]["name"],
            "cured": stats_data.total_cured[i]["value"],
            "rejected": stats_data.total_rejected[i]["value"],
            "processed": stats_data.total_processed[i]["value"],
          }
          result.push(entry)

        }
        // $("#table tbody").show();
        // $.each(result, function (i, item) {
        //   if (i > 0) {
        //     $("#table tbody").append(
        //       "<tr>"
        //       + "<td>" + item.name + "</td>"
        //       + "<td>" + item.cured + "</td>"
        //       + "<td>" + item.rejected + "</td>"
        //       + "<td>" + item.processed + "</td>"
        //       + "</tr>")
        //   }
        // })

        make_map("rejected", "countries/us/us-" + state + "-all", "% Ballots Rejected by County", rej_percent)
        make_map("cured", "countries/us/us-" + state + "-all", "% Ballots Cured by County", cured_percent)
        make_map("processed", "countries/us/us-" + state + "-all", "Total Processed by County", stats_data.total_processed)
        
      },
      error: function (xhr, status, error) {
        document.getElementById("loading").style.visibility='hidden';
        
      }
    });
    
    // Get last updated data
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

  // Get state data
  $.ajax({
    type: "GET",
    url: "http://128.220.221.36:5500/api/v1/stats/?state=" + state + "&election_dt=" + election_dt,
    dataType: "json",
    success: function (result, status, xhr) {
      stats_data = result

      quick_stats = [
        ['Total Processed', stats_data.total_processed.toLocaleString("en-US")],
        ['Total Rejected', stats_data.total_rejected.toLocaleString("en-US")],
        ['Total Cured', stats_data.total_cured.toLocaleString("en-US")],
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
      make_donut_chart(stats_data.ballot_issue_count, "ballot_issue", "ballot_issue_count", "Ballot Issues Breakdown", "ballot_issues", "")      

      // race section
      make_donut_chart(stats_data.total_race, "race", "race_count", "Total Ballots By Race", "race_group")
      make_donut_chart(stats_data.rejected_race, "race", "race_count", "Rejected Ballots By Race", "race_group")
      make_donut_chart(stats_data.cured_race, "race", "race_count", "Cured Ballots By Race", "race_group")
      
      make_total_bar_chart(stats_data.total_race,  "race_count", "race", "Percent Total Ballots By Race", "race_group", "")
      make_bar_chart(stats_data.total_race, stats_data.rejected_race, "race_count", "race", "Percent Rejected Ballots By Race", "race_group", "Rejected/(Total processed)")
      make_bar_chart(stats_data.rejected_race, stats_data.cured_race, "race_count", "race", "Percent Cured Ballots By Race", "race_group", "Cured/(Cured + Rejected)")
      
      // age section
      make_donut_chart(stats_data.total_age_group, "age", "age_count", "Total Ballots By Age", "age_group")
      make_donut_chart(stats_data.rejected_age_group, "age", "age_count", "Rejected Ballots By Age", "age_group")
      make_donut_chart(stats_data.cured_age_group, "age", "age_count", "Cured Ballots By Age", "age_group")

      make_total_bar_chart(stats_data.total_age_group,  "age_count", "age", "Percent Total Ballots By Age", "age_group", "")
      make_bar_chart(stats_data.total_age_group, stats_data.rejected_age_group, "age_count", "age", "Percent Rejected Ballots By Age Group", "age_group", "Rejected/(Total processed)")
      make_bar_chart(stats_data.rejected_age_group, stats_data.cured_age_group, "age_count", "age", "Percent Cured Ballots By Age Group", "age_group", "Cured/(Cured + Rejected)")


      // gender section
      make_donut_chart(stats_data.total_gender, "gender", "gender_count", "Total Ballots By Gender", "gender_group")
      make_donut_chart(stats_data.rejected_gender, "gender", "gender_count", "Rejected Ballots By Gender", "gender_group")
      make_donut_chart(stats_data.cured_gender, "gender", "gender_count", "Cured Ballots By Gender", "gender_group")

      make_total_bar_chart(stats_data.total_gender,  "gender_count", "gender", "Percent Total Ballots By Gender", "gender_group", "")
      make_bar_chart(stats_data.total_gender, stats_data.rejected_gender, "gender_count", "gender", "Percent Rejected Ballots By Gender", "gender_group", "Rejected/(Total processed)")
      make_bar_chart(stats_data.rejected_gender, stats_data.cured_gender, "gender_count", "gender", "Percent Cured Ballots By Gender", "gender_group", "Cured/(Cured + Rejected)")

    },
    error: function (xhr, status, error) {
      console.log("Getting stats failed")
    }
  });

  // Get time series data
  $.ajax({
    type: "GET",
    url: "http://128.220.221.36:5500/api/v1/stats/time_series/?state=" + state + "&election_dt=" + election_dt,
    dataType: "json",
    success: function (result, status, xhr) {
      make_line_chart(result.rejected_unique, "New Rejected Ballots Per Day")
      make_line_chart(result.rejected_totals, "Cumulative Rejected Ballots")
      make_line_chart(result.cured_unique, "New Cured Ballots Per Day")
      make_line_chart(result.cured_totals, "Cumulative Cured Ballots")
    },
    error: function (xhr, status, error) {

    }
  });

}
