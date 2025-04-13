import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const CategoryModel = () => {
    const Category = sequelize.define('Category', {
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
    }, {});

    return Category
}

