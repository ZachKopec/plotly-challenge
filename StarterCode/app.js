// Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then((importedData) => {
        
        // Set variable to hold imported data
        var data = importedData;
        
        // Retrieve just the ids from the data
        var id_list = data.names

        // Append an option for each of the available ids in the id_list
        d3.select("#selDataset").selectAll("option")
            .data(id_list)
            .enter()
            .append("option")
            .text(function(d) {
                return d;
            });

        // Append a list item for all of the available metadata stats
        d3.select("#sample-metadata").append("li").text("ID: " + data.metadata[0].id)
        d3.select("#sample-metadata").append("li").text("Ethnicity: " + data.metadata[0].ethnicity)
        d3.select("#sample-metadata").append("li").text("Gender: " + data.metadata[0].gender)
        d3.select("#sample-metadata").append("li").text("Age: " + data.metadata[0].age)
        d3.select("#sample-metadata").append("li").text("Location: " + data.metadata[0].location)
        d3.select("#sample-metadata").append("li").text("Bbtype: " + data.metadata[0].bbtype)
        d3.select("#sample-metadata").append("li").text("Wfreq: " + data.metadata[0].wfreq)
        
        // Create variables to store object items for use in charts
        var samp_values = data.samples[0].sample_values;
        var otu_ids = data.samples[0].otu_ids;
        var otu_labels = data.samples[0].otu_labels;
        
        // Slice the created variables to get the top ten of each item
        var slicedValues = samp_values.slice(0,10);
        var slicedIds = otu_ids.slice(0,10);
        var slicedLabels = otu_labels.slice(0,10);

        //Array to hold converted id strings
        var newIdArray = []

        // Loop through each id, convert to string and push to array
        for(var i = 0; i < slicedIds.length; i++){
            var nextId = "OTU " + slicedIds[i].toString()
            newIdArray.push(nextId)
        }

        // Create a trace for bar chart
        var trace1 = {
            x: slicedValues,
            y: newIdArray,
            orientation: 'h',
            type: 'bar',
            width: .5,
            text: slicedLabels
        };

        // Assign trace to variable
        var data = [trace1];

        // Create a layout for bar chart
        var layout = {
            width: 1000
        };

        // Plot bar chart
        Plotly.newPlot('bar', data, layout);


        // Create a trace for bubble chart
        var trace2 = {
            x: otu_ids,
            y: samp_values,
            mode: 'markers',
            marker: { size: samp_values,
                      color: otu_ids },
            text: slicedLabels
        };

        // Assign trace to variable
        var data2 = [trace2];

        //Create a layout for bubble chart
        var layout2 = {
            showlegend: false,
            height: 600,
            width: 1000
        };

        // Plot bubble chart
        Plotly.newPlot("bubble", data2, layout2);
        
    });

}

// Line to initiate function when dropdown option changes
d3.selectAll("#selDataset").on("change", optionChanged);

// Function to change charts according to dropdown option selection
function optionChanged(newSample){

    d3.json("samples.json").then((importedData) => {
        
        var data = importedData;

        var dropMenu = d3.select("#selDataset");
        var newDataSet = dropMenu.property("value");
        
        // Loop through dataset
        for(var i = 0; i < data.names.length; i++){
            // Conditional for when the option selected finds a match in the dataset 
            if(newDataSet === data.names[i]) {
                // Removes all list items in the metadata section
                d3.select("#sample-metadata").selectAll("li")
                    .remove();
                // Add the metadata of the selected option
                d3.select("#sample-metadata").append("li").text("ID: " + data.metadata[i].id)
                d3.select("#sample-metadata").append("li").text("Ethnicity: " + data.metadata[i].ethnicity)
                d3.select("#sample-metadata").append("li").text("Gender: " + data.metadata[i].gender)
                d3.select("#sample-metadata").append("li").text("Age: " + data.metadata[i].age)
                d3.select("#sample-metadata").append("li").text("Location: " + data.metadata[i].location)
                d3.select("#sample-metadata").append("li").text("Bbtype: " + data.metadata[i].bbtype)
                d3.select("#sample-metadata").append("li").text("Wfreq: " + data.metadata[i].wfreq)
            
                // Variables of the selected option
                var samp_values = data.samples[i].sample_values;
                var otu_ids = data.samples[i].otu_ids;
                var otu_labels = data.samples[i].otu_labels;
        
                var slicedValues = samp_values.slice(0,10);
                var slicedIds = otu_ids.slice(0,10);
                var slicedLabels = otu_labels.slice(0,10);
        
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
                    width: .5,
                    text: slicedLabels
                };
        
                var data = [trace1];
        
                var layout = {
                    width: 1000
                };
        
                Plotly.newPlot('bar', data, layout);

                var trace2 = {
                    x: otu_ids,
                    y: samp_values,
                    mode: 'markers',
                    marker: { size: samp_values,
                              color: otu_ids },
                    text: slicedLabels
                };
        
                var data2 = [trace2];
        
                var layout2 = {
                    // title: "Test2",
                    showlegend: false,
                    height: 600,
                    width: 1000
                };
        
                Plotly.newPlot("bubble", data2, layout2);
        
    
            }
        }

    });

}

// Initialize dashboard on page load
init();

