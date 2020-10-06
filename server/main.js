import { Meteor } from 'meteor/meteor';
import { Links } from "../imports/collections/links"
import { WebApp } from "meteor/webapp";
import ConnectRoute from "connect-route"



Meteor.startup(() => {
  Meteor.publish("links", function() {
    return Links.find({});
  })
});


// Executed whenever a user visits correctly
const onRoute = (req, res, next) => {
  // Get Token and find link in link collection
  const link = Links.findOne( { token: req.params.token })
  // If Link token is found, send them to long URL boom
  if (link) {
    Links.update(link, { $inc: {clicks: 1} } );
    res.writeHead(307, {"Location": link.url});
    res.end();
  } else {
  // If we don't find a link object, send to react website
    next();
  }
}

const middleWear = ConnectRoute(function(router) {
  router.get("/:token", onRoute)
});

WebApp.connectHandlers.use(middleWear);
