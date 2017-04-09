module.exports = {
  db: 'mongodb://localhost/your_project_test',

  jwtPrivateKey: 'RANDOM_KEY_FOR_JWT',

  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:6688/auth/facebook/callback',
    profileFields: [
      'id',
      'email',
      'gender',
      'link',
      'locale',
      'name',
      'timezone',
      'updated_time',
      'verified',
      'friends',
    ],
  },

  google: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ],
  },
}
