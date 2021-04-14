function ajaxRequest(params) {
  console.log($("#dropdownState").text())
  var url = 'http://128.220.221.36:5500/api/v1/ballots/?state=GA&election_dt=01-04-2021'
  $.get(url).then(function (res) {
    params.success(res)
  })
}

function dropdownToggle() {
  // select the main dropdown button element
  var dropdown = $(this).parent().parent().prev();
  console.log(dropdown.text())

  // change the CONTENT of the button based on the content of selected option
  dropdown.html($(this).html());

  // change the VALUE of the button based on the data-value property of selected option
  dropdown.val($(this).prop('data-value'));

  //console.log($("#dropdownState").text());

}



$(document).ready(function () {

  $("#table tbody").hide();
  $("#downloadBtn").hide();

  $('.dropdown-menu a').on('click', dropdownToggle);

//   $('#dropdownMenuState a').on('click', function() {
//     console.log("changed");
//     console.log($(this).text());
//     $("#dropdownMenuElection").load("textdata/" + $(this).text() + ".txt");
//     console.log($("#dropdownMenuElection").text());
//  });

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
    console.log("HI");
    console.log($("#dropdownElection").val());
    console.log($("#dropdownState").attr('value'));
    election_val = $("#dropdownElection").text();
    console.log($("#dropdownElection").attr('value'));
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

  //console.log("CHANGED");

  // $("#dropdownState dropdownMenuState").change(function() {
  //   console.log("change");
  //   var $dropdown = $(this);
  
  //   $.getJSON("jsondata/data.json", function(data) {
  //     var key = $dropdown.val();
  //     var vals = [];
                
  //     switch(key) {
  //       case 'GA':
  //         vals = data.GA.split(",");
  //         break;
  //       case 'NC':
  //         vals = data.NC.split(",");
  //         break;
  //       // case 'base':
  //       //   vals = ['Please choose from above'];
  //     }
      
  //     var $secondChoice = $("#dropdownElection");
  //     $secondChoice.empty();
  //     $.each(vals, function(index, value) {
  //       $secondChoice.append("<li>" + value + "</li>");
  //     });
  
  //   });
  // });


  // Reset Filters Button
  $("#clearBtn").on("click", function () {
    $('#dropdownState').html('Select State');
    $('#dropdownElection').html('Select Election');
    $('#dropdownCounty').html('County');
    $('#dropdownCity').html('City');
    $('#dropdownStatus').html('Status');
    $('#dropdownIssue').html('Issue');
    $("#downloadBtn").hide();
    $("#table tbody").empty();
    $("#table tbody").hide();

  });

});
