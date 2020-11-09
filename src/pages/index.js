import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  const institution = data.yv.institutions
  // turn LOCATIONS into an array
  // const filtered_locations_arr = process.env.LOCATIONS.split(",")
  let locations = data.yv.institutions.locations
  let filtered_locations_arr = process.env.LOCATIONS
  if (
    // first check if env variable is set
    filtered_locations_arr === undefined ||
    filtered_locations_arr.length === 0
  ) {
    console.log(locations)
  } else {
    console.log(
      "is there anything in filtered_locations_arr?",
      filtered_locations_arr
    )
    filtered_locations_arr = filtered_locations_arr.split`,`.map(x => +x)
    locations = locations.filter(el => {
      return filtered_locations_arr.some(f => {
        return f === el.loc_id
      })
    })
  }
  console.log("filtered_locations_arr: ", filtered_locations_arr)
  if (
    // first check if env variable is set
    filtered_locations_arr === undefined ||
    filtered_locations_arr.length === 0
  ) {
  }

  return (
    <Layout title={institution.name}>
      <ol className="no-numbers">
        {console.log(locations)}
        {locations.map(location => {
          return (
            <li key={location.loc_id}>
              <Link to={`/location/${location.loc_id}`}>
                <img src={location.cover_photo.thumb} alt={location.name} />
                <h2>{location.name}</h2>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query($instID: String) {
    yv {
      institutions(instID: $instID) {
        locations {
          loc_id
          inst_name
          experience_type
          name
          privacy
          status
          cover_photo {
            thumb
          }
        }
        inst_id
        name
      }
    }
  }
`
