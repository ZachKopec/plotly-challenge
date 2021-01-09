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
        var slicedIds = otu_ids.slice(0,10);

        var newIdArray = []

        for(var i = 0; i < slicedIds.length; i++){
            var nextId = "OTU " + slicedIds[i].toString()
            newIdArray.push(nextId)
        }

        var trace1 = {
            x: slicedValues,
            y: newIdArray,
            orientation: 'h',
            type: 'bar',
            width: .5
        };

        var data = [trace1];

        var layout = {
            title: "Test",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs"},
            width: 1000
        };

        Plotly.newPlot('bar', data, layout);

        var trace2 = {
            x: otu_ids,
            y: samp_values,
            mode: 'markers',
            marker: { size: samp_values,
                      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                      opacity: [1, 1, 1, 1] }
        };

        var data2 = [trace2];

        var layout2 = {
            title: "Test2",
            showlegend: false,
            height: 600,
            width: 1000
        };

        Plotly.newPlot("bubble", data2, layout2);
        
    
    });

}

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(newSample){

    d3.json("samples.json").then((importedData) => {
        
        var data = importedData;

        var dropMenu = d3.select("#selDataset");
        var newDataSet = dropMenu.property("value");
        console.log(newDataSet);
        var newData = [];
    
        for(var i = 0; i < data.names.length; i++){
            if(newDataSet === data.names[i]) {
                console.log("Dataset " + newDataSet + " found")
                d3.select("#sample-metadata").selectAll("li")
                    .remove();
                d3.select("#sample-metadata").append("li").text("ID: " + data.metadata[i].id)
                d3.select("#sample-metadata").append("li").text("Ethnicity: " + data.metadata[i].ethnicity)
                d3.select("#sample-metadata").append("li").text("Gender: " + data.metadata[i].gender)
                d3.select("#sample-metadata").append("li").text("Age: " + data.metadata[i].age)
                d3.select("#sample-metadata").append("li").text("Location: " + data.metadata[i].location)
                d3.select("#sample-metadata").append("li").text("Bbtype: " + data.metadata[i].bbtype)
                d3.select("#sample-metadata").append("li").text("Wfreq: " + data.metadata[i].wfreq)
            
                var samp_values = data.samples[i].sample_values;
                var otu_ids = data.samples[i].otu_ids;
        
                var slicedValues = samp_values.slice(0,10);
                var slicedIds = otu_ids.slice(0,10);
        
                var newIdArray = []
        
                for(var j = 0; j < slicedIds.length; j++){
                    var nextId = "OTU " + slicedIds[j].toString()
                    newIdArray.push(nextId)
                }
        
                var trace1 = {
                    x: slicedValues,
                    y: newIdArray,
                    orientation: 'h',
                    type: 'bar',
                    width: .5
                };
        
                var data = [trace1];
        
                var layout = {
                    title: "Test",
                    xaxis: { title: "Sample Values" },
                    yaxis: { title: "OTU IDs"},
                    width: 1000
                };
        
                Plotly.newPlot('bar', data, layout);

                var trace2 = {
                    x: otu_ids,
                    y: samp_values,
                    mode: 'markers',
                    marker: { size: samp_values,
                              color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                              opacity: [1, 1, 1, 1] }
                };
        
                var data2 = [trace2];
        
                var layout2 = {
                    title: "Test2",
                    showlegend: false,
                    height: 600,
                    width: 1000
                };
        
                Plotly.newPlot("bubble", data2, layout2);
        
    
            }
        }

    });

    

    // Update metadata with newly selected sample


    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

