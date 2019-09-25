export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn(
      'Accommodations',
      'amenities',
      {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      { transaction: t }
    ),
    queryInterface.addColumn(
      'Accommodations',
      'description',
      {
        type: Sequelize.STRING
      },
      { transaction: t }
    ),
    queryInterface.addColumn(
      'Accommodations',
      'services',
      {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      { transaction: t }
    )
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Accommodations', 'amenities', { transaction: t }),
    queryInterface.removeColumn('Accommodations', 'description', { transaction: t }),
    queryInterface.removeColumn('Accommodations', 'services', { transaction: t })
  ]))
};
