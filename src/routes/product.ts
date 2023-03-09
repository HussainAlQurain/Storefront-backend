import { Router } from "express";
import { ProductHandler } from "../handlers/product";

const ProductRouter = Router();
const Handler = new ProductHandler();

ProductRouter.get('/', Handler.index);
ProductRouter.get('/:id', Handler.show);
ProductRouter.post('/create', Handler.create);
ProductRouter.put('/:id', Handler.update);
ProductRouter.delete('/:id', Handler.destroy);

export default ProductRouter;