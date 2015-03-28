// Frisby tests

var frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic Zmxvd3VzZXJAeW9wbWFpbC5jb206YWJjLjEyMw=='
        }
    }
});

/*flowuser@yopmail.com:abc.123*/


var now = new Date();
var name = "flowuser";

var newUser = {
    "Email": name + "@yopmail.com",
    "Password": "abc.123",
    "FullName": name
};
var expectedNewUser = {
    "Email": name + "@yopmail.com",
    "FullName": name
};

frisby.create('Given a new user')
    .post('https://todo.ly/api/user.json', newUser, {json: true})
    .expectStatus(200)
    .inspectJSON()
    .expectJSON(expectedNewUser)
    .afterJSON(function(json){
        var newUserId = json.Id;
        var now = new Date();
        var newProject = {
            "Content": "HB Project " + now.getTime(),
            "Icon": 3
        };
        frisby.create('Create a new project')
            .post('https://todo.ly/api/projects.json', newProject, {json: true})
            .expectStatus(200)
            .inspectJSON()
            .expectJSON(newProject)
            .afterJSON(function(json){
                var newProjectId = json.Id;
                var newItem = {
                "Content": "New Item " + now.getTime(),
                "ProjectId": newProjectId
                };
                frisby.create('and inside create a new item')
                    .post('https://todo.ly/api/items.json', newItem, {json: true})
                    .expectStatus(200)
                    .inspectJSON()
                    .expectJSON(newItem)
                    .afterJSON(function(json){
                        frisby.create('and delete the user')
                            .delete('https://todo.ly/api/user/' + newUserId + '.json', {}, {json: true})
                            .expectStatus(200)
                            .inspectJSON()
                        .toss();
                    })
                .toss();
            })
        .toss();
    })
.toss();
