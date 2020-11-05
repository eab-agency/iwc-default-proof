import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import IWC from "../components/iwc"

const IndexPage = ({ data }) => {
  const locations = data.yv.institutions.locations
  const institution = data.yv.institutions

  return (
    <Layout title={institution.name}>
      <ol className="no-numbers">
        {locations.map(location => {
          return (
            <li key={location.loc_id}>
              {/* <Link to={`/location/${location.loc_id}`}>
                <img src={location.cover_photo.thumb} alt={location.name} />
                <h2>{location.name}</h2>
              </Link> */}

              <IWC
                containerWidth="100%"
                containerHeight="440px"
                title={location.name}
                institution={institution.inst_id}
                dataType="inline-embed"
                location={location.loc_id}
                // showCode="true"
              />
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
