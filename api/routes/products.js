// movies.js
var Products = require('../models/products');
var sw = require("swagger-node-express");
var param = sw.params;
var url = require("url");
var swe = sw.errors;
var _ = require('underscore');


/*
 *  Util Functions
 */

function writeResponse(res, response, start) {
    sw.setHeaders(res);
    res.header('Duration-ms', new Date() - start);
    if (response.neo4j) {
        res.header('Neo4j', JSON.stringify(response.neo4j));
    }
    res.send(JSON.stringify(response.results));
}

function parseUrl(req, key) {
    return url.parse(req.url, true).query[key];
}

function parseBool(req, key) {
    return 'true' == url.parse(req.url, true).query[key];
}


/*
 * API Specs and Functions
 */


exports.getProducts = {
    'spec': {
        "description": "Get a list of products",
        "path": "/products/products",
        "notes": "Returns a distinct list of products",
        "summary": "Gets a distinct list of products.",
        "method": "GET",
        "params": [],
        "responseClass": "List[Product]",
        "errorResponses": [],
        "nickname": "getProducts"
    },
    'action': function (req, res) {
        var options = {
            neo4j: parseBool(req, 'neo4j')
        };

        var start = new Date();
        Products.getProducts({}, options, function (err, response) {
            if (err || !response.results) throw swe.notFound('product');
            writeResponse(res, response, start);
        });
    }
};

exports.getProduct = {
    'spec': {
        "description": "Get a products",
        "path": "/products/product",
        "notes": "Returns a product",
        "summary": "Gets a product.",
        "method": "GET",
        "params": [
            param.query("productID", "The product ID of the product to fetch", "string", true, true)
        ],
        "responseClass": "Product",
        "errorResponses": [],
        "nickname": "getProduct"
    },
    'action': function (req, res) {
        var options = {
            neo4j: parseBool(req, 'neo4j')
        };

        var productID = parseUrl(req, 'productID');

        var params = {
            productID: productID
        };

        var start = new Date();
        Products.getProduct(params, options, function (err, response) {
            if (err || !response.results) throw swe.notFound('product');
            writeResponse(res, response, start);
        });
    }
};

exports.getBrands = {
    'spec': {
        "description": "Get a list of brands",
        "path": "/products/brands",
        "notes": "Returns a distinct list of brands",
        "summary": "Gets a distinct list of brands.",
        "method": "GET",
        "params": [],
        "responseClass": "List[brands]",
        "errorResponses": [],
        "nickname": "getBrands"
    },
    'action': function (req, res) {
        var options = {
            neo4j: parseBool(req, 'neo4j')
        };

        var start = new Date();
        Products.getBrands({}, options, function (err, response) {
            if (err || !response.results) throw swe.notFound('brand');
            writeResponse(res, response, start);
        });
    }
};

exports.getStores = {
    'spec': {
        "description": "Get a list of stores",
        "path": "/products/stores",
        "notes": "Returns a distinct list of stores",
        "summary": "Gets a distinct list of stores.",
        "method": "GET",
        "params": [],
        "responseClass": "List[stores]",
        "errorResponses": [],
        "nickname": "getStores"
    },
    'action': function (req, res) {
        var options = {
            neo4j: parseBool(req, 'neo4j')
        };

        var start = new Date();
        Products.getStores({}, options, function (err, response) {
            if (err || !response.results) throw swe.notFound('store');
            writeResponse(res, response, start);
        });
    }
};
