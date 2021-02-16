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
    let samples_reversed = sample_sliced.reverse();
    let sample_values = samples_reversed;
    console.log(sample_values);
    let otu_ids = samples_reversed[0].otu_ids.slice(0,10);
    console.log(otu_ids);
    let otu_labels = samples_reversed[1].otu_labels.slice(0,10);
    console.log(otu_labels);

    let barhChart = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        type: "bar",
        orientation: "h"
    }];

    let layout = {
    title: "Top 10 OTUs",
    }

    Plotly.newPlot("bar", barhChart, layout);

    let bubbleChart = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values.length,
            color: otu_ids
        }
    }];

    let bubbleLayout = {
        title: "Samples"
    }

    Plotly.newPlot("bubble", bubbleChart, bubbleLayout);

});



// d3.selectAll("#selDataset").on("change", getData);

// function getData() {

// }
        
