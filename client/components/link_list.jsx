import React from "react"
import { withTracker } from "meteor/react-meteor-data";
import { Links } from "../../imports/collections/links"


const linkList = () => {
  return (
    <div>List of links to click</div>
  )
}

export default withTracker(() => {
  Meteor.subscribe("links");
  return { links: Links.find({}).fetch()}
}) (linkList); // Link List is the component we're injecting the publication into