'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class InventoryNameCustomer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            InventoryNameCustomer.hasOne(models.inventory, { foreignKey: 'inventory_id', sourceKey: 'inventory_id', as: 'inventory' });
            InventoryNameCustomer.hasOne(models.customer, { foreignKey: 'customer_id', sourceKey: 'customer_id', as: 'customer' });
        }
    }
    InventoryNameCustomer.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customer_id: DataTypes.STRING(255),
        inventory_id: DataTypes.STRING(255),
        inventory_name: DataTypes.STRING(255),
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'inventory_name_customer'
    });
    return InventoryNameCustomer;
};
