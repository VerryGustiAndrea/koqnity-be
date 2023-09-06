'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VariationInventory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    VariationInventory.init(
        {
            variation_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            inventory_id: DataTypes.STRING(255),
            name: DataTypes.STRING(255),
            description: DataTypes.STRING(255),
            price: DataTypes.STRING(255),
            code: DataTypes.STRING(255),
            ordinal_number: DataTypes.INTEGER(),
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
            modelName: 'variation_inventory'
        }
    );

    return VariationInventory;
};
