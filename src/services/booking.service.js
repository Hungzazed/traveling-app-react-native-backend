const httpStatus = require('http-status');
const { Booking } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a booking
 * @param {ObjectId} userId
 * @param {Object} bookingBody
 * @returns {Promise<Booking>}
 */
const createBooking = async (userId, bookingBody) => {
  const booking = await Booking.create({
    ...bookingBody,
    userId,
  });
  return booking.populate(['userId', 'tourId', 'hotelId', 'services']);
};

/**
 * Query for bookings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBookings = async (filter, options) => {
  const bookings = await Booking.paginate(filter, {
    ...options,
    populate: 'userId,tourId,hotelId,services',
  });
  return bookings;
};

/**
 * Get booking by id
 * @param {ObjectId} id
 * @returns {Promise<Booking>}
 */
const getBookingById = async (id) => {
  return Booking.findById(id).populate(['userId', 'tourId', 'hotelId', 'services']);
};

/**
 * Update booking by id
 * @param {ObjectId} bookingId
 * @param {Object} updateBody
 * @returns {Promise<Booking>}
 */
const updateBookingById = async (bookingId, updateBody) => {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  Object.assign(booking, updateBody);
  await booking.save();
  return booking;
};

/**
 * Delete booking by id
 * @param {ObjectId} bookingId
 * @returns {Promise<Booking>}
 */
const deleteBookingById = async (bookingId) => {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  await booking.remove();
  return booking;
};

/**
 * Cancel booking
 * @param {ObjectId} bookingId
 * @param {ObjectId} userId
 * @returns {Promise<Booking>}
 */
const cancelBooking = async (bookingId, userId) => {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  if (booking.userId.toString() !== userId.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You can only cancel your own bookings');
  }
  if (booking.status === 'cancelled' || booking.status === 'completed') {
    throw new ApiError(httpStatus.BAD_REQUEST, `Cannot cancel a ${booking.status} booking`);
  }
  booking.status = 'cancelled';
  await booking.save();
  return booking;
};

/**
 * Confirm booking
 * @param {ObjectId} bookingId
 * @returns {Promise<Booking>}
 */
const confirmBooking = async (bookingId) => {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  if (booking.status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only pending bookings can be confirmed');
  }
  booking.status = 'confirmed';
  await booking.save();
  return booking;
};

module.exports = {
  createBooking,
  queryBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
  cancelBooking,
  confirmBooking,
};
