const filepath = './daily.csv'
var csv = require('csvtojson'),
	fs = require('fs'),
	df = require('dateformat')

var daily = {}
console.log('starting csv parsing')
csv().fromFile(filepath)
.on('json', (jsonData) => {
	JSON.parse(JSON.stringify(jsonData)) // i'm not sure why i'm doing this

	// index each entry by the data :D
	var date = convertDate(jsonData.date)
	if(date) {
		jsonData.date = date
		daily[date] = jsonData
	}
	else {
		console.log('there is a broken date in the csv file - check the entry with the title: ' + jsonData.title )
	}
})
.on('done', (error) => {
	console.log('done csv parsing -- json can be found at ' + __dirname + '/daily.json')
	save(daily, 'daily.json');
	// console.log(daily)
})

function save(results, filename) {
	console.log('saving file to ' + filename)
	var jsonToSave = JSON.stringify(results)
	fs.writeFile(filename, jsonToSave, 'utf8', (error) => {
		if (error) console.log(error);
		else console.log('file saved')
	})
}

function escapeRegExp(text) {
  return text.replace("/'/g", "TEST");
}

function convertDate(dateString) {
	var d = new Date(dateString);
	if(d instanceof Date) {
		return df(d, 'yyyy-mm-dd');
	}
	return null
}
