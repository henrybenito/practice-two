// Frisby tests

var frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic aDNucnlAeW9wbWFpbC5jb206YWJjLjEyMw=='
        },
        json: true
    }
});

/*Project*/
var now = new Date();
var newProject = {
    "Content": "",
    "Icon": 5
};
var errorDataEmptyProjectName = {
    "ErrorMessage": "Too Short Project Name",
    "ErrorCode": 305
}
frisby.create('Given empty name for new project an error code 305 is displayed')
    .post('https://todo.ly/api/projects.json', newProject, {json: true})
    .expectStatus(200)
    .expectJSON(errorDataEmptyProjectName)
    .inspectJSON()    
.toss();

/*User*/
var newUser = {
    "Email": name + "@yopmail.com",
    "Password": "abc.123",
    "FullName": ""
};
var errorDataEmptyUserName = {
    "ErrorMessage": "Invalid FullName",
    "ErrorCode": 306
}

frisby.create('Given empty name for new user an error code 306 is displayed')
    .post('https://todo.ly/api/user.json', newUser, {json: true})
    .expectStatus(200)
    .inspectJSON()
    .expectJSON(errorDataEmptyUserName)
.toss();


var name = "cruduser2";
var newUser2 = {
    "Email": name,
    "Password": "abc.123",
    "FullName": name
};
var errorDataWrongUserMail = {
    "ErrorMessage": "Invalid Email Address",
    "ErrorCode": 307
}

frisby.create('Given wrong email for new user an error code 307 is displayed')
    .post('https://todo.ly/api/user.json', newUser2, {json: true})
    .expectStatus(200)
    .inspectJSON()
    .expectJSON(errorDataWrongUserMail)
.toss();


var newUser3 = {
    "Email": "h3nry@yopmail.com",
    "Password": "abc.123",
    "FullName": "name"
};
var errorDataDuplicateUserMail = {
    "ErrorMessage": "Account with this email address already exists",
    "ErrorCode": 201
}

frisby.create('Given wrong email for new user an error code 307 is displayed')
    .post('https://todo.ly/api/user.json', newUser3, {json: true})
    .expectStatus(200)
    .inspectJSON()
    .expectJSON(errorDataDuplicateUserMail)
.toss();

/*Item*/
var errorInvalidIDProject = {
    "ErrorMessage": "Invalid Project Id",
    "ErrorCode": 304
}
var newProjectId = 241284;
var newItem = {
"Content": "New Item",
"ProjectId": newProjectId
};
frisby.create('and inside create a new item')
    .post('https://todo.ly/api/items.json', newItem, {json: true})
    .expectStatus(200)
    .inspectJSON()
    .expectJSON(errorInvalidIDProject)
.toss();