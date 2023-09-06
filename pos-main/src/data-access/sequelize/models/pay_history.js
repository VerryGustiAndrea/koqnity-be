'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PayHistory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            PayHistory.hasOne(models.sell, { foreignKey: 'sell_id', sourceKey: 'sell_id', as: 'sell' });
            // define association here
        }
    }
    PayHistory.init(
        {
            history_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            sell_id: DataTypes.STRING(255),
            ordinal_number: DataTypes.INTEGER(),
            amount: DataTypes.INTEGER(),
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
            modelName: 'pay_history'
        }
    );

    // Sell.associate = function (models) {
    // };

    return PayHistory;
};
