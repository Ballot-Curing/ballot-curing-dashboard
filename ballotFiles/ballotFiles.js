function ajaxRequest(params) {
  console.log($("#dropdownState").text())
  var url = 'http://128.220.221.36:5500/api/v1/ballots/?state=GA&election_dt=01-04-2021'
  $.get(url).then(function (res) {
    params.success(res)
  })
}

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

function dropdownToggle() {
  // select the main dropdown button element
  var dropdown = $(this).parent().parent().prev();
  //console.log($(this).parent().parent().prev())

  // change the CONTENT of the button based on the content of selected option
  dropdown.html($(this).html());

  // change the VALUE of the button based on the data-value property of selected option
  dropdown.val($(this).prop('data-value'));
  console.log(dropdown);

  //console.log($("#dropdownState").text());

}



$(document).ready(function () {

  $("#table tbody").hide();
  $("#downloadBtn").hide();

  $('#dropdownMenuElection').empty();
  $('#dropdownMenuCounty').empty();
  $('#dropdownMenuCity').empty();
  $('#dropdownMenuStatus').empty();
  $('#dropdownMenuIssue').empty();

  $('#mainbody').on('click', '.dropdown-menu a', dropdownToggle);

  //$('#mainbody').on('keyup', '.dropdown-menu input', filterFunction);

  //$("#dropdownMenuElection").hide();
  var selected_state = "";
  var selected_election = "";

  $('#dropdownMenuState a').on('click', function () {
    $("#dropdownState").css('border-color', '');
    console.log($(this).text());
    selected_state = $(this).text();
    $.getJSON("jsondata/data.json", function (data) {
      election_data = data[selected_state][0].elections.dates.split(",");

      //$("#dropdownMenuElection").empty().append('<li><a class="dropdown-item" data-value="3" value="3" href="#">' + '01-04-2021' + '</a></li>');

      var $election_drop = $("#dropdownMenuElection");
      $election_drop.empty();
      $.each(election_data, function (index, value) {
        $election_drop.append('<li><a class="dropdown-item" href="#">' + value + '</a></li>');
      });


      $('#dropdownMenuElection a').on('click', function () {
        $("#dropdownElection").css('border-color', '');
        console.log($(this).text());
        console.log(data[selected_state][0].elections);
        selected_election = $(this).text();
        status_data = data[selected_state][0].elections[selected_election].status.split(",");
        issue_data = data[selected_state][0].elections[selected_election].issues.split(",");
        county_data = data[selected_state][0].counties.split(",");
        city_data = data[selected_state][0].cities.split(",");

        var $county_drop = $("#dropdownMenuCounty");
        $county_drop.empty();
        $county_drop.append('<input type="text" placeholder="Search.." id="countyInput" onkeyup="filterCounty()">');
        $.each(county_data, function (index, value) {
          $county_drop.append('<li><a class="dropdown-item" href="#">' + value + '</a></li>');
        });
  
        var $city_drop = $("#dropdownMenuCity");
        $city_drop.empty();
        $city_drop.append('<input type="text" placeholder="Search.." id="cityInput" onkeyup="filterCity()">');
        $.each(city_data, function (index, value) {
          $city_drop.append('<li><a class="dropdown-item" href="#">' + value + '</a></li>');
        });

        var $status_drop = $("#dropdownMenuStatus");
        $status_drop.empty();
        $.each(status_data, function (index, value) {
          $status_drop.append('<li><a class="dropdown-item" href="#">' + value + '</a></li>');
        });

        var $issue_drop = $("#dropdownMenuIssue");
        $issue_drop.empty();
        $issue_drop.append('<input type="text" placeholder="Search.." id="issueInput" onkeyup="filterIssue()">');
        $.each(issue_data, function (index, value) {
          $issue_drop.append('<li><a class="dropdown-item" href="#">' + value + '</a></li>');
        });
      });

    });
  });
  console.log(selected_state);


  var state_val = "";
  var election_val = "";
  var county_val = "";
  var city_val = "";
  var status_val = "";
  var issue_val = "";

  // Enter Button
  $("#enterBtn").on("click", function () {
    $("#table tbody").empty();
    state_val = $("#dropdownState").text();
    console.log(state_val);
    console.log("HI");
    console.log($("#dropdownElection").val());
    console.log($("#dropdownState").attr('value'));
    election_val = $("#dropdownElection").text();
    console.log($("#dropdownElection").attr('value'));
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

    console.log(state_val);
    console.log(election_val);
    console.log(county_val);
    console.log(city_val);
    //console.log(status_val);
    //console.log(issue_val);

    // , county: county_val, city: city_val, ballot_rtn_status: status_val, ballot_issue: issue_val
    $("#table tbody").show();
    $.ajax({
      type: 'GET',
      url: 'http://128.220.221.36:5500/api/v1/ballots/',
      dataType: 'json',
      data: { state: state_val, election_dt: election_val, county: county_val, city: city_val, ballot_rtn_status: status_val, ballot_issue: issue_val },
      success: function (response) {
        console.log(response);
        $.each(response, function (i, item) {
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
        })
      },
      error: function (e) {
        $("#divResult").html("WebSerivce unreachable");
      }
    });
    $("#downloadBtn").show();

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
    $("#downloadBtn").hide();
    $("#table tbody").empty();
    $("#table tbody").hide();

  });

});
