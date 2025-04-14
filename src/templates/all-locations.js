import React from "react"
import { Link } from "gatsby"

const AllLocations = ({ pageContext }) => {
  const { locations } = pageContext
  const locations_defined_in_env_var = process.env.GATSBY_LOCATIONS
  const locationArray =
    locations_defined_in_env_var && locations_defined_in_env_var.trim()
      ? locations_defined_in_env_var.split(",").map((loc) => Number(loc.trim()))
      : []

  return (
    <div>
      <h1>Locations</h1>
      <p>
        Here are all the locations you have defined in the environment
        variables:
      </p>
      {locationArray.length > 0 ? (
        <ul>
          {locationArray.map((location) => {
            const isFound = locations.some((loc) => loc.loc_id === location)
            return (
              <li key={location}>
                {isFound ? (
                  <Link to={`/location/${location}`}>{location}</Link>
                ) : (
                  location
                )}
                <span>{isFound ? " ✅" : " ❌"}</span>
              </li>
            )
          })}
        </ul>
      ) : (
        <p>
          No locations have been defined in <strong>GATSBY_LOCATIONS</strong>{" "}
          variable
        </p>
      )}
      <p>And here are all the available locations for this partner:</p>
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
