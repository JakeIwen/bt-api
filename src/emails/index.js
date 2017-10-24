import Mailgun from 'mailgun-js'
import feedbackReceived from './feedbackReceived'
import invitationReceived from './invitationReceived'
import friendRequestAccepted from './friendRequestAccepted'


const domain = 'mail.bouncetribe.com'
const {mailgunKey: apiKey} = process.env
const mailgun = new Mailgun({apiKey, domain})

export default function sendEmail({toEmail,byHandle,type, projectTitle, sessionId, forHandle, urlCode}) {

  let html = ''
  let subject = ''
  switch (type) {
    case 'FRIEND_REQUEST': {
      html = friendRequestAccepted(byHandle)
      subject = 'Friend Request Accepted'
      break
    }
    case 'FRIEND_REQUEST_ACCEPTED': {
      html = friendRequestAccepted(byHandle)
      subject = 'Friend Request Accepted'
      break
    }
    case 'PROJECT_FEEDBACK_RECEIVED':{
      html = feedbackReceived(byHandle, projectTitle, forHandle)
      subject = 'Feedback Received'
      break
    }
    case 'SESSION_FEEDBACK_RECEIVED': {
      html = feedbackReceived(byHandle, `session/${sessionId}/mine`, forHandle)
      subject = 'Feedback Received'
      break
    }
    case 'INVITATION_RECEIVED':{
      html = invitationReceived(byHandle, urlCode)
      subject = 'BounceTribe Invitation Received'
      break
    }
    case 'FB_FRIEND_JOINED': {
      break

    }
    case 'MESSAGE': {
      break

    }
    case 'BOUNCED': {
      break

    }
    default: {

    }
  }

  if (html) {
    mailgun.messages().send({
       from: "BounceTribe <hello@bouncetribe.com>",
       to: toEmail,
       html,
       subject
     }, (error, body) => {
      if (error) {
        console.log(error)
      }

    })
  }
}
