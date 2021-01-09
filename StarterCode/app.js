/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */


// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    // Read the json data

        // Parse and filter the data to get the sample's metadata

        // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data

        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart

        // Create bar chart in correct location

        // Create bubble chart in correct location
    
}

// Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then((importedData) => {
        
        var data = importedData;
        console.log(data);
        console.log(data.metadata[0].age);
        
        // Parse and filter data to get sample names
        var id_list = data.names
        console.log(id_list);
        console.log(id_list[0]);

        console.log(data.samples[0].sample_values);
    
        d3.select("#selDataset").selectAll("option")
            .data(id_list)
            .enter()
            .append("option")
            .text(function(d) {
                return d;
            });

        var li1 = d3.select("#sample-metadata").append("li").text("ID: " + data.metadata[0].id)
        var li2 = d3.select("#sample-metadata").append("li").text("Ethnicity: " + data.metadata[0].ethnicity)
        var li3 = d3.select("#sample-metadata").append("li").text("Gender: " + data.metadata[0].gender)
        var li4 = d3.select("#sample-metadata").append("li").text("Age: " + data.metadata[0].age)
        var li5 = d3.select("#sample-metadata").append("li").text("Location: " + data.metadata[0].location)
        var li6 = d3.select("#sample-metadata").append("li").text("Bbtype: " + data.metadata[0].bbtype)
        var li7 = d3.select("#sample-metadata").append("li").text("Wfreq: " + data.metadata[0].wfreq)

        var samp_values = data.samples[0].sample_values;
        var otu_ids = data.samples[0].otu_ids;

        var slicedValues = samp_values.slice(0,10);
        var slicedIds = otu_ids.slice(0,10).map(String);
        // var sortedValues = slicedIds.sort((firstNum, secondNum) => firstNum - secondNum);
        // var reveseSort = sortedValues.reverse()
        // var yAxisAsString = reveseSort.map(String);

        var otu_labels = data.samples[0].otu_labels;
        var sliced_labels = otu_labels.slice(0,10);

        console.log(slicedValues);
        console.log(slicedIds);

        var data = [{
            type: 'bar',
            x: slicedValues,
            y: slicedIds,
            // y: `OTU ${yAxisAsString}`,
            orientation: 'h',
        }];

        var layout = {
            title: "Test",
            xaxis: { title: "Sample Values"},
            yaxis: { title: "OTU IDs",
                     tickvals: slicedIds,
                     automargin: true},
            bargap: .5
        
        };

        Plotly.newPlot('bar', data, layout);

        var trace2 = {
            x: otu_ids,
            y: samp_values,
            mode: 'markers',
            marker: { size: samp_values }
        };

        var data2 = [trace2];

        var layout2 = {
            title: "Test2",
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot("bubble", data2, layout2);
        
    
    });

    

        

        

    

}

function optionChanged(newSample){

    // var dropdownMenu = d3.select("#selDataset");
    // var dataset = dropdownMenu.property("value");
    // var data = ids
    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

