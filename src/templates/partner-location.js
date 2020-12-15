import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import IWCLocation from "../components/iwc-location"

export const query = graphql`
  query($locID: String, $instID: String) {
    yv {
      locations(locID: $locID) {
        loc_id
        name
      }
      institutions(instID: $instID) {
        inst_id
        name
      }
    }
  }
`

const Location = props => {
  const institution = props.data.yv.institutions
  const locations = props.data.yv.locations
  const showCode = process.env.GATSBY_SHOWCODE

  return (
    <Layout title={institution.name}>
      {/* <h2>{locations.name}</h2> */}

      <IWCLocation
        containerWidth="100%"
        containerHeight="500px"
        title={locations.name}
        institution={institution.inst_id}
        dataType="inline-embed"
        location={locations.loc_id}
        showCode={showCode}
      />
    </Layout>
  )
}

export default Location
