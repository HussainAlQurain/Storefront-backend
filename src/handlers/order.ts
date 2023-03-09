import { Router, Response, Request } from "express";
import { Order, OrderStore } from "../models/order";


const store = new OrderStore();

export class OrderHandler {
    async index(req: Request, res: Response) {
        try{
            const order = await store.indexOrders(parseInt(req.params.user_id));
            res.json(order);
        }
        catch (err){
            res.status(400).json(err);
        }
    }
    async show(req: Request, res: Response) {
        try{
            const order = await store.showOrder(parseInt(req.params.id));
            if(order){
                res.json(order);
            } else{
                res.status(404).json('order not found');
            }
        }
        catch (err) {
            res.json(err);
        }
    }
    async create(req: Request, res: Response) {
        try{
            const order = await store.createOrder(req.body);
            res.json(order);
        }
        catch (err) {
            res.json(err);
        }
    }
    async update(req: Request, res: Response){
        try{
            const order = await store.editOrder({id: parseInt(req.params.id), status: req.body.status, user_id: parseInt(req.body.user_id)});
            res.json(order);

        }
        catch (err) {
            res.json(err);
        }
    }
    async destroy(req: Request, res:Response) {
        try{
            const order = await store.deleteOrder(parseInt(req.params.id));
        }
        catch (err) {
            res.json(err);
        }
    }
}