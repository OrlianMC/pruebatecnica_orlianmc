import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const UserModel = () => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        isRemove: {
            type: (Sequelize as any).BOOLEAN,
            defaultValue: false
        },
        first_name: {
            type: (Sequelize as any).STRING
        },
        last_name: {
            type: (Sequelize as any).STRING
        },
        ci: {
            type: (Sequelize as any).STRING
        },
        email: {
            type: (Sequelize as any).STRING
        },
        phone: {
            type: (Sequelize as any).STRING
        },
        username: {
            type: (Sequelize as any).STRING,
            unique: true,
        },
        password_hash: {
            type: (Sequelize as any).STRING,
            allowNull: true
        },
    }, {});

    return User
}

