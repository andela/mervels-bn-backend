import dotenv from 'dotenv';

dotenv.config();

/**
 * @class Emails
 */
class UpdateEmail {
  /**
   * Generates update email template
   * @param {Object} data user details
   * @returns {String} update email template
   */
  static updateTemplate(data) {
    const html = `<body style="margin: 0; padding: 0;">
    <table border="0" cellpadding="0" cellspacing="0" width="900px"style="padding: 0 40px 0 40px; background-color:#f1f2f3;">
        <tr><td align="center" style="background-color:#f9fcff; margin: 0 50px 0 50px;">
              <a><img src="http://drive.google.com/uc?export=view&id=1Rraew69PkllzCnb5wIBJsw61xPk83sA-"
                alt="Bare Foot Nomad" width="120" height="100" style="display: inline-block;>
              </a></td></tr><tr><td align=" center" style="padding: 0 50px 0 50px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%"
              style="background-color:#ffffff; padding: 0 0 0 20px;"><tr></tr>
              <tr><td align="center"
                  style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                  </td></tr><tr><td align="center">
                  <p style=" font-family: Arial, sans-serif; font-size: 16px;">User ${data.user} has made changes to there requests</p>
                </td></tr><tr><td align="center"
                style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                  <p><strong>Updated At:</strong> ${data.updatedAt}</p>
                </td></tr></table></td></tr><tr><td align="center" style="padding: 30px 30px 30px 30px;">
            &reg; BARE FOOT NOMAD, 2019<br /></td></tr></table></body>`;
    return { html };
  }
}
export default UpdateEmail;
