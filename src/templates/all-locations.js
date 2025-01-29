import React from "react"
import { Link } from "gatsby"

const AllLocations = ({ pageContext }) => {
  const { locations } = pageContext

  return (
    <div>
      <h1>All Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.loc_id}>
            <span title={location.status === "live" ? "Live" : "Not Live"}>
              {location.status === "live" ? "👍🏽" : "👎🏽"}
            </span>
            <Link to={`/location/${location.loc_id}`}>
              {location.name} ({location.loc_id})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllLocations
