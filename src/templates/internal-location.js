import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import IWClocation from "../components/iwc-location"
import IWCModifyForm from "../components/iwcModifyForm"

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
      <pre>{JSON.stringify(props.data, null, 4)}</pre>
    </Layout>
  )
}

export default Location

export const query = graphql`
  query($locID: String, $instID: String) {
    yv {
      locations(locID: $locID) {
        loc_id
        name
        unique_id
        experience_type
        inst_unique_id
        panoramas {
          hotspots {
            title
            description
            media_items {
              description
              item_type
              video_type
              video {
                title
                url
                description
                playback_type
                type
              }
            }
          }
        }
      }
      institutions(instID: $instID) {
        inst_id
      }
    }
  }
`
