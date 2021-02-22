// get sample data (values, ids, labels for horizontal bar chart and bubble chart)

function buildPlots(sampleID) {
    d3.json("samples.json").then((data) => {
        console.log(data);

        const sampleName = data.samples.filter(row => row.id === sampleID);
        console.log(sampleName + "ID");

        const otu = data.samples[0].otu_ids
        console.log(otu);


        const sampleData = data.samples[0].sample_values.slice(0,10)
        const sample_values = sampleData.sort((firstNum, secondNum) => secondNum - firstNum).reverse();
        console.log(sample_values);

        const otuData = data.samples[0].otu_ids.slice(0,10);
        const otuSort = otuData.sort((firstNum, secondNum) => secondNum - firstNum).reverse();
        const otu_ids = otuSort.map(data => "OTU" + " " + data);
        console.log(otu_ids);
    
        const otu_labels = data.samples[0].otu_labels.slice(0,10);
        console.log(otu_labels);

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

}

// get metadata for demographic info box
function getMetadata(sampleID) {

    d3.json("samples.json").then((data) => {
        console.log(sampleID);


        const results = data.metadata.filter(row => row.id == sampleID);
        console.log(results);

        const demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");

        Object.entries(results[0]).forEach(([key, value]) => {
            demoInfo.append("h5").text(`${key}: ${value}`);
        });
    });
}

// initialize default data
function init() {

    const dropdownMenu = d3.select("#selDataset");

    d3.json("samples.json").then((sampleData) => {
        console.log(sampleData);

        sampleData.names.forEach(sample => {
            dropdownMenu.append("option").text(sample).property("value");
        });

        // first sample to build initial plot
        buildPlots(sampleData.names[0]);
        getMetadata(sampleData.names[0]);

    });
}

function updateData(newData) {
    console.log(newData + "test");
    buildPlots(newData);
    getMetadata(newData);
}

init();
    