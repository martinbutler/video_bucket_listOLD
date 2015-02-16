'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'vimeomartin-secret',

  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',

  VIMEO_ID:       '14edcaf1f7fa43ce5f85c0b4160c99a01ef91105',
  VIMEO_SECRET:   '69155ed17a8989ed60369f4e018ed9fc8f6f5552',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
