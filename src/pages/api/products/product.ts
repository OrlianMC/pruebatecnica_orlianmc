// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method == 'GET') {
        try {
            const products = await Manager().Product.findAll();
            res.status(200).json(products);
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al guardar" });
        }
    }
  
    if (req.method == 'POST') {
        try {
            const newProduct = await Manager().Product.create({
                ...req.body
            });
            res.status(201).json(newProduct);
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al crear producto" });
        }
    }

    if (req.method == 'PUT') {
        try {
            if (!req.body.id) {
                return res.status(400).json({ details: "Se requiere ID para actualizar" });
            }

            const updatedProduct = await Manager().Product.update(req.body.id, {
                ...req.body
            });
            res.status(200).json(updatedProduct);
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al actualizar producto" });
        }
    }
    else {
        res.status(400).json({ details: "Método no permitido" });
    }
}
