

//------------------------- FUNCTION TO FILL IN TABLE -------------------------------//


var tbody = d3.select('tbody');

function fillTable(data) {
	
	// first empty the table
	tbody.selectAll('*').remove();

	// for each record
	data.forEach((sighting) => {
	
		// add a row
		var row = tbody.append('tr');

		// and cells
		Object.entries(sighting).forEach(([key, value]) => {
			var cell = tbody.append('td');
			cell.text(value);
		});	

	}) ;
};


//------------------------- FILL IN ALL DATA AT START TIME --------------------------//


fillTable(data);


//---------------------------- FILL IN DROPDOWN OPTIONS -----------------------------//


var countryDropdown = d3.select('#country');
var shapeDropdown = d3.select('#shape');
var stateDropdown = d3.select('#state'); var stateBox = d3.select('#state-box');
var cityDropdown = d3.select('#city'); var cityBox = d3.select('#city-box');

// get unique values in dataset
const countries = [...new Set(data.map(sighting => sighting.country))];
const shapes = [...new Set(data.map(sighting => sighting.shape))];
		
// fill in dropdowns
countries.forEach((country) => countryDropdown.append('option').text(country));
shapes.forEach((shape) => shapeDropdown.append('option').text(shape));

// when a country is selected, show states dropdown with only relevant states
countryDropdown.on('change', function() {
	
	// reset states dropdown
	stateDropdown.selectAll('*').remove();
	stateDropdown.append('option').text('Any');
	
	// reset cities dropdown
	cityDropdown.selectAll('*').remove();
	cityDropdown.append('option').text('Any');

	// get chosen country
	var country = countryDropdown.property('value');

	if (country !== "Any") {
		// get states in chosen country
		var states = [...new Set(data.filter(sighting => sighting.country === country).map(sighting => sighting.state))];
		
		// fill in states dropdown with filtered list
		states.forEach((state) => stateDropdown.append('option').text(state));

		// show states dropdown
		stateBox.style("display", "block");	

		// hide cities dropdown
		cityBox.style("display", "none");	
	}
	else {
		// hide both dropdowns when reseting to 'any' country
		stateBox.style("display", "none");	
		cityBox.style("display", "none");	
	}
});

// when a state is selected, show cities dropdown with only relevant cities
stateDropdown.on('change', function() {
	
	// reset cities dropdown
	cityDropdown.selectAll('*').remove();
	cityDropdown.append('option').text('Any');
	
	// get chosen state
	var state = stateDropdown.property('value');

	if (state !== "Any") {
		// get cities in chosen state
		var cities = [...new Set(data.filter(sighting => sighting.state === state).map(sighting => sighting.city))];

		// fill in cities dropdown with filtered list
		cities.forEach((city) => cityDropdown.append('option').text(city));

		// show cities dropdown
		cityBox.style("display", "block");
	}
	else {
		// hide cities dropdown when reseting to 'any' state
		cityBox.style("display", "none");
	}
});


//---------------------------------- FILTER TABLE ------------------------------------//


var filter = d3.select('#filter-btn');

filter.on('click', function() {

	//prevent refreshes
	d3.event.preventDefault();

	// read filters
	var date = d3.select('#datetime').property('value');
	var country = countryDropdown.property('value');
	var state = stateDropdown.property('value');
	var city = cityDropdown.property('value');
	var shape = shapeDropdown.property('value');

	// reset to all data
	var filteredData = data;

	// filter by date
	if (date !== "") {
		var filteredData = filteredData.filter(sighting => sighting.datetime === date);
	}

	// filter by geography
	if (city !== "Any") {
		var filteredData = filteredData.filter(sighting => sighting.city === city);
	}
	else if (state !== "Any") {
		var filteredData = filteredData.filter(sighting => sighting.state === state);
	}
	else if (country !== "Any") {
		var filteredData = filteredData.filter(sighting => sighting.country === country);	
	};
	
	// filter by shape
	if (shape !== "Any") {
		var filteredData = filteredData.filter(sighting => sighting.shape === shape);
	}

	// fill table with filtered data
	fillTable(filteredData);

});

//------------------------------------------------------------------------------------//


