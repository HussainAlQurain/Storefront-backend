import { Router, Response, Request } from "express";
import { User, UserStore } from "../models/user";


const store = new UserStore();

export class UserHandler {
    async index(_req: Request, res: Response) {
        try{
            const users = await store.indexUsers();
            res.json(users);
        }
        catch (err){
            res.status(400).json(err);
        }
    }
    async show(req: Request, res: Response) {
        try{
            const user = await store.showUser(parseInt(req.params.id));
            if(user){
                res.json(user);
            } else{
                res.status(404).json('User not found');
            }
        }
        catch (err) {
            res.json(err);
        }
    }
    async create(req: Request, res: Response) {
        try{
            const user = await store.createUser(req.body);
            res.json(user);
        }
        catch (err) {
            res.json(err);
        }
    }
    async update(req: Request, res: Response){
        try{
            const user = await store.editUser({id: parseInt(req.params.id), first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, password_digest: req.body.password});
            res.json(user);

        }
        catch (err) {
            res.json(err);
        }
    }
    async destroy(req: Request, res:Response) {
        try{
            const user = await store.deleteUser(parseInt(req.params.id));
        }
        catch (err) {
            res.json(err);
        }
    }
}