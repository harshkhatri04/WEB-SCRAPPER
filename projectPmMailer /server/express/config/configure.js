//forgot password
module.exports = {
    'OnSuccessRedirect': 'http://localhost:4200/set/',
    'OnFailureRedirect': 'http://localhost:4200/forgot',
    'resetLinkUrl': 'http://localhost:3000/resetPwd/reset/',
    'serviceProvider': 'gmail',
    'mailSendingId': 'personalizedemailer@gmail.com',
    'mailSendingPass': 'niit@123',
    'tokenValidity': 3600000,

    twitter: {
        'consumer_key': 'PSvJZIa6CNwG4Ntxjpll41uuy',
        'consumer_secret': 'LBQk5xp5dtTMijasoF4mrcBQfY1BWpn7Ogf2MgxpyVvetyQOcs',
        'access_token': '740077400046768128-2ycKxbL8scVsvpb67sBPV4MXHJb1nS2',
        'access_token_secret': 'zN06iXEwdLpltRvifi1wVZOzEAQx2rnPnQVm4BXI3M2JO'
    }

}