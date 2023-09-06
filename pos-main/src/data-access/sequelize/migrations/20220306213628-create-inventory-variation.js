'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('variation_inventories', {
            variation_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            inventory_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('variation_inventories');
    }
};
