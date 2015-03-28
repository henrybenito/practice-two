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
var newItem = {
    "Content": "CRUD Create Item " + now.getTime()

};

frisby.create('Create item')
    .post('https://todo.ly/api/items.json', newItem, {json: true})
    .expectStatus(200)
    .inspectJSON()
    .expectJSON(newItem)
    .afterJSON(function(json){
        var newItemId = json.Id;
        frisby.create('Read item')
            .get('https://todo.ly/api/items/' + newItemId + '.json', newItem, {json: true})
            .expectStatus(200)
            .inspectJSON()
            .expectJSON(newItem)
            .afterJSON(function(json){
                var updatedItem = {
                    "Content": "CRUD Update Item " + now.getTime()
                };
                frisby.create('Update item')
                    .put('https://todo.ly/api/items/' + newItemId + '.json', updatedItem, {json: true})
                    .expectStatus(200)
                    .inspectJSON()
                    .expectJSON(updatedItem)
                    .afterJSON(function(json){
                        frisby.create('Delete item')
                            .delete('https://todo.ly/api/items/' + newItemId + '.json', {}, {json: true})
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
