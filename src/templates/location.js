import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import IWC from "../components/iwc"

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
  return (
    <Layout title={institution.name}>
      <h2>{locations.name}</h2>
      {/* <IWC
        containerWidth="100%"
        title={locations.name}
        institution={institution.inst_id}
        dataType="inline-embed"
        location={locations.loc_id}
        showCode="true"
      />
      <hr /> */}
      <IWC
        containerWidth="100%"
        containerHeight="440px"
        title={locations.name}
        institution={institution.inst_id}
        dataType="inline-embed"
        location={locations.loc_id}
        showCode=""
      />
      <hr />
      {/* <IWC
        containerWidth="250px"
        title={locations.name}
        institution={institution.inst_id}
        dataType="inline-embed"
        location={locations.loc_id}
        showCode="true"
      />
      <IWC
        containerWidth="100%"
        title={locations.name}
        institution={institution.inst_id}
        dataType="hover"
        location={locations.loc_id}
        showCode="true"
      />
      <IWC
        containerWidth="500px"
        title={locations.name}
        institution={institution.inst_id}
        dataType="hover"
        location={locations.loc_id}
        showCode="true"
      />
      <IWC
        containerWidth="250px"
        title={locations.name}
        institution={institution.inst_id}
        dataType="hover"
        location={locations.loc_id}
        showCode="true"
      /> */}
    </Layout>
  )
}

export default Location
