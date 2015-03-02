var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Backgrid = require('backgrid');
var PageableCollection = require('backbone-pageable');
require('underscore');
require('lunr');
var BackgridPaginator = require('./lib/backgrid-paginator');
var BackgridFilter = require('./lib/backgrid-filter');
var BackgridSelectAll = require('./lib/backgrid-select-all');

var Territory = require('./models/Territory');
var PageableTerritories = require('./collections/Territories');

var pageableTerritories = new PageableTerritories();

// Set up a grid to use the pageable collection
var pageableGrid = require('./grids/PageableGrid')(pageableTerritories);

//
//  View Stuff
//

// Render the grid
var $example2 = $("#example-2-result");
$example2.append(pageableGrid.render().el);

// Initialize the paginator
var paginator = new BackgridPaginator.Paginator({
    collection: pageableTerritories
});

// Render the paginator
$example2.after(paginator.render().el);

// Initialize a client-side filter to filter on the client
// mode pageable collection's cache.
var filter = new BackgridFilter.ClientSideFilter({
    collection: pageableTerritories,
    fields: ['name']
});

// Render the filter
$example2.before(filter.render().el);
// Add some space to the filter and move it to the right
$(filter.el).css({float: "right", margin: "20px"});
// Fetch some data
pageableTerritories.fetch({reset: true});
