'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('type_inventories', {
            type_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            code: {
                allowNull: false,
                type: Sequelize.STRING
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('type_inventories');
    }
};
