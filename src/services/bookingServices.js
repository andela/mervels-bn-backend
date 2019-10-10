/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Bookings } = database;

/** Class representing a Accommodation service */
class BookingService {
  /**
   * Creates a new booking
   * @param {object} booking accommodation object.
   * @returns {object} The booking object.
   */
  static async createBooking(booking) {
    try {
      return await Bookings.bulkCreate(booking);
    } catch (error) {
      throw error;
    }
  }

  /**
   * fetches a booking
   * @param {object} params object of options to get.
   * @returns {object} The booking object.
   */
  static async getBooking(params) {
    try {
      return await Bookings.findOne({
        where: [params]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * fetches a booking
   * @param {object} params object of options to get.
   * @returns {object} The booking object.
   */
  static async cancelBooking(params) {
    try {
      return await Bookings.destroy({
        where: [params]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * fetches all bookings.
   * @param {object} params object of options to get.
   * @returns {Array} The bookings arra.
   */
  static async getBookings(params) {
    try {
      return await Bookings.findAll({
        where: [params]
      });
    } catch (error) {
      throw error;
    }
  }
}
export default BookingService;
