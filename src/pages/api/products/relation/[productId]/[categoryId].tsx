// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method == 'PUT') {
        try {
            const { productId, categoryId } = req.query as any
            const updatedProduct = await Manager().Product.update(productId, {
                categoryId: categoryId
            })
            res.status(200).json(updatedProduct);
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al eliminar" });
        }
    }
    else {
        res.status(400).json({ details: "Método no permitido" });
    }
}