'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CashFlow extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CashFlow.init(
        {
            id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            relation_id: DataTypes.STRING(255),
            type_relation: DataTypes.STRING(255),
            customer_id: DataTypes.STRING(255),
            code: DataTypes.STRING(255),
            ordinal_number: DataTypes.INTEGER(),
            amount: DataTypes.INTEGER,
            date_payment: DataTypes.DATE,
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
            modelName: 'cash_flow'
        }
    );

    return CashFlow;
};
