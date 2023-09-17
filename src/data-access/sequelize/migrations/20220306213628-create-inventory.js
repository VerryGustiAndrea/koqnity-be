'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('inventories', {
            inventory_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            code: {
                allowNull: true,
                type: Sequelize.STRING
            },
            name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            category_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            merk_id: {
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
        await queryInterface.dropTable('inventories');
    }
};
