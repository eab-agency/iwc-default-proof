import React from "react"
import { graphql } from "gatsby"

const AllLocations = ({ pageContext }) => {
  const { locations } = pageContext

  return (
    <div>
      <h1>All Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.loc_id}>
            {location.loc_id} - {location.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllLocations

export const query = graphql`
  query ($instID: String) {
    yv {
      institutions(instID: $instID) {
        locations {
          loc_id
          status
        }
      }
    }
  }
`
