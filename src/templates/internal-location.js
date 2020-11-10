import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import IWClocation from "../components/iwc-location"
import IWCModifyForm from "../components/iwcModifyForm"

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
  const [width, setWidth] = useState()
  const [type, setType] = useState("inline-embed")
  const [height, setHeight] = useState(250)

  const institution = props.data.yv.institutions
  const locations = props.data.yv.locations
  return (
    <Layout title={"INTERNAL: " + institution.name}>
      <h2>{locations.name}</h2>
      <IWCModifyForm
        updateWidth={setWidth}
        updateType={setType}
        updateHeight={setHeight}
      />
      <IWClocation
        containerWidth={width}
        containerHeight={height}
        title={locations.name}
        institution={institution.inst_id}
        dataType={type}
        location={locations.loc_id}
        showCode="true"
      />
    </Layout>
  )
}

export default Location
