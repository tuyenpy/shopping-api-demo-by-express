const express = require('express');
const router = express.Router();
const Products = require('../../models/Product');


// Get all products
router.get('/', (req, res) => {
    const name = RegExp(req.query.name, 'ig');
    Products.find({
        $or: [{name: name}, {description: name}]
    })
    .then(products => res.json(products))
    .catch(err => console.log(`GET: /products: `, err));
});

//Create product
router.post('/', (req, res)=>{
    const {name, description, quality, price, image} = req.body;
    Products.findOne({name: name})
    .then(product => {
        if(product) {
            res.send("Product already exists");
        } else {
            const product = new Products({
                name,
                description,
                quality,
                price,
                image
            });
            product.save()
            .then(product => res.json(product))
            .catch(err => console.log(`Add product failed: `, err));
        }
    })
    .catch(err => console.log(`POST: /products/create: `, err));
});

//Update product
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const {name, description, quality, price, image} = req.body;
    Products.findOneAndUpdate({_id: id}, {
        $set: {
            name: name,
            description: description,
            quality:quality,
            price: price,
            image: image
        }
    },{new: true})
    .then(product => res.json(product))
    .catch(err => console.log(`PUT: /product/:id`, err));
});

//Delete product
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Products.findOneAndDelete({_id: id})
    .then(product => res.json(product))
    .catch(err => console.log(`Delete: /product/:id `, err ));
});

module.exports = router;