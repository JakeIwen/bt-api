'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendEmail;

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _feedbackReceived = require('./feedbackReceived');

var _feedbackReceived2 = _interopRequireDefault(_feedbackReceived);

var _invitationReceived = require('./invitationReceived');

var _invitationReceived2 = _interopRequireDefault(_invitationReceived);

var _friendRequestAccepted = require('./friendRequestAccepted');

var _friendRequestAccepted2 = _interopRequireDefault(_friendRequestAccepted);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domain = 'mail.bouncetribe.com';
var apiKey = process.env.mailgunKey;

var mailgun = new _mailgunJs2.default({ apiKey: apiKey, domain: domain });

function sendEmail(_ref) {
  var toEmail = _ref.toEmail,
      byHandle = _ref.byHandle,
      type = _ref.type,
      projectTitle = _ref.projectTitle,
      sessionId = _ref.sessionId,
      forHandle = _ref.forHandle;


  var html = '';
  var subject = '';
  switch (type) {
    case 'FRIEND_REQUEST':
      {
        html = (0, _friendRequestAccepted2.default)(byHandle);
        subject = 'Friend Request Accepted';
        break;
      }
    case 'FRIEND_REQUEST_ACCEPTED':
      {
        html = (0, _friendRequestAccepted2.default)(byHandle);
        subject = 'Friend Request Accepted';
        break;
      }
    case 'PROJECT_FEEDBACK_RECEIVED':
      {
        html = (0, _feedbackReceived2.default)(byHandle, projectTitle, forHandle);
        subject = 'Feedback Received';
        break;
      }
    case 'SESSION_FEEDBACK_RECEIVED':
      {
        html = (0, _feedbackReceived2.default)(byHandle, 'session/' + sessionId + '/mine', forHandle);
        subject = 'Feedback Received';
        break;
      }
    case 'INVITATION_RECEIVED':
      {
        html = (0, _invitationReceived2.default)(byHandle);
        subject = 'BounceTribe Invitation Received';
        break;
      }
    case 'FB_FRIEND_JOINED':
      {
        break;
      }
    case 'MESSAGE':
      {
        break;
      }
    case 'BOUNCED':
      {
        break;
      }
    default:
      {}
  }

  if (html) {
    mailgun.messages().send({
      from: "BounceTribe <hello@bouncetribe.com>",
      to: toEmail,
      html: html,
      subject: subject
    }, function (error, body) {
      if (error) {
        console.log(error);
      }
    });
  }
}