var ready = function() {
  $('#exercise_workout_date').datepicker({ dateFormat: 'yy-mm-dd' });

  (function() {
    var margin = { top: 100, right: 20, bottom: 100, left: 50 },
        width  = 600 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    var JSONData = $("#chart").data("workouts");

  var data = JSONData.slice()

  var parseTime = d3.timeParse("%Y-%m-%d");

  var workoutFn = function(d) { return d.duration_in_min }
  var dateFn = function(d) { return parseTime(d.workout_date) }

  var x = d3.scaleTime()
    .range([0, width])
    .domain(d3.extent(data, dateFn))

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, workoutFn)])

  var workout_line = d3.line()
      .x(function(d) { return x(d.workout_date); })
      .y(function(d) { return y(d.duration_in_min);  });

  data.forEach(function(d) {
    d.workout_date = parseTime(d.workout_date);
    d.duration_in_min = +d.duration_in_min;
  });

  var svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("path")
        .attr("class", "line")
        .attr("d", workout_line(data));

  svg.append("g")
   .attr("class", "x axis")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x)
      .ticks(d3.timeDay.every(1))
      .tickFormat(d3.timeFormat('%Y-%m-%d'))
    )
   .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-60)");

   // x axis label
   svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 20)
      .style("text-anchor", "middle")
      .text("Date of workout")

   svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y).ticks(4));

  // y axis label
  svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text("Workout duration (min)")

   // Chat title
   svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .style("text-decoration", "underline")
      .text("Workout duration vs Workout date")
})();

//
// (function() {
//   var JSONData = $("#chart").data("workouts");
//
// var data = JSONData.slice()
// var format = d3.time.format("%Y-%m-%d")
// console.log(data);
// var amountFn = function(d) { return d.duration_in_min }
// var dateFn = function(d) { return format.parse(d.workout_date) }
//
// var x = d3.time.scale()
//   .range([10, 280])
//   .domain(d3.extent(data, dateFn))
//
// var y = d3.scale.linear()
//   .range([180, 10])
//   .domain(d3.extent(data, amountFn))
//
// var svg = d3.select("#chart").append("svg:svg")
// .attr("width", 300)
// .attr("height", 200)
//
// svg.selectAll("circle").data(data).enter()
//  .append("svg:circle")
//  .attr("r", 4)
//  .attr("cx", function(d) { return x(dateFn(d)) })
//  .attr("cy", function(d) { return y(amountFn(d)) })
// })();




//   (function() {
//     var data = $("#chart").data("workouts");
// console.log(data);
//     var format = d3.time.format("%Y-%m-%d");
//     var minutesFn = function(d) { return d.duration_in_min };
//     var dateFn    = function(d) { return format.parse(d.workout_date) };
//
//     var x = d3.time.scale()
//         .domain(d3.extent(data, dateFn))
//         .range([0, 350])
//         //.domain([0, 2]);
//
//     var y = d3.scale.linear()
//         .range([350, 0])
//         .domain(d3.extent(data, minutesFn));
//
//     var workout_line = d3.svg.line()
//         .x(function(d) { return d.workout_date })
//         .y(function(d) { return d.duration_in_min  })
//         .interpolate("linear");
//
//     var svg = d3.select("#chart").append("svg")
//         .attr("width", 370)
//         .attr("height", 370)
//
//
//
//
// //        svg.selectAll("line").data(data).enter()
//     var chrt = svg.append("path")
//         .attr({
//           "d": workout_line(data),
//           "stroke": "blue",
//           "stroke-width": 2,
//           "fill": "none"
//         });
//         // .attr("x", function(d) { return x(dateFn(d)) })
//         // .attr("y", function(d) { return y(minutesFn(d)) })
//
//   })();
//   var margin = { top: 30, right: 20, bottom: 30, left: 50 },
//       width  = 600 - margin.left - margin.right,
//       height = 500 - margin.top - margin.bottom;
//
//   var data = $('#chart').data("workouts");
//
//   //var parseDate = d3.time.format("%Y-%m-%d").parse;
//   data.forEach(function(d) {
//     d.workout_date = new Date(d.workout_date);
// //      d.workout_date = parseDate(d.workout_date);
//     d.duration_in_min = +d.duration_in_min;
//   });
//
//   var x = d3.time.scale()
//       .domain(d3.extent(data, function(d) { return d.workout_date }))
//       .range([0, width]);
//   var y = d3.scale.linear()
//       .domain([0, d3.max(data, function(d) { return d.duration_in_min; })])
//       .range([height, 0]);
//
//   var xAxis = d3.svg.axis()
//       .scale(x)
//       .orient("bottom")
//       .ticks(d3.time.days, 1)
//       .tickFormat(d3.time.format('%Y-%m-%d'));
//
//   var yAxis = d3.svg.axis()
//       .scale(y)
//       .orient("left")
//       // .ticks(5);
//
//   var workout_line = d3.svg.line()
//       .x(function(d) { return x(d.workout_date); })
//       .y(function(d) { return x(d.duration_in_min); });
//
//   var svg = d3.select("#chart")
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
// //      .data(data)
//       .append("g")
//         .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
//
// //  function drawChart() {
//
// console.log(data);
//
//
//     // x.domain(d3.extent(data, function(d) { return d.workout_date }));
//     // y.domain([0, d3.max(data, function(d) { return d.duration_in_min; })]);
// //console.log(d3.extent(data, function(d) { return d.workout_date }));
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);
//
//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis);
//
//     svg.selectAll('path')
//         .data(data).enter()
//         .append("path")
//         .attr("class", "line")
//         .attr("d", workout_line)
//         .attr("fill", "none")
//         .attr("stroke", "green");
  // }
  //
  // drawChart();
};

