import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ProductModel = (Category?: any) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        isRemove: {
            type: (Sequelize as any).BOOLEAN,
            defaultValue: false
        },
        name: {
            type: (Sequelize as any).STRING
        },
        price: {
            type: (Sequelize as any).FLOAT
        },
        quantity: {
            type: (Sequelize as any).INTEGER
        },
        categoryId: {
            type: (Sequelize as any).UUID,
            references: {
                model: Category,
                key: 'id'
            }
        },
    }, {});

    return Product
}

