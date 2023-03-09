import { Router, Response, Request } from "express";
import { Product, ProductStore } from "../models/product";


const store = new ProductStore();

export class ProductHandler {
    async index(req: Request, res: Response) {
        try{
            const product = await store.indexProducts();
            res.json(product);
        }
        catch (err){
            res.status(400).json(err);
        }
    }
    async show(req: Request, res: Response) {
        try{
            const product = await store.showProduct(parseInt(req.params.id));
            if(product){
                res.json(product);
            } else{
                res.status(404).json('product not found');
            }
        }
        catch (err) {
            res.json(err);
        }
    }
    async create(req: Request, res: Response) {
        try{
            const product = await store.createProduct(req.body);
            res.json(product);
        }
        catch (err) {
            res.json(err);
        }
    }
    async update(req: Request, res: Response){
        try{
            const product = await store.editProduct({id: parseInt(req.params.id), name: req.body.status, price: parseInt(req.body.user_id)});
            res.json(product);

        }
        catch (err) {
            res.json(err);
        }
    }
    async destroy(req: Request, res:Response) {
        try{
            const product = await store.deleteProduct(parseInt(req.params.id));
        }
        catch (err) {
            res.json(err);
        }
    }
}