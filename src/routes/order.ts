import { Router } from "express";
import { OrderHandler } from "../handlers/order";
import verifyToken from "../middleware/authorization";
const OrderRouter = Router();
const Handler = new OrderHandler();

OrderRouter.use(verifyToken);

OrderRouter.get('/user_id/:user_id', Handler.index);
OrderRouter.get('/:id', Handler.show);
OrderRouter.post('/create', Handler.create);
OrderRouter.put('/:id', Handler.update);
OrderRouter.delete('/:id', Handler.destroy);

export default OrderRouter;