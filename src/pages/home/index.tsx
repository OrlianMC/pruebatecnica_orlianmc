import { Manager } from "@/backend/models/engine";
import { CategoryType } from "@/backend/Types/CategoryType";
import MainLayout from "@/components/layouts/MainLayout";
import LoadSuspense from "@/components/LoadSuspense";
import { GetServerSideProps } from "next";
import React from "react";

export default function HomeIndex({
    categories
}: {
    categories: Array<CategoryType>
}) {
    return (
        <MainLayout>
            <LoadSuspense load={() => import("@/modules/Home/")}
                categories={categories}
            />
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    // Cargar todas las categorias de la BD antes en el servidor, y pasar a la vista
    const categories = (await Manager().Category.findAll({
        where:{
            isRemove: false
        }
    })).toJSON()
    // Fin de la carga

    return {
        props: {
            categories
        }
    }
}
