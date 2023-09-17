'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TypeInventory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    TypeInventory.init(
        {
            type_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            name: DataTypes.STRING(255),
            type: DataTypes.STRING(255),
            code: DataTypes.STRING(3),
            createdAt: {
                field: 'created_at',
                type: DataTypes.DATE
            },
            updatedAt: {
                field: 'updated_at',
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: 'type_inventory'
        }
    );

    return TypeInventory;
};
