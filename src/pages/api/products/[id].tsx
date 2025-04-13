// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method == 'DELETE') {
        try {
            const { id } = req.query as any
            const response = await Manager().Product.update(id, {
                isRemove: true
            })
            res.status(200).json(response.toJSON());
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al eliminar" });
        }
    }
    else {
        res.status(400).json({ details: "Método no permitido" });
    }
}
