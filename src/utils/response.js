/** Class representing response util. */
class Response {
  /**
   * Generates a new password.
   * @param {object} res  details.
   * @param {string} status  details.
   * @param {string} message  details.
   * @param {object} data  details.
   * @returns {object}.
   */
  static customResponse(res, status, message = null, data = null) {
    return res.status(status).json({
      status,
      message,
      data
    });
  }

  static errorResponse(res, status, message = null, error = null) {
    return res.status(status).json({
      status,
      message,
      error
    });
  }
}

export default Response;
