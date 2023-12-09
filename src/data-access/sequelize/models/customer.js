'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Customer.hasOne(models.contact_type, { foreignKey: 'id', sourceKey: 'contact_id', as: 'contact_type' });
        }
    }
    Customer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            customer_id: DataTypes.STRING(50),
            contact_id: DataTypes.INTEGER,
            customer_code: DataTypes.STRING(255),
            customer_name: DataTypes.STRING(100),
            customer_address: DataTypes.STRING(100),
            customer_status: DataTypes.STRING(10),
            customer_npwp_number: DataTypes.STRING(50),
            customer_pic_name: DataTypes.STRING(100),
            customer_email: DataTypes.STRING(50),
            customer_phone_number: DataTypes.STRING(20),
            customer_country_code: DataTypes.STRING(10),
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
            modelName: 'customer'
        }
    );

    return Customer;
};
