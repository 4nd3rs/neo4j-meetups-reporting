var apiUrl = "http://localhost:3000/";

$(function () {
    getProducts();
    getBrands();
    getStores();
});

Array.prototype.getUnique = function () {
    var u = {}, a = [];
    for (var i = 0, l = this.length; i < l; ++i) {
        if (u.hasOwnProperty(this[i])) {
            continue;
        }
        a.push(this[i]);
        u[this[i]] = 1;
    }
    return a;
};

var clickProduct = function () {
    $("#products li").on("click",function(){
        console.log("click");
       var productID = $(this).attr("data-productID");
        getProduct(productID);
    });
};

var getProducts = function () {
    $.getJSON(apiUrl + "api/v0/products/products?api_key=special-key&neo4j=true", function (data) {
        $.each(data, function (key, val) {
            $("#products").append("<li data-productID='" + val.productID +"'>" + val.productName+ " (" + val.productID + ")</li>");
        });
        clickProduct();
    });
};

var getProduct = function (productID) {
    $.getJSON(apiUrl + "api/v0/products/product?productID=" + encodeURIComponent(productID) + "&api_key=special-key&neo4j=true", function (data) {
        $.each(data, function (key, val) {
            $("#product").append("<li><div>" + val.productName+ "</div>" +
                "<div class='product-image'><img src='" + val.imageURL + "'></div></li>");
        });
    });
};

var getBrands = function () {
    $.getJSON(apiUrl + "api/v0/products/brands?api_key=special-key&neo4j=true", function (data) {
        $.each(data, function (key, val) {
            $("#brands").append("<li>" + val.brandName+"</li>");
        });
    });
};

var getStores = function () {
    $.getJSON(apiUrl + "api/v0/products/stores?api_key=special-key&neo4j=true", function (data) {
        $.each(data, function (key, val) {
            $("#stores").append("<li>" + val.storeName+"</li>");
        });
    });
};