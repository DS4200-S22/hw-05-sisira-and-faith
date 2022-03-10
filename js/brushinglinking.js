// Set margins and dimensions 
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;

const bardata = [
  {Species: 'setosa', score: 50},
  {Species: 'versicolor', score: 50},
  {Species: 'virginica', score: 50}
];

//Append svg object to the body of the page to house Scatterplot1
const svg1 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

let brush1; 
let myCircles1; 

//append svg object to the body of the page to house Scatterplot2 (call it svg2)
const svg2 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0,0, width, height]); 

let brush2; 
let myCircles2; 

//append svg object to the body of the page to house bar chart 
const svg3 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0,0, width, height]); 

let brush3; 
let myRectangles; 

// Define color scale
const color = d3.scaleOrdinal()
                .domain(["setosa", "versicolor", "virginica"])
                .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Plotting 
d3.csv("data/iris.csv").then((data) => {
  
  //global scales for charts
  let x1, y1, x2, y2, x3, y3;  

  //global keys for charts
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // Scatterplot1
  {
    xKey1 = "Sepal_Length";
    yKey1 = "Petal_Length";

    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Create X scale for svg1
    x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis to svg1
    svg1.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x1))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey1)
      );

    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // Create Y scale for svg1
    y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis to svg1
    svg1.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y1)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey1)
      );

    // Add points to svg1
    myCircles1 = svg1.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x1(d[xKey1]))
                              .attr("cy", (d) => y1(d[yKey1]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    //creates brush for svg1
    brush1 = d3.brush()
    .extent([[0,0], [width, height]])
    .on("brush", updateChart1)
    .on("start", clear);

    //Add brush1 to svg1
    svg1.append("g")
    .attr("class", "brush")
    .call(brush1);
  }

  //scatterplot 2
  {
    xKey2 = "Sepal_Width";
    yKey2 = "Petal_Width";

    maxX2 = d3.max(data, (d) => { return d[xKey2]; });

    // Create X scale for svg2
    x2 = d3.scaleLinear()
                .domain([0,maxX2])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis to svg2
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x2))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey2)
      );

    maxY2 = d3.max(data, (d) => { return d[yKey2]; });

    // Create Y scale for svg2
    y2 = d3.scaleLinear()
                .domain([0, maxY2])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis to svg2
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y2)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey2)
      );

    // Add points to svg2
    myCircles2 = svg2.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x2(d[xKey2]))
                              .attr("cy", (d) => y2(d[yKey2]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    //creates the brush for svg2
    brush2 = d3.brush()
     .extent([[0,0], [width, height]])
     .on("brush", updateChart2)
     .on("start", clear);
 
    //Add brush2 to svg2
    svg2.append("g")
     .attr("class", "brush")
     .call(brush2);
  }

  //bar chart
  {
    xKey3 = "Species";
    yKey3 = "Count";

    maxY3 = d3.max(bardata, function(d) { return d.score; });

    //scale of y axis
    y3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([height-margin.bottom,margin.top]); 

    //scale of x axis
    x3 = d3.scaleBand()
            .domain(d3.range(bardata.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

    //adds the y axis to the bar chart
    svg3.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(y3)) 
   .attr("font-size", '20px')
   .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top - 6)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey3)
   );

    //adds bar chart x axis
    svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(x3) 
            .tickFormat(d => bardata[d].Species))  
    .attr("font-size", '20px')
    .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey3)
    );

    //adds bars to bar chart
    myRectangles = svg3.selectAll(".bar") 
                        .data(bardata) 
                        .enter()  
                        .append("rect") 
                          .attr("class", "bar") 
                          .attr("x", (d,i) => x3(i)) 
                          .attr("y", (d) => y3(d.score)) 
                          .attr("height", (d) => (height - margin.bottom) - y3(d.score)) 
                          .attr("width", x3.bandwidth())
                          .style("fill", (d) => color(d.Species))
                          .style("opacity", 0.5);
  }

  //Brushing Code---------------------------------------------------------------------------------------------
    
  //clears the brush from the graph not currently being brushed
  function clear() {
      svg1.call(brush1.move, null);

      svg2.call(brush2.move, null);
    }

  //takes in user input for brush selection, highlights selected points and bars
  function updateChart1(brushEvent) {
      let extent = brushEvent.selection;

      myCircles1.classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) ) } )
  
      myCircles2.classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) ) } )
    }

  //takes in user input for brush selection, highlights selected points and bars
  function updateChart2(brushEvent) {
    let extent = brushEvent.selection;

    let brushedSpecies = new Set();
    
    myCircles2.classed("selected", function(d)
    { 
      if( isBrushed(extent, x2(d[xKey2]), y2(d[yKey2]))) {
        brushedSpecies.add(d.Species);
        return true;
      } } )

    myCircles1.classed("selected", function(d){ return isBrushed(extent, x2(d[xKey2]), y2(d[yKey2]) ) } )

    myRectangles.classed("selected", function(d){
      return brushedSpecies.has(d.Species)} )
  }

   //Finds dots within the brushed region
   //takes in the coordinates of the brush and coordinates of each point on the graph
   //returns TRUE or FALSE depending on if the point is in the selected area
   function isBrushed(brush_coords, cx, cy) {
    if (brush_coords === null) return;

    let x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
  }
});
