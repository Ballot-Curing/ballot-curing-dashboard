// Search bar for County Dropdown
function filterCounty() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("countyInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("dropdownMenuCounty");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// Search bar for City Dropdown
function filterCity() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("cityInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("dropdownMenuCity");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// Search bar for Issue Dropdown
function filterIssue() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("issueInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("dropdownMenuIssue");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// Replace dropdown text with selected value
function dropdownToggle() {
  // select the main dropdown button element
  var dropdown = $(this).parent().parent().prev();
  //console.log($(this).parent().parent().prev())

  // change the CONTENT of the button based on the content of selected option
  dropdown.html($(this).html());

  // change the VALUE of the button based on the data-value property of selected option
  dropdown.val($(this).prop('data-value'));

}



$(document).ready(function () {

  $("#table tbody").hide();
  $("#downloadBtn").hide();

  $('#dropdownMenuElection').empty();
  $('#dropdownMenuCounty').empty();
  $('#dropdownMenuCity').empty();
  $('#dropdownMenuStatus').empty();
  $('#dropdownMenuIssue').empty();

  // When a dropdown item is clicked
  $('#mainbody').on('click', '.dropdown-menu a', dropdownToggle);

  var selected_state = "";
  var selected_election = "";

  // State dropdown item is clicked
  $('#dropdownMenuState a').on('click', function () {
    $("#dropdownState").css('border-color', '');
    selected_state = $(this).text();
    $.getJSON("jsondata/data.json", function (data) {

      // Populate Election dropdown with respective elections
      election_data = data[selected_state][0].elections.dates.split(",");
      var $election_drop = $("#dropdownMenuElection");
      $election_drop.empty();
      $.each(election_data, function (index, value) {
        $election_drop.append('<li><a class="dropdown-item" href="#">' + value + '</a></li>');
      });

      // Election dropdown item is clicked 
      $('#dropdownMenuElection a').on('click', function () {
        $("#dropdownElection").css('border-color', '');

        //Get respective data from data/json
        selected_election = $(this).text();
        status_data = data[selected_state][0].elections[selected_election].status.split(",");
        issue_data = data[selected_state][0].elections[selected_election].issues.split(",");
        county_data = data[selected_state][0].counties.split(",");
        city_data = data[selected_state][0].cities.split(",");

        // Populate County dropdown with respective counties
        var $county_drop = $("#dropdownMenuCounty");
        $county_drop.empty();
        $county_drop.append('<input type="text" placeholder="Search.." id="countyInput" onkeyup="filterCounty()">');
        $.each(county_data, function (index, value) {
          $county_drop.append('<li><a class="dropdown-item" href="#">' + value + '</a></li>');
        });

        // Populate City dropdown with respective cities
        var $city_drop = $("#dropdownMenuCity");
        $city_drop.empty();
        $city_drop.append('<input type="text" placeholder="Search.." id="cityInput" onkeyup="filterCity()">');
        $.each(city_data, function (index, value) {
          $city_drop.append('<li><a class="dropdown-item" href="#">' + value + '</a></li>');
        });

        // Populate Status dropdown (A,R for all)
        var $status_drop = $("#dropdownMenuStatus");
        $status_drop.empty();
        $.each(status_data, function (index, value) {
          $status_drop.append('<li><a class="dropdown-item" href="#">' + value + '</a></li>');
        });

        // Populate Issue dropdown with respective issues
        var $issue_drop = $("#dropdownMenuIssue");
        $issue_drop.empty();
        $issue_drop.append('<input type="text" placeholder="Search.." id="issueInput" onkeyup="filterIssue()">');
        $.each(issue_data, function (index, value) {
          $issue_drop.append('<li><a class="dropdown-item" href="#">' + value + '</a></li>');
        });
      });

    });
  });

  var state_val = "";
  var election_val = "";
  var county_val = "";
  var city_val = "";
  var status_val = "";
  var issue_val = "";

  // Enter Button clciked
  $("#enterBtn").on("click", function () {
    $("#table tbody").empty();

    state_val = "";
    election_val = "";
    county_val = "";
    city_val = "";
    status_val = "";
    issue_val = "";

    // State and Election values
    state_val = $("#dropdownState").text();
    election_val = $("#dropdownElection").text();

    // Highlight State and/or Election buttons with red if items not selected
    if (($("#dropdownState").text()).indexOf("State") >= 0) {
      console.log("BAD");
      $("#dropdownState").css('border-color', 'red');
      $("#dropdownState").css('border-width', 'medium');
    }
    if (($("#dropdownElection").text()).indexOf("Election") >= 0) {
      console.log("BAD");
      $("#dropdownElection").css('border-color', 'red');
      $("#dropdownElection").css('border-width', 'medium');
    }

    // Set additional paramter dropdowns
    if (($("#dropdownCounty").text()).indexOf("County") < 0) {
      console.log("here");
      county_val = $("#dropdownCounty").text();
    }
    if (($("#dropdownCity").text()).indexOf("City") < 0) {
      city_val = $("#dropdownCity").text();
    }
    if (($("#dropdownStatus").text()).indexOf("Status") < 0) {
      status_val = $("#dropdownStatus").text();
    } else {
      // Default is to populate list with Rejected ballots
      status_val = 'R';
    }
    if (($("#dropdownIssue").text()).indexOf("Issue") < 0) {
      issue_val = $("#dropdownIssue").text();
    }

    $("#table tbody").show();

    // Ajax request for ballot API based on selected parameters
    $.ajax({
      type: 'GET',
      url: 'http://128.220.221.36:5500/api/v1/ballots/',
      dataType: 'json',
      data: { state: state_val, election_dt: election_val, county: county_val, city: city_val, ballot_rtn_status: status_val, ballot_issue: issue_val },
      success: function (response) {
        $("#downloadBtn").html("Download File (" + response[0].row_count + " entries)");
        console.log(response.url);

        $.each(response, function (i, item) {
          if (i > 0) {
            $("#table tbody").append(
              "<tr>"
              + "<td>" + item.county + "</td>"
              + "<td>" + item.voter_reg_id + "</td>"
              + "<td>" + item.city + "</td>"
              + "<td>" + item.state + "</td>"
              + "<td>" + item.zip + "</td>"
              + "<td>" + item.ballot_rtn_status + "</td>"
              + "<td>" + item.ballot_issue + "</td>"
              + "</tr>")
          }
        })


        if (response[0].row_count == 0) {
          console.log("zero");
          $("#table tbody").append('<tr><td colspan="7" style="text-align: center;">No matching records found</td></tr>');
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log(xhr.status);
        $("#table tbody").append("Cannot establish connection to database...");
        $("#divResult").html("WebSerivce unreachable");
      }
    });

    $("#downloadBtn").show();
    console.log(state_val);
    $("#downloadBtn").on("click", function (event) {

      // prevent multiple downloads
      event.stopImmediatePropagation();

      console.log("DOWNLOAD");
      $.ajax({
        type: 'GET',
        url: 'http://128.220.221.36:3999/api/v1/download/',
        //dataType: 'json',
        data: { state: state_val, election_dt: election_val, county: county_val, city: city_val, ballot_rtn_status: status_val, ballot_issue: issue_val },
        xhrFields: {
          responseType: 'blob' // to avoid binary data being mangled on charset conversion
        },
        success: function(blob, status, xhr) {
          // check for a filename
          var filename = "";
          console.log(xhr.getResponseHeader('Content-Disposition'));
          var disposition = xhr.getResponseHeader('Content-Disposition');
          if (disposition && disposition.indexOf('attachment') !== -1) {
            console.log("A");
              var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
              var matches = filenameRegex.exec(disposition);
              if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
          }
  
          if (typeof window.navigator.msSaveBlob !== 'undefined') {
              // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
              window.navigator.msSaveBlob(blob, filename);
              console.log("B");
          } else {
              var URL = window.URL || window.webkitURL;
              var downloadUrl = URL.createObjectURL(blob);
              console.log(downloadUrl);
              console.log("C");

              console.log(filename);
              if (filename) {
                console.log("D");
                  // use HTML5 a[download] attribute to specify filename
                  var a = document.createElement("a");
                  // safari doesn't support this yet
                  if (typeof a.download === 'undefined') {
                    console.log("E");
                      window.location.href = downloadUrl;
                  } else {
                    console.log("F");
                      a.href = downloadUrl;
                      a.download = filename;
                      document.body.appendChild(a);
                      a.click();
                  }
              } else {
                console.log("G");
                window.location.href = downloadUrl;
              }
  
              setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
          }
      },
        error: function (xhr, textStatus, errorThrown, response) {
          console.log("error");
          console.log(xhr);
          console.log(textStatus);
          console.log(errorThrown);
        }
      })
    });

  });



  // Reset Filters Button
  $("#clearBtn").on("click", function () {
    $('#dropdownState').html('Select State');
    $('#dropdownElection').html('Select Election');
    $('#dropdownCounty').html('County');
    $('#dropdownCity').html('City');
    $('#dropdownStatus').html('Status');
    $('#dropdownIssue').html('Issue');

    $('#dropdownMenuElection').empty();
    $('#dropdownMenuCounty').empty();
    $('#dropdownMenuCity').empty();
    $('#dropdownMenuStatus').empty();
    $('#dropdownMenuIssue').empty();

    $("#dropdownState").css('border-color', '');
    $("#dropdownElection").css('border-color', '');

    $("#countyInput").val('');
    $("#cityInput").val('');
    $("#issueInput").val('');

    $("#downloadBtn").html('Download File');
    $("#downloadBtn").hide();
    $("#table tbody").empty();
    $("#table tbody").hide();

  });

});
