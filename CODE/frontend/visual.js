
function vis1(){
var margin = {top: 10, right:30, bottom: 55, left: 90},
    width = 640 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


var parseTime = d3.timeParse("%Y-%m-%d");
    var notif = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d){return "<strong id='str'>Date:</strong><span class='fontcolor'> "+d.up_date.toDateString().split(' ').slice(1).join(' ')+
        '</span><br><strong>Price: </strong><span class="fontcolor">'+"$"+parseFloat(d.Close).toFixed(2)+'</span><br><strong>Signal: </strong><span class="fontcolor">'+d.signal.toUpperCase()+'</span>'});
//tooltip format

svg.call(notif);
//Read the data
  d3.csv("Stock_Signals_revised.csv", function(stockdata) {
  


    // List of groups (here I have one group per column)
    var groupcats = d3.map(stockdata, function(d){return(d.stock)}).keys();
    // var parseTime = d3.timeParse("%Y-%m-%d");
    var parseTime = d3.timeParse("%Y-%m-%d");
    // d3.timeParse("%d-%b-%Y");

 stockdata.forEach(function(d) {
      d.up_date = parseTime(d.up_date);
  });



  

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('option')
     	.data(groupcats)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button


    var firstdata = stockdata.filter(function(d){return d.stock==groupcats[0]});
 

    var x = d3.scaleTime()
    .domain([d3.min(firstdata, function(d) { return d.up_date; }),      d3.max(firstdata, function(d) { return d.up_date; })])
    .range([ 0, width ]);
    
      svg.append("g")
      .attr('class', 'xaxis')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m-%d")))
      .style('font-size','17px')
    //   .tickFormat(d3.timeFormat('%m %d'))

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([d3.min(firstdata, function(d) { return +d.Close; }), d3.max(firstdata, function(d) { return +d.Close; })])
      .range([ height, 0 ]);
    
    svg.append("g")
     .attr('class', 'yaxis')
      .call(d3.axisLeft(y))
      .style('font-size','16px');
      
 
  //add xlabel
  // text label for the x axis
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 40) + ")")
      .style("text-anchor", "middle")
      .style('font-size','20px')
      .text("Date");
      

//add y label
 // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+15)
      .attr("x",0 - (height / 2))
      .attr("dy", ".5em")
      .style('font-size','20px')
      .style("text-anchor", "middle")
      .text("Stock Price (Dollars)");      

    // Initialize line with first group of the list
    var line = svg
      .append('g')
      .append("path")
        .datum(stockdata.filter(function(d){return d.stock==groupcats[0]}))
        .attr("d", d3.line()
          .x(function(d) { return x(d.up_date) })
          .y(function(d) { return y(+d.Close) })
        )
        .attr("stroke", "rgb(35, 206, 153)")
        .style("stroke-width", 4)
        .style("fill", "none");


    //initialize tooltip

    // add the dots with tooltips
    
  svg.selectAll("circle")
     .data(stockdata.filter(function(d){return d.stock==groupcats[0]}))
   .enter().append("circle")
     .attr("r", 6)
     .attr("cx", function(d) { return x(d.up_date); })
     .attr("cy", function(d) { return y(+d.Close); })
    .on('mouseover',notif.show)
    .on('mouseout',notif.hide);
   

    // A function that update the chart
    function update(chosenTicker) {

    // Create new data with the selection?
    var dataFilter = stockdata.filter(function(d){return d.stock===chosenTicker})


    // Scale X axis    
     x.domain([ d3.min(dataFilter, function(d) { return d.up_date; }), d3.max(dataFilter, function(d) { return d.up_date; })]);

    // Scale Y axis
    y.domain([d3.min(dataFilter, function(d) { return +d.Close; }), d3.max(dataFilter, function(d) { return +d.Close; })]);
    

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.up_date) })
            .y(function(d) { return y(+d.Close) })
          )
          .attr("stroke", "rgb(33, 206, 153)" )

    //update x axis
    svg.select('.xaxis')
      .transition()
      .duration(1000)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m-%d")))
      .style('font-size','17px')
    //update y axis

    svg.select('.yaxis')
     .transition()
     .duration(1000)
    .call(d3.axisLeft(y))
    .style('font-size','16px')

       // add the dots with tooltips
       
  var dot = svg.selectAll("circle")
     .data(dataFilter);

    
     dot.exit().remove();
     dot.enter().append("circle")
     .attr("r", 6)
     .merge(dot)
     .transition()
     .duration(1000)
     .attr("cx", function(d) { return x(d.up_date); })
     .attr("cy", function(d) { return y(+d.Close); })
     .on('mouseover',notif.show)
     .on('mouseout',notif.hide);
    
    }

    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })


})

}
vis1();


// MARKET INDEXXXXXXXXXXX

