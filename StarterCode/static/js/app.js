// Reading in URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Retrieve data from url
d3.json(url).then(function(data) {
  console.log(data);
  init(data);
});

// Menu setup
function init(data) {
  let dropdownMenu = d3.select('#selDataset');

  let names = data.names;

  for (let i = 0; i< names.length; i++) {
    dropdownMenu.append('option').text(names[i]).property('value', names[i]);
  };

  dropdownMenu.on('change', function () {
    let selectedValue = dropdownMenu.property('value');
    chartData(selectedValue, data);
    demographicInfo(selectedValue, data);
  });

  chartData(names[0], data);
  demographicInfo(selectedValue, data);
};

function chartData(value,data) {

  console.log(data);
  let samples = data.samples;
  let filterValue = samples.filter(id => id.id === value) [0];
  console.log(filterValue)

  let trace1 = {
    x: filterValue.sample_values.slice(0,10).reverse(),
    y: filterValue.otu_ids.map(id => `OTU ${id}`).slice(0,10).reverse(),
    text: filterValue.otu_labels.slice(0,10).reverse(),
    type: 'bar',
    orientation: 'h'
  };

  let trace2 = {
    x:filterValue.otu_ids,
    y: filterValue.sample_values.map(id => `OTU ${id}`).slice(0,10),
    mode: 'markers',
    marker: {
      color: filterValue.otu_ids,
      colorscale: 'Earth',
      opacity: [1, 0.8, 0.6, 0.4],
      size: filterValue.sample_values
    }
};

let plot = [trace1];

let plotLayout = {
  title: 'Top 10 OTUs ID',
  height: 600,
  width: 600
};

Plotly.newPlot('bar', plot, plotLayout);

let bubble = [trace2];

let bubbleLayout = {
  title: 'Top 10 OTUs ID',
  height: 600,
  width: 1000
};

Plotly.newPlot('bubble', bubble, bubbleLayout);
};

let metadataDiv = d3.select('#sample-metadata');

function demographicInfo(value, data) {
  let metaData = data.metadata;

  let demographicData = metaData.filter(entry => entry.id == value) [0];
  console.log(demographicData);

  metadataDiv.html('');
  Object.entries(demographicData).forEach(([key, value]) => {
  
    metadataDiv.append('p').text(`${key}: ${value}`);

  });
};

init();