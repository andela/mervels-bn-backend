/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Accommodations',
    [
      {
        name: 'HOTEL',
        status: 'Available',
        imageUrl: [
          'https://res.cloudinary.com/dkabisw/image/upload/v1574765143/apl2muykitqk5kf6pnjg.jpg',
          'https://res.cloudinary.com/dkabisw/image/upload/v1574961322/xr4b5emlpudqh1l9yrpa.jpg',
          'https://res.cloudinary.com/dkabisw/image/upload/v1574765130/eqjambzo4x2qcyxs3cyi.jpg',
          'https://res.cloudinary.com/dkabisw/image/upload/v1574765136/o7mslrt3aukrgrqrekyz.jpg'
        ],
        locationId: 1,
        owner: 9,
        amenities: ['Gym', 'Sauna', 'Steam bath', 'Spa', 'Free Wifi'],
        services: ['Free breakfast', 'Room Delivery', 'Free parking', 'Snart Rooms'],
        maplocations: JSON.stringify({ lat: -1.9705786, lng: 30.10442880000005 }),
        description:
            'The space will be entirely yours. It is in a compound of similar apartments where people mind their own business. There is a gateman at the place 24 hours and you can go in and out at any point. You do not share facilities with anyone.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MARIOT',
        status: 'Unavailable',
        imageUrl: [
          'https://res.cloudinary.com/dkabisw/image/upload/v1574765124/aahfyxzukrkpjx8dfqrc.jpg',
          'https://res.cloudinary.com/dkabisw/image/upload/v1574765127/kxuyq9ibpsepriqodzkc.jpg',
          'https://res.cloudinary.com/dkabisw/image/upload/v1574765130/eqjambzo4x2qcyxs3cyi.jpg'
        ],
        locationId: 1,
        owner: 2,
        amenities: ['Gym', 'Sauna', 'Steam bath', 'Spa', 'Free Wifi'],
        services: ['Free breakfast', 'Room Delivery', 'Free parking', 'Snart Rooms'],
        maplocations: JSON.stringify({ lat: -1.9705786, lng: 30.10442880000005 }),
        description:
            'The space, located in a serene compound of similar apartments, will be exclusively yours during the stay. The place is within a 10 min ride to City Centre , 15 minutes form the airport and several international organisations.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SHERATON',
        status: 'Available',
        imageUrl: [
          'https://res.cloudinary.com/dkabisw/image/upload/v1574765133/gqnwfhgz9huyybsw6e8y.jpg',
          'https://res.cloudinary.com/dkabisw/image/upload/v1574765136/o7mslrt3aukrgrqrekyz.jpg',
          'https://res.cloudinary.com/dkabisw/image/upload/v1574765140/kbxrxtogb7unzbztkzeu.jpg'
        ],
        locationId: 2,
        owner: 2,
        amenities: ['Gym', 'Sauna', 'Steam bath', 'Spa', 'Free Wifi'],
        services: ['Free breakfast', 'Room Delivery', 'Free parking', 'Snart Rooms'],
        maplocations: JSON.stringify({ lat: -1.9705786, lng: 30.10442880000005 }),
        description:
            'Here is your own one cozy and intact studio flat in Kacyiru, near the US Embassy and just 200 metres from Kacyiru Hospital. The apartment is well maintained and suitable for solo travellers or couples. ',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', null, {})
};
