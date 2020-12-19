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
        experience_type
        stops {
          stopid
          title
        }
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
  const experience_type = props.data.yv.locations.experience_type
  const allStops = props.data.yv.locations.stops
  let stops = ""
  if (experience_type === "vt") {
    stops = allStops.map((stop, index) => {
      return (
        <div key={index}>
          <h3>{stop.title}</h3>
          <IWCLocation
            containerWidth="100%"
            containerHeight="500px"
            title={locations.name}
            institution={institution.inst_id}
            dataType="inline-embed"
            location={locations.loc_id}
            showCode={showCode}
            dataStopid={stop.stopid}
          />
        </div>
      )
    })
  }

  return (
    <Layout title={institution.name}>
      <IWCLocation
        containerWidth="100%"
        containerHeight="500px"
        title={locations.name}
        institution={institution.inst_id}
        dataType="inline-embed"
        location={locations.loc_id}
        showCode={showCode}
      />
      {stops}
    </Layout>
  )
}

export default Location
