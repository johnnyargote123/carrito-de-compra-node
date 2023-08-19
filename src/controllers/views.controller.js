import {viewsRepository} from "../dao/repositories/views.repository.js";
import UserDTO from "../dao/dtos/session.dto.js"
import{mailService} from "../services/mail.service.js"

export async function getChat(req, res) {
  const messages = await viewsRepository.getMessages();
  return res.render("messages");
}

export function getRegister(req, res) {
  res.render("register");
}

export function getLogin(req, res) {
  res.render("login");
}

export function getForgot(req, res) {
  res.render("forgot-pass");
}

export async function getCartPersonal(req, res) {
  const cartId = req.session.user.cart; // Obtener el ID del carrito desde la sesión del usuario
  const cart = await viewsRepository.getCartById(cartId); // Obtener el objeto del carrito por su ID

  const cartWithOwnProperties = {
    _id: cart._id,
    products: cart.products.map((productCart) => {
      return {
        product: productCart.product._id,
        quantity: productCart.quantity,
        _id: productCart._id,
      };
    }),
  };

  res.render("cart", {
    productsId$: [cartWithOwnProperties], // Poner el objeto en un arreglo para mantener la estructura
    style: "index.css",
  });
}



export async function getHome(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category || null;
  const status = req.query.status || null;
  const sort = req.query.sort || null;

  const products = await viewsRepository.getProductPage(
    page,
    limit,
    category,
    status,
    sort
  );
  const productsWithOwnProperties = products.docs.map((product) => {
    return {
      id: product.id,
      status: product.status,
      title: product.title,
      stock: product.stock,
      category: product.category,
      description: product.description,
      code: product.code,
      price: product.price,
    };
  });
  const currentUser = req.session.user;
  console.log(currentUser)
  const currentUserDTO = new UserDTO(currentUser);
  res.render("home", {
    products$: productsWithOwnProperties,
    currentPage: page,
    totalPages: products.totalPages,
    hasNextPage: products.hasNextPage,
    hasPrevPage: products.hasPrevPage,
    nextPage: page + 1,
    prevPage: page - 1,
    user: currentUserDTO,
    style: "index.css",
  });
}

export async function getRealTimeProducts(req, res) {
  const products = await viewsRepository.getProduct();
  const productsWithOwnProperties = products.map((product) => {
    return {
      id: product.id,
      status: product.status,
      title: product.title,
      stock: product.stock,
      category: product.category,
      description: product.description,
      code: product.code,
      price: product.price,
    };
  });
  res.render("realTimeProducts", {
    products$: productsWithOwnProperties,
    style: "index.css",
  });
}

export function getCurrentUser(req, res) {

    const currentUser = req.session.user;
    req.logger.debug(currentUser)
    if (currentUser) {
      const currentUserDTO = new UserDTO(currentUser);
      return res.render("current", { currentUser: currentUserDTO });
    } 
}

export async function editUser(req, res){
  const currentUser = await req.session.user;
  console.log(currentUser)
  const currentUserDTO = new UserDTO(currentUser);
  res.render("control-user",{
    user: currentUserDTO,
    style: "index.css",
  });
}

export function getResetPassword (req, res) {
  const token  = req.params.token;
  console.log(token)

  if (mailService.isValidToken(token)) {
    res.render("reset-password", { token, style: "reset-pass.css" });
  } else {
    res.redirect("/forgot-pass")
  }
}

export async function getProduct(req, res) {
  const productId = req.params.id;
  if (productId) {
    const product = await viewsRepository.getProductById(productId);

    const productWithOwnProperties = {
      id: product?.id,
      status: product?.status,
      title: product?.title,
      stock: product?.stock,
      category: product?.category,
      description: product?.description,
      code: product?.code,
      price: product?.price,
    };
    const currentUser = req.session.user;
    console.log(currentUser)
    const currentUserDTO = new UserDTO(currentUser);
    res.render("product", {
      productsId$: productWithOwnProperties,
      user: currentUserDTO,
      style: "index.css",
    });
  }
}