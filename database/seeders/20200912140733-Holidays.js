'use strict'

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * npx sequelize seed:generate --name Holidays
     * npx sequelize db:seed:all
     */
    await queryInterface.bulkInsert(
      'holidays',
      [
        {
          name: 'Teste',
          type: 'default',
          date: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('holidays', null, {})
  },
}
