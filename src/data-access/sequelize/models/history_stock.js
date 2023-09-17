'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HistoryStock extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            HistoryStock.hasOne(models.warehouse, { foreignKey: 'warehouse_id', sourceKey: 'warehouse_id', as: 'warehouse' });

            // define association here
        }
    }
    HistoryStock.init(
        {
            history_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            code: DataTypes.STRING(255),
            ordinal_number: DataTypes.INTEGER,
            warehouse_id: {
                type: DataTypes.STRING(255)
            },
            sell_id: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            buy_id: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            inventory_id: DataTypes.STRING(255),
            type: DataTypes.STRING(255),
            price: DataTypes.INTEGER,
            date: DataTypes.DATE,
            stock_qty: DataTypes.INTEGER,
            qty_before: DataTypes.INTEGER,
            qty_after: DataTypes.INTEGER,
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
            modelName: 'history_stock'
        }
    );

    return HistoryStock;
};
