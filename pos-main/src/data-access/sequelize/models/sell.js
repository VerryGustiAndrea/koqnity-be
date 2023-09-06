'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sell extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Sell.hasOne(models.customer, { foreignKey: 'customer_id', sourceKey: 'customer_id', as: 'customer' });
            Sell.hasMany(models.sell_item, { foreignKey: 'sell_id', sourceKey: 'sell_id', as: 'sell_item' });
            Sell.hasMany(models.pay_history, { foreignKey: 'sell_id', sourceKey: 'sell_id', as: 'pay_history' });

            // define association here
        }
    }
    Sell.init(
        {
            sell_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            ordinal_number: DataTypes.INTEGER(),
            code: DataTypes.STRING(255),
            customer_id: DataTypes.STRING(255),
            date_invoice: DataTypes.DATE,
            pay_type: DataTypes.STRING(255),
            end_pay_date: DataTypes.DATE,
            warehouse_id: DataTypes.STRING(255),
            send_date: DataTypes.DATE,
            number_send_invoice: { type: DataTypes.STRING(255), allowNull: true },
            status: DataTypes.STRING(255),
            tax: DataTypes.FLOAT,
            amount: DataTypes.INTEGER,
            total: DataTypes.INTEGER,
            amount_pay: DataTypes.INTEGER,
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
            modelName: 'sell'
        }
    );

    // Sell.associate = function (models) {
    // };

    return Sell;
};
