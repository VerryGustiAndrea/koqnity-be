'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockWarehouse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            StockWarehouse.hasOne(models.warehouse, { foreignKey: 'warehouse_id', sourceKey: 'warehouse_id', as: 'warehouse' });

            // define association here
        }
    }
    StockWarehouse.init(
        {
            id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            warehouse_id: {
                type: DataTypes.STRING(255)
            },
            inventory_id: DataTypes.STRING(255),
            stock_qty: DataTypes.INTEGER,
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
            modelName: 'stock_warehouse'
        }
    );

    return StockWarehouse;
};