$(document).ready(ready);
$(document).on("page:load", ready);

// $(document).on("page:load ready",function() {
//   $('#exercise_workout_date').datepicker({ dateFormat: 'yy-mm-dd' });
//
//   // $.ajax({
//   //   type: "GET",
//   //   contentType: "application/json; charset=utf-8",
//   //   url: '/users/'+id + "/exercises"
//   // });
//
//   var margin = { top: 30, right: 20, bottom: 30, left: 50 },
//       width  = 600 - margin.left - margin.right,
//       height = 270 - margin.top - margin.bottom;
//
//   var parseDate = d3.time.format("%d-%b-%y").parse;
//
//   var x = d3.time.scale().range([0, width]);
//   var y = d3.scale.linear().range([height, 0]);
//
//   var xAxis = d3.svg.axis().scale(x)
//       .orient("bottom").ticks(5);
//
//   var yAxis = d3.svg.axis().scale(y)
//       .orient("left").ticks(5);
//
//   var workout_line = d3.svg.line()
//       .x(function(d) { return x(d.workout_date); })
//       .y(function(d) { return x(d.duration_in_min); });
//
//   var svg = d3.select("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//   //d3
//
//
//
//
//
//   // d3.select("svg")
//   // .append("line")
//   // .attr("x1", 20)
//   // .attr("y1", 20)
//   // .attr("x2", 400)
//   // .attr("y2", 400)
//   // .style("stroke", "black")
//   // .style("stroke-width","2px");
//
//   // var mydata = [
//   //   { "xAxis": 1, "yAxis": 2 },
//   //   { "xAxis": 2, "yAxis": 4 },
//   //   { "xAxis": 3, "yAxis": 6 },
//   //   { "xAxis": 4, "yAxis": 8 }
//   // ];
//
//   // var mydata = [
//   //   { "date": 2015-06-10, "workout": 2 },
//   //   { "date": 2015-06-15, "workout": 4 },
//   //   { "date": 2015-06-20, "workout": 6 },
//   //   { "date": 2015-06-25, "workout": 8 }
//   // ];
//
//   data = $('#chart').data('workouts');
//   console.log(data);
//
//   // d3.select("svg")
//   // .append("path")
//   // .attr("x1", 20)
//   // .attr("y1", 20)
//   // .attr("x2", 400)
//   // .attr("y2", 400)
//   // .style("stroke", "black")
//   // .style("stroke-width","2px");
//
//   drawChart(data);
//
//   function drawChart(data) {
//     data.forEach(function(d) {
//       d.workout_date = parseDate(d.workout_date);
//       d.duration_in_min = +d.duration_in_min;
//     });
//
//     x.domain(d3.extent(data, function(d) { return d.workout_date }));
//     y.domain([0, d3.max(data, function(d) { return d.duration_in_min; })]);
//
//     svg.append("path")
//         .attr("class", "line")
//         .attr("d", workout_line(data));
//
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0, " + height + ")")
//         .call(xAxis);
//
//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis);
//   }
//
// });



// function drawChart(data) {
//   xScale = d3.scale.linear().domain([1,4]).range([20,960]);
//   yScale = d3.scale.linear().domain([2,8]).range([960,20]);
//
//   xAxis = d3.svg.axis()
//         .scale(xScale)
//         .orient("bottom")
//         .tickSize(2)
//         .tickValues([1,2,3,4,5,6,7,8,9,10]);
//
//   d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);
//
//
//   yAxis = d3.svg.axis()
//      .scale(yScale)
//      .orient("right")
//      .ticks(10)
//      .tickSize(2);
// d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);
// }

// function draw_graph(data) {
//   var width =  300;
//   var height = 400;
//
//   var svg = d3.select("#chart")
//               .append("svg")
//               .attr({width: width, height: height});
//
//   var line_one = d3.svg.line()
//                        .x(function(d) { d.})
// }
