import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import generateToken from '../generateToken';

dotenv.config();

/**
 * @class Emails
 */
class Emails {
  /**
   * Creates a customized url
   * @param {Object} data object conatining url details
   * @returns {string} customized url
   */
  static header(data) {
    const from = data.from || process.env.FROM_EMAIL;
    const { to } = data;
    const { subject } = data;
    return {
      from,
      to,
      subject
    };
  }

  /**
   * Creates a customized url
   * @param {Object} data object conatining url details
   * @returns {string} customized url
   */
  static emailUrl(data) {
    return `http://${process.env.baseUrl}/api/v1/auth/${data.endpoint}/${data.userId}/${data.token}`;
  }

  /**
   * Creates a customized url
   * @param {Object} data object conatining url details
   * @returns {string} customized url
   */
  static unsubscribeUrl(data) {
    const token = generateToken(data);
    return `https://${process.env.baseUrl}/api/v1/auth/unsubscribe/?token=${token}`;
  }

  /**
   * Sends email using sendGrid
   * @param {string} msg a message to send
   * @returns {Promise} information about the sent email
   */
  static async sendmail(msg) {
    let message;
    sgMail.setApiKey(process.env.API_KEY);
    if (process.env.NODE_ENV === 'test') {
      message = {
        ...msg,
        mail_settings: {
          sandbox_mode: {
            enable: true
          }
        }
      };
    } else {
      message = msg;
    }

    const result = await sgMail.send(message);
    return result;
  }
}
export default Emails;
