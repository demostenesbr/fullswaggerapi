import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { ensuredAuthenticated } from "./middleware";

const router = Router();

interface ProductsDTO {
  name: string;
  description: string;
  price: number;
  id: string;
}

const products: ProductsDTO[] = [];

router.get("/products/findByName", (request, response) => {
  const { name } = request.query;
  const product = products.filter((p) => p.name.includes(String(name)));
  return response.json(product);
});

router.get("/prodcts/:id", (request, response) => {
  const { id } = request.params;
  const product = products.find((product) => product.id === id);
  return response.json(product);
});

router.post("/products", ensuredAuthenticated, (request, response) => {
  const { name, description, price } = request.body;

  const productAlreadyExists = products.find(
    (product) => product.name === name
  );

  if (productAlreadyExists) {
    return response.status(400).json({ message: "Product already exists!" });
  }

  const product: ProductsDTO = {
    name,
    description,
    price,
    id: uuidv4(),
  };

  products.push(product);
  return response.json(product);
});

router.put("/products/:id", ensuredAuthenticated, (request, response) => {
  const { id } = request.params;
  const { name, description, price } = request.body;

  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return response.status(400).json({ message: "Product doesn't exists!" });
  }

  const product: ProductsDTO = Object.assign({
    id,
    name,
    description,
    price,
  });

  products[productIndex] = product;

  return response.json(product);
});

export { router };
