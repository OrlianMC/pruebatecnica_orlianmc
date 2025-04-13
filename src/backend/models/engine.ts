import { Sequelize } from "sequelize";
import { UserModel } from "./User";
import { ProductModel } from "./Product";
import { CategoryModel } from "./Category";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    dialectOptions: {
        busyTimeout: 3000, // Tiempo de espera en milisegundos
    },
    logging: false,
    define: {

    }
}) as Sequelize;

let sync = false
export const Manager = () => {

    // Creando modelos
    const User = UserModel()
    const Category = CategoryModel()
    const Product = ProductModel(Category)

    // Relación Uno a Mucho entre Product y Category
    relateOneToMany(
        Product,
        Category,
        'products',
        'category',
        'categoryId'
    )

    // Si no esta sincronizado, se sincroniza la primera vez nada mas.
    if (!sync) {
        sync = true
        const sc = async () => {
            console.log("Sincronizando")
            await sequelize.sync()
            console.log('Base de datos y tablas creadas!')
        }
        sc()
    }

    return {
        User: new Model(User),
        Product: new Model(Product),
        Category: new Model(Category),
    }
}

const relateOneToMany = (model1: any, model2: any, model1as: string, model2as: string, foreignKey: string) => {
    model2.hasMany(model1, {
        foreignKey: foreignKey,
        as: model1as,
        onDelete: 'CASCADE'
    });
    model1.belongsTo(model2, {
        foreignKey: foreignKey,
        as: model2as,
        onDelete: 'CASCADE'
    });
}

export class Model {
    model = null as any;
    query = null as any;

    constructor(model: any) {
        this.model = model;
    }

    async findAll(props?: any) {
        this.query = await this.model.findAll(props)
        return this
    }

    async findOne(props?: any, transaction?: any) {
        this.query = await this.model.findOne(props, transaction)
        return this
    }

    async findOneById(id: string, props?: any) {
        this.query = await this.model.findByPk(id, props)
        return this
    }

    async create(props: any, transaction?: any) {
        this.query = await this.model.create(props, transaction)
        return this
    }

    async upsert(props: any, transaction?: any) {
        this.query = await this.model.upsert(props, transaction)
        return this
    }

    async update(id: string, props: any, transaction?: any) {
        this.query = await this.model.update(props, { where: { id }, ...transaction })
        //this.query = await this.model.update(id, props, transaction)
        return this
    }

    async delete(id: string, transaction?: any) {
        this.query = await this.model.destroy({ where: { id }, ...transaction })
        return this
    }

    async count(where?: any) {
        return await this.model.count({ ...where })
    }

    toJSON() {
        return JSON.parse(JSON.stringify(this.query))
    }
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

