'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class InventoryNote extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            InventoryNote.hasOne(models.inventory, { foreignKey: 'inventory_id', sourceKey: 'inventory_id', as: 'inventory' });
        }
    }
    InventoryNote.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        inventory_id: DataTypes.STRING(255),
        note: DataTypes.STRING(255),
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
        modelName: 'inventory_note'
    });
    return InventoryNote;
};
