'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class activity_log extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    activity_log.init(
        {
            activity_id: {
                type: DataTypes.STRING(255),
                primaryKey: true
            },
            type_activity: DataTypes.STRING,
            user_id: DataTypes.STRING,
            data: DataTypes.TEXT,
            status: DataTypes.INTEGER,
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
            modelName: 'activity_log'
        }
    );
    return activity_log;
};
