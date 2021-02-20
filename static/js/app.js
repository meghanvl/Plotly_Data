// get metadata for demographic info box
d3.json("samples.json").then((data) => {
    console.log(data);

    function displayMetadata(data) {

        data.forEach((metadata) => {
            console.log(metadata);

            let demoInfo = d3.select("#sample-metadata");
            demoInfo.html("");

            Object.entries(metadata).forEach(([key, value]) => {
                demoInfo.append("p").text(`${key}: ${value}`);
            });
        });
    }
    displayMetadata(data.metadata);

//     let washes = data.wfreq;
//     console.log(washes);
});


// get sample data (values, ids, labels for horizontal bar chart and bubble chart)
d3.json("samples.json").then((data) => {
    console.log(data);

    function displaySamples(data) {
        data.forEach((sample) => {
            let dropdown = d3.select("#selDataset");
            let cell = dropdown.append("option");
            cell.text(sample);
        });
    }
    
    displaySamples(data.names);

    let washes = data.metadata[0].wfreq;
    console.log(washes);

    let sampleData = data.samples[0].sample_values.slice(0,10)
    let sample_values = sampleData.sort((firstNum, secondNum) => secondNum - firstNum).reverse();
    console.log(sample_values);

    let otuData = data.samples[0].otu_ids.slice(0,10);
    let otuSort = otuData.sort((firstNum, secondNum) => secondNum - firstNum).reverse();
    let otu_ids = otuSort.map(data => "OTU" + " " + data);
    console.log(otu_ids);

    
    let otu_labels = data.samples[0].otu_labels.slice(0,10);
    console.log(otu_labels);

    // horizontal bar chart
    let barhChart = [{
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        type: "bar",
        orientation: "h"
    }];

    let layout = {
        title: "Top 10 OTUs per Test Subject",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        },
        xaxis: {title: "Sample Values"}
    };

    Plotly.newPlot("bar", barhChart, layout);

    // bubble chart
    let bubbleChart = [{
        x: otuSort,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otuSort
        }
    }];

    let bubbleLayout = {
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Values"}
    };

    Plotly.newPlot("bubble", bubbleChart, bubbleLayout);

    // // gauge plot
    // let gaugePlot = [{
    //     domain: {x: washes},
    //     title: {text: "Belly Button Washing Frequency"},
    //     type: "indicator",
    //     mode: "number+gauge",
    //     // delta: {reference: 380},
    //     gauge: {
    //         axis: { range: [0, 9]},
    //         steps: [
    //             {range: [0,1], color: "lightgray"},
    //             {range: [1,2], color: "gray"},
    //             {range: [2,3], color: "lightgray"},
    //             {range: [3,4], color: "gray"},
    //             {range: [4,5], color: "lightgray"},
    //             {range: [5,6], color: "gray"},
    //             {range: [6,7], color: "lightgray"},
    //             {range: [7,8], color: "gray"},
    //             {range: [8,9], color: "lightgray"},

    //         ]
    //     }
    // }];

    // let gaugeLayout = {width: 600, height: 450, margin: {t:0, b:0} };

    // Plotly.newPlot("gauge", gaugePlot, gaugeLayout);

});

function updateData(data) {
    displayMetadata(data);
    displaySamples(data);
}


// d3.json("samples.json").then((data) => {
//     console.log(data)

//     function init() {
//         dropdown = d3.select("#selDataset");

//         data.names.forEach((name) => {
//             dropdown.append("option").text(name).property("value");
//         });
        
//         displayMetadata(data.names[0]);
//         displaySamples(data.names[0]);
       
//     }

//     init();

// });

    





        
