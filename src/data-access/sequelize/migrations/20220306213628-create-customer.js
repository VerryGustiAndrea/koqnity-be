'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('customers', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            customer_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            customer_code: {
                allowNull: true,
                type: Sequelize.STRING
            },
            customer_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            customer_status: {
                allowNull: false,
                type: Sequelize.STRING
            },
            customer_npwp_number: {
                allowNull: true,
                type: Sequelize.STRING
            },
            customer_pic_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            customer_email: {
                allowNull: true,
                type: Sequelize.STRING
            },
            customer_phone_number: {
                allowNull: true,
                type: Sequelize.STRING
            },
            customer_country_code: {
                allowNull: true,
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
        await queryInterface.dropTable('customers');
    }
};
