import {productService} from "../services/products.service.js";
import Customerror from "../errors/customError.js";
import { ErrorNames, ErrorMessages, ErrorCauses } from "../errors/errors.enum.js";




export async function getAllProducts(req, res) {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1
  const category = req.query.category 
  const status = req.query.status 
  const sort = req.query.sort
  try {
    const products = await productService.getAllProducts(
      limit,
      page,
      category,
      status,
      sort
    );
    
    req.logger.debug('Getting all products')
    req.logger.warning('No warning message');
    res.json(products);

  } catch (error) {
    req.logger.error('Error occurred while getting all products')
    Customerror.generateCustomError({
      name: ErrorNames.GENERAL_ERROR_NAME,
      message: ErrorMessages.PRODUCTS_NOR_FOUND_MESSAGE,
      cause: ErrorCauses.PRODUCT_NOT_FOUND_CUASE
    })
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await productService.getProductById(id);
    req.logger.debug('Getting product by ID')
    req.logger.warning('No warning message')
    res.json(product);
  } catch (error) {
    req.logger.error('Error occurred while getting product by ID')
    Customerror.generateCustomError({
      name: ErrorNames.GENERAL_ERROR_NAME,
      message: ErrorMessages.PRODUCTS_NOR_FOUND_MESSAGE,
      cause: ErrorCauses.PRODUCT_NOT_FOUND_CUASE
    })
  }
}

export async function createProduct(req, res) {
  const product = req.body;
  const currentUser = req.session.user.email
  const currentRol = req.session.user.rol
  
  try {
    const createdProduct = await productService.createProduct(product,  currentUser, currentRol )
    req.logger.debug('Product created successfully')
    req.logger.warning('No warning message')
    console.log(currentRol,'rol producto')
    res.status(201).json(createdProduct)
  } catch (error) {
    req.logger.error('Error occurred while creating product')
    res.status(400).json({ error: error.message })
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const product = req.body;
  try {
    const updatedProduct = await productService.updateProduct(id, product)
    req.logger.debug('Product updated successfully')
    req.logger.warning('No warning message')
    res.status(200).send({status: "success", message: "updated pruduct", payload: updatedProduct})
  } catch (error) {
    req.logger.error('Error occurred while updating product')
    res.status(400).json({ error: error.message });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  const currentUser = req.session.user.email
  const currentRol = req.session.user.rol
  try {
    const deletedProduct = await productService.deleteProduct(id,currentUser, currentRol)
    req.logger.debug('Product deleted successfully')
    req.logger.warning('No warning message')
    res.status(200).send({status: "success", message: "deleted pruduct", payload: deletedProduct})
  } catch (error) {
    req.logger.error('Error occurred while deleting product')
    res.status(404).json({ error: error.message })
  }
}