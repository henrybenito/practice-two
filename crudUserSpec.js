// Frisby tests

var frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic Y3J1ZHVzZXJAeW9wbWFpbC5jb206YWJjLjEyMw=='
        },
    }
});

/*cruduser@yopmail.com:abc.123*/

function randomName()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var now = new Date();
var name = "cruduser";

var newUser = {
    "Email": name + "@yopmail.com",
    "Password": "abc.123",
    "FullName": name
};
var expectedNewUser = {
    "Email": name + "@yopmail.com",
    "FullName": name
};

frisby.create('Create user')
    .post('https://todo.ly/api/user.json', newUser, {json: true})
    .expectStatus(200)
    .inspectJSON()
    .expectJSON(expectedNewUser)
    .afterJSON(function(json){
        var newUserId = json.Id;
        frisby.create('Read user')
            .get('https://todo.ly/api/user/' + newUserId + '.json', newUser, {json: true})
            .expectStatus(200)
            .inspectJSON()
            .expectJSON(expectedNewUser)
            .afterJSON(function(json){
                var updatedUser = {
                    "FullName": name + name
                };
                frisby.create('Update user')
                    .put('https://todo.ly/api/user/' + newUserId + '.json', updatedUser, {json: true})
                    .expectStatus(200)
                    .inspectJSON()
                    .expectJSON(updatedUser)
                    .afterJSON(function(json){
                        frisby.create('Delete user')
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
