module.exports = {
    'successRedirect': 'http://localhost:4200/dashboard',
    'failureRedirect': 'http://localhost:4200/login',
    'clientID': '438440776550040',
    'clientSecret': '43b9ccc205bc088d0b904e886227099c',
    'callbackURL': "http://localhost:3000/api/auth/facebook/callback",
    'profileURL': "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email"
}