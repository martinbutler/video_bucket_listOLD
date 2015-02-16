exports.setup = function (User, config) {
  var passport = require('passport');
  var VimeoStrategy = require('passport-vimeo-oauth2').Strategy;

  passport.use(new VimeoStrategy({
    clientID: config.vimeo.clientID,
    clientSecret: config.vimeo.clientSecret,
    callbackURL: config.vimeo.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    var accessToken = token;
    User.findOne({
      // 'vimeo.id': profile.id
      'name': profile.username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      console.log('111111')
      if (!user) {
        user = new User({
          name: profile.displayName,
          username: profile.username,
          role: 'user',
          provider: 'vimeo',
          vimeo: profile._json,
          accessToken: accessToken
        });
        user.save(function(err) {
          if (err) return done(err);
          return done(err, user);
        });
      } else {
        console.log('user', user)
        console.log('acc', accessToken)
        user.accessToken = accessToken;
        user.save(function(err) {
          if (err) return done(err);
          return done(err, user);
        });
        console.log(user)
        return done(err, user);
      }
    });
    }
  ));
};
