var Backbone = require('backbone');
var Territory = require('models/Territory');

module.exports = Backbone.PageableCollection.extend({
    model: Territory,
    url: "../test/data/pageable-territories.json",
    state: {
        pageSize: 15
    },
    mode: "client" // page entirely on the client side
});