/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Requests',
    [
      {
        from: 'KIGALI, RWANDA',
        travelDate: ['2019-10-01'],
        returnDate: '2019-12-12',
        reason: 'Business Travel',
        status: 'Pending',
        user: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from: 'KIGALI, RWANDA',
        travelDate: ['2019-10-01'],
        returnDate: '2019-12-12',
        reason: 'Business Travel',
        status: 'Approved',
        user: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from: 'ACCRA, GHANA',
        travelDate: ['2019-08-01'],
        returnDate: '2019-12-12',
        from: 'KIGALI, RWANDA',
        travelDate: ['2019-05-01'],
        returnDate: '2019-06-12',
        reason: 'Important meeting in lagos',
        status: 'Approved',
        user: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from: 'MANILLA, PHILIPINES',
        travelDate: ['2019-07-01'],
        returnDate: '2019-07-12',
        reason: 'Business Travel',
        status: 'Rejected',
        user: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from: 'NAKURU, KENYA',
        travelDate: ['2019-04-01', '2019-05-21'],
        returnDate: '2019-07-12',
        reason: 'Still figuring this out',
        status: 'Approved',
        user: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from: 'VICTORIA, EAFRICA',
        travelDate: ['2019-09-01', '2019-10-01'],
        returnDate: '2019-11-12',
        reason: 'i want to checkout the nile crocdiles',
        status: 'Approved',
        user: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from: 'UHEA, RWANDEX',
        travelDate: ['2019-06-21'],
        returnDate: '2019-09-12',
        reason: 'this is confidential you dont wanna know',
        status: 'Approved',
        user: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Requests', null, {})
};