function vis2(){
  var margin = {top: 10, right:30, bottom: 55, left: 90},
      width = 640 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz1")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
  
  var parseTime = d3.timeParse("%Y-%m-%d");
      var notif = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d){return "<strong id='str'>Date:</strong><span class='fontcolor'> "+d.up_date.toDateString().split(' ').slice(1).join(' ')+
          '</span><br><strong>Price: </strong><span class="fontcolor">'+"$"+parseFloat(d.Close).toFixed(2)+'</span>'});
  //tooltip format
  
  svg.call(notif);
  //Read the data
    d3.csv("Index_Data.csv", function(stockdata) {
    
  
  
      // List of groups (here I have one group per column)
      var groupcats = d3.map(stockdata, function(d){return(d.stock)}).keys();
      // var parseTime = d3.timeParse("%Y-%m-%d");
      var parseTime = d3.timeParse("%Y-%m-%d");
      // d3.timeParse("%d-%b-%Y");
  
   stockdata.forEach(function(d) {
        d.up_date = parseTime(d.up_date);
    });
  
  
  
    
  
      // add the options to the button
      d3.select("#selectButton1")
        .selectAll('option')
         .data(groupcats)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button
  
  
      var firstdata = stockdata.filter(function(d){return d.stock==groupcats[0]});
   
  
      var x = d3.scaleTime()
      .domain([d3.min(firstdata, function(d) { return d.up_date; }),      d3.max(firstdata, function(d) { return d.up_date; })])
      .range([ 0, width ]);
      
        svg.append("g")
        .attr('class', 'xaxis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m-%d")))
        .style('font-size','13px')
      //   .tickFormat(d3.timeFormat('%m %d'))
  
      // Add Y axis
      var y = d3.scaleLinear()
        .domain([d3.min(firstdata, function(d) { return +d.Close; }), d3.max(firstdata, function(d) { return +d.Close; })])
        .range([ height, 0 ]);
      
      svg.append("g")
       .attr('class', 'yaxis')
        .call(d3.axisLeft(y))
        .style('font-size','16px');
        
   
    //add xlabel
    // text label for the x axis
    svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 40) + ")")
        .style("text-anchor", "middle")
        .style('font-size','20px')
        .text("Date");
        
  
  //add y label
   // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left+15)
        .attr("x",0 - (height / 2))
        .attr("dy", ".5em")
        .style('font-size','20px')
        .style("text-anchor", "middle")
        .text("Index Price (Dollars)");      
  
      // Initialize line with first group of the list
      var line = svg
        .append('g')
        .append("path")
          .datum(stockdata.filter(function(d){return d.stock==groupcats[0]}))
          .attr("d", d3.line()
            .x(function(d) { return x(d.up_date) })
            .y(function(d) { return y(+d.Close) })
          )
          .attr("stroke", "rgb(35, 206, 153)")
          .style("stroke-width", 4)
          .style("fill", "none");
  
  
      //initialize tooltip
  
      // add the dots with tooltips
      
    svg.selectAll("circle")
       .data(stockdata.filter(function(d){return d.stock==groupcats[0]}))
     .enter().append("circle")
       .attr("r", 6)
       .attr("cx", function(d) { return x(d.up_date); })
       .attr("cy", function(d) { return y(+d.Close); })
      .on('mouseover',notif.show)
      .on('mouseout',notif.hide);
     
  
      // A function that update the chart
      function update(chosenTicker) {
  
      // Create new data with the selection?
      var dataFilter = stockdata.filter(function(d){return d.stock===chosenTicker})
  
  
      // Scale X axis    
       x.domain([ d3.min(dataFilter, function(d) { return d.up_date; }), d3.max(dataFilter, function(d) { return d.up_date; })]);
  
      // Scale Y axis
      y.domain([d3.min(dataFilter, function(d) { return +d.Close; }), d3.max(dataFilter, function(d) { return +d.Close; })]);
      
  
        // Give these new data to update line
        line
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(d.up_date) })
              .y(function(d) { return y(+d.Close) })
            )
            .attr("stroke", "rgb(33, 206, 153)" )
  
      //update x axis
      svg.select('.xaxis')
        .transition()
        .duration(1000)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m-%d")))
        .style('font-size','13px')
      //update y axis
  
      svg.select('.yaxis')
       .transition()
       .duration(1000)
      .call(d3.axisLeft(y))
      .style('font-size','16px')
  
         // add the dots with tooltips
         
    var dot = svg.selectAll("circle")
       .data(dataFilter);
  
      
       dot.exit().remove();
       dot.enter().append("circle")
       .attr("r", 6)
       .merge(dot)
       .transition()
       .duration(1000)
       .attr("cx", function(d) { return x(d.up_date); })
       .attr("cy", function(d) { return y(+d.Close); })
       .on('mouseover',notif.show)
       .on('mouseout',notif.hide);
      
      }
  
      d3.select("#selectButton1").on("change", function(d) {
          // recover the option that has been chosen
          var selectedOption = d3.select(this).property("value")
          // run the updateChart function with this selected option
          update(selectedOption)
      })
  
  
  })
  
  }
  vis2();