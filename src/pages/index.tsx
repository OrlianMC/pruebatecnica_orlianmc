import { GetServerSideProps } from "next";
import Auth from "./auth";
import { Manager, sequelize } from "@/backend/models/engine";
import { generateHash } from "@/helper/generateHash";

export default function Home() {
  return (
    <Auth />
  );
}

// Inicializando la BD
export const getServerSideProps: GetServerSideProps = async () => {
  // Crea la BD si no esta creada
  await Manager()
  try {
    // Comprueba que el admin este creado en la bd
    await Manager().User.findOne({
      username: "admin",
    })
  }
  catch {
    console.log("=========== Creando datos de prueba ===========")

    await sequelize.transaction(async (t) => {
      // Creando usuario admin
      const password_hash = await generateHash("prueba")
      await (Manager().User.upsert({
        username: "admin",
        password_hash
      }, { transaction: t }))

      //Creando categorias
      await (await (Manager().Category.upsert({ name: "Categoria 1" }, { transaction: t })))
      await (await (Manager().Category.upsert({ name: "Categoria 2" }, { transaction: t })))
      await (await (Manager().Category.upsert({ name: "Categoria 3" }, { transaction: t })))
    })

    console.log("=========== Creado datos de prueba ===========")
  }
  return {
    props: {}
  }
}
