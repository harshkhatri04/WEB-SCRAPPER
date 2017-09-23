//forgot password
module.exports = {
    'OnSuccessRedirect': 'http://localhost:4200/set/',
    'OnFailureRedirect': 'http://localhost:4200/forgot',
    'resetLinkUrl': 'http://localhost:3000/api/reset/',
    'serviceProvider': 'gmail',
    'mailSendingId': 'personalizedemailer@gmail.com',
    'mailSendingPass': 'niit@123',
    'tokenValidity': 3600000
}