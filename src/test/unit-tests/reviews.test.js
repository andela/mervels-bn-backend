import chai from 'chai';
import ReviewService from '../../services/reviewService';
import ReviewController from '../../controllers/reviewController';
import AccommodationService from '../../services/accommodationService';

const { expect } = chai;
const { assert } = chai;

let ratingId, accommodation;

before('Get single accommodation', async () => {
  const acc = await AccommodationService.getAccommodation({ id: 1 });

  accommodation = acc;

  assert.equal(accommodation, acc);
});

describe('Unit Test Reviews', () => {
  after('Delete Rating', async () => {
    const result = await ReviewService.deleteRating(ratingId);

    assert.equal(1, result);
  });

  it('Checks if accommodationRating', async () => {
    const result = await ReviewService.getAccommodationRating(1);

    expect(result.length).eq(0);
  });

  it('get user rating to accommodation', async () => {
    const data = {
      userId: 1,
      accommodationId: 1,
      ratings: 3
    };
    const result = await ReviewService.getUserAccommodationRating(1, 1);

    expect(result).eq(null);
  });

  it('add user rating to accommodation', async () => {
    const data = {
      userId: 1,
      accommodationId: 1,
      rating: 3
    };
    const result = await ReviewService.updateOrCreate(data);

    ratingId = result.dataValues.id;

    expect(result).to.have.property('dataValues');
  });

  it('Checks getAccommodationRating Method', async () => {
    const result = ReviewController.getAccommodationRating(accommodation.dataValues, 1);
    assert.equal(result.userRating, null);
  });
});
