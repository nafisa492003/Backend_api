const { Router } = require("express");
const { createProduct, getAllProduct, getSingalproduct, UpdateProduct, Deleteproduct } = require("../../controllers/productController");
const upload = require("../../middlewere/multer");
const RoleMiddlewere = require("../../middlewere/RoleMiddlewere");
const routes = new Router();

// Add routes
routes.get('/getallproduct', getAllProduct);
routes.get('/getsingleproduct/:id', getSingalproduct);
routes.post("/createproduct", upload.single("image") , createProduct);
routes.put('/updateProduct/:id',RoleMiddlewere("admin"), UpdateProduct);
routes.delete('/deleteProduct/:id',RoleMiddlewere("admin"), Deleteproduct);

module.exports = routes;
