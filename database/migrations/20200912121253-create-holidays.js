'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * npx sequelize migration:create --name=create-holidays
     * npx sequelize db:migrate
     */
    return await queryInterface.createTable('holidays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      year: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      month: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      day: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
    })
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('holidays')
  },
}
