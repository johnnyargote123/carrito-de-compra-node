import { Router } from "express";
import { faker } from '@faker-js/faker';
const router = Router();


router.get('/mockingproducts', (req, res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
      const product = {
        id: i + 1,
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        code: `AAA${i + 1}`,
        price: faker.commerce.price(),
        thumbnails: [`http://localhost:8080/images/product${i + 1}.png`],
        status: true,
        stock: faker.datatype.number({ min: 1, max: 100 }),
        category: faker.commerce.department(),
      };
      products.push(product);
    }
    res.json(products);
  });
  

  export default router;