const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Sightings = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Sightings.prototype.bindEvents = function () {
  PubSub.subscribe('SightingView:sighting-delete-clicked', (event) => {
    this.deleteSighting(event.detail);
  });

  PubSub.subscribe('SightingFormView:bird-submitted', (event) => {
    this.postSighting(event.detail);
  });
};



Sightings.prototype.getData = function () {
  this.request.get()
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

Sightings.prototype.deleteSighting = function (sightingId) {
  this.request.delete(sightingId)
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

Sightings.prototype.postSighting = function(sighting) {
  this.request.post(sighting)
    .then((sighting) => {
      PubSub.publish('Sightings:data-loaded', sighting)
    })
    .catch(console.error);
}

module.exports = Sightings;
