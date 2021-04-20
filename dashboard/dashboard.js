window.onload = function () {
  var chart = new CanvasJS.Chart("lineChartContainer",
  {

    title:{
    text: "Cured ballots per day"
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

  var chart = new CanvasJS.Chart("lineChart2Container",
  {

    title:{
    text: "Cured ballots per day"
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

function make_donut_chart(data, key, value, title) {
  const app = document.getElementById('donut')
  const container = document.createElement('div')
  container.setAttribute('class', 'chart_container')
  app.appendChild(container)

  if (data == null || data.length == 0) { 
    console.log("Null data for: " + key)
    return;
  }
  
  let test = []
  for (i in data) {
    test.push({y: data[i][value], indexLabel: data[i][key]})
  }

  var donutChart = new CanvasJS.Chart(container,
  {
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