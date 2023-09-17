'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ContactType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ContactType.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name: DataTypes.STRING(50),
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
            modelName: 'contact_type'
        }
    );

    return ContactType;
};
