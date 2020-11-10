import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"

const InternalIndexPage = ({ data }) => {
  const institution = data.yv.institutions
  let locations = data.yv.institutions.locations
  return (
    <Layout title={`TEAM: ${institution.name}`}>
      <ol className="no-numbers">
        {locations.map(location => {
          return (
            <li key={location.loc_id}>
              <Link to={`/internal/location/${location.loc_id}`}>
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

export default InternalIndexPage

export const query = graphql`
  query($instID: String) {
    yv {
      institutions(instID: $instID) {
        name
        locations {
          loc_id
          name
          cover_photo {
            thumb
          }
        }
      }
    }
  }
`
