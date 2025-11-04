const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, isHtml = false) => {
    const msg = {
    from: config.email.from,
    to,
    subject,
  };

  if (isHtml) {
    msg.html = text;
  } else {
    msg.text = text;
  }
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send booking confirmation email
 * @param {string} to
 * @param {Object} bookingData
 * @returns {Promise}
 */
const sendBookingConfirmationEmail = async (to, bookingData) => {
  const subject = '🎉 Xác nhận đặt tour thành công - Travel App';
  
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
          <h1>🎉 Xác nhận đặt tour thành công!</h1>
        </div>
        <div style="padding: 20px; color: #333;">
          <p>Xin chào <strong>${bookingData.userName || ''}</strong>,</p>
          <p>Cảm ơn bạn đã đặt tour với chúng tôi. Dưới đây là thông tin chi tiết về booking của bạn:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Mã đặt tour:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.bookingId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Tour:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.tourName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Ngày khởi hành:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.startDate || ''}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Số người:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.numberOfPeople || ''}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Tổng tiền:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd; color: #e91e63; font-weight: bold;">${bookingData.totalPrice || ''}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Trân trọng,<br/><strong>Travel App Team</strong></p>
        </div>
        <div style="background-color: #f1f1f1; color: #555; padding: 10px; text-align: center; font-size: 12px;">
          Đây là email tự động, vui lòng không trả lời.
        </div>
      </div>
    </div>
  `;
  
  return sendEmail(to, subject, html, true);
};

/**
 * Send booking status update email
 * @param {string} to
 * @param {Object} bookingData
 * @param {string} status - 'confirmed', 'cancelled', 'completed'
 * @returns {Promise}
 */
const sendBookingStatusUpdateEmail = async (to, bookingData, status) => {
  const userName = bookingData.userName || 'Khách hàng';
  const bookingId = bookingData.bookingId || '';
  const tourName = bookingData.tourName || '';
  const startDate = bookingData.startDate || '';
  const numPeople = bookingData.numPeople || 1;

  let subject = '';
  let html = '';

  switch (status) {
    case 'confirmed':
      subject = `✅ Booking của bạn đã được xác nhận - Travel App`;
      html = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto;">
          <p>Xin chào <strong>${userName}</strong>,</p>
          <p>Booking của bạn đã được <strong>XÁC NHẬN!</strong></p>
          
          <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 4px;">📋 THÔNG TIN ĐẶT TOUR:</h3>
          <p>Mã đặt tour: <strong>${bookingId}</strong><br/>
          Tour: <strong>${tourName}</strong><br/>
          Ngày khởi hành: <strong>${startDate}</strong><br/>
          Số người: <strong>${numPeople} người</strong></p>
          
          <p>🎉 Chúc mừng! Chuyến đi của bạn đã được xác nhận.</p>
          <p>Vui lòng chuẩn bị:</p>
          <ul>
            <li>CMND/CCCD bản gốc</li>
            <li>Giấy tờ cần thiết cho chuyến đi</li>
            <li>Liên hệ nếu có thắc mắc: <a href="mailto:support@travelapp.com">support@travelapp.com</a></li>
          </ul>
          <p>Chúc bạn có một chuyến đi tuyệt vời!</p>
          
          <p>Trân trọng,<br/>Travel App Team</p>
        </div>
      `;
      break;

    case 'cancelled':
      subject = `❌ Thông báo hủy booking - Travel App`;
      html = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto;">
          <p>Xin chào <strong>${userName}</strong>,</p>
          <p>Rất tiếc, booking <strong>${bookingId}</strong> của bạn đã bị <strong>HỦY</strong>.</p>
          
          <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 4px;">📋 THÔNG TIN ĐẶT TOUR:</h3>
          <p>Tour: <strong>${tourName}</strong><br/>
          Ngày khởi hành: <strong>${startDate}</strong><br/>
          Số người: <strong>${numPeople} người</strong></p>
          
          <p>Nếu bạn muốn đặt lại hoặc cần hỗ trợ, vui lòng liên hệ: <a href="mailto:support@travelapp.com">support@travelapp.com</a></p>
          <p>Trân trọng,<br/>Travel App Team</p>
        </div>
      `;
      break;

    case 'completed':
      subject = `🏆 Cảm ơn bạn đã sử dụng dịch vụ - Travel App`;
      html = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto;">
          <p>Xin chào <strong>${userName}</strong>,</p>
          <p>Chuyến đi <strong>${tourName}</strong> với booking <strong>${bookingId}</strong> đã hoàn thành.</p>
          <p>Chúng tôi hy vọng bạn đã có trải nghiệm tuyệt vời. Cảm ơn bạn đã sử dụng Travel App!</p>
          <p>Trân trọng,<br/>Travel App Team</p>
        </div>
      `;
      break;

    default:
      subject = `📬 Cập nhật booking - Travel App`;
      html = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto;">
          <p>Xin chào <strong>${userName}</strong>,</p>
          <p>Có cập nhật mới cho booking <strong>${bookingId}</strong> của bạn. Vui lòng kiểm tra ứng dụng để biết chi tiết.</p>
          <p>Trân trọng,<br/>Travel App Team</p>
        </div>
      `;
  }
  return sendEmail(to, subject, html);
};


module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendBookingConfirmationEmail,
  sendBookingStatusUpdateEmail,
};
