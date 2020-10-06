import React from "react"
import { withTracker } from "meteor/react-meteor-data";
import { Links } from "../../imports/collections/links"


const LinkList = (props) => {
  renderRows = () => {
    return props.links.map(link => {
      // Preparing 
      const { url, clicks, token } = link;
      const shortLink = `http://localhost:3000/${token}`;

      return (
        <tr key={token}>
          <td>{url}</td>
          <td>
            <a href={shortLink}>{shortLink}</a>
          </td>
          <td>{clicks}</td>
        </tr>
      )
    })
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>URL</th>
          <th>Address</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>
        {renderRows()}
      </tbody>
    </table>
  )
}

// Creating container
export default withTracker(() => {
  Meteor.subscribe("links"); // Publication added to container
  return { links: Links.find({}).fetch() }
})(LinkList); // Link List is the component we're injecting the publication into