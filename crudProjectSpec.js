// Frisby tests

var frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic aDNucnlAeW9wbWFpbC5jb206YWJjLjEyMw=='
        },
    }
});

/*
frisby.create('Test google main page')
    .get('http://www.google.com')
    .expectStatus(200)
.toss();

frisby.create('Validate "user is not authenticated" when getting all projects without auth.')
    .get('https://todo.ly/api/projects.json')
    .expectStatus(200)
    .expectJSON({
         ErrorCode: 102
    })
    .inspectJSON()
.toss();
*/
/*
frisby.create('Get all projects')
    .get('https://todo.ly/api/projects.json')
    .expectStatus(200)
    //.afterJSON(function(json){
        //expect(json.length).toBeGreaterThan(0);
        //console.log('AFTER JSON')
    //})
    .after(function(e, r, body){
        var json = JSON.parse(body);
        expect(json.length).toBeGreaterThan(0);
    })
    //.inspectJSON()
.toss();
*/
/*
var newProject = {
    "Content": "CRUD Project",
    "Icon": 6,
};

frisby.create('Create project')
    .post('https://todo.ly/api/projects.json', project, {json: true})
    .inspectJSON()
    .expectJSON(project)
    .expectJSONTypes({
        Id: Number
    })
    .afterJSON(function(json){
        //console.log(body);
        //var json = JSON.parse(body);
        var newProjectId = json.Id;
        console.log('NEW PROJECT ID:', newProjectId);
        
        var updateProjectInfo = {
            "Content": "AAAA-BBBBBBBBBBBBBBBBBBBBBB"
        };

        frisby.create('Update project')
            .put('https://todo.ly/api/projects/' + newProjectId + '.json', updateProjectInfo, {json: true})
            .expectJSON(updateProjectInfo)
            .afteJSON(function(json){
            
                frisby.create('Update project')
                    .delete('https://todo.ly/api/projects/' + newProjectId + '.json', {}, {json: true})
                    .expectJSON({
                        Deleted: true
                    })
                .toss();
            })
        .toss();
        
    })
.toss();

*/
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
