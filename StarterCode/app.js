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

