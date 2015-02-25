var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Backgrid = require('backgrid');
var PageableCollection = require('backbone-pageable');
//var pageableTerritories = require('../../test/data/pageable-territories');
require('underscore');
require('lunr');
var BackgridPaginator = require('./lib/backgrid-paginator');
var BackgridFilter = require('./lib/backgrid-filter');
var BackgridSelectAll = require('./lib/backgrid-select-all');

var Territory = Backbone.Model.extend({});
var Territories = Backbone.Collection.extend({
    model: Territory,
    url: "../../backgrid-browserify-example/territories.json"
});
var territories = new Territories();
var columns = [{
    name: 'id', // The key of the model attribute
    label: 'ID', // The name to display in the header
    editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
    // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
    cell: Backgrid.IntegerCell.extend({
        orderSeparator: ''
    })
}, {
    name: 'name',
    label: 'Name',
    // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
    cell: 'string' // This is converted to 'StringCell' and a corresponding class in the Backgrid package namespace is looked up
}, {
    name: 'pop',
    label: 'Population',
    cell: 'integer' // An integer cell is a number cell that displays humanized integers
}, {
    name: 'percentage',
    label: '% of World Population',
    cell: 'number' // A cell type for floating point value, defaults to have a precision 2 decimal numbers
}, {
    name: 'date',
    label: 'Date',
    cell: 'date'
}, {
    name: 'url',
    label: 'URL',
    cell: 'uri' // Renders the value in an HTML anchor element
}];
// Initialize a new Grid instance
var grid = new Backgrid.Grid({
    columns: columns,
    collection: territories
});
// Render the grid and attach the root to your HTML document
$('#example-1-result').append(grid.render().el);

// Fetch some countries from the url
territories.fetch({reset: true});

/********************************************
 *     Example 2
*********************************************/
var PageableTerritories = Backbone.PageableCollection.extend({
    model: Territory,
    url: '../../backgrid-browserify-example/pageable-territories.json',
    state: {
        pageSize: 15
    },
    mode: "client" // page entirely on the client side
});
var pageableTerritories = new PageableTerritories();
// Set up a grid to use the pageable collection
var pageableGrid = new Backgrid.Grid({
    columns: [{
        // enable the select-all extension
        name: "",
        cell: "select-row",
        headerCell: "select-all"
    }].concat(columns),
    collection: pageableTerritories
});

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
