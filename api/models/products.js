/**
 *  neo4j movie functions
 *  these are mostly written in a functional style
 */


var _ = require('underscore');
var uuid = require('hat'); // generates uuids
var Cypher = require('../neo4j/cypher');
var Products = require('../models/neo4j/products');
var async = require('async');
var randomName = require('random-name');

/**
 *  Result Functions
 *  to be combined with queries using _.partial()
 */

 var _products = function(results, callback) {
  var productsArray = [];

  var products = _.map(results, function (result) {
  var thisProducts = {};
    thisProducts.productName = result.productName;
    thisProducts.productID = result.productID;
    thisProducts.productEAN = result.productEAN;
    productsArray.push(thisProducts);
    return thisProducts;
  });

  callback(null, productsArray);
};


var _product = function(results, callback) {

    var product = _.map(results, function (result) {
        var thisProduct = {};
        thisProduct.productName = result.productName;
        thisProduct.productID = result.productID;
        thisProduct.imageURL = result.imageURL;
        return thisProduct;
    });

    callback(null, product);
};


var _brands = function(results, callback) {
    var brandsArray = [];

    var brands = _.map(results, function (result) {
        var thisBrands = {};
        thisBrands.brandName = result.brandName;
        brandsArray.push(thisBrands);
        return thisBrands;
    });

    callback(null, brandsArray);
};

var _stores = function(results, callback) {
    var storesArray = [];

    var stores = _.map(results, function (result) {
        var thisStores = {};
        thisStores.storeName = result.storeName;
        storesArray.push(thisStores);
        return thisStores;
    });

    callback(null, storesArray);
};


var _getProducts = function (params, options, callback) {

  var query = [
    'MATCH (p:Product) ',
    'WHERE p.productName IS NOT NULL ',
    'RETURN DISTINCT p.productName as productName, p.productID as productID, p.productEAN as productEAN LIMIT 25 '
  ].join('\n');

  callback(null, query, params);
};

var _getProduct = function (params, options, callback) {

    var query = [
        "MATCH (p:Product{productID: '" + params.productID + "'})-[:VISUALIZED_BY]->(image:Image) ",
        'WHERE (image.imageType = "standard") ',
        'RETURN DISTINCT p.productName as productName, ',
        'p.productID as productID, ',
        'image.imageURL as imageURL'
    ].join('\n');

    callback(null, query, params);
};


var _getBrands = function (params, options, callback) {

    var query = [
        'MATCH (b:Brand)',
        'WHERE b.brandName IS NOT NULL ',
        'RETURN DISTINCT b.brandName as brandName LIMIT 25 '
    ].join('\n');

    callback(null, query, params);
};

var _getStores = function (params, options, callback) {

    var query = [
        'MATCH (s:Store)',
        'WHERE s.storeName IS NOT NULL ',
        'RETURN DISTINCT s.storeName as storeName LIMIT 25 '
    ].join('\n');

    callback(null, query, params);
};

/**
 *  Result Function Wrappers
 *  a wrapper function that combines both the result functions with query functions
 */

var getProducts = Cypher(_getProducts, _products);
var getProduct = Cypher(_getProduct, _product);
var getBrands = Cypher(_getBrands, _brands);
var getStores = Cypher(_getStores, _stores);


// export exposed functions
module.exports = {
  getProducts: getProducts,
    getProduct: getProduct,
    getBrands: getBrands,
    getStores: getStores
};