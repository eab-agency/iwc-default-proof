import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  const locations = data.yv.institutions.locations
  const name = data.yv.institutions.name
  return (
    <Layout title={name}>
      <ol>
        {locations.map(location => {
          return (
            <li key={location.loc_id}>
              <Link to={`/location/${location.loc_id}`}>
                <img src={location.cover_photo.thumb} alt={location.name} />
                <h2>{location.name}</h2>
              </Link>
              <p>Experience type: {location.experience_type}</p>
              <p>Privacy: {location.privacy}</p>
              <p>Status: {location.status}</p>
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
        name
      }
    }
  }
`
