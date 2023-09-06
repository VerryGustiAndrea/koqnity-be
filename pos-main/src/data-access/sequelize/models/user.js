'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            user_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            username: DataTypes.STRING(255),
            full_name: DataTypes.STRING(255),
            hash_password: DataTypes.TEXT,
            profile_picture: DataTypes.TEXT,
            role: DataTypes.INTEGER,
            token: DataTypes.TEXT,
            last_login: DataTypes.DATE,
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
            modelName: 'user'
        }
    );

    User.associate = function (models) {
        User.belongsTo(models.role, { foreignKey: 'role', through: 'id', as: 'roles' });
    };

    return User;
};
