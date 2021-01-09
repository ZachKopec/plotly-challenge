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

        d3.select("#sample-metadata").append("li").text("ID: " + data.metadata[0].id)
        d3.select("#sample-metadata").append("li").text("Ethnicity: " + data.metadata[0].ethnicity)
        d3.select("#sample-metadata").append("li").text("Gender: " + data.metadata[0].gender)
        d3.select("#sample-metadata").append("li").text("Age: " + data.metadata[0].age)
        d3.select("#sample-metadata").append("li").text("Location: " + data.metadata[0].location)
        d3.select("#sample-metadata").append("li").text("Bbtype: " + data.metadata[0].bbtype)
        d3.select("#sample-metadata").append("li").text("Wfreq: " + data.metadata[0].wfreq)

        var samp_values = data.samples[0].sample_values;
        var otu_ids = data.samples[0].otu_ids;
        var otu_labels = data.samples[0].otu_labels;

        var slicedValues = samp_values.slice(0,10);
        var slicedIds = otu_ids.slice(0,10);
        var slicedLabels = otu_labels.slice(0,10);

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
            width: .5,
            text: slicedLabels
        };

        var data = [trace1];

        var layout = {
            // title: "Test",
            // xaxis: { title: "Sample Values" },
            // yaxis: { title: "OTU IDs"},
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
        
    
    });

}

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(newSample){

    d3.json("samples.json").then((importedData) => {
        
        var data = importedData;

        var dropMenu = d3.select("#selDataset");
        var newDataSet = dropMenu.property("value");
    
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
                    // title: "Test",
                    // xaxis: { title: "Sample Values" },
                    // yaxis: { title: "OTU IDs"},
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

