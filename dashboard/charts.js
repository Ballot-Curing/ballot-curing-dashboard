// Contains helper functions to generate charts

function make_bar_chart(rejected, cured, label, name, title) {
  const app = document.getElementById('barChart')
  const container = document.createElement('div')
  container.setAttribute('class', 'chart_container')
  app.appendChild(container)

  let rej_map = {}
  for (i = 0; i < rejected.length; i++) {
    rej_map[rejected[i][name]] = rejected[i][label]
  }

  let cured_map = {}
  for (i = 0; i < cured.length; i++) {
    if (cured[i][label] == NaN) {
      continue;
    }
    cured_map[cured[i][name]] = cured[i][label]
  }
  
  percent_cured = []
  
  for (item in cured_map) {
    if (rej_map[item] == null || cured_map[item] == null) {
      continue
    }

    percent_cured.push({
      y: Number((100 * cured_map[item] / (Number(cured_map[item]) + Number(rej_map[item]))).toFixed(2)),
      label: item
    })
  }

  var chart = new CanvasJS.Chart(container, {
    theme: "light2",
    animationDuration: 2000,
    animationEnabled: true,
    title:{
      text: title
    },
    axisY: {
      title: "Ballots",
      includeZero: true
    },
    legend: {
      cursor:"pointer",
      itemclick : toggleDataSeries
    },
    data: [{
      type: "bar",
      showInLegend: true,
      name: title,
      dataPoints: percent_cured
    }
    ]
  });
  chart.render();
}


function toolTipFormatter(e) {
	var str = "";
	var total = 0 ;
	var str3;
	var str2 ;
	for (var i = 0; i < e.entries.length; i++){
		var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
		total = e.entries[i].dataPoint.y + total;
		str = str.concat(str1);
	}
	str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
	str3 = "<span style = \"color:Tomato\">Total: </span><strong>" + total + "</strong><br/>";
	return (str2.concat(str)).concat(str3);
}

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	chart.render();
}



function make_donut_chart(data, key, value, title, div="donut") {
  const app = document.getElementById(div)
  const container = document.createElement('div')
  container.setAttribute('class', 'chart_container')
  app.appendChild(container)

  if (data == null || data.length == 0 || data == "null") { 
    console.log("Null data for: " + key)
    return;
  }
  
  let test = []
  for (i in data) {
    test.push({y: data[i][value], indexLabel: data[i][key]})
  }

  var donutChart = new CanvasJS.Chart(container,
  {
    theme: "light2",
    animationDuration: 2000,
    animationEnabled: true,
    title:{
      text: title
    },
    data: [
    {
     type: "doughnut",
     dataPoints: test
   }
   ]
 });

  donutChart.render();
}


function make_line_chart(data, title) {
  const app = document.getElementById('line')
  const container = document.createElement('div')
  container.setAttribute('class', 'chart_container')
  app.appendChild(container)

  var chart = new CanvasJS.Chart(container,
    {
      theme: "light2",
      animationDuration: 2000,
      animationEnabled: true,
      title:{
      text: title
      },
      data: [
      {
        type: "line",

        dataPoints: [
        { x: new Date(2012, 00, 1), y: 450 },
        { x: new Date(2012, 01, 1), y: 414 },
        { x: new Date(2012, 02, 1), y: 520 },
        { x: new Date(2012, 03, 1), y: 460 },
        { x: new Date(2012, 04, 1), y: 450 },
        { x: new Date(2012, 05, 1), y: 500 },
        { x: new Date(2012, 06, 1), y: 480 },
        { x: new Date(2012, 07, 1), y: 480 },
        { x: new Date(2012, 08, 1), y: 410 },
        { x: new Date(2012, 09, 1), y: 500 },
        { x: new Date(2012, 10, 1), y: 480 },
        { x: new Date(2012, 11, 1), y: 510 }
        ]
      }
    ]
  });

  chart.render();
}