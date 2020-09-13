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
    /* feriados nacionais */
    await queryInterface.bulkInsert(
      'holidays',
      [
        {
          name: 'Ano Novo',
          code: '0',
          year: null,
          month: 1,
          day: 1,
        },
        {
          name: 'Tiradentes',
          code: '0',
          year: null,
          month: 4,
          day: 21,
        },
        {
          name: 'Dia do Trabalhador',
          code: '0',
          year: null,
          month: 5,
          day: 1,
        },
        {
          name: 'Independência',
          code: '0',
          year: null,
          month: 9,
          day: 7,
        },
        {
          name: 'Nossa Senhora Aparecida',
          code: '0',
          year: null,
          month: 10,
          day: 12,
        },
        {
          name: 'Finados',
          code: '0',
          year: null,
          month: 11,
          day: 2,
        },
        {
          name: 'Proclamação da República',
          code: '0',
          year: null,
          month: 11,
          day: 15,
        },
        {
          name: 'Natal',
          code: '0',
          year: null,
          month: 12,
          day: 25,
        },
        {
          name: 'Sexta-Feira Santa',
          code: '0',
          year: null,
          month: null,
          day: null,
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
