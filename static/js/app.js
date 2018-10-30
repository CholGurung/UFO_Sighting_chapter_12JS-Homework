// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");
//console.log("Data: ",data);

//Step 1. loop through the data and console.log each ufo sighting reports
data.forEach(function(ufoSighting) {
    //console.log(ufoSighting);
    var row = tbody.append("tr");

    Object.entries(ufoSighting).forEach(function([key, value]){
       // console.log(key, value);
        var cell = tbody.append("td");
        cell.style("border:1px solid black");
        cell.text(value);
    });
    
});

//event on filter submit button
var filterBtn = d3.select("#filter-btn");

function handleClick(event)
//filterBtn.on("click", function()
{
    console.log("filter btn was clicked");

    //prevent the page from refreshing
    d3.event.preventDefault();

    //clear the previous table content
    tbody.selectAll("td").remove();

      // Select the input element and get the raw HTML node
    var inputDate = d3.select("#datetime");
    console.log("inputdate: " , inputDate);
    var inputState = d3.select("#state");
    var inputCity = d3.select("#city");
    var inputCountry = d3.select("#country");
    var inputShape = d3.select("#shape");

    
    // Get the value property of the date input element and other form input elements
    var inputValue = inputDate.property("value");
    console.log(inputValue);
    var stateValue = inputState.property("value");
    var cityValue = inputCity.property("value");
    var countryValue = inputCountry.property("value");
    var shapeValue = inputShape.property("value");
    
    
    var filteredData = tableData.filter(tableData => tableData.datetime === inputValue);
    console.log(filteredData);
    //var filteredState = tableData.filter(tableData => tableData.state === stateValue);
    //var filteredCity = tableData.filter(tableData => tableData.city === cityValue);
   // var filteredCountry = tableData.filter(tableData => tableData.country === countryValue);
   // var filteredShape = tableData.filter(tableData => tableData.shape === shapeValue);
    
    // if only date filter is available
    if(inputDate && !stateValue && !cityValue && !countryValue && !shapeValue ) {
     filteredData.forEach((ufosight) => {
         var row = tbody.append("tr");

         Object.entries(ufosight).forEach(([key, value]) => {
            var cell = tbody.append("td").attr("border",1);
            cell.text(value);
         });
     }); 
    }
     //d3.selectAll("tbody").remove();
     //multiple filter elements are available
    else {
    var filteredAll = tableData.filter(
                 tableData => ((tableData.datetime === inputValue || inputValue === "")
                 && (tableData.state === stateValue || stateValue === "")
                 && (tableData.city === cityValue || cityValue === "")
                 && (tableData.country === countryValue || countryValue === "")
                 && (tableData.shape === shapeValue || shapeValue === "")));
                 filteredAll.forEach((ufosight) => {
                    var row = tbody.append("tr");
           
                    Object.entries(ufosight).forEach(([key, value]) => {
                       var cell = tbody.append("td").attr("border",1);
                       cell.text(value);
                    });
                });  
     
     
    }
}
filterBtn.on("click",handleClick);