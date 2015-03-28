// Frisby tests

var frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic aDNucnlAeW9wbWFpbC5jb206YWJjLjEyMw=='
        },
    }
});

var now = new Date();
var newProject = {
    "Content": "CRUD Create Project " + now.getTime(),
    "Icon": 6
};

frisby.create('Create project')
    .post('https://todo.ly/api/projects.json', newProject, {json: true})
    .expectStatus(200)
    .inspectJSON()
    .expectJSON(newProject)
    .afterJSON(function(json){
        var newProjectId = json.Id;
        frisby.create('Read project')
            .get('https://todo.ly/api/projects/' + newProjectId + '.json', newProject, {json: true})
            .expectStatus(200)
            .inspectJSON()
            .expectJSON(newProject)
            .afterJSON(function(json){
                var updatedProject = {
                    "Content": "CRUD Update Project " + now.getTime(),
                    "Icon": 3
                };        
                frisby.create('Update project')
                    .put('https://todo.ly/api/projects/' + newProjectId + '.json', updatedProject, {json: true})
                    .expectStatus(200)
                    .inspectJSON()
                    .expectJSON(updatedProject)
                    .afterJSON(function(json){
                        frisby.create('Delete project')
                            .delete('https://todo.ly/api/projects/' + newProjectId + '.json', {}, {json: true})
                            .expectStatus(200)
                            .inspectJSON()
                            .expectJSON({
                                Deleted: true
                            })
                        .toss();
                    })
                .toss();
            })
        .toss();
    })
.toss();
