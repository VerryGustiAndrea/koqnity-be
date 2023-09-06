'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BuyItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            BuyItem.hasOne(models.inventory, { foreignKey: 'inventory_id', sourceKey: 'inventory_id', as: 'inventory' });
            BuyItem.hasOne(models.warehouse, { foreignKey: 'warehouse_id', sourceKey: 'warehouse_id', as: 'warehouse' });
            BuyItem.hasOne(models.buy, { foreignKey: 'buy_id', sourceKey: 'buy_id', as: 'buy' });
        }
    }
    BuyItem.init(
        {
            item_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            inventory_id: DataTypes.STRING(255),
            buy_id: DataTypes.STRING(255),
            warehouse_id: DataTypes.STRING(255),
            price: DataTypes.INTEGER,
            qty: DataTypes.INTEGER,
            tax: DataTypes.INTEGER,
            tax_name: DataTypes.STRING(10),
            amount: DataTypes.INTEGER,
            total: DataTypes.INTEGER,
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
            modelName: 'buy_item'
        }
    );

    return BuyItem;
};
