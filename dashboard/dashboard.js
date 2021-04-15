window.onload = function () {
  var donutChart = new CanvasJS.Chart("donutChartContainer",
  {
    title:{
      text: "Today's Processed Data"
    },
    data: [
    {
     type: "doughnut",
     dataPoints: [
     {  y: 80, indexLabel: "Accepted" },
     {  y: 10, indexLabel: "Rejected" },
     {  y: 5, indexLabel: "Spoiled" },
     {  y: 5, indexLabel: "Other" },
     ]
   }
   ]
 });

  donutChart.render();

  var donutChart2 = new CanvasJS.Chart("donutChart2Container",
  {
    title:{
      text: "Rejected by Race"
    },
    data: [
    {
     type: "doughnut",
     dataPoints: [
     {  y: 123, indexLabel: "White" },
     {  y: 123, indexLabel: "Black" },
     {  y: 123, indexLabel: "Asian" },
     {  y: 123, indexLabel: "Hispanic" },
     {  y: 12, indexLabel: "Other" },
     ]
   }
   ]
 });

  donutChart2.render();

  var donutChart3 = new CanvasJS.Chart("donutChart3Container",
  {
    title:{
      text: "Ballot Issues"
    },
    data: [
    {
     type: "doughnut",
     dataPoints: [
     {  y: 123, indexLabel: "Ballot Received after Deadline" },
     {  y: 42, indexLabel: "Invalid Signature" },
     {  y: 12, indexLabel: "Missing Signature" },
     {  y: 10, indexLabel: "Ineligible Elector" },
     ]
   }
   ]
 });

  donutChart3.render();

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