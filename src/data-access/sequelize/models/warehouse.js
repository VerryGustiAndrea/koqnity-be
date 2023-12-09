'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Warehouse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Warehouse.init(
        {
            warehouse_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            warehouse_name: DataTypes.STRING(255),
            address: DataTypes.STRING(255),
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
            modelName: 'warehouse'
        }
    );

    return Warehouse;
};
