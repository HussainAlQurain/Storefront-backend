import { Router } from "express";
import { UserHandler } from "../handlers/users";

const UserRouter = Router();
const Handler = new UserHandler();

UserRouter.get('/', Handler.index);
UserRouter.get('/:id', Handler.show);
UserRouter.post('/create', Handler.create);
UserRouter.post('/login', Handler.authenticate);
UserRouter.put('/:id', Handler.update);
UserRouter.delete('/:id', Handler.destroy);

export default UserRouter;