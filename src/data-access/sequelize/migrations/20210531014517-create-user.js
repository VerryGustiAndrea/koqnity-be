'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            user_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                unique: true,
                indexedDB: true
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
                indexedDB: true
            },
            full_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            role: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            hash_password: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            profile_picture: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            token: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            last_login: {
                allowNull: true,
                type: Sequelize.DATE
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
