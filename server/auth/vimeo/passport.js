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
        user.accessToken = accessToken;
        user.save(function(err) {
          if (err) return done(err);
          return done(err, user);
        });
        return done(err, user);
      }
    });
    }
  ));
};
