import { Router } from "express";
import { OrderHandler } from "../handlers/order";

const OrderRouter = Router();
const Handler = new OrderHandler();

OrderRouter.get('/user_id/:user_id', Handler.index);
OrderRouter.get('/:id', Handler.show);
OrderRouter.post('/create', Handler.create);
OrderRouter.put('/:id', Handler.update);
OrderRouter.delete('/:id', Handler.destroy);

export default OrderRouter;