// Set margins and dimensions 
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;

//Data to be plotted on bar chart, specifying iris flower species and their respective distributions
const bardata = [
  {Species: 'setosa', score: 50},
  {Species: 'versicolor', score: 50},
  {Species: 'virginica', score: 50}
];

//Create space for the first scatterplot on the page
const svg1 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

//initializes the brush for the first scatterplot
let brush1; 
//initializes points for the first scatterplot
let myCircles1; 

//creates space on the page to hold the second scatterplot
const svg2 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0,0, width, height]); 

let brush2; 
let myCircles2; 

//creates space on the page to hold the bar chart
const svg3 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0,0, width, height]); 

let brush3; 
//initializes bars for bar chart
let myRectangles; 

// Defines color scale based on the species of the flower
const color = d3.scaleOrdinal()
                .domain(["setosa", "versicolor", "virginica"])
                .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Plotting 
d3.csv("data/iris.csv").then((data) => {
  
  //global scales for charts
  let x1, y1, x2, y2, x3, y3;  

  //global keys for charts
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // constructs Scatterplot1, a graph plotting petal length vs. sepal length for different species of iris flowers
  {
    xKey1 = "Sepal_Length";
    yKey1 = "Petal_Length";

    //sets max sepal length value 
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // creates linear x-axis scale for sepal length
    x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 
    
    // adds x-axis to Scatterplot 1
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

    //sets max petal length value 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // creates linear y-axis scale for petal length
    y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]); 

    // adds y-axis to Scatterplot 1
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

    // generates the flower data points to plot on Scatterplot 1
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

    //creates brush for Scatterplot1 
    brush1 = d3.brush()
    .extent([[0,0], [width, height]])
    .on("brush", updateChart1)
    .on("start", clear);

    //adds brush to Scatterplot 1
    svg1.append("g")
    .attr("class", "brush")
    .call(brush1);
  }

  // constructs Scatterplot 2, a graph plotting petal width vs. sepal width for different species of iris flowers
  {
    xKey2 = "Sepal_Width";
    yKey2 = "Petal_Width";

    //sets max sepal width value 
    maxX2 = d3.max(data, (d) => { return d[xKey2]; });

    // creates linear x-axis scale for sepal width
    x2 = d3.scaleLinear()
                .domain([0,maxX2])
                .range([margin.left, width-margin.right]); 
    
    // adds x-axis to Scatterplot 2
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

    //sets max petal width value
    maxY2 = d3.max(data, (d) => { return d[yKey2]; });

    // creates y-axis for Scatterplot 2
    y2 = d3.scaleLinear()
                .domain([0, maxY2])
                .range([height - margin.bottom, margin.top]); 

    // Add y-axis to Scatterplot 2
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

    // generates the flower data points to plot on Scatterplot 2
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

    //creates a brush for Scatterplot 2
    brush2 = d3.brush()
     .extent([[0,0], [width, height]])
     .on("brush", updateChart2)
     .on("start", clear);
 
    //adds the brush to Scatterplot 2
    svg2.append("g")
     .attr("class", "brush")
     .call(brush2);
  }

  //constructs a bar chart that depicts the distributions of different species of iris flowers in given data
  {
    xKey3 = "Species";
    yKey3 = "Count";

    //sets max count of the irises
    maxY3 = d3.max(bardata, function(d) { return d.score; });

    // creates y-axis scale for bar chart
    y3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([height-margin.bottom,margin.top]); 

    // creates x-axis scale for bar chart
    x3 = d3.scaleBand()
            .domain(d3.range(bardata.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

    //adds y-axis to the bar chart
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

    //adds x-axis to the bar chart
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

    // generates the bars indicating iris species' distribution to be added to the bar chart
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
    
  //Clears the brush from the graph not currently being brushed
  function clear() {
      svg1.call(brush1.move, null);

      svg2.call(brush2.move, null);
    }

  //Takes in user input for brush selection, highlights selected points and bars
  function updateChart1(brushEvent) {
      //the area of the brush drawn by the user
      let extent = brushEvent.selection;

      //sets the points that fall under the area of the brushed selection in Scatterplot 1 to have highlighted, bold outlines
      myCircles1.classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) ) } )
  
      //sets it so that points brushed on Scatterplot 1 will reflect on Scatterplot 2
      myCircles2.classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) ) } )
    }

  //Takes in user input for brush selection, highlights selected points and bars
  function updateChart2(brushEvent) {
    let extent = brushEvent.selection;

    //an empty Set to add the species of irises that fall under the brush selection of points 
    let brushedSpecies = new Set();
    
    //sets the points that fall under the area of the brushed selection in Scatterplot 2 to have highlighted, bold outlines
    myCircles2.classed("selected", function(d)
    { 
      if( isBrushed(extent, x2(d[xKey2]), y2(d[yKey2]))) {
        //adds the iris species selected from the brushed area to a Set
        brushedSpecies.add(d.Species);
        return true;
      } } )

    //sets it so that points brushed on Scatterplot 2 will reflect on Scatterplot 1
    myCircles1.classed("selected", function(d){ return isBrushed(extent, x2(d[xKey2]), y2(d[yKey2]) ) } )

    //sets it so that points brushed on Scatterplot 2 will have the according bars (indicating species) highlighted on the bar chart
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
