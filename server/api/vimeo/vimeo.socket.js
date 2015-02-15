/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Vimeo = require('./vimeo.model');

exports.register = function(socket) {
  Vimeo.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Vimeo.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('vimeo:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('vimeo:remove', doc);
}