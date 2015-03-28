// Todo.ly specs

var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic aDNucnlAeW9wbWFpbC5jb206YWJjLjEyMw=='
		},
		json: true
	}
});

for (var i = 0; i < 10; i++) {
	var now = new Date();
	var project = {
		"Content": "Project Test " + i + '- '+ now.getTime()
	};
	frisby.create('Create project')
		.post('https://todo.ly/api/projects.json', project)
		.inspectJSON()
		.expectJSON(project)
	.toss();
}
