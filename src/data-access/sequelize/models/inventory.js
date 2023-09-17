'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Inventory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Inventory.hasOne(models.type_inventory, { foreignKey: 'type_id', sourceKey: 'category_id', as: 'category' });
            Inventory.hasOne(models.type_inventory, { foreignKey: 'type_id', sourceKey: 'merk_id', as: 'merk' });
            Inventory.hasMany(models.history_stock, { foreignKey: 'inventory_id', sourceKey: 'inventory_id', as: 'history_stock' });
            Inventory.hasMany(models.sell_item, { foreignKey: 'inventory_id', sourceKey: 'inventory_id', as: 'sell_item' });
            // define association here
        }
    }
    Inventory.init(
        {
            inventory_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            ordinal_number: DataTypes.INTEGER(),
            code: DataTypes.STRING(255),
            name: DataTypes.STRING(255),
            capital_price: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
            category_id: DataTypes.STRING(255),
            merk_id: DataTypes.STRING(255),
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
            modelName: 'inventory'
        }
    );

    return Inventory;
};
