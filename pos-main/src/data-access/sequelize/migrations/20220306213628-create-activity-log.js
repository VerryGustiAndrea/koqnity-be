'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('activity_logs', {
            activity_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            type_activity: {
                allowNull: false,
                type: Sequelize.STRING
            },
            user_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            data: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            status: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('activity_logs');
    }
};
