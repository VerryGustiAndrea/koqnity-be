'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Buy extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Buy.hasOne(models.customer, { foreignKey: 'customer_id', sourceKey: 'vendor_id', as: 'vendor' });
            Buy.hasMany(models.buy_item, { foreignKey: 'buy_id', sourceKey: 'buy_id', as: 'buy_item' });
            Buy.hasMany(models.pay_buy_history, { foreignKey: 'buy_id', sourceKey: 'buy_id', as: 'pay_buy_history' });

            // define association here
        }
    }
    Buy.init(
        {
            buy_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            ordinal_number: DataTypes.INTEGER(),
            code: DataTypes.STRING(255),
            vendor_id: DataTypes.STRING(255),
            invoice_number: DataTypes.STRING(255),
            date_invoice: DataTypes.DATE,
            pay_type: DataTypes.STRING(255),
            end_pay_date: DataTypes.DATE,
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
            modelName: 'buy'
        }
    );

    return Buy;
};
