d3.json("samples.json").then((data) => {
    console.log(data);

dropdown = d3.select("#selDataset");
// dropdown.append('option').text("This is a test")

function displaySamples(data) {
    // tbody.html("");
    data.forEach((sample) => {
        let cell = dropdown.append('option');
        cell.text(sample);
    });
}
    
    displaySamples(data.names);

    let sample_data = data.samples;
    let sample_sliced = sample_data.slice(0,10);
    console.log(sample_sliced);
    let otu_ids = sample_sliced[0].otu_ids;
    console.log(otu_ids);
    let otu_labels = sample_sliced.otu_labels;
    console.log(otu_labels);

    let trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        type: "bar",
        orientation: "h"
    };

    let barData = [trace1];

    Plotly.newPlot("bar", barData);

});
        
