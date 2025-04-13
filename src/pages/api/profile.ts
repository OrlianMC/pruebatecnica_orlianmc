// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method == 'POST') {
        try{
            await Manager().User.update(req.body.id, {
                ...req.body
            })
            res.status(200).json({ details: "Creado con exito!" });
        }
        catch{
            res.status(400).json({ details: "Ocurrio un error al guardar" });
        }
    }
    else {
        res.status(400).json({ details: "Método no permitido" });
    }
}