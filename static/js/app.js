// async function sampleData() {
//     let data = await d3.json("samples.json").then((data) => {
//         console.log(data);
//     });
// }

d3.selectAll("body").on("change", handleChange);


function handleChange() {
    d3.event.preventDefault();
    value = d3.select("#selDataset").node();
    displaySamples(data);
}


d3.json("samples.json").then((data) => {
    console.log(data);

    function displaySamples(data) {
    // tbody.html("");
        data.forEach((sample) => {
            let dropdown = d3.select("#selDataset");
            let cell = dropdown.append("option");
            cell.text(sample);
        });
    }
    
    displaySamples(data.names);

    let sampleData = data.samples[0].sample_values.slice(0,10)
    let sample_values = sampleData.sort((firstNum, secondNum) => secondNum - firstNum).reverse();
    console.log(sample_values);

    let otuData = data.samples[0].otu_ids.slice(0,10);
    let otu_ids = otuData.sort((firstNum, secondNum) => secondNum - firstNum).reverse();
    console.log(otu_ids);
    
    let otu_labels = data.samples[0].otu_labels.slice(0,10);
    console.log(otu_labels);

    // horizontal bar chart
    let barhChart = [{
        x: sample_values,
        y: `OTU + ${otu_ids}`,
        text: otu_labels,
        type: "bar",
        orientation: "h"
    }];

    let layout = {
        title: "Top 10 OTUs",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

    Plotly.newPlot("bar", barhChart, layout);

    // bubble chart
    let bubbleChart = [{
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids
        }
    }];

    let bubbleLayout = {
        title: "Samples"
    };

    Plotly.newPlot("bubble", bubbleChart, bubbleLayout);

});





        
