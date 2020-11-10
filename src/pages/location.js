import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"

const BlogPage = ({ data }) => {
  const locations = data.yv.institutions.locations
  const name = data.yv.institutions.name

  return (
    <Layout title={name}>
      <h1>Blog</h1>
      <ol>
        {locations.map(location => {
          return (
            <li key={location.loc_id}>
              <h2>
                <Link to={`/location/${location.loc_id}`}>{location.name}</Link>
              </h2>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogPage

export const query = graphql`
  query($instID: String) {
    yv {
      institutions(instID: $instID) {
        locations {
          loc_id
          experience_type
          name
        }
        name
      }
    }
  }
`
