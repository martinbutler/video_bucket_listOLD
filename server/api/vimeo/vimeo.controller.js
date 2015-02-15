'use strict';

var _ = require('lodash');
var Vimeo = require('./vimeo.model');
var request = require('request');

// Get list of vimeos
exports.index = function(req, res) {
  var url = "https://api.vimeo.com/tags/nyc/videos";
  Vimeo.find(function (err, vimeos) {
    if(err) { return handleError(res, err); }
    return res.json(200, vimeos);
  });
};

// Get a single vimeo
exports.show = function(req, res) {
  var url = "https://api.vimeo.com/tags/skydiving/videos";
  request.get(url, function(err, response, body) {
    return res.json(body);
  }).auth(null, null, true, req.params.id)
};

// Creates a new vimeo in the DB.
exports.create = function(req, res) {
  Vimeo.create(req.body, function(err, vimeo) {
    if(err) { return handleError(res, err); }
    return res.json(201, vimeo);
  });
};

// Updates an existing vimeo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Vimeo.findById(req.params.id, function (err, vimeo) {
    if (err) { return handleError(res, err); }
    if(!vimeo) { return res.send(404); }
    var updated = _.merge(vimeo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, vimeo);
    });
  });
};

// Deletes a vimeo from the DB.
exports.destroy = function(req, res) {
  Vimeo.findById(req.params.id, function (err, vimeo) {
    if(err) { return handleError(res, err); }
    if(!vimeo) { return res.send(404); }
    vimeo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
