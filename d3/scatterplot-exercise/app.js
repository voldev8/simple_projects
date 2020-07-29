// write your code here!
var height = 600;
var width = 600;
var padding = 50;

var data = regionData.filter(mustHaveKeys);
function mustHaveKeys(obj) {
  var keys = [
    'adultLiteracyRate',
    'subscribersPer100',
    'urbanPopulationRate',
    'medianAge',
  ];
  for (var i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === null) return false;
  }
  return true;
}

var xScale = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.adultLiteracyRate))
  .range([padding, width - padding]);
var yScale = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.subscribersPer100))
  .range([height - padding, padding]);
var radiusScale = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.urbanPopulationRate))
  .range([5, 30]);
var colorScale = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.medianAge))
  .range(['green', 'blue']);
var xAxis = d3
  .axisBottom(xScale)
  .tickSize(-height + 2 * padding)
  .tickSizeOuter(0);
var yAxis = d3
  .axisLeft(yScale)
  .tickSize(-width + 2 * padding)
  .tickSizeOuter(0);

d3.select('svg')
  .append('g')
  .attr('transform', 'translate(0,' + (height - padding) + ')')
  .call(xAxis);
d3.select('svg')
  .append('g')
  .attr('transform', 'translate(' + padding + ')')
  .call(yAxis);

d3.select('svg')
  .attr('height', height)
  .attr('width', width)
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', (d) => xScale(d.adultLiteracyRate))
  .attr('cy', (d) => yScale(d.subscribersPer100))
  .attr('r', (d) => radiusScale(d.urbanPopulationRate))
  .attr('fill', (d) => colorScale(d.medianAge))
  .attr('stroke', 'white');

d3.select('svg')
  .append('text')
  .attr('x', width / 2)
  .attr('dy', '.8em')
  .attr('text-anchor', 'middle')
  .attr('font-size', '2em')
  .text('Cellular Subscriptions vs. Literacy Rate');

d3.select('svg')
  .append('text')
  .attr('x', width / 2)
  .attr('y', height - padding)
  .attr('dy', '1.5em')
  .attr('text-anchor', 'middle')
  .text('Adult Literacy Rate');

d3.select('svg')
  .append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -width / 2)
  .attr('y', padding)
  .attr('text-anchor', 'middle')
  .attr('dy', '-1.3em')
  .text('Cellular Subscribers Per 100');
