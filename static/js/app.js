// get sample data (values, ids, labels for horizontal bar chart and bubble chart)

d3.json("samples.json").then((data) => {
    console.log(data);

    function displaySamples(data) {
        data.forEach((sample) => {
            const dropdown = d3.select("#selDataset");
            const cell = dropdown.append("option");
            cell.text(sample);
        });
    }
    
    displaySamples(data.names);


    const sampleData = data.samples[0].sample_values.slice(0,10)
    const sample_values = sampleData.sort((firstNum, secondNum) => secondNum - firstNum).reverse();
    console.log(sample_values);

    const otuData = data.samples[0].otu_ids.slice(0,10);
    const otuSort = otuData.sort((firstNum, secondNum) => secondNum - firstNum).reverse();
    const otu_ids = otuSort.map(data => "OTU" + " " + data);
    console.log(otu_ids);

    
    const otu_labels = data.samples[0].otu_labels.slice(0,10);
    console.log(otu_labels);

    // horizontal bar chart
    const barhChart = [{
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        type: "bar",
        orientation: "h"
    }];

    const layout = {
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
    const bubbleChart = [{
        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        // text: otu_labels,
        mode: "markers",
        marker: {
            size: data.samples[0].sample_values,
            color: data.samples[0].otu_ids
        },
        text: data.samples[0].otu_labels
    }];

    const bubbleLayout = {
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Values"}
    };

    Plotly.newPlot("bubble", bubbleChart, bubbleLayout);

});


// get metadata for demographic info box
d3.json("samples.json").then((data) => {
    console.log(data);

    function displayMetadata(data) {

        data.forEach((metadata) => {
            console.log(metadata);

            const demoInfo = d3.select("#sample-metadata");
            demoInfo.html("");

            Object.entries(metadata).forEach(([key, value]) => {
                demoInfo.append("h5").text(`${key}: ${value}`);
            });
        });
    }
    displayMetadata(data.metadata);

});

    // // gauge plot
    // const gaugePlot = [{
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

// });


// d3.json("samples.json").then((sampleNames) => {
//     console.log(sampleNames);

//     function displayNames(names) {
//         names.forEach((sample) => {
//             let dropdown = d3.select("#selDataset");
//             dropdown.append("option").text(sample).property("value", sample);
//         });

//         let sampleDisplay = sampleNames[0];
//         displayNames(sampleDisplay);

//     }
// });


// d3.select("#selDataset").on("change", updateData);

// function updateData(newData) {
//     displayMetadata(newData);
//     displaySamples(newData);

// }

function init() {
    const dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
    console.log(data);

        function displayNames(data) {
            data.forEach((sample) => {
            dropdown.append("option").text(sample).property("value", sample);
            });

            const firstSample = data[0];
        
            displayMetadata(firstSample);
            displaySamples(firstSample);

        }
    });

}

function updateData(newData) {
    displayMetadata(newData);
    displaySamples(newData);
}

init();



        