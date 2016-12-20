var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/products';
var db = pgp(connectionString);

module.exports = {
    getAllProducts: getAllProducts,
    getSingleProduct: getSingleProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    removeProduct: removeProduct
};

function getAllProducts(req, res, next) {
    db.any('select * from products')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL products'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleProduct(req, res, next) {
    var productId = parseInt(req.params.id);
    db.one('select * from products where id = $1', productId)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one product'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createProduct(req, res, next) {
    db.none('insert into products(name, size, color, category, type)' +
        'values(${name}, ${size}, ${color}, ${category}, ${type})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one product'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateProduct(req, res, next) {
    db.none('update products set name=$1, size=$2, color=$3, category=$4, type=$5 where id=$6',
        [req.body.name, req.body.size, req.body.color,
            req.body.category,req.body.type, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated product'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeProduct(req, res, next) {
    var productId = parseInt(req.params.id);
    db.result('delete from products where id = $1', productId)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed product'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}