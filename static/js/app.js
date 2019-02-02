// data
var tableData = data;

// table body
var tbody = d3.select('tbody');

// function to fill in table data
function fillTable(data) {
	
	// first empty the table
	tbody.selectAll('*').remove();

	// 
	data.forEach((sighting) => {
	
		//rows
		var row = tbody.append('tr');

		// cells
		Object.entries(sighting).forEach(([key, value]) => {
			var cell = tbody.append('td');
			cell.text(value);
		});	

	}) ;
};

// fill for all data at start
fillTable(tableData);

// filter button
var filter = d3.select('#filter-btn');

// filter function
filter.on('click', function() {

	//prevent refreshes
	d3.event.preventDefault();

	// read date
	var date = d3.select('#datetime').property('value');

	// filter data
	if (date !== "") {
		var filteredData = tableData.filter(sighting => sighting.datetime === date);
	}
	// if date is empty, consider that to be removing the filter (all data)
	else {
		var filteredData = tableData;
	};

	// fill table with filtered data
	fillTable(filteredData);
});


