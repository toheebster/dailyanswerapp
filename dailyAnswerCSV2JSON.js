const filepath = '/Users/toheeb/Desktop/projects/dailyanswerapp/daily.csv'
var csv = require('csvtojson'),
	fs = require('fs')

var daily = {}
csv().fromFile(filepath)
.on('json', (jsonData) => {
	JSON.parse(JSON.stringify(jsonData))
	// index each entry by the data :D
	var date = jsonData.date
	if(date) {
		daily[date] = jsonData
	}
})
.on('done', (error) => {
	console.log('done parsing json')
	save(daily, 'daily.json');
	console.log(daily)
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
